# [BiБр] Clan Stats — Project Memory

> **Last updated:** 2026-03-31  
> **Purpose:** Сохранение контекста проекта между сессиями, фиксация архитектурных решений и известных проблем

---

## 🏗 Архитектурные решения

### State Management
- ✅ **Zustand** для глобального состояния (не Redux, не Context API)
- ✅ Persist middleware для localStorage
- ✅ Store файлы: `src/store/*.store.ts`

### Компоненты
- ✅ **Ant Design** как основная UI-библиотека
- ✅ Компоненты сгруппированы по фичам (`components/Hydra/`, `components/Chimera/`)
- ✅ Таблицы и графики — отдельные подкомпоненты

### Данные
- ✅ **Supabase** для бэкенда (PostgreSQL)
- ✅ Данные кэшируются в store с TTL (1 час)
- ✅ В development режиме — моковые данные из `src/data/`

### Структура проекта
```
src/
├── components/    # UI компоненты (сгруппированы по фичам)
├── pages/         # Страницы (Hydra, Chimera, Home)
├── store/         # Zustand store
├── hooks/         # Кастомные React хуки
├── data/          # Моковые данные и типы
├── lib/           # Внешние клиенты (Supabase)
├── layouts/       # Layout компоненты
├── hocs/          # Higher-order components
├── constants/     # Глобальные константы
└── utils/         # Helper функции
```

---

## ⚠️ Избегать (анти-паттерны)

- ❌ **НЕ** использовать localStorage напрямую — только через Zustand store
- ❌ **НЕ** создавать новые хуки без проверки существующих в `src/hooks/`



- ❌ **НЕ** менять структуру папок без согласования
- ❌ **НЕ** дублировать код между Hydra и Chimera — выносить общее в `components/`
- ❌ **НЕ** использовать `any` в TypeScript — только типизированные данные

---

## 📁 Ключевые файлы

| Файл | Назначение |
|------|------------|
| `src/store/hydra.store.ts` | Hydra state (period, statistics, lastUpdated) |
| `src/store/theme.store.ts` | Theme state (light/dark mode) |
| `src/hooks/useHydraStatistics.ts` | Хук для загрузки и обработки Hydra данных |
| `src/lib/supabaseClient.ts` | Supabase клиент |
| `src/data/index.ts` | Моковые данные для Hydra |
| `src/data/types/index.ts` | TypeScript типы для Hydra |
| `src/constants/index.ts` | Глобальные константы (CACHE_TTL, AVAILABLE_YEARS) |
| `src/components/Hydra/` | Все компоненты Hydra (Table, Chart, utils) |
| `src/pages/Hydra/Main/Main.page.tsx` | Основная страница Hydra |

---

## 🔄 Текущий статус (2026-03-31)

| Фича | Статус | Примечание |
|------|--------|------------|
| ✅ Hydra Statistics | Готово | Таблицы, графики, фильтрация по ротациям |
| 🚧 Chimera Statistics | В разработке | Создан план реализации (8 задач) |
| ⏳ Роутинг между страницами | Не реализован | Используется MainLayout с навигацией |
| ⏳ Chimera данные в Supabase | Не созданы | Требуются таблицы: chimera_statistics, chimera_user_statistics |

### План по Chimera (ожидает реализации)
1. [ ] Типы данных (`src/data/types/chimera.ts`)
2. [ ] Константы (`src/components/Chimera/utils/constants.ts`)
3. [ ] Store (`src/store/chimera.store.ts`)
4. [ ] Хук (`src/hooks/useChimeraStatistics.ts`)
5. [ ] Компоненты (Table, Chart)
6. [ ] Страница (`src/pages/Chimera/Main/Main.page.tsx`)
7. [ ] Роутинг в App.tsx
8. [ ] Скрипт миграции (`src/scripts/migrateChimeraData.ts`)

---

## 🐛 Известные проблемы

| Дата | Проблема | Статус |
|------|----------|--------|
| 2026-03-31 | — | Нет известных проблем |

---

## 🔑 Ключевые отличия Hydra vs Chimera

| Параметр | Hydra | Chimera |
|----------|-------|---------|
| Уровни сложности | Normal, Hard, Brutal, Nightmare | Easy, Medium, Hard, Lethal |
| Таблицы БД | `hydra_statistics`, `hydra_user_statistics` | `chimera_statistics`, `chimera_user_statistics` |
| Store ключ | `storage-hydra` | `storage-chimera` |
| Коэффициенты | Своя система | Своя система (требует уточнения) |

---

## 📦 Зависимости (ключевые)

```json
{
  "react": "^19.1.0",
  "zustand": "^5.0.5",
  "antd": "^5.25.4",
  "@supabase/supabase-js": "^2.54.0",
  "react-router-dom": "^7.6.2",
  "typescript": "~5.8.3",
  "vite": "^6.3.5"
}
```

---

## 🚀 Команды разработки

```bash
npm run dev              # Dev server
npm run build            # Production build
npm run lint             # ESLint
npm run format           # Prettier
npm run db:migrate:hydra # Миграция Hydra данных в Supabase
```

---

## 🌐 Деплой

- **URL:** https://vibr-clan-statistics.netlify.app
- **Хостинг:** Netlify
- **CI/CD:** GitHub Actions + semantic-release

---

## 📝 Заметки сессий

### 2026-03-31 — Анализ проекта и документирование
- Изучена структура проекта
- Создана документация в `docs/PROJECT_OVERVIEW.md`
- Создан этот файл `MEMORY.md`
- Составлен план реализации Chimera (8 задач)

### Следующие шаги
1. Реализация Chimera по плану
2. Добавление роутинга (React Router)
3. Создание таблиц в Supabase для Chimera
