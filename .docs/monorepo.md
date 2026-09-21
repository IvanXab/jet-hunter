# Работа с монорепозиторием

[← README](../README.md)

## Структура

```
apps/                        приложения
packages/                    внутренние пакеты (@repo/*)
  typescript-config/         общий tsconfig
  eslint-config/             общий eslint
.docs/                       документация
.claude/CLAUDE.md            правила для AI-агентов
turbo.json                   граф задач
```

## Что куда кладётся

- `apps/<name>` — то, что запускается и деплоится: сайт, API, CLI, воркер.
- `packages/<name>` — то, что переиспользуется: библиотеки, общие конфиги, типы.

Общий код не должен лежать внутри приложения. Как только что-то из `apps/web`
понадобилось в `apps/api` — это повод завести пакет, а не импортировать через
`../../`.

Приложения не импортируют друг друга. Пакеты могут зависеть от пакетов, но без
циклов.

## Новый пакет

Пример для `packages/utils`:

```jsonc
// packages/utils/package.json
{
  "name": "@repo/utils",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
  },
  "scripts": {
    "lint": "eslint .",
    "check-types": "tsc --noEmit",
  },
  "devDependencies": {
    "@repo/eslint-config": "*",
    "@repo/typescript-config": "*",
    "eslint": "^9.39.1",
    "typescript": "^5.9.3",
  },
}
```

```jsonc
// packages/utils/tsconfig.json
{
  "extends": "@repo/typescript-config/base.json",
  "include": ["src/**/*.ts"],
}
```

```js
// packages/utils/eslint.config.js
import { config } from "@repo/eslint-config/base";
export default config;
```

После создания — `npm install` в корне, чтобы npm связал workspace.

### JIT или сборка

Пакет выше — **JIT**: в `exports` указан `.ts`, компилирует его потребитель.
Это проще всего и хорошо работает, пока потребители сами собираются бандлером.

Если пакет нужен как готовый JS (публикация, потребитель без сборки) — добавьте
`build`, указывающий на `dist`, и `exports` на собранные файлы. Тогда задача
`build` в `turbo.json` подхватит его автоматически: `outputs` уже настроены на
`dist/**`.

## Общие конфиги

В репозитории два конфигурационных пакета, и новые пакеты наследуют их, а не
заводят собственные правила.

**`@repo/typescript-config`**

- `base.json` — `strict: true` и то, что в него не входит:
  `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitOverride`,
  `noUnusedLocals`, `noUnusedParameters`, `verbatimModuleSyntax`,
  `isolatedModules`. Target ES2023, модули NodeNext.
- `node.json` — то же плюс `types: ["node"]`.

**`@repo/eslint-config`**

`base.js` — flat config на ESLint 9 и typescript-eslint (`strictTypeChecked`,
типизированный линтинг через `projectService`). Поверх — правила под соглашения
проекта: запрет `any`, `@ts-ignore` только как `@ts-expect-error` с описанием,
`no-floating-promises`, запрет пустого `catch` и default-экспортов. Замыкает
`eslint-config-prettier`, поэтому ESLint не спорит с форматированием.

Файлы `*.js` (сами конфиги) выведены из-под типизированных правил — их не
покрывает tsconfig.

Отключать унаследованное правило в отдельном пакете можно, но рядом должен быть
комментарий с причиной.

## Зависимости между пакетами

Связь объявляется явно в `package.json`:

```jsonc
{
  "dependencies": {
    "@repo/utils": "*",
  },
}
```

Это не формальность: `dependsOn: ["^build"]` в `turbo.json` строит граф именно
по объявленным зависимостям. Без записи в `package.json` turbo не будет знать,
что пакет надо собрать первым, и порядок сборки окажется случайным.

Отсюда же правило: не писать `prebuild`-скрипты, вручную собирающие соседние
пакеты. Это обходит граф turbo и ломает кеширование.

Импортировать только по имени пакета:

```ts
import { formatDate } from "@repo/utils"; // да
import { formatDate } from "../../packages/utils/src/date"; // нет
```

## Версии одинаковых зависимостей

Одну и ту же библиотеку во всех пакетах держать одной версии — иначе в сборку
попадут две копии. Проверить расхождения:

```bash
npm ls <package-name>
```

## Соглашения по коду

Правила написания кода (типы, границы пакетов, обработка ошибок,
асинхронность, стиль) собраны в [.claude/CLAUDE.md](../.claude/CLAUDE.md).

Они лежат там, а не здесь, намеренно: этот же файл читают AI-агенты, и
дублирование правил в двух местах привело бы к расхождению. `.agents/AGENTS.md` —
симлинк на него же для агентов, не использующих Claude.

Бо́льшая часть правил заодно включена в `@repo/eslint-config`, то есть
проверяется автоматически, а не держится на договорённости.
