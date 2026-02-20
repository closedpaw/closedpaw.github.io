import { useState, useEffect } from 'react'
import { Shield, Lock, Server, Cpu, Github, Package, BookOpen, ChevronRight, Terminal, CheckCircle, AlertTriangle, Container, Sun, Moon, Globe, Menu, X, ExternalLink, FileText, Zap, Settings, Bug } from 'lucide-react'

// Types
type Language = 'en' | 'ru' | 'zh'
type Theme = 'dark' | 'light'
type Page = 'home' | 'docs'

// Translations
const translations = {
  en: {
    nav: { features: 'Features', security: 'Security', install: 'Install', docs: 'Documentation', home: 'Home' },
    hero: {
      badge: 'Zero-Trust Architecture',
      title1: 'Secure AI',
      title2: 'That Respects Your Privacy',
      description: 'ClosedPaw is a privacy-focused AI assistant that runs entirely on your local machine. Your data never leaves your device. Built with security-first architecture using gVisor/Kata Containers for true isolation.',
      getStarted: 'Get Started',
      documentation: 'Documentation'
    },
    stats: { local: 'Local', securityLayers: 'Security Layers', packageSize: 'Package Size', license: 'License' },
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
    footer: { wiki: 'Wiki', docker: 'Docker', madeBy: 'Made with 🔒 by ClosedPaw Team' },
    docs: {
      title: 'Documentation',
      subtitle: 'Comprehensive guides, API references, and security deep-dives',
      search: 'Search documentation...',
      categories: {
        gettingStarted: 'Getting Started',
        security: 'Security Architecture',
        core: 'Core Components',
        api: 'API Reference',
        advanced: 'Advanced Topics',
        troubleshooting: 'Troubleshooting'
      },
      pages: {
        gettingStarted: { title: 'Getting Started', description: 'Quick start guide and installation instructions' },
        devSetup: { title: 'Development Environment', description: 'Set up your development environment' },
        securityArch: { title: 'Security Architecture', description: 'Overview of security design and principles' },
        zeroTrust: { title: 'Zero-Trust Principles', description: 'Never trust, always verify philosophy' },
        sandboxing: { title: 'Hardened Sandboxing', description: 'gVisor and Kata Containers isolation' },
        hitl: { title: 'Human-in-the-Loop', description: 'Approval workflows for critical actions' },
        audit: { title: 'Audit & Compliance', description: 'Logging and forensic capabilities' },
        threatModel: { title: 'Threat Model', description: 'Security considerations and threat analysis' },
        orchestrator: { title: 'Orchestrator', description: 'Action coordination and execution' },
        agentManager: { title: 'Agent Manager', description: 'Sandboxed agent lifecycle management' },
        securityModule: { title: 'Security Module', description: 'Prompt injection defense and validation' },
        channels: { title: 'Channels', description: 'Communication channel integrations' },
        providers: { title: 'Providers', description: 'LLM provider configurations' },
        restApi: { title: 'REST API', description: 'HTTP endpoint reference' },
        cliRef: { title: 'CLI Reference', description: 'Command-line interface documentation' },
        config: { title: 'Configuration', description: 'Configuration management and options' },
        deployment: { title: 'Deployment', description: 'Production deployment guides' },
        skills: { title: 'Skills System', description: 'Extending ClosedPaw with skills' },
        troubleshooting: { title: 'Troubleshooting & FAQ', description: 'Common issues and solutions' },
        appendix: { title: 'Appendix', description: 'Additional reference material' }
      },
      content: {
        gettingStarted: {
          en: `# Getting Started

## Quick Installation

ClosedPaw can be installed in seconds using npm:

\`\`\`bash
npm install -g closedpaw
\`\`\`

Or using Docker:

\`\`\`bash
docker pull ghcr.io/closedpaw/closedpaw:latest
\`\`\`

## Prerequisites

- **Python 3.11+** - Required for the backend
- **Node.js 20+** - Required for the CLI
- **Ollama** - For local LLM support (optional)
- **gVisor/Kata** - For hardened sandboxing (recommended)

## First Run

After installation, start ClosedPaw:

\`\`\`bash
closedpaw start
\`\`\`

The web interface will be available at \`http://localhost:3000\`.

## Architecture Overview

ClosedPaw uses a layered architecture:

1. **Frontend** - Next.js web application
2. **Backend** - FastAPI Python server
3. **Agent Manager** - Sandboxed agent execution
4. **Security Layer** - Input validation and audit logging
5. **LLM Interface** - Ollama integration for local models`,
          ru: `# Начало работы

## Быстрая установка

ClosedPaw можно установить за секунды через npm:

\`\`\`bash
npm install -g closedpaw
\`\`\`

Или через Docker:

\`\`\`bash
docker pull ghcr.io/closedpaw/closedpaw:latest
\`\`\`

## Требования

- **Python 3.11+** — для бэкенда
- **Node.js 20+** — для CLI
- **Ollama** — для локальных LLM (опционально)
- **gVisor/Kata** — для усиленной песочницы (рекомендуется)

## Первый запуск

После установки запустите ClosedPaw:

\`\`\`bash
closedpaw start
\`\`\`

Веб-интерфейс будет доступен по адресу \`http://localhost:3000\`.`,
          zh: `# 入门指南

## 快速安装

使用 npm 可以在几秒钟内安装 ClosedPaw：

\`\`\`bash
npm install -g closedpaw
\`\`\`

或使用 Docker：

\`\`\`bash
docker pull ghcr.io/closedpaw/closedpaw:latest
\`\`\`

## 系统要求

- **Python 3.11+** - 后端所需
- **Node.js 20+** - CLI 所需
- **Ollama** - 本地 LLM 支持（可选）
- **gVisor/Kata** - 强化沙箱（推荐）`
        },
        securityArch: {
          en: `# Security Architecture

## Overview

ClosedPaw implements a **zero-trust security model** with defense in depth. Every component assumes it operates in a hostile environment.

## Security Layers

### Layer 1: Input Validation
All user inputs are validated against a strict schema. Malformed inputs are rejected before processing.

### Layer 2: Prompt Injection Defense
Multi-pattern detection identifies and blocks:
- Role manipulation attempts
- Instruction override attacks
- Data exfiltration patterns
- Jailbreak attempts

### Layer 3: Sandboxed Execution
Agents run in isolated environments:
- **gVisor** - User-space kernel for container isolation
- **Kata Containers** - Lightweight VM-based isolation
- **seccomp filters** - Syscall restriction

### Layer 4: Human-in-the-Loop (HITL)
Critical actions require explicit user approval:
- File system modifications
- Network requests
- System commands
- Configuration changes

### Layer 5: Audit Logging
All actions are logged with:
- Timestamp and session ID
- Action type and parameters
- User approval status
- Execution result

### Layer 6: Encrypted Storage
Sensitive data is encrypted at rest using:
- AES-256-GCM for data encryption
- Secure key derivation (PBKDF2)
- Protected memory regions`,
          ru: `# Архитектура Безопасности

## Обзор

ClosedPaw реализует **модель безопасности нулевого доверия** с защитой в глубину.

## Уровни Защиты

### Уровень 1: Валидация Ввода
Все пользовательские вводы проверяются по строгой схеме.

### Уровень 2: Защита от Prompt Injection
Мультипаттернное обнаружение блокирует:
- Попытки манипуляции ролью
- Атаки переопределения инструкций
- Паттерны эксфильтрации данных

### Уровень 3: Изолированное Выполнение
Агенты работают в изолированных средах:
- **gVisor** — пространство ядра
- **Kata Containers** — изоляция на базе VM`,
          zh: `# 安全架构

## 概述

ClosedPaw 实现了**零信任安全模型**和纵深防御。

## 安全层级

### 第 1 层：输入验证
所有用户输入都按照严格模式进行验证。

### 第 2 层：提示注入防御
多模式检测识别并阻止：
- 角色操纵尝试
- 指令覆盖攻击
- 数据渗出模式

### 第 3 层：沙箱执行
代理在隔离环境中运行：
- **gVisor** - 用户空间内核
- **Kata Containers** - 轻量级虚拟机`
        },
        zeroTrust: {
          en: `# Zero-Trust Principles

## Core Philosophy

**Never trust, always verify.** Every component, user, and system must authenticate and authorize every action.

## Key Principles

### 1. Verify Explicitly
- Authenticate every request
- Validate all inputs
- Check permissions for each action

### 2. Least Privilege Access
- Agents run with minimal permissions
- Actions are scoped to specific resources
- Time-limited access tokens

### 3. Assume Breach
- Every input is potentially malicious
- All systems are compromised by default
- Defense in depth is mandatory

## Implementation

\`\`\`python
# Every action goes through validation
async def execute_action(action: Action):
    # Step 1: Validate input schema
    validated = validate_schema(action)
    
    # Step 2: Check for prompt injection
    if detect_injection(action.prompt):
        raise SecurityError("Potential injection detected")
    
    # Step 3: Request user approval for critical actions
    if is_critical(action):
        approved = await request_approval(action)
        if not approved:
            raise ApprovalDenied()
    
    # Step 4: Execute in sandbox
    result = await sandboxed_execute(action)
    
    # Step 5: Log everything
    audit_log.record(action, result)
    
    return result
\`\`\``,
          ru: `# Принципы Zero-Trust

## Основная Философия

**Никогда не доверяй, всегда проверяй.** Каждый компонент, пользователь и система должны аутентифицировать и авторизовать каждое действие.

## Ключевые Принципы

### 1. Явная Проверка
- Аутентификация каждого запроса
- Валидация всех вводов
- Проверка прав для каждого действия

### 2. Минимальные Привилегии
- Агенты работают с минимальными правами
- Действия ограничены конкретными ресурсами
- Ограниченные по времени токены доступа`,
          zh: `# 零信任原则

## 核心理念

**永不信任，始终验证。** 每个组件、用户和系统都必须对每个操作进行身份验证和授权。

## 关键原则

### 1. 显式验证
- 验证每个请求
- 验证所有输入
- 检查每个操作的权限

### 2. 最小权限访问
- 代理以最小权限运行
- 操作范围限定为特定资源`
        },
        troubleshooting: {
          en: `# Troubleshooting & FAQ

## Common Issues

### Installation Fails

**Problem:** npm install fails with permission errors

**Solution:**
\`\`\`bash
# Linux/macOS
sudo npm install -g closedpaw

# Or use a Node version manager (recommended)
nvm install 20
nvm use 20
npm install -g closedpaw
\`\`\`

### Python Not Found

**Problem:** "Python 3.11+ required" error

**Solution:**
\`\`\`bash
# Check Python version
python --version

# Install Python 3.11+
# Ubuntu/Debian
sudo apt install python3.11

# macOS
brew install python@3.11

# Windows: Download from python.org
\`\`\`

### Ollama Connection Failed

**Problem:** Cannot connect to Ollama

**Solution:**
\`\`\`bash
# Ensure Ollama is running
ollama serve

# Check if Ollama is accessible
curl http://localhost:11434/api/tags
\`\`\`

### Sandbox Permission Denied

**Problem:** Sandbox execution fails

**Solution:**
\`\`\`bash
# Ensure gVisor is installed
runsc --version

# Or use Kata Containers
kata-runtime --version
\`\`\`

## FAQ

**Q: Is ClosedPaw completely offline?**
A: Yes, when configured with Ollama, ClosedPaw runs 100% offline.

**Q: Can I use OpenAI/Anthropic APIs?**
A: Yes, ClosedPaw supports multiple LLM providers including cloud APIs.

**Q: How do I update ClosedPaw?**
A: \`npm update -g closedpaw\` or \`docker pull ghcr.io/closedpaw/closedpaw:latest\``,
          ru: `# Устранение Неполадок и FAQ

## Частые Проблемы

### Ошибка Установки

**Проблема:** npm install падает с ошибкой прав

**Решение:**
\`\`\`bash
# Linux/macOS
sudo npm install -g closedpaw

# Или используйте nvm (рекомендуется)
nvm install 20
nvm use 20
npm install -g closedpaw
\`\`\`

### Python Не Найден

**Проблема:** Ошибка "Python 3.11+ required"

**Решение:**
\`\`\`bash
# Проверьте версию Python
python --version

# Установите Python 3.11+
# Ubuntu/Debian
sudo apt install python3.11
\`\`\``,
          zh: `# 故障排除和常见问题

## 常见问题

### 安装失败

**问题：** npm install 因权限错误失败

**解决方案：**
\`\`\`bash
# Linux/macOS
sudo npm install -g closedpaw

# 或使用 Node 版本管理器（推荐）
nvm install 20
nvm use 20
npm install -g closedpaw
\`\`\``
        }
      }
    }
  },
  ru: {
    nav: { features: 'Возможности', security: 'Безопасность', install: 'Установка', docs: 'Документация', home: 'Главная' },
    hero: {
      badge: 'Zero-Trust Архитектура',
      title1: 'Безопасный ИИ',
      title2: 'Уважающий Вашу Приватность',
      description: 'ClosedPaw — это AI-ассистент, ориентированный на приватность, который работает полностью на вашем локальном компьютере.',
      getStarted: 'Начать',
      documentation: 'Документация'
    },
    stats: { local: 'Локально', securityLayers: 'Слоёв Защиты', packageSize: 'Размер Пакета', license: 'Лицензия' },
    features: {
      title: 'Почему Выбирают',
      subtitle: 'В отличие от облачных AI-решений, ClosedPaw хранит всё на вашем устройстве.',
      zeroTrust: { title: 'Zero-Trust Архитектура', description: 'Никакого неявного доверия. Каждое действие проверяется через множество слоёв безопасности.' },
      promptInjection: { title: 'Защита от Prompt Injection', description: 'Защита от атак типа CVE-2026-25253 с многослойным обнаружением паттернов.' },
      sandboxing: { title: 'Усиленная Песочница', description: 'Настоящая изоляция на уровне ядра с gVisor и Kata Containers.' },
      localLLM: { title: 'Поддержка Локальных LLM', description: 'Работает с Ollama для полностью офлайн-режима.' },
      hitl: { title: 'Человек-в-Цикле', description: 'Критические действия требуют вашего явного одобрения.' },
      audit: { title: 'Аудит Логирования', description: 'Все действия записываются для судебного анализа.' }
    },
    security: {
      title1: 'Реальность',
      title2: 'Безопасности',
      subtitle: 'Никакая система не на 100% безопасна. Мы заявляем максимально возможную защиту.',
      tableHeaders: { threat: 'Угроза', protection: 'Защита', notes: 'Примечания' },
      threats: {
        promptInjection: { name: 'Prompt Injection', note: 'Множество слоёв защиты, санитизация ввода' },
        codeExecution: { name: 'Выполнение Кода', note: 'Песочница gVisor, seccomp фильтры' },
        dataExfiltration: { name: 'Эксфильтрация Данных', note: 'Только локально, шифрование' },
        networkAttacks: { name: 'Сетевые Атаки', note: 'Привязка 127.0.0.1' },
        supplyChain: { name: 'Цепочка Поставок', note: 'Подписанные пакеты' },
        physicalAccess: { name: 'Физический Доступ', note: 'Шифрование ОС' }
      },
      defenseDepth: 'Защита в Глубину',
      layers: ['Валидация Ввода', 'Фильтры Промптов', 'Песочница', 'HITL Одобрение', 'Аудит Логов', 'Шифрование']
    },
    install: {
      title1: 'Быстрая',
      title2: 'Установка',
      subtitle: 'Начните работу с ClosedPaw за секунды.',
      npm: { title: 'npm (Рекомендуется)', command: 'npm install -g closedpaw', description: 'Кроссплатформенная установка' },
      docker: { title: 'Docker', command: 'docker pull ghcr.io/closedpaw/closedpaw:latest', description: 'Готовый образ из GHCR' },
      requirements: 'Системные Требования',
      python: 'Python 3.11+',
      nodejs: 'Node.js 20+',
      ollama: 'Ollama (для локального LLM)',
      gvisor: 'gVisor/Kata (для песочницы)'
    },
    footer: { wiki: 'Wiki', docker: 'Docker', madeBy: 'Создано с 🔒 командой ClosedPaw' },
    docs: {
      title: 'Документация',
      subtitle: 'Подробные руководства, справочник API и анализ безопасности',
      search: 'Поиск в документации...',
      categories: {
        gettingStarted: 'Начало работы',
        security: 'Архитектура безопасности',
        core: 'Основные компоненты',
        api: 'API Справочник',
        advanced: 'Продвинутые темы',
        troubleshooting: 'Устранение неполадок'
      },
      pages: {
        gettingStarted: { title: 'Начало работы', description: 'Краткое руководство и инструкции по установке' },
        devSetup: { title: 'Среда разработки', description: 'Настройка среды разработки' },
        securityArch: { title: 'Архитектура безопасности', description: 'Обзор дизайна безопасности' },
        zeroTrust: { title: 'Принципы Zero-Trust', description: 'Никогда не доверяй, всегда проверяй' },
        sandboxing: { title: 'Усиленная песочница', description: 'Изоляция gVisor и Kata Containers' },
        hitl: { title: 'Человек-в-цикле', description: 'Процессы одобрения критических действий' },
        audit: { title: 'Аудит и соответствие', description: 'Логирование и криминалистика' },
        threatModel: { title: 'Модель угроз', description: 'Анализ угроз и безопасность' }
      },
      content: {}
    }
  },
  zh: {
    nav: { features: '功能', security: '安全', install: '安装', docs: '文档', home: '首页' },
    hero: {
      badge: '零信任架构',
      title1: '安全的 AI',
      title2: '尊重您的隐私',
      description: 'ClosedPaw 是一款注重隐私的 AI 助手，完全在您的本地计算机上运行。',
      getStarted: '开始使用',
      documentation: '文档'
    },
    stats: { local: '本地运行', securityLayers: '安全层级', packageSize: '包大小', license: '许可证' },
    features: {
      title: '为什么选择',
      subtitle: '与云端 AI 解决方案不同，ClosedPaw 将所有内容保留在您的设备上。',
      zeroTrust: { title: '零信任架构', description: '无隐式信任。每个操作都通过多层安全验证。' },
      promptInjection: { title: '提示注入防御', description: '通过多层模式检测防御攻击。' },
      sandboxing: { title: '强化沙箱', description: '使用 gVisor 和 Kata Containers 实现真正的内核级隔离。' },
      localLLM: { title: '本地 LLM 支持', description: '与 Ollama 配合实现完全离线操作。' },
      hitl: { title: '人在回路', description: '关键操作需要您的明确批准。' },
      audit: { title: '审计日志', description: '所有操作记录用于取证分析。' }
    },
    security: {
      title1: '安全现实',
      title2: '核查',
      subtitle: '没有系统是 100% 安全的。我们声明最大可行保护。',
      tableHeaders: { threat: '威胁', protection: '防护', notes: '备注' },
      threats: {
        promptInjection: { name: '提示注入', note: '多层防御，输入清理' },
        codeExecution: { name: '代码执行', note: 'gVisor 沙箱' },
        dataExfiltration: { name: '数据渗出', note: '仅本地，加密存储' },
        networkAttacks: { name: '网络攻击', note: '127.0.0.1 绑定' },
        supplyChain: { name: '供应链', note: '签名包' },
        physicalAccess: { name: '物理访问', note: '操作系统级加密' }
      },
      defenseDepth: '纵深防御',
      layers: ['输入验证', '提示过滤', '沙箱执行', 'HITL 批准', '审计日志', '加密存储']
    },
    install: {
      title1: '快速',
      title2: '安装',
      subtitle: '几秒钟内开始使用 ClosedPaw。',
      npm: { title: 'npm（推荐）', command: 'npm install -g closedpaw', description: '跨平台安装' },
      docker: { title: 'Docker', command: 'docker pull ghcr.io/closedpaw/closedpaw:latest', description: 'GHCR 预构建镜像' },
      requirements: '系统要求',
      python: 'Python 3.11+',
      nodejs: 'Node.js 20+',
      ollama: 'Ollama（用于本地 LLM）',
      gvisor: 'gVisor/Kata（用于沙箱）'
    },
    footer: { wiki: 'Wiki', docker: 'Docker', madeBy: '由 ClosedPaw 团队用 🔒 制作' },
    docs: {
      title: '文档',
      subtitle: '全面指南、API 参考和安全深度解析',
      search: '搜索文档...',
      categories: {
        gettingStarted: '入门指南',
        security: '安全架构',
        core: '核心组件',
        api: 'API 参考',
        advanced: '高级主题',
        troubleshooting: '故障排除'
      },
      pages: {
        gettingStarted: { title: '入门指南', description: '快速入门指南和安装说明' },
        devSetup: { title: '开发环境', description: '设置开发环境' },
        securityArch: { title: '安全架构', description: '安全设计概述' },
        zeroTrust: { title: '零信任原则', description: '永不信任，始终验证' },
        sandboxing: { title: '强化沙箱', description: 'gVisor 和 Kata Containers 隔离' },
        hitl: { title: '人在回路', description: '关键操作的批准流程' }
      },
      content: {}
    }
  }
}

