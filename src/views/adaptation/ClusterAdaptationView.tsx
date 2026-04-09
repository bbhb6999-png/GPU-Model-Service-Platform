import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Download, 
  RefreshCw, 
  Search, 
  Filter, 
  FileText, 
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  ArrowLeft,
  MoreHorizontal,
  FileCheck,
  AlertTriangle,
  Users,
  MapPin,
  Calendar,
  Tag,
  Layers,
  Activity,
  ClipboardList,
  Network,
  Database,
  Monitor,
  SearchCode,
  Zap,
  ArrowRightLeft,
  Settings2,
  BarChart3,
  ShieldCheck,
  Workflow,
  Cpu,
  Server,
  Share2,
  Eye,
  MessageSquare,
  History,
  CheckCircle,
  TrendingUp,
  Box,
  Target,
  Gauge,
  Play,
  Square,
  Trash2,
  Terminal,
  RotateCcw,
  HardDrive,
  Globe
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// --- Constants & Mock Data ---

const INSTANCES = [
  { 
    id: 'INS-001', 
    type: '裸金属', 
    gpu: '8 * 昇腾 910B', 
    ip: '10.240.1.10', 
    access: 'SSH / WebShell', 
    status: 'running', 
    jobType: '全参微调', 
    framework: 'MindSpore', 
    owner: '张工',
    cpu: '128C',
    ram: '512G',
    disk: '2TB NVMe'
  },
  { 
    id: 'INS-002', 
    type: '虚机直通', 
    gpu: '4 * 昇腾 910B', 
    ip: '10.240.1.11', 
    access: 'VNC', 
    status: 'stopped', 
    jobType: 'LoRA 微调', 
    framework: 'PyTorch', 
    owner: '李工',
    cpu: '64C',
    ram: '256G',
    disk: '1TB SSD'
  },
  { 
    id: 'INS-003', 
    type: 'vGPU', 
    gpu: '1 * 昇腾 910B (1/4)', 
    ip: '10.240.2.45', 
    access: 'WebShell', 
    status: 'error', 
    jobType: '分布式推理', 
    framework: 'MindIE', 
    owner: '王工',
    cpu: '16C',
    ram: '64G',
    disk: '500G SSD'
  },
  { 
    id: 'INS-004', 
    type: '容器化', 
    gpu: '2 * 昇腾 910B', 
    ip: '10.240.3.12', 
    access: 'K8s Exec', 
    status: 'running', 
    jobType: '模型预训练', 
    framework: 'DeepSpeed', 
    owner: '赵工',
    cpu: '32C',
    ram: '128G',
    disk: '1TB SSD'
  },
  { 
    id: 'INS-005', 
    type: '裸金属', 
    gpu: '8 * 昇腾 910B', 
    ip: '10.240.1.15', 
    access: 'SSH', 
    status: 'running', 
    jobType: '分布式推理', 
    framework: 'vLLM', 
    owner: '孙工',
    cpu: '128C',
    ram: '512G',
    disk: '2TB NVMe'
  },
];

const ADAPTATION_CAPABILITIES = [
  'GPU-Operator 调度', '自研 GPU 调度框架', '预训练 / 增量预训练', 
  '全参微调', 'LoRA / QLoRA 微调', '多机并行训练', 
  '卡粒度分布式推理', '单机多卡推理', '多机分布式推理', 
  '业务维度深度监控', 'GPU 故障感知', '作业自动恢复 (Checkpoint)'
];

const MONITOR_DATA = [
  { time: '14:00', gpu: 85, vram: 72, net: 45, tps: 120 },
  { time: '14:05', gpu: 88, vram: 75, net: 48, tps: 125 },
  { time: '14:10', gpu: 92, vram: 82, net: 52, tps: 132 },
  { time: '14:15', gpu: 78, vram: 85, net: 42, tps: 115 },
  { time: '14:20', gpu: 84, vram: 88, net: 46, tps: 122 },
  { time: '14:25', gpu: 89, vram: 90, net: 50, tps: 128 },
  { time: '14:30', gpu: 95, vram: 92, net: 55, tps: 138 },
];

