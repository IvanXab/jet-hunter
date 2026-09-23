# Работа с монорепозиторием

[← README](../README.md)

## Структура

```
apps/                        приложения
  frontend/                  SPA на React 19 + Vite + React Router (@repo/frontend)
packages/                    внутренние пакеты (@repo/*)
  typescript-config/         общий tsconfig
  eslint-config/             общий eslint
  tailwind-config/           тема Tailwind (@repo/tailwind-config)
  ui/                        UI-kit на React 19 (@repo/ui)
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

## Tailwind (`@repo/tailwind-config`)

Во фронтенд-пакетах используется Tailwind CSS 4. Токены дизайна живут в
`packages/tailwind-config/theme.css` — это блок `@theme`, из которого Tailwind
сам генерирует и CSS-переменные, и утилиты. Своего `tailwind.config.js` нигде
нет: в четвёртой версии конфигурация описывается в CSS.

Приложение подключает тему в своём корневом стиле:

```css
@import "tailwindcss";
@import "@repo/tailwind-config/theme.css";
```

После этого доступны утилиты по именам токенов: `bg-canvas`, `bg-surface`,
`border-line-strong`, `text-ink-muted`, `text-accent`, `font-mono`,
`text-control`, `tracking-label` и остальные из `theme.css`.

Названия цветов не привязаны к роли в конкретном экране: `ink*` — текст от
основного к выключенному, `line*` — границы от самой светлой к контрастной,
`canvas` и `surface` — фоны, `accent` — единственный акцентный цвет.

Перекрасить тему можно переопределением переменной, компоненты при этом не
трогаются:

```css
:root {
  --color-accent: #4b6cff;
}
```

## UI-kit (`@repo/ui`)

Библиотека компонентов на React 19, перенесённая из дизайна
«Минимальный UI-кит — светлая тема» (проект Claude Design «UI-kit Bridge
Console»).

```ts
import { Button, DataTable, TopNav } from "@repo/ui";
import "@repo/ui/styles.css";
```

`react` и `react-dom` объявлены в `peerDependencies` — версию задаёт приложение,
пакет не тянет вторую копию React. В `devDependencies` они же, чтобы пакет
собирался и линтился сам по себе.

Шрифты Geist и Geist Mono пакет не подключает: их подключает приложение
(`fonts.googleapis.com`, начертания 300/400/500/600 и mono 400/500). Без них
сработает системный fallback из `--font-sans`.

### Состав

| Группа    | Компоненты                                                                                 |
| --------- | ------------------------------------------------------------------------------------------ |
| Основы    | `SectionHeading`                                                                           |
| Навигация | `TopNav`, `SideNav`, `Breadcrumbs`, `Tabs`, `Pagination`                                   |
| Формы     | `Button`, `TextField`, `SelectField`, `Checkbox`, `RadioGroup`, `Switch`, `Slider`, `Chip` |
| Сообщения | `Badge`, `Alert`, `ConfirmPanel`                                                           |
| Данные    | `Meter`, `ActivityLog`, `DataTable`                                                        |

Все компоненты с состоянием — управляемые: значение приходит пропом, изменение
уходит колбэком (`value` / `onValueChange`, `checked` / `onCheckedChange`,
`activeId` / `onSelect`). Внутреннего состояния нет нигде, кроме `useId`.

Кит не зависит от роутера. Если у пункта `SideNav` задан `href`, он рисуется
ссылкой `<a>`: обычный клик отменяется и уходит в `onSelect`, где приложение
вызывает свой `navigate`, а клик с модификатором (cmd/ctrl/shift) или средней
кнопкой браузер обрабатывает сам — например, открывает новую вкладку. Без
`href` пункт остаётся кнопкой. Подпись навигации для скринридеров задаётся
пропом `label`.

### Устройство пакета

- `src/<component>/<component>.tsx` — один компонент на директорию,
  публичный API собирается в `src/index.ts`;
- стилей в виде отдельных CSS-файлов у компонентов нет: оформление — утилиты
  Tailwind в `className`. Литералов цвета и размера в утилитах быть не должно,
  только имена токенов из `@repo/tailwind-config`;
- варианты (`variant`, `tone`, `size`) раскладываются в `Record<Тип, string>`
  рядом с компонентом, а не собираются конкатенацией в разметке;
- общие куски классов, которые нужны нескольким компонентам, лежат в
  `src/internal/` и наружу не экспортируются.

### Сборка стилей

`npm run build` в пакете делает два шага: `tsc` собирает TypeScript в `dist/`,
затем Tailwind CLI собирает `src/styles/index.css` в `dist/styles/index.css`.
Входной файл подключает слои `theme` и `utilities`, тему из
`@repo/tailwind-config` и указывает `@source` на исходники компонентов:

```css
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities) source(none);
@import "@repo/tailwind-config/theme.css";

@source "../**/*.{ts,tsx}";
```

Из-за этого `@repo/ui/styles.css` самодостаточен: приложению не нужно добавлять
исходники пакета в сканирование Tailwind, кит работает и там, где Tailwind не
подключён вообще. Preflight намеренно не включён — его подключает приложение
через `@import "tailwindcss"`, и второй копии в ките быть не должно.

Добавили компонент — ничего в конфигурации менять не нужно, `@source` подхватит
файл сам. Классы должны быть записаны в исходнике целиком: Tailwind ищет их
текстом, и `` `text-${tone}` `` в сборку не попадёт.

Пресеты для React лежат в общих конфигах: `@repo/typescript-config/react.json`
(`jsx: react-jsx`, DOM-библиотеки) и `@repo/eslint-config/react`
(база плюс `eslint-plugin-react-hooks`).

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

Внутри `apps/frontend` свои модули импортируются через alias `@/`, который
указывает на `apps/frontend/src`. Он задан в двух местах, и их нужно держать
синхронными: `paths` в `tsconfig.json` (для TypeScript и редактора) и
`resolve.alias` в `vite.config.ts` (для сборки).

```ts
import { AppLayout } from "@/layout/app-layout"; // да
import { AppLayout } from "../../layout/app-layout"; // нет
```

Alias работает только внутри приложения. Код соседних пакетов по-прежнему
импортируется по имени пакета.

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
