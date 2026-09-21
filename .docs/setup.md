# Окружение и установка

[← README](../README.md)

## Быстрый старт

```bash
nvm use        # Node 24.14.0 из .nvmrc
npm install
```

## Команды

Все запускаются из корня репозитория:

```bash
npm run dev           # все dev-серверы
npm run build         # сборка
npm run lint
npm run check-types
npm run test
npm run format        # prettier --write .
npm run format:check  # проверка форматирования, для CI
```

Пока в `apps/` нет пакетов, `dev` и `build` честно сообщают, что задач нет.

Запуск задачи не для всего репозитория, а для части — см.
[Turborepo: задачи и кеш](turborepo.md).

## Node

Проект использует **строго Node 24.14.0**. Не «24 и выше», а именно эту версию —
чтобы у всех и в CI совпадали и рантайм, и поведение npm.

Версия зафиксирована в трёх местах, и все три должны совпадать:

| Файл                            | Зачем                                                                    |
| ------------------------------- | ------------------------------------------------------------------------ |
| `.nvmrc`                        | `nvm use` без аргументов переключается на нужную версию                  |
| `package.json` → `engines.node` | декларация для npm и CI                                                  |
| `.npmrc` → `engine-strict=true` | превращает несовпадение версии в ошибку установки, а не в предупреждение |

```bash
nvm install    # поставит версию из .nvmrc, если её ещё нет
nvm use
node -v        # v24.14.0
```

Если меняете версию Node — правьте все три места сразу.

## Пакетный менеджер

npm с workspaces. pnpm, yarn и bun не использовать: lock-файл один, и смешивать
менеджеры нельзя.

```bash
npm install            # ставит зависимости всех пакетов сразу
```

Зависимость конкретному пакету ставится через `--workspace`, а не `cd` в его
директорию:

```bash
npm install zod --workspace @repo/some-package
npm install -D vitest --workspace apps/web
```

В корень попадают только инструменты репозитория (`turbo`, `prettier`).
Зависимости приложений и библиотек — в их собственные `package.json`.

## Если не устанавливается

**`Unsupported engine` / `EBADENGINE`** — активна не та версия Node.
`nvm use` и повторить. Это ровно то, для чего включён `engine-strict`.

**Странные ошибки резолва после смены веток** — снести и поставить заново:

```bash
rm -rf node_modules **/node_modules package-lock.json
npm install
```

**Turbo отдаёт устаревший результат** — сбросить локальный кеш:

```bash
rm -rf .turbo
npx turbo run build --force
```