const STATUS_COLORS = {
  'running': 'text-green-600 bg-green-50 border-green-200',
  'stopped': 'text-gray-500 bg-gray-50 border-gray-200',
  'error': 'text-red-600 bg-red-50 border-red-200',
  'starting': 'text-blue-600 bg-blue-50 border-blue-200',
};

// --- Components ---

export default function ClusterAdaptationView() {
  const [view, setView] = useState<'list' | 'detail' | 'monitor' | 'logs' | 'topology'>('list');
  const [selectedInstance, setSelectedInstance] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const statsData = useMemo(() => [
    { name: '运行中', value: 18, color: '#10b981' },
    { name: '已停止', value: 4, color: '#94a3b8' },
    { name: '异常', value: 2, color: '#ef4444' },
  ], []);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === INSTANCES.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(INSTANCES.map(i => i.id));
    }
  };

  const handleAction = (instance: any, targetView: typeof view) => {
    setSelectedInstance(instance);
    setView(targetView);
  };

  // --- Render Functions ---

  const renderListView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-500 gap-2">
        <span className="hover:text-blue-600 cursor-pointer">首页</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">适配服务</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">小集群适配优化</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">小集群训练/推理/微调适配优化</h1>
          <p className="text-sm text-gray-500 mt-1">国产芯片集群实例全生命周期管理，支持裸金属、虚机及容器化部署，集成故障感知与自动恢复</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> 导出实例
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> 创建实例
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-6">
          <div className="w-20 h-20 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statsData}
                  innerRadius={25}
                  outerRadius={35}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">实例运行状态</p>
            <p className="text-2xl font-bold text-gray-900">24 <span className="text-xs font-normal text-gray-400">总数</span></p>
            <p className="text-[10px] text-green-600 font-bold mt-1">18 个运行中</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">作业类型分布</p>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-xl font-bold text-blue-600">8</p>
              <p className="text-[10px] text-gray-500">训练</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-xl font-bold text-purple-600">12</p>
              <p className="text-[10px] text-gray-500">微调</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-xl font-bold text-indigo-600">4</p>
              <p className="text-[10px] text-gray-500">推理</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">算力池利用率</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">82.5 <span className="text-xs font-normal text-gray-400">%</span></p>
              <p className="text-[10px] text-blue-500 font-bold">资源分配率 94%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">故障自愈统计</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">15 <span className="text-xs font-normal text-gray-400">次</span></p>
              <p className="text-[10px] text-green-500 font-bold">本周自动恢复成功率 100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-6 items-center">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="搜索实例 ID / IP..." 
            className="text-sm outline-none w-48"
          />
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">实例类型:</span>
          <select className="text-sm font-medium outline-none bg-transparent">
            <option>全部</option>
            <option>裸金属</option>
            <option>虚机直通</option>
            <option>vGPU</option>
            <option>容器化</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">状态:</span>
          <select className="text-sm font-medium outline-none bg-transparent">
            <option>全部</option>
            <option>运行中</option>
            <option>已停止</option>
            <option>异常</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">作业类型:</span>
          <select className="text-sm font-medium outline-none bg-transparent">
            <option>全部</option>
            <option>预训练</option>
            <option>LoRA 微调</option>
            <option>全参微调</option>
            <option>分布式推理</option>
          </select>
        </div>
        <button className="ml-auto flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
          <Filter className="w-4 h-4" /> 更多筛选
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
          <div className="flex items-center gap-4">
            <input 
              type="checkbox" 
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={selectedIds.length === INSTANCES.length}
              onChange={toggleSelectAll}
            />
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">批量操作</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">启动</button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-600 hover:bg-gray-50 transition-colors">停止</button>
              <button className="px-3 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-red-600 hover:bg-red-50 transition-colors">删除</button>
            </div>
          </div>
          <p className="text-xs text-gray-400">已选择 {selectedIds.length} 个实例</p>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
            <tr>
              <th className="px-6 py-4 w-10"></th>
              <th className="px-6 py-4">实例 ID / 类型</th>
              <th className="px-6 py-4">GPU 信息 / IP</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4">作业类型 / 框架</th>
              <th className="px-6 py-4">负责人</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {INSTANCES.map((ins) => (
              <tr key={ins.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedIds.includes(ins.id)}
                    onChange={() => toggleSelect(ins.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-blue-600">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{ins.id}</p>
                      <p className="text-[10px] text-gray-400">{ins.type}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-700">{ins.gpu}</p>
                  <p className="text-[10px] text-gray-400 font-mono">{ins.ip}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                    STATUS_COLORS[ins.status as keyof typeof STATUS_COLORS]
                  )}>
                    <span className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      ins.status === 'running' ? "bg-green-500 animate-pulse" : 
                      ins.status === 'error' ? "bg-red-500" : "bg-gray-400"
                    )} />
                    {ins.status === 'running' ? '运行中' : ins.status === 'stopped' ? '已停止' : '异常'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-700">{ins.jobType}</p>
                  <p className="text-[10px] text-gray-400">{ins.framework}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{ins.owner}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleAction(ins, 'detail')}
                      className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                      title="查看详情"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleAction(ins, 'monitor')}
                      className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                      title="业务监控"
                    >
                      <Activity className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleAction(ins, 'logs')}
                      className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                      title="作业日志"
                    >
                      <Terminal className="w-4 h-4" />
                    </button>
                    {ins.jobType === '分布式推理' && (
                      <button 
                        onClick={() => handleAction(ins, 'topology')}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
                        title="推理拓扑"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    )}
                    <div className="w-px h-4 bg-gray-200 mx-1 self-center" />
                    <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">共 {INSTANCES.length} 条记录</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-400 cursor-not-allowed">上一页</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-xs font-bold">1</button>
            <button className="px-3 py-1 bg-white border border-gray-200 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">下一页</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDetailView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Breadcrumbs */}
      <nav className="flex text-sm text-gray-500 gap-2">
        <span className="hover:text-blue-600 cursor-pointer" onClick={() => setView('list')}>首页</span>
        <span>/</span>
        <span className="hover:text-blue-600 cursor-pointer" onClick={() => setView('list')}>适配服务</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{selectedInstance?.id} 详情</span>
      </nav>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setView('list')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-500" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">实例详情 - {selectedInstance?.id}</h1>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-bold border",
                  STATUS_COLORS[selectedInstance?.status as keyof typeof STATUS_COLORS]
                )}>
                  {selectedInstance?.status === 'running' ? '运行中' : '已停止'}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">实例类型: {selectedInstance?.type} | 负责人: {selectedInstance?.owner} | 访问方式: {selectedInstance?.access}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <RotateCcw className="w-4 h-4" /> 重启实例
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Play className="w-4 h-4" /> 启动作业
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">GPU 配置</p>
            <p className="text-lg font-bold text-gray-800">{selectedInstance?.gpu}</p>
            <p className="text-[10px] text-blue-500 font-bold">驱动版本: v535.104</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">计算资源 (CPU/RAM)</p>
            <p className="text-lg font-bold text-gray-800">{selectedInstance?.cpu} / {selectedInstance?.ram}</p>
            <p className="text-[10px] text-gray-400">存储: {selectedInstance?.disk}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">当前作业</p>
            <p className="text-lg font-bold text-blue-600">{selectedInstance?.jobType}</p>
            <p className="text-[10px] text-gray-400">框架: {selectedInstance?.framework}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">内网 IP 地址</p>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <p className="text-lg font-mono font-bold text-gray-800">{selectedInstance?.ip}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              12 项核心适配优化能力
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {ADAPTATION_CAPABILITIES.map((cap, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-gray-700">{cap}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Workflow className="w-5 h-5 text-purple-600" />
              作业调度策略
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                <div>
                  <p className="text-sm font-bold text-purple-900">故障感知与自动恢复 (Self-Healing)</p>
                  <p className="text-xs text-purple-700 mt-1">当检测到 GPU XID 错误或 ECC 异常时，自动触发作业 Checkpoint 并重新调度。</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-purple-600 bg-white px-2 py-1 rounded border border-purple-200">已开启</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">资源抢占策略</p>
                  <p className="text-sm font-bold text-gray-800">高优先级抢占 (Preemptible)</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">亲和性配置</p>
                  <p className="text-sm font-bold text-gray-800">GPU 拓扑亲和 (NVLink Aware)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-gray-400" />
              最近操作记录
            </h3>
            <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
              {[
                { user: '张工', action: '启动了全参微调作业', time: '2026-04-08 10:20' },
                { user: '系统', action: '检测到 GPU 0 故障，已自动恢复作业', time: '2026-04-07 15:45' },
                { user: '系统', action: '实例 INS-001 自动扩容 CPU 至 128C', time: '2026-04-06 09:00' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 relative pl-8">
                  <div className={cn(
                    "absolute left-0 top-1.5 w-5 h-5 rounded-full bg-white border-2 flex items-center justify-center",
                    log.action.includes('故障') ? "border-red-500" : "border-blue-500"
                  )}>
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      log.action.includes('故障') ? "bg-red-500" : "bg-blue-500"
                    )} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 leading-tight">{log.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{log.user} • {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              实时负载概览
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">GPU 利用率</span>
                  <span className="font-bold text-gray-900">85%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '85%' }} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-500">显存占用 (VRAM)</span>
                  <span className="font-bold text-gray-900">72%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '72%' }} />
                </div>
              </div>
              <button 
                onClick={() => setView('monitor')}
                className="w-full mt-4 py-2 bg-gray-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-50 transition-colors"
              >
                查看详细监控图表
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMonitorView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold text-gray-900">业务维度实时监控 - {selectedInstance?.id}</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4" /> 最近 1 小时
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white">
            <Download className="w-4 h-4" /> 导出监控报告
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            GPU 利用率与显存占用 (%)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONITOR_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="gpu" name="GPU 利用率" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="vram" name="显存占用" stroke="#8b5cf6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Globe className="w-5 h-5 text-green-500" />
            网络吞吐量 (Gbps)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONITOR_DATA}>
                <defs>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="net" name="网络吞吐" stroke="#10b981" fillOpacity={1} fill="url(#colorNet)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-500" />
            推理吞吐量 (Tokens/s)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MONITOR_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Bar dataKey="tps" name="Tokens/s" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLogsView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold text-gray-900">作业日志与故障感知 - {selectedInstance?.id}</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700">
            <Download className="w-4 h-4" /> 下载完整日志
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white">
            <RefreshCw className="w-4 h-4" /> 实时刷新
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-6 font-mono text-xs text-slate-300 overflow-hidden flex flex-col h-[600px]">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-slate-500">instance_logs.sh</span>
          </div>
          <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
            <p className="text-slate-500">[2026-04-08 14:00:01] INFO: Starting MindSpore training job...</p>
            <p className="text-slate-500">[2026-04-08 14:00:05] INFO: Loading dataset from /data/llm_pretrain...</p>
            <p className="text-slate-500">[2026-04-08 14:01:12] INFO: Epoch 1, Step 100, Loss: 4.253, Throughput: 120.5 tokens/s</p>
            <p className="text-slate-500">[2026-04-08 14:05:22] INFO: Epoch 1, Step 500, Loss: 3.842, Throughput: 125.2 tokens/s</p>
            <p className="text-red-400 font-bold">[2026-04-08 14:07:45] ERROR: GPU 0 detected XID 31 (Memory Error)</p>
            <p className="text-yellow-400">[2026-04-08 14:07:46] WARN: Fault Perception triggered. Initiating job pause...</p>
            <p className="text-blue-400">[2026-04-08 14:07:48] INFO: Checkpoint saved to /checkpoints/last_stable.ckpt</p>
            <p className="text-blue-400">[2026-04-08 14:07:50] INFO: Rescheduling instance to healthy node...</p>
            <p className="text-green-400 font-bold">[2026-04-08 14:08:15] SUCCESS: Job resumed from step 500 on node 10.240.1.15</p>
            <p className="text-slate-500">[2026-04-08 14:10:01] INFO: Epoch 1, Step 600, Loss: 3.712, Throughput: 122.8 tokens/s</p>
            <p className="text-slate-500">[2026-04-08 14:15:01] INFO: Epoch 1, Step 1000, Loss: 3.521, Throughput: 130.5 tokens/s</p>
            <div className="animate-pulse inline-block w-2 h-4 bg-slate-500 ml-1" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              故障感知与自愈记录
            </h3>
            <div className="space-y-4">
              {[
                { type: 'GPU XID 错误', status: '已修复', time: '14:07:45', action: '自动迁移' },
                { type: 'ECC 内存异常', status: '已隔离', time: '昨天 10:20', action: '节点下线' },
                { type: 'RDMA 链路中断', status: '已恢复', time: '前天 09:15', action: '链路重选' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-gray-800">{item.type}</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">{item.status}</span>
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-500">
                    <span>处理动作: {item.action}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-blue-500" />
              自动恢复策略 (Checkpoint)
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">保存频率</span>
                <span className="font-bold text-gray-900">每 500 Steps</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">存储路径</span>
                <span className="font-bold text-gray-900">/nas/checkpoints/</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">保留版本</span>
                <span className="font-bold text-gray-900">最近 3 个</span>
              </div>
              <button className="w-full mt-2 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
                配置恢复策略
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTopologyView = () => (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold text-gray-900">多机分布式推理拓扑可视化 - {selectedInstance?.id}</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700">
            <RefreshCw className="w-4 h-4" /> 刷新拓扑
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white">
            <Share2 className="w-4 h-4" /> 导出架构图
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 h-[600px] relative overflow-hidden flex items-center justify-center p-12">
        {/* Distributed Inference Topology */}
        <svg className="w-full h-full" viewBox="0 0 800 500">
          {/* Load Balancer */}
          <g transform="translate(350, 40)">
            <rect width="100" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="50" y="25" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Load Balancer</text>
          </g>

          {/* Connections from LB */}
          <path d="M400 80 L200 150" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,4" className="animate-pulse" />
          <path d="M400 80 L600 150" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,4" className="animate-pulse" />

          {/* Inference Nodes */}
          {[200, 600].map((x, i) => (
            <g key={i} transform={`translate(${x-60}, 150)`}>
              <rect width="120" height="50" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
              <text x="60" y="30" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Inference Node {i+1}</text>
              <text x="60" y="42" textAnchor="middle" fill="#8b5cf6" fontSize="8">10.240.1.{10+i}</text>
            </g>
          ))}

          {/* Intra-node connections (NVLink) */}
          <path d="M200 200 L200 300" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2,2" />
          <path d="M600 200 L600 300" stroke="#f59e0b" strokeWidth="2" strokeDasharray="2,2" />
          
          {/* Inter-node connections (RoCE) */}
          <path d="M200 175 L600 175" stroke="#10b981" strokeWidth="2" className="animate-pulse" />

          {/* GPU Cards */}
          {[140, 260, 540, 660].map((x, i) => (
            <g key={i} transform={`translate(${x-30}, 300)`}>
              <rect width="60" height="40" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
              <text x="30" y="25" textAnchor="middle" fill="#10b981" fontSize="8">GPU-{i % 2}</text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-slate-800/80 backdrop-blur p-4 rounded-xl border border-slate-700 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-[10px] text-slate-300">HTTP/gRPC 请求</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-[10px] text-slate-300">RoCE v2 (Inter-node)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500" />
            <span className="text-[10px] text-slate-300">NVLink (Intra-node)</span>
          </div>
        </div>

        {/* Info Panel */}
        <div className="absolute top-6 left-6 w-64 bg-slate-800/80 backdrop-blur p-4 rounded-xl border border-slate-700">
          <h4 className="text-xs font-bold text-white mb-4">分布式推理架构</h4>
          <div className="space-y-3">
            <div className="p-2 bg-slate-900 rounded border border-slate-700">
              <p className="text-[10px] text-slate-400">并行策略</p>
              <p className="text-sm font-bold text-white">TP=2, PP=1, DP=2</p>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-700">
              <p className="text-[10px] text-slate-400">推理引擎</p>
              <p className="text-sm font-bold text-blue-400">vLLM / MindIE</p>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-700">
              <p className="text-[10px] text-slate-400">平均端到端延迟</p>
              <p className="text-sm font-bold text-green-400">45 ms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case 'list': return renderListView();
      case 'detail': return renderDetailView();
      case 'monitor': return renderMonitorView();
      case 'logs': return renderLogsView();
      case 'topology': return renderTopologyView();
      default: return renderListView();
    }
  };

  return (
    <div className="w-full h-full">
      {renderContent()}
    </div>
  );
}
