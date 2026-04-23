# [BiБр] Clan Stats — Project Documentation

## 📋 Project Overview

**[BiБр] Clan Stats** is a web application for tracking and visualizing clan performance statistics in the **Hydra** and **Chimera** events from the game **RAID: Shadow Legends**.

The application provides clan members with clear tables and charts showing:
- Top players by damage dealt
- Damage distribution by difficulty level (Normal, Hard, Brutal, Nightmare)
- Player activity and key usage
- Battle dynamics across different rotation periods

## 🌐 Deployment

- **URL**: https://vibr-clan-statistics.netlify.app
- **Hosting**: Netlify
- **Title**: [BiБр] Clan Statistics

## 🛠 Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.1.0 | UI framework |
| **TypeScript** | 5.8.3 | Type safety |
| **Vite** | 6.3.5 | Build tool & dev server |
| **React Router DOM** | 7.6.2 | Client-side routing |

### UI & Styling
| Technology | Version | Purpose |
|------------|---------|---------|
| **Ant Design** | 5.25.4 | Component library |
| **@ant-design/charts** | 2.3.0 | Data visualization |
| **use-antd-resizable-header** | 3.2.2 | Resizable table headers |

### State Management
| Technology | Version | Purpose |
|------------|---------|---------|
| **Zustand** | 5.0.5 | Global state management |
| **usehooks-ts** | 3.1.1 | React hooks utilities |

### Backend & Database
| Technology | Version | Purpose |
|------------|---------|---------|
| **Supabase** | 2.54.0 | PostgreSQL database & API |

### Development Tools
| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | 9.28.0 | Code linting |
| **Prettier** | 3.5.3 | Code formatting |
| **semantic-release** | 24.2.5 | Automated versioning & releases |

## 📁 Project Structure

```
raid-clan-stats/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Hydra/         # Hydra-specific components
│   │   └── ErrorBoundary.tsx
│   ├── pages/             # Page components
│   │   ├── Home/          # Home page
│   │   ├── Hydra/         # Hydra statistics page
│   │   └── Chimera/       # Chimera statistics page
│   ├── store/             # Zustand state stores
│   │   ├── hydra.store.ts # Hydra state management
│   │   └── theme.store.ts # Theme (dark/light) state
│   ├── data/              # Static/mock data
│   │   └── types/         # TypeScript type definitions
│   ├── lib/               # Utility libraries
│   │   └── supabaseClient.ts
│   ├── hooks/             # Custom React hooks
│   ├── layouts/           # Layout components
│   │   └── Main/          # Main application layout
│   ├── hocs/              # Higher-order components
│   │   └── withAntTheme.tsx
│   ├── scripts/           # Utility scripts
│   │   └── migrateHydraData.ts
│   ├── constants/         # Application constants
│   ├── utils/             # Helper functions
│   ├── assets/            # Static assets (images, etc.)
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Application entry point
│   └── vite-env.d.ts      # Vite type declarations
├── public/                # Public static files
│   ├── logo.avif
│   └── _redirects
├── docs/                  # Documentation
├── .github/workflows/     # GitHub Actions CI/CD
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Key Features

### Hydra Statistics
- **Rotation-based data**: Statistics organized by event rotation periods (e.g., `18-03-2026_25-03-2026`)
- **Damage tracking**: Tracks damage across 4 difficulty levels:
  - Normal
  - Hard
  - Brutal
  - Nightmare
- **Key usage**: Tracks number of keys used per player
- **Data persistence**: Statistics stored in Supabase PostgreSQL database

### Database Schema (Supabase)

**Table: `hydra_statistics`**
- `id` — Rotation period identifier (e.g., `18-03-2026_25-03-2026`)

**Table: `hydra_user_statistics`**
- `hydra_id` — Foreign key to rotation
- `name` — Player name
- `normal` — Damage on Normal difficulty
- `hard` — Damage on Hard difficulty
- `brutal` — Damage on Brutal difficulty
- `nightmare` — Damage on Nightmare difficulty
- `key_used` — Number of keys used

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linter
npm run lint

# Format code
npm run format

# Preview production build
npm run preview

# Migrate Hydra data to Supabase
npm run db:migrate:hydra
```

## 📦 Version Management

The project uses **semantic-release** for automated versioning based on commit messages:

### Commit Message Convention

| Commit Type | Version Bump | Example |
|-------------|--------------|---------|
| `feat:` | Minor | `feat: add Chimera statistics` |
| `fix:` | Patch | `fix: hydra table sorting` |
| `feat!:` or `BREAKING CHANGE:` | Major | `feat!: redesign dashboard` |
| `docs:`, `chore:` | No release | `docs: update README` |

### Manual Version Commands
```bash
npm version major   # 1.0.0 -> 2.0.0
npm version minor   # 1.0.0 -> 1.1.0
npm version patch   # 1.0.0 -> 1.0.1
git push --follow-tags
```

## 🌙 Theme Support

The application supports both **light** and **dark** modes:
- Theme state managed via Zustand (`theme.store.ts`)
- Ant Design theme algorithm switches between `defaultAlgorithm` (dark) and `compactAlgorithm` (light)
- Theme preference persisted in localStorage

## 📊 State Management

Zustand stores:

1. **`useHydraStore`** — Hydra statistics state
   - `period` — Current selected rotation period
   - `statistics` — Array of rotation data
   - `lastUpdated` — Timestamp of last data update

2. **`useThemeStore`** — Theme state
   - `mode` — Current theme mode (`'light'` | `'dark'`)

## 🔐 Environment Variables

Required environment variables (stored in `.env`):

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📝 Data Migration

The project includes a migration script for transferring local data to Supabase:

```bash
# Run Hydra data migration
npm run db:migrate:hydra
```

Script location: `src/scripts/migrateHydraData.ts`

## 🏷️ Clan Information

- **Clan Name**: [BiБр] (Vibr)
- **Game**: RAID: Shadow Legends
- **Events Tracked**: Hydra, Chimera

## 📄 License

Private project (see `package.json`: `"private": true`)
