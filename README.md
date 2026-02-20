# ClosedPaw Website

🐾 Official website for [ClosedPaw](https://github.com/closedpaw/closedpaw) — Zero-Trust AI Assistant with Hardened Sandboxing.

## 🌐 Live Site

**URL:** https://closedpaw.github.io

## 📋 Purpose

This repository contains the source code for the ClosedPaw official website. The site serves as:

- **Landing Page** — Introduction to ClosedPaw features and capabilities
- **Documentation Portal** — Built-in docs with multi-language support (EN/RU/ZH)
- **Installation Guide** — Quick start instructions for npm and Docker
- **Security Overview** — Threat model and defense-in-depth architecture

## 🛠️ Tech Stack

- **React 19** — UI framework
- **Vite 6** — Build tool
- **Tailwind CSS** — Styling
- **TypeScript** — Type safety
- **Lucide React** — Icons
- **GitHub Pages** — Hosting

## 🚀 Features

| Feature | Description |
|---------|-------------|
| 🌓 Dark/Light Theme | Automatic system detection + manual toggle |
| 🌍 Multi-language | English, Русский, 中文 |
| 📱 Responsive | Mobile-first design |
| 📚 Documentation | Built-in docs with sidebar navigation |
| ⚡ Fast | Static site, no server required |
| 🔒 Secure | No cookies, no tracking, no external scripts |

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
closedpaw.github.io/
├── src/
│   ├── App.tsx          # Main component with routing
│   ├── main.tsx         # Entry point
│   ├── index.css        # Global styles
│   └── vite-env.d.ts    # TypeScript declarations
├── public/
│   └── favicon.svg      # Site icon
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## 🚢 Deployment

The site automatically deploys to GitHub Pages via GitHub Actions when pushing to the `main` branch.

**Workflow:** `.github/workflows/deploy.yml`

## 🔗 Related Links

- **Main Repository:** https://github.com/closedpaw/closedpaw
- **Docker Image:** https://github.com/closedpaw/closedpaw/pkgs/container/closedpaw
- **Full Documentation:** https://github.com/closedpaw/closedpaw/tree/main/.qoder/repowiki/en/content

## 📄 License

MIT License — see [LICENSE](https://github.com/closedpaw/closedpaw/blob/main/LICENSE)