const languageNames: Record<Language, string> = { en: 'EN', ru: 'RU', zh: '中文' }

// Doc navigation structure
const docNav = [
  { id: 'gettingStarted', category: 'gettingStarted', icon: Zap },
  { id: 'devSetup', category: 'gettingStarted', icon: Settings },
  { id: 'securityArch', category: 'security', icon: Shield },
  { id: 'zeroTrust', category: 'security', icon: Lock },
  { id: 'sandboxing', category: 'security', icon: Container },
  { id: 'hitl', category: 'security', icon: CheckCircle },
  { id: 'audit', category: 'security', icon: FileText },
  { id: 'threatModel', category: 'security', icon: AlertTriangle },
  { id: 'troubleshooting', category: 'troubleshooting', icon: Bug }
]

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
  const [page, setPage] = useState<Page>('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentDoc, setCurrentDoc] = useState('gettingStarted')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = translations[language as 'en' | 'ru' | 'zh']

  const toggleTheme = () => setTheme((prev: Theme) => prev === 'dark' ? 'light' : 'dark')
  const handleSetLanguage = (lang: Language) => setLanguage(lang)

  // Simple markdown to HTML converter
  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-0 mb-6">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-dark-700 px-1 rounded">$1</code>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto my-4 text-sm"><code>$2</code></pre>')
      .replace(/^- (.*$)/gm, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>')
      .replace(/\n\n/g, '</p><p class="my-4">')
  }

  const getDocContent = (docId: string) => {
    const docs = translations[language as 'en' | 'ru' | 'zh'].docs as typeof translations.en.docs
    return (docs.content as Record<string, Record<string, string>>)?.[docId]?.[language] || 
           (docs.content as Record<string, Record<string, string>>)?.[docId]?.['en'] ||
           `# ${docs.pages?.[docId as keyof typeof docs.pages]?.title || docId}\n\nContent coming soon...`
  }

  if (page === 'docs') {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-dark-950' : 'bg-gray-50'}`}>
        {/* Docs Navigation */}
        <nav className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-dark-950/95' : 'bg-white/95'} backdrop-blur-lg border-b ${theme === 'dark' ? 'border-dark-800' : 'border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <button onClick={() => setPage('home')} className="flex items-center gap-2">
                  <span className="text-2xl">🐾</span>
                  <span className={`text-xl font-bold ${theme === 'dark' ? 'gradient-text' : 'text-primary-600'}`}>ClosedPaw</span>
                </button>
                <span className={`${theme === 'dark' ? 'text-dark-500' : 'text-gray-300'}`}>/</span>
                <span className={`${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{t.docs.title}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative group">
                  <button className={`flex items-center gap-1 px-2 py-1 rounded-lg ${theme === 'dark' ? 'hover:bg-dark-800' : 'hover:bg-gray-100'}`}>
                    <Globe size={18} className={theme === 'dark' ? 'text-dark-300' : 'text-gray-600'} />
                    <span className={`text-sm ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{languageNames[language]}</span>
                  </button>
                  <div className={`absolute right-0 top-full mt-1 py-1 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ${theme === 'dark' ? 'bg-dark-800 border border-dark-700' : 'bg-white border border-gray-200'}`}>
                    {(['en', 'ru', 'zh'] as Language[]).map(lang => (
                      <button key={lang} onClick={() => handleSetLanguage(lang)} className={`block w-full text-left px-4 py-2 text-sm ${language === lang ? (theme === 'dark' ? 'text-primary-400' : 'text-primary-600') : (theme === 'dark' ? 'text-dark-300' : 'text-gray-600')} ${theme === 'dark' ? 'hover:bg-dark-700' : 'hover:bg-gray-100'}`}>
                        {languageNames[lang]}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={toggleTheme} className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-dark-800 text-dark-300' : 'hover:bg-gray-100 text-gray-600'}`}>
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <a href="https://github.com/closedpaw/closedpaw" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors text-white">
                  <Github size={18} />
                  <span className="hidden sm:inline">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex pt-16">
          {/* Sidebar */}
          <aside className={`fixed left-0 top-16 bottom-0 ${sidebarOpen ? 'w-64' : 'w-0'} ${theme === 'dark' ? 'bg-dark-900 border-dark-800' : 'bg-gray-100 border-gray-200'} border-r overflow-y-auto transition-all duration-300`}>
            <div className="p-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`mb-4 p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-dark-800' : 'hover:bg-gray-200'}`}>
                <ChevronRight size={18} className={`transform transition-transform ${sidebarOpen ? 'rotate-180' : ''}`} />
              </button>
              {sidebarOpen && (
                <nav className="space-y-1">
                  {['gettingStarted', 'security', 'troubleshooting'].map(cat => (
                    <div key={cat} className="mb-4">
                      <h3 className={`text-xs uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-dark-400' : 'text-gray-500'}`}>
                        {t.docs.categories[cat as keyof typeof t.docs.categories]}
                      </h3>
                      {docNav.filter(d => d.category === cat).map(item => {
                        const Icon = item.icon
                        const pageData = t.docs.pages?.[item.id as keyof typeof t.docs.pages]
                        return (
                          <button
                            key={item.id}
                            onClick={() => setCurrentDoc(item.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left text-sm transition-colors ${
                              currentDoc === item.id
                                ? (theme === 'dark' ? 'bg-primary-600/20 text-primary-400' : 'bg-primary-100 text-primary-600')
                                : (theme === 'dark' ? 'text-dark-300 hover:bg-dark-800' : 'text-gray-600 hover:bg-gray-200')
                            }`}
                          >
                            <Icon size={16} />
                            {pageData?.title || item.id}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </nav>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-300`}>
            <div className="max-w-4xl mx-auto px-8 py-12">
              <div className={`prose ${theme === 'dark' ? 'prose-invert' : ''} max-w-none`} dangerouslySetInnerHTML={{ __html: renderMarkdown(getDocContent(currentDoc)) }} />
              
              {/* Navigation buttons */}
              <div className={`flex justify-between items-center mt-12 pt-8 border-t ${theme === 'dark' ? 'border-dark-800' : 'border-gray-200'}`}>
                <a
                  href="https://github.com/closedpaw/closedpaw/tree/main/.qoder/repowiki/en/content"
                  className={`flex items-center gap-2 ${theme === 'dark' ? 'text-primary-400 hover:text-primary-300' : 'text-primary-600 hover:text-primary-700'}`}
                >
                  <ExternalLink size={16} />
                  View full documentation on GitHub
                </a>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
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
              <button onClick={() => setPage('docs')} className={`${theme === 'dark' ? 'text-dark-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>{t.nav.docs}</button>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <button className={`flex items-center gap-1 px-2 py-1 rounded-lg ${theme === 'dark' ? 'hover:bg-dark-800' : 'hover:bg-gray-100'} transition-colors`}>
                  <Globe size={18} className={theme === 'dark' ? 'text-dark-300' : 'text-gray-600'} />
                  <span className={`text-sm ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{languageNames[language]}</span>
                </button>
                <div className={`absolute right-0 top-full mt-1 py-1 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ${theme === 'dark' ? 'bg-dark-800 border border-dark-700' : 'bg-white border border-gray-200'}`}>
                  {(['en', 'ru', 'zh'] as Language[]).map(lang => (
                    <button key={lang} onClick={() => handleSetLanguage(lang)} className={`block w-full text-left px-4 py-2 text-sm ${language === lang ? (theme === 'dark' ? 'text-primary-400' : 'text-primary-600') : (theme === 'dark' ? 'text-dark-300' : 'text-gray-600')} ${theme === 'dark' ? 'hover:bg-dark-700' : 'hover:bg-gray-100'}`}>
                      {languageNames[lang]}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={toggleTheme} className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-dark-800 text-dark-300' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <a href="https://github.com/closedpaw/closedpaw" className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors text-white">
                <Github size={18} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className={`md:hidden py-4 ${theme === 'dark' ? 'bg-dark-900' : 'bg-gray-50'}`}>
              <a href="#features" className={`block py-2 ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{t.nav.features}</a>
              <a href="#security" className={`block py-2 ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{t.nav.security}</a>
              <a href="#install" className={`block py-2 ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{t.nav.install}</a>
              <button onClick={() => { setPage('docs'); setMobileMenuOpen(false) }} className={`block py-2 w-full text-left ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>{t.nav.docs}</button>
            </div>
          )}
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
            <a href="#install" className="flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 rounded-xl font-semibold transition-all hover:scale-105 text-white glow">
              <Terminal size={20} />
              {t.hero.getStarted}
            </a>
            <button onClick={() => setPage('docs')} className={`flex items-center gap-2 px-8 py-4 ${theme === 'dark' ? 'bg-dark-800 hover:bg-dark-700 border-dark-600' : 'bg-white hover:bg-gray-50 border-gray-200'} rounded-xl font-semibold transition-colors border`}>
              <BookOpen size={20} />
              {t.hero.documentation}
            </button>
          </div>
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t ${theme === 'dark' ? 'border-dark-800' : 'border-gray-200'}`}>
            <div><div className="text-3xl font-bold text-primary-400">100%</div><div className={theme === 'dark' ? 'text-dark-400' : 'text-gray-600'}>{t.stats.local}</div></div>
            <div><div className="text-3xl font-bold text-primary-400">6</div><div className={theme === 'dark' ? 'text-dark-400' : 'text-gray-600'}>{t.stats.securityLayers}</div></div>
            <div><div className="text-3xl font-bold text-primary-400">112MB</div><div className={theme === 'dark' ? 'text-dark-400' : 'text-gray-600'}>{t.stats.packageSize}</div></div>
            <div><div className="text-3xl font-bold text-primary-400">MIT</div><div className={theme === 'dark' ? 'text-dark-400' : 'text-gray-600'}>{t.stats.license}</div></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 px-4 ${theme === 'dark' ? 'bg-dark-900' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t.features.title} <span className={theme === 'dark' ? 'gradient-text' : 'text-primary-600'}>ClosedPaw</span>?
          </h2>
          <p className={`${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} text-center mb-16 max-w-2xl mx-auto`}>{t.features.subtitle}</p>
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
          <p className={`${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} text-center mb-16 max-w-2xl mx-auto`}>{t.security.subtitle}</p>
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
          <p className={`${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} text-center mb-16 max-w-2xl mx-auto`}>{t.install.subtitle}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <InstallCard icon={<Package className="text-primary-400" size={24} />} title={t.install.npm.title} command={t.install.npm.command} description={t.install.npm.description} theme={theme} />
            <InstallCard icon={<Container className="text-primary-400" size={24} />} title={t.install.docker.title} command={t.install.docker.command} description={t.install.docker.description} theme={theme} />
          </div>
          <div className={`mt-8 p-6 ${theme === 'dark' ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} rounded-xl border`}>
            <h4 className={`font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{t.install.requirements}</h4>
            <div className={`grid sm:grid-cols-2 gap-4 ${theme === 'dark' ? 'text-dark-300' : 'text-gray-600'}`}>
              <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" />{t.install.python}</div>
              <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" />{t.install.nodejs}</div>
              <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" />{t.install.ollama}</div>
              <div className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" />{t.install.gvisor}</div>
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
              <a href="https://github.com/closedpaw/closedpaw" className={`hover:text-white transition-colors flex items-center gap-1 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}><Github size={18} />GitHub</a>
              <button onClick={() => setPage('docs')} className={`hover:text-white transition-colors flex items-center gap-1 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}><BookOpen size={18} />{t.footer.wiki}</button>
              <a href="https://github.com/closedpaw/closedpaw/pkgs/container/closedpaw" className={`hover:text-white transition-colors flex items-center gap-1 ${theme === 'dark' ? 'hover:text-white' : 'hover:text-gray-900'}`}><Package size={18} />{t.footer.docker}</a>
            </div>
            <div className={`${theme === 'dark' ? 'text-dark-500' : 'text-gray-500'} text-sm`}>{t.footer.madeBy}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, theme }: { icon: React.ReactNode; title: string; description: string; theme: Theme }) {
  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} rounded-xl border hover:border-primary-500/30 transition-colors`}>
      <div className="mb-4">{icon}</div>
      <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} text-sm`}>{description}</p>
    </div>
  )
}

function ThreatRow({ threat, level, note, theme }: { threat: string; level: 'high' | 'medium' | 'low'; note: string; theme: Theme }) {
  const levelColors = { high: 'text-green-400 bg-green-400/10', medium: 'text-yellow-400 bg-yellow-400/10', low: 'text-red-400 bg-red-400/10' }
  const levelIcons = { high: '✅', medium: '⚠️', low: '❌' }
  const levelLabels = { high: 'High', medium: 'Medium', low: 'Low' }
  return (
    <tr className={`border-b ${theme === 'dark' ? 'border-dark-800 hover:bg-dark-800/50' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
      <td className={`py-4 px-4 font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{threat}</td>
      <td className="py-4 px-4"><span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${levelColors[level]}`}>{levelIcons[level]} {levelLabels[level]}</span></td>
      <td className={`py-4 px-4 ${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} hidden md:table-cell`}>{note}</td>
    </tr>
  )
}

function InstallCard({ icon, title, command, description, theme }: { icon: React.ReactNode; title: string; command: string; description: string; theme: Theme }) {
  return (
    <div className={`p-6 ${theme === 'dark' ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} rounded-xl border hover:border-primary-500/30 transition-colors`}>
      <div className="flex items-center gap-3 mb-4">{icon}<h3 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h3></div>
      <div className={`code-block mb-4 ${theme === 'dark' ? 'bg-dark-900' : 'bg-gray-100'} p-3 rounded-lg`}><code className="text-primary-400 font-mono text-sm">{command}</code></div>
      <p className={`${theme === 'dark' ? 'text-dark-400' : 'text-gray-600'} text-sm`}>{description}</p>
    </div>
  )
}

export default App
