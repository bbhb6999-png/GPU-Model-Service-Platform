import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  RefreshCw, 
  Download, 
  Filter, 
  MoreHorizontal, 
  ChevronRight,
  Zap,
  ShieldCheck,
  Key,
  Activity,
  History,
  Copy,
  Terminal,
  Cpu,
  HardDrive,
  Box,
  Globe,
  Settings2,
  Trash2,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Lock,
  UserCheck,
  Eye,
  Network,
  Layers,
  GitBranch,
  ExternalLink
} from 'lucide-react';
import { cn } from '../lib/utils';

interface InferenceViewProps {
  activeSubMenu?: string;
}

export default function InferenceView({ activeSubMenu = 'models' }: InferenceViewProps) {
  // --- Sub-page 1: Model Library ---
  const renderModelLibrary = () => {
    const models = [
      { id: 'MOD-001', name: 'Llama-3-70B-Instruct', type: '开源', base: 'Llama-3', status: 'ready', time: '2026-04-01 10:00' },
      { id: 'MOD-002', name: 'Qwen-Max-LongContext', type: '商业', base: 'Qwen-Max', status: 'ready', time: '2026-04-02 14:30' },
      { id: 'MOD-003', name: 'DeepSeek-V3-Chat', type: '开源', base: 'DeepSeek-V3', status: 'tuning', time: '2026-04-05 09:00' },
      { id: 'MOD-004', name: 'Stable-Diffusion-XL', type: '开源', base: 'SDXL', status: 'ready', time: '2026-04-06 16:00' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">模型库管理</h1>
            <p className="text-gray-500 mt-1 text-sm">统一管理商业与开源大模型，支持血缘追溯与版本演进</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              导入模型
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              新建模型
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="flex gap-4 flex-1 max-w-2xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索模型名称或 ID..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <select className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none">
                <option>全部类型</option>
                <option>商业模型</option>
                <option>开源模型</option>
              </select>
              <select className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none">
                <option>全部状态</option>
                <option>已就绪</option>
                <option>微调中</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><RefreshCw className="w-4 h-4" /></button>
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Download className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">模型 ID</th>
                  <th className="px-6 py-4">模型名称</th>
                  <th className="px-6 py-4">类型</th>
                  <th className="px-6 py-4">基础版本</th>
                  <th className="px-6 py-4">微调状态</th>
                  <th className="px-6 py-4">创建时间</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {models.map((model) => (
                  <tr key={model.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{model.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded flex items-center justify-center">
                          <Layers className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-900">{model.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-0.5 rounded text-[10px] font-bold border",
                        model.type === '商业' ? "bg-purple-50 text-purple-600 border-purple-100" : "bg-blue-50 text-blue-600 border-blue-100"
                      )}>
                        {model.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{model.base}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        <div className={cn("w-1.5 h-1.5 rounded-full", model.status === 'ready' ? "bg-green-500" : "bg-orange-500")} />
                        <span className="text-xs text-gray-600">{model.status === 'ready' ? '已就绪' : '微调中'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{model.time}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="查看详情"><Eye className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="部署"><Zap className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="血缘追溯"><GitBranch className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="删除"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // --- Sub-page 2: Inference API Access ---
  const renderApiAccess = () => {
    const apis = [
      { id: 'API-001', model: 'Llama-3-70B', url: '/v1/chat/completions', method: 'POST', status: 'active', count: '1.2M' },
      { id: 'API-002', model: 'Qwen-Max', url: '/v1/completions', method: 'POST', status: 'active', count: '450K' },
      { id: 'API-003', model: 'SDXL-V1', url: '/v1/images/generations', method: 'POST', status: 'disabled', count: '12K' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">推理 API 接入管理</h1>
            <p className="text-gray-500 mt-1 text-sm">模型推理 API 集成接入，支持在线调试与调用日志监控</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            新增 API
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="flex gap-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="搜索关联模型..." 
                  className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
              <select className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none">
                <option>全部状态</option>
                <option>已启用</option>
                <option>已禁用</option>
              </select>
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><RefreshCw className="w-4 h-4" /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">API ID</th>
                  <th className="px-6 py-4">关联模型</th>
                  <th className="px-6 py-4">接口地址</th>
                  <th className="px-6 py-4">请求方式</th>
                  <th className="px-6 py-4">状态</th>
                  <th className="px-6 py-4">调用次数</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {apis.map((api) => (
                  <tr key={api.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{api.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{api.model}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">{api.url}</td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-600">{api.method}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border",
                        api.status === 'active' ? "bg-green-50 text-green-600 border-green-100" : "bg-gray-50 text-gray-400 border-gray-100"
                      )}>
                        {api.status === 'active' ? '已启用' : '已禁用'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{api.count}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="调试"><Terminal className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="配置"><Settings2 className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="查看文档"><FileText className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // --- Sub-page 3: Model Inference Deployment ---
  const renderDeployment = () => {
    const deployments = [
      { id: 'DEP-001', model: 'Llama-3-70B', engine: 'vLLM', mode: '分布式', resource: '8x A100 80GB', status: 'running' },
      { id: 'DEP-002', model: 'Qwen-Max', engine: 'TGI', mode: '分布式', resource: '4x A100 40GB', status: 'running' },
      { id: 'DEP-003', model: 'DeepSeek-V3', engine: 'vLLM', mode: '分布式', resource: '16x H100 80GB', status: 'stopped' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">模型推理部署管理</h1>
            <p className="text-gray-500 mt-1 text-sm">分布式推理部署，灵活调整资源规格与扩缩容策略</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            新建部署任务
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-blue-600" />
              部署参数配置
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">推理引擎</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm">
                  <option>vLLM (推荐)</option>
                  <option>TGI</option>
                  <option>TensorRT-LLM</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">资源规格</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm">
                  <option>8x A100 80GB</option>
                  <option>4x A100 80GB</option>
                  <option>2x A100 80GB</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">并发参数 (Max Batch)</label>
                <input type="number" defaultValue={128} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">扩缩容策略</label>
                <div className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded-md">
                  <span className="text-xs text-gray-600">自动扩缩容</span>
                  <button className="w-8 h-4 bg-blue-600 rounded-full relative">
                    <div className="absolute right-1 top-0.5 w-3 h-3 bg-white rounded-full" />
                  </button>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
              保存配置
            </button>
          </div>

          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">部署任务列表</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="搜索任务..." className="pl-10 pr-4 py-1.5 bg-white border border-gray-200 rounded-md text-sm focus:outline-none" />
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><RefreshCw className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">部署 ID</th>
                    <th className="px-6 py-4">关联模型</th>
                    <th className="px-6 py-4">引擎类型</th>
                    <th className="px-6 py-4">部署方式</th>
                    <th className="px-6 py-4">资源配置</th>
                    <th className="px-6 py-4">状态</th>
                    <th className="px-6 py-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {deployments.map((dep) => (
                    <tr key={dep.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono text-gray-500">{dep.id}</td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-900">{dep.model}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dep.engine}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dep.mode}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{dep.resource}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <div className={cn("w-1.5 h-1.5 rounded-full", dep.status === 'running' ? "bg-green-500" : "bg-gray-300")} />
                          <span className="text-xs text-gray-600">{dep.status === 'running' ? '运行中' : '已停止'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          {dep.status === 'running' ? (
                            <button className="p-1.5 text-gray-400 hover:text-orange-600 transition-colors"><Pause className="w-4 h-4" /></button>
                          ) : (
                            <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors"><Play className="w-4 h-4" /></button>
                          )}
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><RotateCcw className="w-4 h-4" /></button>
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><Terminal className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Sub-page 4: Application Management & Authorization ---
  const renderAuth = () => {
    const apps = [
      { id: 'APP-001', name: '智能客服助手', user: '张三 (研发部)', scope: '全量模型访问', status: 'active' },
      { id: 'APP-002', name: '内容审核系统', user: '李四 (运营部)', scope: '限定模型: Llama-3', status: 'active' },
      { id: 'APP-003', name: '测试应用-01', user: '王五 (测试组)', scope: '只读权限', status: 'disabled' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">应用管理与授权</h1>
            <p className="text-gray-500 mt-1 text-sm">精准划分应用/用户操作权限边界，实现一体化管控</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <ShieldCheck className="w-4 h-4" />
              授权配置
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              新增应用
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="flex gap-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="搜索应用名称..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none" />
              </div>
              <select className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none">
                <option>全部状态</option>
                <option>正常</option>
                <option>已禁用</option>
              </select>
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><RefreshCw className="w-4 h-4" /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">应用 ID</th>
                  <th className="px-6 py-4">应用名称</th>
                  <th className="px-6 py-4">所属用户</th>
                  <th className="px-6 py-4">权限范围</th>
                  <th className="px-6 py-4">状态</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {apps.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{app.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{app.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.user}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{app.scope}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border",
                        app.status === 'active' ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
                      )}>
                        {app.status === 'active' ? '正常' : '已禁用'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="授权"><UserCheck className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="监控"><Activity className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="禁用"><Lock className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="删除"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSubMenu) {
      case 'models': return renderModelLibrary();
      case 'api': return renderApiAccess();
      case 'deploy': return renderDeployment();
      case 'auth': return renderAuth();
      default: return renderModelLibrary();
    }
  };

  return (
    <div className="w-full h-full">
      {renderContent()}
    </div>
  );
}
