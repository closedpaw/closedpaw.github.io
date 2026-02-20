import { useState, useEffect, createContext, useContext } from 'react'
import { Shield, Lock, Server, Cpu, Github, Package, BookOpen, ChevronRight, Terminal, CheckCircle, AlertTriangle, Container, Sun, Moon, Globe } from 'lucide-react'

// Types
type Language = 'en' | 'ru' | 'zh'
type Theme = 'dark' | 'light'

// Translations
const translations = {
  en: {
    nav: { features: 'Features', security: 'Security', install: 'Install', docs: 'Docs' },
    hero: {
      badge: 'Zero-Trust Architecture',
      title1: 'Secure AI',
      title2: 'That Respects Your Privacy',
      description: 'ClosedPaw is a privacy-focused AI assistant that runs entirely on your local machine. Your data never leaves your device. Built with security-first architecture using gVisor/Kata Containers for true isolation.',
      getStarted: 'Get Started',
      documentation: 'Documentation'
    },
    stats: {
      local: 'Local',
      securityLayers: 'Security Layers',
      packageSize: 'Package Size',
      license: 'License'
    },
    features: {
      title: 'Why Choose',
      subtitle: 'Unlike cloud-based AI solutions, ClosedPaw keeps everything on your machine. No data collection, no tracking, no third-party access.',
      zeroTrust: { title: 'Zero-Trust Architecture', description: 'No implicit trust. Every action is verified through multiple security layers. Defense in depth protects you even if one layer fails.' },
      promptInjection: { title: 'Prompt Injection Defense', description: 'Protection against CVE-2026-25253 type attacks with multi-layer pattern detection and input sanitization.' },
      sandboxing: { title: 'Hardened Sandboxing', description: 'True kernel-level isolation with gVisor and Kata Containers. Not just Docker - real security boundaries.' },
      localLLM: { title: 'Local LLM Support', description: 'Works with Ollama for completely offline operation. Your conversations never leave your machine.' },
      hitl: { title: 'Human-in-the-Loop', description: 'Critical actions require your explicit approval. You stay in control of what the AI can do.' },
      audit: { title: 'Audit Logging', description: 'All actions logged for forensic analysis. Know exactly what happened and when.' }
    },
    security: {
      title1: 'Security Reality',
      title2: 'Check',
      subtitle: 'No system is 100% secure. We don\'t claim perfection — we claim maximum feasible protection.',
      tableHeaders: { threat: 'Threat', protection: 'Protection', notes: 'Notes' },
      threats: {
        promptInjection: { name: 'Prompt Injection', note: 'Multiple defense layers, input sanitization' },
        codeExecution: { name: 'Code Execution', note: 'gVisor sandbox, seccomp filters' },
        dataExfiltration: { name: 'Data Exfiltration', note: 'Local-only, encrypted storage' },
        networkAttacks: { name: 'Network Attacks', note: '127.0.0.1 binding, no external exposure' },
        supplyChain: { name: 'Supply Chain', note: 'Signed packages, dependency scanning' },
        physicalAccess: { name: 'Physical Access', note: 'OS-level encryption recommended' }
      },
      defenseDepth: 'Defense in Depth',
      layers: ['Input Validation', 'Prompt Filters', 'Sandboxed Execution', 'HITL Approval', 'Audit Logging', 'Encrypted Storage']
    },
    install: {
      title1: 'Quick',
      title2: 'Installation',
      subtitle: 'Get started with ClosedPaw in seconds. Choose your preferred installation method.',
      npm: { title: 'npm (Recommended)', command: 'npm install -g closedpaw', description: 'Cross-platform installation via npm' },
      docker: { title: 'Docker', command: 'docker pull ghcr.io/closedpaw/closedpaw:latest', description: 'Pre-built image from GitHub Container Registry' },
      requirements: 'System Requirements',
      python: 'Python 3.11+',
      nodejs: 'Node.js 20+',
      ollama: 'Ollama (for local LLM)',
      gvisor: 'gVisor/Kata (for sandboxing)'
    },
    footer: {
      wiki: 'Wiki',
      docker: 'Docker',
      madeBy: 'Made with 🔒 by ClosedPaw Team'
    }
  },
  ru: {
    nav: { features: 'Возможности', security: 'Безопасность', install: 'Установка', docs: 'Документация' },
    hero: {
      badge: 'Zero-Trust Архитектура',
      title1: 'Безопасный ИИ',
      title2: 'Уважающий Вашу Приватность',
      description: 'ClosedPaw — это AI-ассистент, ориентированный на приватность, который работает полностью на вашем локальном компьютере. Ваши данные никогда не покидают устройство. Построен на архитектуре security-first с использованием gVisor/Kata Containers для настоящей изоляции.',
      getStarted: 'Начать',
      documentation: 'Документация'
    },
    stats: {
      local: 'Локально',
      securityLayers: 'Слоёв Защиты',
      packageSize: 'Размер Пакета',
      license: 'Лицензия'
    },
    features: {
      title: 'Почему Выбирают',
      subtitle: 'В отличие от облачных AI-решений, ClosedPaw хранит всё на вашем устройстве. Без сбора данных, без отслеживания, без стороннего доступа.',
      zeroTrust: { title: 'Zero-Trust Архитектура', description: 'Никакого неявного доверия. Каждое действие проверяется через множество слоёв безопасности.' },
      promptInjection: { title: 'Защита от Prompt Injection', description: 'Защита от атак типа CVE-2026-25253 с многослойным обнаружением паттернов и санитизацией ввода.' },
      sandboxing: { title: 'Усиленная Песочница', description: 'Настоящая изоляция на уровне ядра с gVisor и Kata Containers. Реальные границы безопасности.' },
      localLLM: { title: 'Поддержка Локальных LLM', description: 'Работает с Ollama для полностью офлайн-режима. Ваши разговоры не покидают устройство.' },
      hitl: { title: 'Человек-в-Цикле', description: 'Критические действия требуют вашего явного одобрения. Вы контролируете, что может делать ИИ.' },
      audit: { title: 'Аудит Логирования', description: 'Все действия записываются для судебного анализа. Точно знаете, что произошло и когда.' }
    },
    security: {
      title1: 'Реальность',
      title2: 'Безопасности',
      subtitle: 'Никакая система не на 100% безопасна. Мы не заявляем совершенство — мы заявляем максимально возможную защиту.',
      tableHeaders: { threat: 'Угроза', protection: 'Защита', notes: 'Примечания' },
      threats: {
        promptInjection: { name: 'Prompt Injection', note: 'Множество слоёв защиты, санитизация ввода' },
        codeExecution: { name: 'Выполнение Кода', note: 'Песочница gVisor, seccomp фильтры' },
        dataExfiltration: { name: 'Эксфильтрация Данных', note: 'Только локально, шифрование' },
        networkAttacks: { name: 'Сетевые Атаки', note: 'Привязка 127.0.0.1, без внешнего доступа' },
        supplyChain: { name: 'Цепочка Поставок', note: 'Подписанные пакеты, сканирование зависимостей' },
        physicalAccess: { name: 'Физический Доступ', note: 'Рекомендуется шифрование ОС' }
      },
      defenseDepth: 'Защита в Глубину',
      layers: ['Валидация Ввода', 'Фильтры Промптов', 'Песочница', 'HITL Одобрение', 'Аудит Логов', 'Шифрование']
    },
    install: {
      title1: 'Быстрая',
      title2: 'Установка',
      subtitle: 'Начните работу с ClosedPaw за секунды. Выберите предпочтительный метод установки.',
      npm: { title: 'npm (Рекомендуется)', command: 'npm install -g closedpaw', description: 'Кроссплатформенная установка через npm' },
      docker: { title: 'Docker', command: 'docker pull ghcr.io/closedpaw/closedpaw:latest', description: 'Готовый образ из GitHub Container Registry' },
      requirements: 'Системные Требования',
      python: 'Python 3.11+',
      nodejs: 'Node.js 20+',
      ollama: 'Ollama (для локального LLM)',
      gvisor: 'gVisor/Kata (для песочницы)'
    },
    footer: {
      wiki: 'Wiki',
      docker: 'Docker',
      madeBy: 'Создано с 🔒 командой ClosedPaw'
    }
  },
  zh: {
    nav: { features: '功能', security: '安全', install: '安装', docs: '文档' },
    hero: {
      badge: '零信任架构',
      title1: '安全的 AI',
      title2: '尊重您的隐私',
      description: 'ClosedPaw 是一款注重隐私的 AI 助手，完全在您的本地计算机上运行。您的数据永远不会离开您的设备。采用安全优先架构构建，使用 gVisor/Kata Containers 实现真正的隔离。',
      getStarted: '开始使用',
      documentation: '文档'
    },
    stats: {
      local: '本地运行',
      securityLayers: '安全层级',
      packageSize: '包大小',
      license: '许可证'
    },
    features: {
      title: '为什么选择',
      subtitle: '与云端 AI 解决方案不同，ClosedPaw 将所有内容保留在您的设备上。无数据收集，无跟踪，无第三方访问。',
      zeroTrust: { title: '零信任架构', description: '无隐式信任。每个操作都通过多层安全验证。纵深保护即使一层失败也能保护您。' },
      promptInjection: { title: '提示注入防御', description: '通过多层模式检测和输入清理防御 CVE-2026-25253 类型攻击。' },
      sandboxing: { title: '强化沙箱', description: '使用 gVisor 和 Kata Containers 实现真正的内核级隔离。真正的安全边界。' },
      localLLM: { title: '本地 LLM 支持', description: '与 Ollama 配合实现完全离线操作。您的对话不会离开您的设备。' },
      hitl: { title: '人在回路', description: '关键操作需要您的明确批准。您掌控 AI 能做什么。' },
      audit: { title: '审计日志', description: '所有操作记录用于取证分析。确切了解发生了什么以及何时发生。' }
    },
    security: {
      title1: '安全现实',
      title2: '核查',
      subtitle: '没有系统是 100% 安全的。我们不声称完美 — 我们声明最大可行保护。',
      tableHeaders: { threat: '威胁', protection: '防护', notes: '备注' },
      threats: {
        promptInjection: { name: '提示注入', note: '多层防御，输入清理' },
        codeExecution: { name: '代码执行', note: 'gVisor 沙箱，seccomp 过滤器' },
        dataExfiltration: { name: '数据渗出', note: '仅本地，加密存储' },
        networkAttacks: { name: '网络攻击', note: '127.0.0.1 绑定，无外部暴露' },
        supplyChain: { name: '供应链', note: '签名包，依赖扫描' },
        physicalAccess: { name: '物理访问', note: '建议操作系统级加密' }
      },
      defenseDepth: '纵深防御',
      layers: ['输入验证', '提示过滤', '沙箱执行', 'HITL 批准', '审计日志', '加密存储']
    },
    install: {
      title1: '快速',
      title2: '安装',
      subtitle: '几秒钟内开始使用 ClosedPaw。选择您喜欢的安装方式。',
      npm: { title: 'npm（推荐）', command: 'npm install -g closedpaw', description: '通过 npm 跨平台安装' },
      docker: { title: 'Docker', command: 'docker pull ghcr.io/closedpaw/closedpaw:latest', description: 'GitHub Container Registry 预构建镜像' },
      requirements: '系统要求',
      python: 'Python 3.11+',
      nodejs: 'Node.js 20+',
      ollama: 'Ollama（用于本地 LLM）',
      gvisor: 'gVisor/Kata（用于沙箱）'
    },
    footer: {
      wiki: 'Wiki',
      docker: 'Docker',
      madeBy: '由 ClosedPaw 团队用 🔒 制作'
    }
  }
}

