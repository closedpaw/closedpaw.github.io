import { Shield, Lock, Server, Cpu, Github, Package, BookOpen, ChevronRight, Terminal, CheckCircle, AlertTriangle, Container } from 'lucide-react'

function App() {
  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-lg border-b border-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-bold gradient-text">ClosedPaw</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-dark-300 hover:text-white transition-colors">Features</a>
              <a href="#security" className="text-dark-300 hover:text-white transition-colors">Security</a>
              <a href="#install" className="text-dark-300 hover:text-white transition-colors">Install</a>
              <a href="https://github.com/logansin/closedpaw/wiki" className="text-dark-300 hover:text-white transition-colors">Docs</a>
            </div>
            <a
              href="https://github.com/logansin/closedpaw"
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
            >
              <Github size={18} />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-full mb-8">
            <Lock size={16} className="text-primary-400" />
            <span className="text-sm text-dark-300">Zero-Trust Architecture</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Secure AI</span>
            <br />
            <span className="text-white">That Respects Your Privacy</span>
          </h1>
          
          <p className="text-xl text-dark-400 max-w-3xl mx-auto mb-10">
            ClosedPaw is a privacy-focused AI assistant that runs entirely on your local machine.
            Your data never leaves your device. Built with security-first architecture using
            gVisor/Kata Containers for true isolation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#install"
              className="flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 rounded-xl font-semibold transition-all hover:scale-105 glow"
            >
              <Terminal size={20} />
              Get Started
            </a>
            <a
              href="https://github.com/logansin/closedpaw/wiki"
              className="flex items-center gap-2 px-8 py-4 bg-dark-800 hover:bg-dark-700 rounded-xl font-semibold transition-colors border border-dark-600"
            >
              <BookOpen size={20} />
              Documentation
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-dark-800">
            <div>
              <div className="text-3xl font-bold text-primary-400">100%</div>
              <div className="text-dark-400">Local</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400">6</div>
              <div className="text-dark-400">Security Layers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400">112MB</div>
              <div className="text-dark-400">Package Size</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-400">MIT</div>
              <div className="text-dark-400">License</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose <span className="gradient-text">ClosedPaw</span>?
          </h2>
          <p className="text-dark-400 text-center mb-16 max-w-2xl mx-auto">
            Unlike cloud-based AI solutions, ClosedPaw keeps everything on your machine.
            No data collection, no tracking, no third-party access.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="text-primary-400" size={32} />}
              title="Zero-Trust Architecture"
              description="No implicit trust. Every action is verified through multiple security layers. Defense in depth protects you even if one layer fails."
            />
            <FeatureCard
              icon={<Lock className="text-primary-400" size={32} />}
              title="Prompt Injection Defense"
              description="Protection against CVE-2026-25253 type attacks with multi-layer pattern detection and input sanitization."
            />
            <FeatureCard
              icon={<Server className="text-primary-400" size={32} />}
              title="Hardened Sandboxing"
              description="True kernel-level isolation with gVisor and Kata Containers. Not just Docker - real security boundaries."
            />
            <FeatureCard
              icon={<Cpu className="text-primary-400" size={32} />}
              title="Local LLM Support"
              description="Works with Ollama for completely offline operation. Your conversations never leave your machine."
            />
            <FeatureCard
              icon={<AlertTriangle className="text-primary-400" size={32} />}
              title="Human-in-the-Loop"
              description="Critical actions require your explicit approval. You stay in control of what the AI can do."
            />
            <FeatureCard
              icon={<CheckCircle className="text-primary-400" size={32} />}
              title="Audit Logging"
              description="All actions logged for forensic analysis. Know exactly what happened and when."
            />
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            <span className="gradient-text">Security Reality</span> Check
          </h2>
          <p className="text-dark-400 text-center mb-16 max-w-2xl mx-auto">
            No system is 100% secure. We don't claim perfection — we claim maximum feasible protection.
          </p>

          <div className="bg-dark-900 rounded-2xl p-8 border border-dark-800">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-4 px-4 text-dark-300">Threat</th>
                  <th className="text-left py-4 px-4 text-dark-300">Protection</th>
                  <th className="text-left py-4 px-4 text-dark-300 hidden md:table-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                <ThreatRow threat="Prompt Injection" level="high" note="Multiple defense layers, input sanitization" />
                <ThreatRow threat="Code Execution" level="high" note="gVisor sandbox, seccomp filters" />
                <ThreatRow threat="Data Exfiltration" level="high" note="Local-only, encrypted storage" />
                <ThreatRow threat="Network Attacks" level="high" note="127.0.0.1 binding, no external exposure" />
                <ThreatRow threat="Supply Chain" level="medium" note="Signed packages, dependency scanning" />
                <ThreatRow threat="Physical Access" level="low" note="OS-level encryption recommended" />
              </tbody>
            </table>
          </div>

          {/* Defense in Depth */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Defense in Depth</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {['Input Validation', 'Prompt Filters', 'Sandboxed Execution', 'HITL Approval', 'Audit Logging', 'Encrypted Storage'].map((layer, i) => (
                <div key={layer} className="flex items-center">
                  <div className="px-4 py-2 bg-dark-800 border border-primary-500/30 rounded-lg text-center">
                    <div className="text-xs text-dark-400">Layer {i + 1}</div>
                    <div className="text-sm font-medium">{layer}</div>
                  </div>
                  {i < 5 && <ChevronRight className="hidden md:block text-dark-600 mx-2" size={20} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="install" className="py-20 px-4 bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Quick <span className="gradient-text">Installation</span>
          </h2>
          <p className="text-dark-400 text-center mb-16 max-w-2xl mx-auto">
            Get started with ClosedPaw in seconds. Choose your preferred installation method.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* npm Installation */}
            <InstallCard
              icon={<Package className="text-primary-400" size={24} />}
              title="npm (Recommended)"
              command="npm install -g closedpaw"
              description="Cross-platform installation via npm"
            />
            
            {/* Docker Installation */}
            <InstallCard
              icon={<Container className="text-primary-400" size={24} />}
              title="Docker"
              command="docker pull ghcr.io/logansin/closedpaw:latest"
              description="Pre-built image from GitHub Container Registry"
            />
          </div>

          <div className="mt-8 p-6 bg-dark-800 rounded-xl border border-dark-700">
            <h4 className="font-semibold mb-4">System Requirements</h4>
            <div className="grid sm:grid-cols-2 gap-4 text-dark-300">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Python 3.11+
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Node.js 20+
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                Ollama (for local LLM)
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                gVisor/Kata (for sandboxing)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐾</span>
              <span className="text-xl font-bold">ClosedPaw</span>
            </div>
            
            <div className="flex items-center gap-6 text-dark-400">
              <a href="https://github.com/logansin/closedpaw" className="hover:text-white transition-colors flex items-center gap-1">
                <Github size={18} />
                GitHub
              </a>
              <a href="https://github.com/logansin/closedpaw/wiki" className="hover:text-white transition-colors flex items-center gap-1">
                <BookOpen size={18} />
                Wiki
              </a>
              <a href="https://github.com/logansin/closedpaw/pkgs/container/closedpaw" className="hover:text-white transition-colors flex items-center gap-1">
                <Package size={18} />
                Docker
              </a>
            </div>
            
            <div className="text-dark-500 text-sm">
              Made with 🔒 by ClosedPaw Team
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-dark-800 rounded-xl border border-dark-700 hover:border-primary-500/30 transition-colors">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-dark-400 text-sm">{description}</p>
    </div>
  )
}

// Threat Row Component
function ThreatRow({ threat, level, note }: { threat: string; level: 'high' | 'medium' | 'low'; note: string }) {
  const levelColors = {
    high: 'text-green-400 bg-green-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    low: 'text-red-400 bg-red-400/10',
  }
  const levelIcons = {
    high: '✅',
    medium: '⚠️',
    low: '❌',
  }
  
  return (
    <tr className="border-b border-dark-800 hover:bg-dark-800/50 transition-colors">
      <td className="py-4 px-4 font-medium">{threat}</td>
      <td className="py-4 px-4">
        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${levelColors[level]}`}>
          {levelIcons[level]} {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      </td>
      <td className="py-4 px-4 text-dark-400 hidden md:table-cell">{note}</td>
    </tr>
  )
}

// Install Card Component
function InstallCard({ icon, title, command, description }: { icon: React.ReactNode; title: string; command: string; description: string }) {
  return (
    <div className="p-6 bg-dark-800 rounded-xl border border-dark-700 hover:border-primary-500/30 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="code-block mb-4">
        <code className="text-primary-300">{command}</code>
      </div>
      <p className="text-dark-400 text-sm">{description}</p>
    </div>
  )
}

export default App
