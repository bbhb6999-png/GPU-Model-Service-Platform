import React from 'react';
import { 
  Plus, 
  Puzzle, 
  Workflow, 
  Zap, 
  ShieldCheck, 
  Settings2,
  Play,
  Pause,
  Trash2,
  ChevronRight,
  Layers,
  MousePointer2,
  Box,
  Search,
  Filter,
  MoreHorizontal,
  Save,
  Send,
  History,
  Code2,
  Database,
  Globe,
  Cloud,
  Cpu,
  MessageSquare,
  User,
  Brain,
  Wrench,
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PluginViewProps {
  activeSubMenu?: string;
}

export default function PluginView({ activeSubMenu = 'management' }: PluginViewProps) {
  const plugins = [
    { id: 'PLG-001', name: 'Google Search', desc: '实时联网搜索，获取最新资讯', status: 'enabled', icon: Globe, category: '工具', version: 'v1.2.0', calls: '12.4k' },
    { id: 'PLG-002', name: 'Python Interpreter', desc: '执行复杂数学计算与数据分析', status: 'enabled', icon: Code2, category: '执行', version: 'v2.0.1', calls: '8.5k' },
    { id: 'PLG-003', name: 'SQL Generator', desc: '根据自然语言生成标准 SQL 查询', status: 'disabled', icon: Database, category: '数据库', version: 'v1.0.5', calls: '2.1k' },
    { id: 'PLG-004', name: 'Email Sender', desc: '自动撰写并发送企业内部邮件', status: 'enabled', icon: Send, category: '办公', version: 'v1.1.0', calls: '4.2k' },
    { id: 'PLG-005', name: 'Weather API', desc: '获取全球实时天气与预报数据', status: 'enabled', icon: Cloud, category: '工具', version: 'v1.0.0', calls: '1.8k' },
  ];

  const agents = [
    { id: 'AGT-001', name: '数据分析专家', desc: '擅长处理复杂表格数据，生成可视化报告', status: 'online', avatar: 'https://picsum.photos/seed/agent1/100/100' },
    { id: 'AGT-002', name: '自动化运维助手', desc: '监控系统状态，自动处理常见故障', status: 'offline', avatar: 'https://picsum.photos/seed/agent2/100/100' },
    { id: 'AGT-003', name: '智能客服机器人', desc: '基于知识库提供 7x24 小时客户支持', status: 'online', avatar: 'https://picsum.photos/seed/agent3/100/100' },
  ];

  if (activeSubMenu === 'workflow') {
    return (
      <div className="h-[calc(100vh-180px)] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">工作流可视化编排</h1>
            <p className="text-gray-500 mt-1 text-sm">通过拖拽组件构建复杂的 AI 业务逻辑流</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <History className="w-4 h-4" />
              版本历史
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Play className="w-4 h-4" />
              运行测试
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Save className="w-4 h-4" />
              保存并发布
            </button>
          </div>
        </div>

        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Node Library */}
          <div className="w-64 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">节点库</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <p className="text-[10px] font-bold text-gray-400 mb-3">基础节点</p>
                <div className="space-y-2">
                  {['开始节点', '结束节点', '条件分支', '并行分支'].map((n) => (
                    <div key={n} className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600 cursor-move hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 mb-3">AI 节点</p>
                <div className="space-y-2">
                  {['大模型处理', '意图识别', '知识库检索', '插件调用'].map((n) => (
                    <div key={n} className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600 cursor-move hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 mb-3">逻辑节点</p>
                <div className="space-y-2">
                  {['变量赋值', 'HTTP 请求', 'Python 脚本', '循环处理'].map((n) => (
                    <div key={n} className="p-3 bg-gray-50 border border-gray-100 rounded-lg text-xs font-medium text-gray-600 cursor-move hover:border-orange-300 hover:bg-orange-50 transition-all flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-400" />
                      {n}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Canvas */}
          <div className="flex-1 bg-[#f8fafc] border border-gray-200 rounded-xl relative overflow-hidden shadow-inner group">
            <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
            
            {/* Sample Workflow Nodes */}
            <div className="absolute inset-0 flex items-center justify-center gap-20">
              <div className="bg-white p-4 rounded-xl border-2 border-blue-500 shadow-xl w-44 text-center z-10 relative">
                <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <p className="text-xs font-bold text-gray-800">开始: 用户输入</p>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm cursor-pointer" />
              </div>

              <div className="w-20 h-0.5 bg-blue-300 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-300 rotate-45 -mr-1"></div>
              </div>

              <div className="bg-white p-4 rounded-xl border-2 border-purple-500 shadow-xl w-44 text-center z-10 relative">
                <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Brain className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-gray-800">意图识别 (LLM)</p>
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-sm cursor-pointer" />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-sm cursor-pointer" />
              </div>

              <div className="w-20 h-0.5 bg-purple-300 relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-purple-300 rotate-45 -mr-1"></div>
              </div>

              <div className="bg-white p-4 rounded-xl border-2 border-orange-500 shadow-xl w-44 text-center z-10 relative">
                <div className="w-8 h-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Wrench className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-gray-800">工具调用: Search</p>
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-sm cursor-pointer" />
              </div>
            </div>

            <div className="absolute bottom-6 left-6 flex gap-2">
              <button className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"><Plus className="w-4 h-4" /></button>
              <button className="p-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"><MoreHorizontal className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Config Panel */}
          <div className="w-80 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">节点配置</h3>
              <Settings2 className="w-4 h-4 text-gray-400" />
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="flex items-center gap-3 p-3 bg-purple-50 border border-purple-100 rounded-xl mb-4">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">意图识别</p>
                  <p className="text-[10px] text-purple-600 font-medium">LLM 节点</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">节点名称</label>
                  <input type="text" defaultValue="意图识别 (LLM)" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">选择模型</label>
                  <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none">
                    <option>Gemini 3.1 Pro</option>
                    <option>Gemini 3 Flash</option>
                    <option>GPT-4o</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">系统提示词</label>
                  <textarea rows={4} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" placeholder="输入节点指令..."></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">输出变量</label>
                  <div className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-mono text-blue-600">
                    {"{{intent_result}}"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubMenu === 'agent') {
    return (
      <div className="h-[calc(100vh-180px)] flex gap-6">
        {/* Agent List Sidebar */}
        <div className="w-72 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">智能体列表</h3>
            <button className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {agents.map((agent) => (
              <div key={agent.id} className={cn(
                "p-3 rounded-lg cursor-pointer transition-all group",
                agent.id === 'AGT-001' ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50 border border-transparent"
              )}>
                <div className="flex items-center gap-3">
                  <img src={agent.avatar} alt="" className="w-10 h-10 rounded-lg object-cover border border-gray-200 shadow-sm" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-900 truncate">{agent.name}</p>
                      <div className={cn("w-2 h-2 rounded-full", agent.status === 'online' ? "bg-green-500" : "bg-gray-300")} />
                    </div>
                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{agent.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Config Main Area */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={agents[0].avatar} alt="" className="w-12 h-12 rounded-xl object-cover border border-gray-200 shadow-sm" referrerPolicy="no-referrer" />
              <div>
                <h2 className="text-lg font-bold text-gray-900">{agents[0].name}</h2>
                <p className="text-xs text-gray-500">ID: {agents[0].id}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">发布</button>
              <button className="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">保存</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-8 max-w-3xl space-y-8">
              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-600" />
                  基础信息
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">智能体描述</label>
                    <textarea rows={3} defaultValue={agents[0].desc} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" />
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-purple-600" />
                  逻辑配置 (Prompt)
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">系统提示词 (System Prompt)</label>
                    <textarea rows={6} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none" defaultValue="你是一个专业的数据分析专家。你的任务是接收用户上传的表格数据（CSV/Excel），进行多维度的统计分析，并根据分析结果生成直观的可视化图表建议。请保持专业、客观的语气，并在必要时提供洞察建议。" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Temperature</label>
                      <input type="range" className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" defaultValue={70} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Max Tokens</label>
                      <input type="number" defaultValue={2048} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none" />
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-orange-600" />
                  能力扩展 (Tools & Knowledge)
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-bold text-gray-700">关联插件</p>
                      <button className="text-[10px] text-blue-600 font-bold hover:underline">添加</button>
                    </div>
                    <div className="space-y-2">
                      {['Google Search', 'Python Interpreter'].map((p) => (
                        <div key={p} className="flex items-center justify-between p-2 bg-white border border-gray-100 rounded-lg text-xs">
                          <span className="text-gray-600">{p}</span>
                          <button className="text-gray-400 hover:text-red-600"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-xs font-bold text-gray-700">关联知识库</p>
                      <button className="text-[10px] text-blue-600 font-bold hover:underline">添加</button>
                    </div>
                    <div className="space-y-2">
                      {['产品技术文档库'].map((k) => (
                        <div key={k} className="flex items-center justify-between p-2 bg-white border border-gray-100 rounded-lg text-xs">
                          <span className="text-gray-600">{k}</span>
                          <button className="text-gray-400 hover:text-red-600"><Trash2 className="w-3 h-3" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Agent Preview Chat */}
        <div className="w-96 bg-white border border-gray-200 rounded-xl flex flex-col overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-gray-800">Agent 预览测试</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/30">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4" />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm text-xs text-gray-700 max-w-[85%]">
                你好！我是数据分析专家。你可以上传表格文件，或者直接告诉我你需要分析的数据内容。
              </div>
            </div>
            <div className="flex gap-3 flex-row-reverse">
              <div className="w-8 h-8 rounded-lg bg-gray-900 text-white flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="bg-blue-600 p-3 rounded-2xl rounded-tr-none text-xs text-white max-w-[85%] shadow-sm">
                帮我分析一下上个季度的销售增长趋势。
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-gray-100">
            <div className="relative">
              <input type="text" placeholder="向 Agent 发送消息..." className="w-full pl-4 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">插件管理中心</h1>
          <p className="text-gray-500 mt-1 text-sm">扩展模型能力，构建自主决策智能体与可视化工作流</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" />
          开发新插件
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {plugins.map((plugin) => (
          <div key={plugin.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:border-blue-300 transition-all group flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                  plugin.status === 'enabled' ? "bg-blue-50 text-blue-600" : "bg-gray-100 text-gray-400"
                )}>
                  <plugin.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <button className={cn(
                    "w-10 h-5 rounded-full relative transition-colors",
                    plugin.status === 'enabled' ? "bg-blue-600" : "bg-gray-200"
                  )}>
                    <div className={cn(
                      "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                      plugin.status === 'enabled' ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{plugin.name}</h4>
                <span className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-500 rounded font-medium">{plugin.version}</span>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{plugin.desc}</p>
            </div>
            <div className="px-6 py-4 border-t border-gray-50 bg-gray-50/30 flex items-center justify-between">
              <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {plugin.calls} 调用</span>
                <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {plugin.category}</span>
              </div>
              <div className="flex gap-1">
                <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                  <Settings2 className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Create New Plugin Card */}
        <button className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center p-6 hover:border-blue-300 hover:bg-blue-50 transition-all group min-h-[220px]">
          <div className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:border-blue-200 transition-all mb-4">
            <Plus className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-gray-500 group-hover:text-blue-600 transition-colors">开发自定义插件</p>
          <p className="text-[10px] text-gray-400 mt-1">支持 OpenAPI / Webhook</p>
        </button>
      </div>

      {/* Plugin Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">插件调用趋势</h3>
            <select className="text-xs bg-gray-50 border border-gray-200 rounded px-2 py-1 focus:outline-none">
              <option>最近 7 天</option>
              <option>最近 30 天</option>
            </select>
          </div>
          <div className="h-48 flex items-end justify-between gap-2 px-2">
            {[45, 62, 58, 85, 72, 90, 110].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-blue-500/20 rounded-t-lg relative group transition-all hover:bg-blue-500/40" style={{ height: `${h}%` }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h * 100} 次调用
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-bold">04-{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">插件运行状态</h3>
          <div className="space-y-4">
            {[
              { name: 'API 响应率', value: '99.98%', status: 'success', icon: CheckCircle2 },
              { name: '平均延迟', value: '142ms', status: 'success', icon: CheckCircle2 },
              { name: '异常调用', value: '12 次', status: 'warning', icon: AlertCircle },
              { name: '鉴权失败', value: '0 次', status: 'success', icon: CheckCircle2 },
            ].map((stat, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <stat.icon className={cn("w-4 h-4", stat.status === 'success' ? "text-green-500" : "text-orange-500")} />
                  <span className="text-xs text-gray-600">{stat.name}</span>
                </div>
                <span className="text-xs font-bold text-gray-900">{stat.value}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            查看详细运行报告
          </button>
        </div>
      </div>
    </div>
  );
}