// Context
const AppContext = createContext<{
  theme: Theme
  language: Language
  t: typeof translations.en
  toggleTheme: () => void
  setLanguage: (lang: Language) => void
}>({
  theme: 'dark',
  language: 'en',
  t: translations.en,
  toggleTheme: () => {},
  setLanguage: () => {}
})

// Language names for display
const languageNames: Record<Language, string> = { en: 'EN', ru: 'RU', zh: '中文' }

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('theme') as Theme) || 
        (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    }
    return 'dark'
  })
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('language') as Language) || 'en'
    }
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = translations[language]

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  const handleSetLanguage = (lang: Language) => setLanguage(lang)

  return (
    <AppContext.Provider value={{ theme, language, t, toggleTheme, setLanguage: handleSetLanguage }}>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-950' : 'bg-gray-50'}`}>
        {/* Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-dark-950/80' : 'bg-white/80'} backdrop-blur-lg border-b ${theme === 'dark' ? 'border-dark-800' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐾</span>
                <span className={`text-xl font-bold ${theme === 'dark' ? 'gradient-text' : 'text-primary-600'}`}>ClosedPaw</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className={`${theme === 'dark' ? 'text-dark-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>{t.nav.features}</a>
                <a href="#security" className={`${theme === 'dark' ? 'text-dark-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>{t.nav.security}</a>
                <a href="#install" className={`${theme === 'dark' ? 'text-dark-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>{t.nav.install}</a>
                <a href="https://github.com/closedpaw/closedpaw/tree/main/.qoder/repowiki/en/content" className={`${theme === 'dark' ? 'text-dark-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>{t.nav.docs}</a>
              </div>
              <div className="flex items-center gap-3">
                {/* Language Selector */}
                <div className="relative group">
                  <button className={`flex items-center gap-1 px-2 py-1 rounded-lg ${theme === 'dark' ? 'hover:bg-dark-800' : 'hover:bg-gray-100'} transition-colors`}>
                    <Globe size={18} className={theme === 'dark' ? 'text-dark-300' : 'text-gray-600'} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{languageNames[language]}</span>
                  </button>
                  <div className={`absolute right-0 top-full mt-1 py-1 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ${theme === 'dark' ? 'bg-dark-800 border border-dark-700' : 'bg-white border border-gray-200'}`}>
                    {(['en', 'ru', 'zh'] as Language[]).map(lang => (
                      <button
                        key={lang}
                        onClick={() => handleSetLanguage(lang)}
                        className={`block w-full text-left px-4 py-2 text-sm ${language === lang ? (theme === 'dark' ? 'text-primary-400' : 'text-primary-600') : (theme === 'dark' ? 'text-dark-300' : 'text-gray-600')} ${theme === 'dark' ? 'hover:bg-dark-700' : 'hover:bg-gray-100'}`}
                      >
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-dark-800 text-dark-300' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                {/* GitHub Link */}
                <a
                  href="https://github.com/closedpaw/closedpaw"
                  className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors text-white"
                >
                  <Github size={18} />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 ${theme === 'dark' ? 'bg-dark-800' : 'bg-gray-100'} rounded-full mb-8`}>
              <Lock size={16} className="text-primary-400" />
              <span className={`text-sm ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{t.hero.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className={theme === 'dark' ? 'gradient-text' : 'text-primary-600'}>{t.hero.title1}</span>
              <br />
              <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>{t.hero.title2}</span>
            </h1>
            
            <p className={`text-xl ${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} max-w-3xl mx-auto mb-10`}>
              {t.hero.description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#install"
                className="flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 rounded-xl font-semibold transition-all hover:scale-105 text-white glow"
              >
                <Terminal size={20} />
                {t.hero.getStarted}
              </a>
              <a
                href="https://github.com/closedpaw/closedpaw/tree/main/.qoder/repowiki/en/content"
                className={`flex items-center gap-2 px-8 py-4 ${theme === 'dark' ? 'bg-dark-800 hover:bg-dark-700 border-dark-600' : 'bg-white hover:bg-gray-50 border-gray-200'} rounded-xl font-semibold transition-colors border`}
              >
                <BookOpen size={20} />
                {t.hero.documentation}
              </a>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t ${theme === 'dark' ? 'border-dark-800' : 'border-gray-200'}`}>
              <div>
                <div className="text-3xl font-bold text-primary-400">100%</div>
                <div className={theme === 'dark' ? 'text-dark-400' : 'text-gray-600'}>{t.stats.local}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-400">6</div>
                <div className={theme === 'dark' ? 'text-dark-400' : 'text-gray-600'}>{t.stats.securityLayers}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-400">112MB</div>
                <div className={theme === 'dark' ? 'text-dark-400' : 'text-gray-600'}>{t.stats.packageSize}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-400">MIT</div>
                <div className={theme === 'dark' ? 'text-dark-400' : 'text-gray-600'}>{t.stats.license}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className={`py-20 px-4 ${theme === 'dark' ? 'bg-dark-900' : 'bg-gray-100'}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {t.features.title} <span className={theme === 'dark' ? 'gradient-text' : 'text-primary-600'}>ClosedPaw</span>?
            </h2>
            <p className={`${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} text-center mb-16 max-w-2xl mx-auto`}>
              {t.features.subtitle}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard icon={<Shield className="text-primary-400" size={32} />} title={t.features.zeroTrust.title} description={t.features.zeroTrust.description} theme={theme} />
              <FeatureCard icon={<Lock className="text-primary-400" size={32} />} title={t.features.promptInjection.title} description={t.features.promptInjection.description} theme={theme} />
              <FeatureCard icon={<Server className="text-primary-400" size={32} />} title={t.features.sandboxing.title} description={t.features.sandboxing.description} theme={theme} />
              <FeatureCard icon={<Cpu className="text-primary-400" size={32} />} title={t.features.localLLM.title} description={t.features.localLLM.description} theme={theme} />
              <FeatureCard icon={<AlertTriangle className="text-primary-400" size={32} />} title={t.features.hitl.title} description={t.features.hitl.description} theme={theme} />
              <FeatureCard icon={<CheckCircle className="text-primary-400" size={32} />} title={t.features.audit.title} description={t.features.audit.description} theme={theme} />
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section id="security" className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className={theme === 'dark' ? 'gradient-text' : 'text-primary-600'}>{t.security.title1}</span> {t.security.title2}
            </h2>
            <p className={`${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} text-center mb-16 max-w-2xl mx-auto`}>
              {t.security.subtitle}
            </p>

            <div className={`${theme === 'dark' ? 'bg-dark-900 border-dark-800' : 'bg-white border-gray-200'} rounded-2xl p-8 border`}>
              <table className="w-full">
                <thead>
                  <tr className={`border-b ${theme === 'dark' ? 'border-dark-700' : 'border-gray-200'}`}>
                    <th className={`text-left py-4 px-4 ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{t.security.tableHeaders.threat}</th>
                    <th className={`text-left py-4 px-4 ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{t.security.tableHeaders.protection}</th>
                    <th className={`text-left py-4 px-4 ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'} hidden md:table-cell`}>{t.security.tableHeaders.notes}</th>
                  </tr>
                </thead>
                <tbody>
                  <ThreatRow threat={t.security.threats.promptInjection.name} level="high" note={t.security.threats.promptInjection.note} theme={theme} />
                  <ThreatRow threat={t.security.threats.codeExecution.name} level="high" note={t.security.threats.codeExecution.note} theme={theme} />
                  <ThreatRow threat={t.security.threats.dataExfiltration.name} level="high" note={t.security.threats.dataExfiltration.note} theme={theme} />
                  <ThreatRow threat={t.security.threats.networkAttacks.name} level="high" note={t.security.threats.networkAttacks.note} theme={theme} />
                  <ThreatRow threat={t.security.threats.supplyChain.name} level="medium" note={t.security.threats.supplyChain.note} theme={theme} />
                  <ThreatRow threat={t.security.threats.physicalAccess.name} level="low" note={t.security.threats.physicalAccess.note} theme={theme} />
                </tbody>
              </table>
            </div>

            {/* Defense in Depth */}
            <div className="mt-16">
              <h3 className={`text-2xl font-bold text-center mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.security.defenseDepth}</h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                {t.security.layers.map((layer, i) => (
                  <div key={layer} className="flex items-center">
                    <div className={`px-4 py-2 ${theme === 'dark' ? 'bg-dark-800 border-primary-500/30' : 'bg-white border-primary-500/50'} border rounded-lg text-center`}>
                      <div className={`text-xs ${theme === 'dark' ? 'text-dark-400' : 'text-gray-500'}`}>Layer {i + 1}</div>
                      <div className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{layer}</div>
                    </div>
                    {i < 5 && <ChevronRight className={`hidden md:block ${theme === 'dark' ? 'text-dark-600' : 'text-gray-400'} mx-2`} size={20} />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Installation Section */}
        <section id="install" className={`py-20 px-4 ${theme === 'dark' ? 'bg-dark-900' : 'bg-gray-100'}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {t.install.title1} <span className={theme === 'dark' ? 'gradient-text' : 'text-primary-600'}>{t.install.title2}</span>
            </h2>
            <p className={`${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} text-center mb-16 max-w-2xl mx-auto`}>
              {t.install.subtitle}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <InstallCard icon={<Package className="text-primary-400" size={24} />} title={t.install.npm.title} command={t.install.npm.command} description={t.install.npm.description} theme={theme} />
              <InstallCard icon={<Container className="text-primary-400" size={24} />} title={t.install.docker.title} command={t.install.docker.command} description={t.install.docker.description} theme={theme} />
            </div>

            <div className={`mt-8 p-6 ${theme === 'dark' ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} rounded-xl border`}>
              <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.install.requirements}</h4>
              <div className={`grid sm:grid-cols-2 gap-4 ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  {t.install.python}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  {t.install.nodejs}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  {t.install.ollama}
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  {t.install.gvisor}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`py-12 px-4 border-t ${theme === 'dark' ? 'border-dark-800' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐾</span>
                <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>ClosedPaw</span>
              </div>
              
              <div className={`flex items-center gap-6 ${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'}`}>
                <a href="https://github.com/closedpaw/closedpaw" className={`hover:text-white transition-colors flex items-center gap-1 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                  <Github size={18} />
                  GitHub
                </a>
                <a href="https://github.com/closedpaw/closedpaw/tree/main/.qoder/repowiki/en/content" className={`hover:text-white transition-colors flex items-center gap-1 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                  <BookOpen size={18} />
                  {t.footer.wiki}
                </a>
                <a href="https://github.com/closedpaw/closedpaw/pkgs/container/closedpaw" className={`hover:text-white transition-colors flex items-center gap-1 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}>
                  <Package size={18} />
                  {t.footer.docker}
                </a>
              </div>
              
              <div className={`${theme === 'dark' ? 'text-dark-500' : 'text-gray-500'} text-sm`}>
                {t.footer.madeBy}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </AppContext.Provider>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description, theme }: { icon: React.ReactNode; title: string; description: string; theme: Theme }) {
  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} rounded-xl border hover:border-primary-500/30 transition-colors`}>
      <div className="mb-4">{icon}</div>
      <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} text-sm`}>{description}</p>
    </div>
  )
}

// Threat Row Component
function ThreatRow({ threat, level, note, theme }: { threat: string; level: 'high' | 'medium' | 'low'; note: string; theme: Theme }) {
  const levelColors = {
    high: 'text-green-400 bg-green-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    low: 'text-red-400 bg-red-400/10',
  }
  const levelIcons = { high: '✅', medium: '⚠️', low: '❌' }
  const levelLabels = { high: 'High', medium: 'Medium', low: 'Low' }
  
  return (
    <tr className={`border-b ${theme === 'dark' ? 'border-dark-800 hover:bg-dark-800/50' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
      <td className={`py-4 px-4 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{threat}</td>
      <td className="py-4 px-4">
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${levelColors[level]}`}>
          {levelIcons[level]} {levelLabels[level]}
        </span>
      </td>
      <td className={`py-4 px-4 ${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} hidden md:table-cell`}>{note}</td>
    </tr>
  )
}

// Install Card Component
function InstallCard({ icon, title, command, description, theme }: { icon: React.ReactNode; title: string; command: string; description: string; theme: Theme }) {
  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} rounded-xl border hover:border-primary-500/30 transition-colors`}>
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      </div>
      <div className={`code-block mb-4 ${theme === 'dark' ? 'bg-dark-900' : 'bg-gray-100'} p-3 rounded-lg`}>
        <code className="text-primary-400 font-mono text-sm">{command}</code>
      </div>
      <p className={`${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} text-sm`}>{description}</p>
    </div>
  )
}

export default App
