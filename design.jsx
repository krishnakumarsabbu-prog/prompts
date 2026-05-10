export default function DCTCopilotDashboard() {
  const plugins = [
    {
      name: 'Orchestrator',
      deps: 59,
      color: 'bg-red-100 text-red-600 border-red-200',
      active: true,
    },
    {
      name: 'Coder',
      deps: 32,
      color: 'bg-blue-100 text-blue-600 border-blue-200',
    },
    {
      name: 'Debugger',
      deps: 10,
      color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    },
    {
      name: 'Designer',
      deps: 12,
      color: 'bg-purple-100 text-purple-600 border-purple-200',
    },
    {
      name: 'Reviewer',
      deps: 13,
      color: 'bg-green-100 text-green-600 border-green-200',
    },
    {
      name: 'Planner',
      deps: 11,
      color: 'bg-pink-100 text-pink-600 border-pink-200',
    },
  ];

  const dependencyRows = [
    {
      pkg: 'zod',
      type: 'Direct',
      version: '^3.22.4',
      scope: 'dependencies',
    },
    {
      pkg: 'clsx',
      type: 'Direct',
      version: '^2.1.0',
      scope: 'dependencies',
    },
    {
      pkg: 'dayjs',
      type: 'Direct',
      version: '^1.11.10',
      scope: 'dependencies',
    },
    {
      pkg: 'uuid',
      type: 'Transitive',
      version: '^9.0.1',
      scope: 'dependencies',
    },
  ];

  return (
    <div className="h-screen w-full bg-[#0E0E0F] text-white overflow-hidden flex flex-col">
      {/* TOP BAR */}
      <div className="h-14 border-b border-[#232323] bg-black/60 backdrop-blur-xl flex items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center font-bold">
              ✦
            </div>
            <div>
              <div className="font-semibold text-[17px]">
                DCT Copilot Extensions
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-zinc-400">
            <span className="text-red-400">Environment: Enterprise</span>
            <span>Time: --:-- UTC</span>
            <span>Policies</span>
            <span>Runbook</span>
            <span>Audit</span>
          </div>
        </div>

        <div className="flex items-center gap-5 text-zinc-400">
          <div>◻</div>
          <div>⬡</div>
          <div>⚙</div>
          <div>?</div>

          <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
            AV
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-[250px] bg-[#0B0B0C] border-r border-[#232323] flex flex-col justify-between px-4 py-5">
          <div>
            <div className="mb-8">
              <div className="text-xs tracking-[0.2em] text-zinc-500 mb-4">
                PLUGINS
              </div>

              <div className="space-y-1">
                {[
                  'Plugins',
                  'Skills',
                  'Agents',
                  'Instructions',
                  'Prompts',
                ].map((item, i) => (
                  <div
                    key={item}
                    className={`h-11 rounded-xl flex items-center px-4 text-sm transition-all cursor-pointer ${
                      i === 0
                        ? 'bg-gradient-to-r from-red-700 to-red-600 text-white'
                        : 'text-zinc-400 hover:bg-zinc-900'
                    }`}
                  >
                    <span className="mr-3">◉</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="text-xs tracking-[0.2em] text-zinc-500 mb-4">
                MANAGE
              </div>

              <div className="space-y-1 text-zinc-400 text-sm">
                <div className="h-11 rounded-xl flex items-center px-4 hover:bg-zinc-900">
                  <span className="mr-3">◌</span>
                  Installed
                </div>

                <div className="h-11 rounded-xl flex items-center justify-between px-4 hover:bg-zinc-900">
                  <div>
                    <span className="mr-3">↻</span>
                    Updates
                  </div>

                  <div className="w-6 h-6 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                    8
                  </div>
                </div>

                <div className="h-11 rounded-xl flex items-center px-4 hover:bg-zinc-900">
                  <span className="mr-3">◎</span>
                  Audit Log
                </div>
              </div>
            </div>

            <div>
              <div className="text-xs tracking-[0.2em] text-zinc-500 mb-4">
                ANALYTICS
              </div>

              <div className="space-y-1 text-zinc-400 text-sm">
                <div className="h-11 rounded-xl flex items-center px-4 hover:bg-zinc-900">
                  <span className="mr-3">⌘</span>
                  Dependency Tree
                </div>

                <div className="h-11 rounded-xl flex items-center px-4 hover:bg-zinc-900">
                  <span className="mr-3">▣</span>
                  Reports
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-black p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                ◉
              </div>

              <div>
                <div className="text-sm font-medium">
                  DCT Copilot Assistant
                </div>
                <div className="text-xs text-green-400">● Online</div>
              </div>
            </div>

            <div className="h-11 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center px-3 text-sm text-zinc-500">
              Ask about plugins...
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 bg-[#F5F5F7] overflow-hidden flex">
          {/* LEFT LIST */}
          <div className="w-[340px] border-r border-zinc-200 bg-white p-5 overflow-y-auto">
            <h2 className="text-2xl font-semibold text-zinc-900 mb-5">
              All Plugins
            </h2>

            <div className="mb-4">
              <input
                placeholder="Search plugins..."
                className="w-full h-12 rounded-xl border border-zinc-200 px-4 text-sm outline-none text-zinc-800"
              />
            </div>

            <div className="flex gap-2 mb-6 flex-wrap">
              {['All', 'Installed', 'Missing', 'Conflicts'].map((tab, i) => (
                <button
                  key={tab}
                  className={`px-4 h-10 rounded-xl text-sm border ${
                    i === 0
                      ? 'bg-red-50 text-red-600 border-red-200'
                      : 'bg-white text-zinc-500 border-zinc-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {plugins.map((plugin) => (
                <div
                  key={plugin.name}
                  className={`rounded-2xl border p-4 transition-all cursor-pointer ${
                    plugin.active
                      ? 'border-red-200 bg-red-50/40 shadow-sm'
                      : 'border-zinc-200 bg-white hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-xl border flex items-center justify-center font-bold ${plugin.color}`}
                      >
                        ✦
                      </div>

                      <div>
                        <div className="font-semibold text-zinc-900">
                          {plugin.name}
                        </div>

                        <div className="text-sm text-zinc-500 mt-1">
                          {plugin.deps} dependencies
                        </div>
                      </div>
                    </div>

                    <div className="text-zinc-400">›</div>
                  </div>

                  <div className="mt-3 inline-flex px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Installed
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-sm text-zinc-400">
              Showing 1 to 6 of 6 plugins
            </div>
          </div>

          {/* RIGHT DETAILS */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="flex items-start justify-between mb-8">
              <div className="flex items-start gap-5">
                <div className="w-16 h-16 rounded-2xl bg-red-700 flex items-center justify-center text-white text-2xl shadow-lg">
                  ✦
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-semibold text-zinc-900">
                      Orchestrator
                    </h1>

                    <div className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                      Installed
                    </div>
                  </div>

                  <div className="text-zinc-500 mb-4 text-lg">
                    Version 2.1.0 • Primary orchestration and workflow
                    management plugin.
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['orchestration', 'workflow', 'planner', 'executor'].map(
                      (tag) => (
                        <div
                          key={tag}
                          className="px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-sm"
                        >
                          {tag}
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>

              <button className="h-12 px-5 rounded-xl border border-red-200 text-red-600 bg-white hover:bg-red-50 font-medium">
                Uninstall
              </button>
            </div>

            {/* TABS */}
            <div className="flex gap-8 border-b border-zinc-200 mb-8">
              {['Overview', 'Dependencies', 'Graph', 'Audit'].map(
                (tab, i) => (
                  <button
                    key={tab}
                    className={`pb-4 text-sm font-medium border-b-2 transition-all ${
                      i === 0
                        ? 'border-red-600 text-zinc-900'
                        : 'border-transparent text-zinc-500'
                    }`}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-4 gap-5 mb-6">
              {[
                ['Direct Dependencies', '11'],
                ['Transitive Dependencies', '48'],
                ['Dependents', '3'],
                ['Status', 'Healthy'],
              ].map(([title, value]) => (
                <div
                  key={title}
                  className="bg-white rounded-2xl border border-zinc-200 p-6"
                >
                  <div className="text-sm text-zinc-500 mb-3">{title}</div>
                  <div className="text-4xl font-semibold text-zinc-900">
                    {value}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl border border-zinc-200 p-6">
                <div className="text-xl font-semibold text-zinc-900 mb-5">
                  Used By
                </div>

                <div className="space-y-4">
                  {['Reviewer', 'Planner', 'Debugger'].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-zinc-700"
                    >
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-zinc-200 p-6">
                <div className="text-xl font-semibold text-zinc-900 mb-5">
                  Skills
                </div>

                <div className="flex flex-wrap gap-2">
                  {['orchestration', 'workflow', 'planner', 'executor'].map(
                    (tag) => (
                      <div
                        key={tag}
                        className="px-3 py-2 rounded-xl bg-zinc-100 text-zinc-700"
                      >
                        {tag}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-zinc-200 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="text-xl font-semibold text-zinc-900">
                    Recent Dependencies
                  </div>

                  <button className="text-red-600 text-sm font-medium">
                    View all
                  </button>
                </div>

                <table className="w-full">
                  <thead>
                    <tr className="text-left text-zinc-400 text-sm border-b border-zinc-100">
                      <th className="pb-3 font-medium">Package</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Version</th>
                      <th className="pb-3 font-medium">Scope</th>
                    </tr>
                  </thead>

                  <tbody>
                    {dependencyRows.map((row) => (
                      <tr
                        key={row.pkg}
                        className="border-b border-zinc-100 text-zinc-700"
                      >
                        <td className="py-4">{row.pkg}</td>
                        <td className="py-4">{row.type}</td>
                        <td className="py-4">{row.version}</td>
                        <td className="py-4">{row.scope}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-2xl border border-zinc-200 p-6 flex flex-col justify-between">
                <div>
                  <div className="text-xl font-semibold text-zinc-900 mb-5">
                    Dependency Health
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-zinc-700">Healthy</span>
                      </div>

                      <div className="text-zinc-500">45 (76.3%)</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <span className="text-zinc-700">Warnings</span>
                      </div>

                      <div className="text-zinc-500">10 (16.9%)</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-zinc-700">Critical</span>
                      </div>

                      <div className="text-zinc-500">4 (6.8%)</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <div className="relative w-52 h-52 rounded-full bg-[conic-gradient(#22c55e_0deg_280deg,#eab308_280deg_330deg,#ef4444_330deg_360deg)] flex items-center justify-center">
                    <div className="w-36 h-36 rounded-full bg-white flex flex-col items-center justify-center">
                      <div className="text-5xl font-bold text-zinc-900">
                        59
                      </div>
                      <div className="text-zinc-500">Total</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
