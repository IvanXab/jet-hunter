# jet-hunter

Turborepo monorepo.

## Требования

- Node **24.14.0** (`nvm use` подхватит из `.nvmrc`; `engine-strict` не даст поставить зависимости на другой версии)
- npm workspaces

## Структура

```
apps/      — приложения
packages/  — внутренние пакеты
```

Обе директории пока пустые.

## Команды

```bash
npm install
npm run dev          # turbo run dev
npm run build        # turbo run build
npm run lint
npm run check-types
npm run test
npm run format
```

Запуск только для изменённых пакетов:

```bash
npx turbo run build --affected
```

## Кеш

Локальный кеш Turborepo включён, remote cache **отключён** в `turbo.json`
(`remoteCache.enabled: false`) — `turbo login` / `turbo link` не нужны.
