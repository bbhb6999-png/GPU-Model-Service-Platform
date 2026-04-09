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
  Gauge
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
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// --- Constants & Mock Data ---

const OPERATOR_TASKS = [
  { id: 'OP-001', name: '大语言模型适配 (LLM)', type: '模型适配', progress: 100, status: '已完成', owner: '张工', deadline: '2026-04-10' },
  { id: 'OP-002', name: '传统小模型适配', type: '模型适配', progress: 85, status: '进行中', owner: '李工', deadline: '2026-04-15' },
  { id: 'OP-003', name: 'MoE 模型适配', type: '模型适配', progress: 60, status: '进行中', owner: '王工', deadline: '2026-04-20' },
  { id: 'OP-004', name: '文生图模型适配 (SDXL)', type: '模型适配', progress: 100, status: '已完成', owner: '赵工', deadline: '2026-04-05' },
  { id: 'OP-005', name: '算子适配 (Custom Ops)', type: '算子开发', progress: 45, status: '进行中', owner: '张工', deadline: '2026-04-25' },
  { id: 'OP-006', name: 'RoCE 高性能组网', type: '网络适配', progress: 90, status: '进行中', owner: '李工', deadline: '2026-04-12' },
  { id: 'OP-007', name: '通信库适配 (HCCL/NCCL)', type: '通信库', progress: 75, status: '进行中', owner: '王工', deadline: '2026-04-18' },
  { id: 'OP-008', name: '带宽测试 (Bandwidth)', type: '性能测试', progress: 100, status: '已完成', owner: '赵工', deadline: '2026-04-08' },
  { id: 'OP-009', name: '算力精度适配 (Precision)', type: '精度测试', progress: 30, status: '待处理', owner: '张工', deadline: '2026-05-01' },
];

const STATUS_COLORS = {
  '已完成': 'text-green-600 bg-green-50 border-green-200',
  '进行中': 'text-blue-600 bg-blue-50 border-blue-200',
  '待处理': 'text-orange-600 bg-orange-50 border-orange-200',
  '异常': 'text-red-600 bg-red-50 border-red-200',
};

const BANDWIDTH_DATA = [
  { time: '10:00', d2h: 25.4, h2d: 24.8, p2p: 18.2, vram: 92 },
  { time: '10:05', d2h: 26.1, h2d: 25.2, p2p: 18.5, vram: 92 },
  { time: '10:10', d2h: 25.8, h2d: 24.9, p2p: 17.9, vram: 93 },
  { time: '10:15', d2h: 24.2, h2d: 23.5, p2p: 16.8, vram: 91 },
  { time: '10:20', d2h: 25.5, h2d: 25.1, p2p: 18.1, vram: 92 },
  { time: '10:25', d2h: 26.4, h2d: 25.8, p2p: 18.8, vram: 94 },
  { time: '10:30', d2h: 26.2, h2d: 25.5, p2p: 18.4, vram: 93 },
];

const PRECISION_DATA = [
  { subject: 'FP32', A: 100, B: 100, fullMark: 100 },
  { subject: 'BF16', A: 98.5, B: 99.2, fullMark: 100 },
  { subject: 'FP16', A: 97.2, B: 98.5, fullMark: 100 },
  { subject: 'FP8', A: 85.4, B: 88.1, fullMark: 100 },
  { subject: 'INT8', A: 78.2, B: 82.5, fullMark: 100 },
  { subject: 'INT4', A: 65.8, B: 72.4, fullMark: 100 },
];

const COMM_LIB_DATA = [
  { name: 'HCCL (Tree)', perf: 92, baseline: 85 },
  { name: 'HCCL (Ring)', perf: 95, baseline: 88 },
  { name: 'NCCL (Tree)', perf: 88, baseline: 85 },
  { name: 'NCCL (Ring)', perf: 91, baseline: 88 },
  { name: 'RCCL', perf: 84, baseline: 82 },
  { name: 'OneCCL', perf: 82, baseline: 80 },
  { name: 'Gloo', perf: 65, baseline: 70 },
  { name: 'MPI', perf: 78, baseline: 75 },
  { name: 'UCX', perf: 81, baseline: 78 },
  { name: 'Libfabric', perf: 79, baseline: 77 },
];

// --- Components ---

export default function OperatorAdaptationView() {
  const [view, setView] = useState<'list' | 'detail' | 'topology' | 'bandwidth' | 'precision' | 'comm'>('list');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [dataSubmitted, setDataSubmitted] = useState(false);

  const statsData = useMemo(() => [
    { name: '已完成', value: 3, color: '#10b981' },
    { name: '进行中', value: 5, color: '#3b82f6' },
    { name: '待处理', value: 1, color: '#f59e0b' },
  ], []);

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    if (task.name.includes('RoCE')) {
      setView('topology');
    } else if (task.name.includes('带宽测试')) {
      setView('bandwidth');
    } else if (task.name.includes('精度适配')) {
      setView('precision');
    } else if (task.name.includes('通信库')) {
      setView('comm');
    } else {
      setView('detail');
    }
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
        <span className="text-gray-900 font-medium">国产芯片算子适配</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">国产芯片算子适配管理</h1>
          <p className="text-sm text-gray-500 mt-1">涵盖大模型、算子、通信库及精度的全栈适配与性能调优</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> 下载适配指导手册
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> 创建适配任务
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
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">总任务进度</p>
            <p className="text-2xl font-bold text-gray-900">72.5%</p>
            <p className="text-[10px] text-blue-600 font-bold mt-1">算子覆盖率 98%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">模型适配状态</p>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-xl font-bold text-green-600">4</p>
              <p className="text-[10px] text-gray-500">已就绪</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-xl font-bold text-blue-600">3</p>
              <p className="text-[10px] text-gray-500">适配中</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-xl font-bold text-orange-500">2</p>
              <p className="text-[10px] text-gray-500">待验证</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">平均算力利用率</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">88.6 <span className="text-xs font-normal text-gray-400">%</span></p>
              <p className="text-[10px] text-blue-500 font-bold">较上月提升 12%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">通信库性能</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">95.2 <span className="text-xs font-normal text-gray-400">Gbps</span></p>
              <p className="text-[10px] text-green-500 font-bold">HCCL 环形算法最优</p>
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
            placeholder="搜索任务名称..." 
            className="text-sm outline-none w-48"
          />
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">任务类型:</span>
          <select className="text-sm font-medium outline-none bg-transparent">
            <option>全部</option>
            <option>模型适配</option>
            <option>算子开发</option>
            <option>网络适配</option>
            <option>性能测试</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">负责人:</span>
          <select className="text-sm font-medium outline-none bg-transparent">
            <option>全部</option>
            <option>张工</option>
            <option>李工</option>
            <option>王工</option>
            <option>赵工</option>
          </select>
        </div>
        <button className="ml-auto flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700">
          <Filter className="w-4 h-4" /> 更多筛选
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
            <tr>
              <th className="px-6 py-4">任务名称</th>
              <th className="px-6 py-4">任务类型</th>
              <th className="px-6 py-4">适配进度</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4">负责人</th>
              <th className="px-6 py-4">计划完成时间</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {OPERATOR_TASKS.map((task) => (
              <tr key={task.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleTaskClick(task)}
                    className="text-sm font-bold text-gray-900 hover:text-blue-600 transition-colors text-left"
                  >
                    {task.name}
                  </button>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{task.type}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden min-w-[80px]">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          task.progress === 100 ? "bg-green-500" : "bg-blue-500"
                        )} 
                        style={{ width: `${task.progress}%` }} 
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-700">{task.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                    STATUS_COLORS[task.status as keyof typeof STATUS_COLORS]
                  )}>
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{task.owner}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.deadline}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => handleTaskClick(task)}
                      className="text-blue-600 hover:text-blue-800 text-xs font-bold"
                    >
                      查看详情
                    </button>
                    <button className="text-gray-400 hover:text-blue-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">共 {OPERATOR_TASKS.length} 条记录</p>
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
        <span className="hover:text-blue-600 cursor-pointer" onClick={() => setView('list')}>国产芯片算子适配</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{selectedTask?.name} 详情</span>
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
                <h1 className="text-2xl font-bold text-gray-900">{selectedTask?.name} 适配详情</h1>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-bold border",
                  STATUS_COLORS[selectedTask?.status as keyof typeof STATUS_COLORS]
                )}>
                  {selectedTask?.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">任务 ID: {selectedTask?.id} | 类型: {selectedTask?.type} | 负责人: {selectedTask?.owner}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" /> 适配指导手册
            </button>
            <button 
              onClick={() => setIsDataModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-md text-sm font-medium text-white hover:bg-orange-700 transition-colors shadow-sm"
            >
              <FileCheck className="w-4 h-4" /> 反馈测试数据
            </button>
            <button 
              disabled={!dataSubmitted}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm",
                dataSubmitted ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              <ShieldCheck className="w-4 h-4" /> 标记完成
            </button>
          </div>
        </div>

        {/* Process Flow */}
        <div className="px-8 py-8 bg-gray-50/50 rounded-xl border border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">适配全流程节点</h3>
          <div className="flex items-center">
            {[
              { label: '环境准备', status: 'completed', time: '04-01' },
              { label: '算子开发', status: 'completed', time: '04-03' },
              { label: '功能验证', status: 'processing', time: '进行中' },
              { label: '性能调优', status: 'pending', time: '待处理' },
              { label: '数据反馈', status: 'pending', time: '待处理' },
              { label: '任务闭环', status: 'pending', time: '待处理' },
            ].map((node, i, arr) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center relative z-10">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                    node.status === 'completed' ? "bg-green-500 border-green-500 text-white" :
                    node.status === 'processing' ? "bg-white border-blue-500 text-blue-500 shadow-lg shadow-blue-100" :
                    "bg-white border-gray-200 text-gray-300"
                  )}>
                    {node.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : (i + 1)}
                  </div>
                  <span className={cn(
                    "mt-3 text-[11px] font-bold",
                    node.status === 'completed' ? "text-green-600" :
                    node.status === 'processing' ? "text-blue-600" : "text-gray-400"
                  )}>{node.label}</span>
                  <span className="text-[9px] text-gray-400 mt-1">{node.time}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className={cn(
                    "flex-1 h-0.5 mx-2 -mt-10",
                    node.status === 'completed' ? "bg-green-500" : "bg-gray-100"
                  )} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-blue-600" />
              详细技术参数
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: '芯片架构', value: '国产 NPU 架构' },
                { label: '算子库版本', value: 'CANN 7.0 / ROCm 6.0' },
                { label: '并行策略', value: 'TP/PP/DP 混合并行' },
                { label: '内存优化', value: 'FlashAttention-2 / PageAttention' },
                { label: '量化方案', value: 'SmoothQuant / GPTQ' },
                { label: '通信协议', value: 'RoCE v2' },
              ].map((param, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50">
                  <span className="text-sm text-gray-500">{param.label}</span>
                  <span className="text-sm font-bold text-gray-900">{param.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-gray-400" />
              适配操作日志
            </h3>
            <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
              {[
                { user: '张工', action: '完成了 FlashAttention 算子融合优化', time: '2026-04-05 14:20' },
                { user: '系统', action: '自动触发了模型精度校验任务', time: '2026-04-03 09:00' },
                { user: '李工', action: '更新了通信库拓扑映射文件', time: '2026-04-01 16:45' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 relative pl-8">
                  <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{log.user} • {log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              异常故障单 (1)
            </h3>
            <div className="p-4 bg-red-50 rounded-xl border border-red-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-red-200 text-red-700 uppercase">P0 级故障</span>
                <span className="text-[10px] text-red-600 font-bold">处理中</span>
              </div>
              <p className="text-xs font-bold text-gray-800">多机多卡通信超时 (HCCL Timeout)</p>
              <p className="text-[10px] text-gray-500 mt-2">发生于：2026-04-07 10:30</p>
              <button className="mt-4 w-full py-2 bg-white border border-red-200 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition-colors">
                查看故障详情
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              任务报告
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors group">
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                  <span className="text-xs font-bold text-gray-700">阶段性测试报告.pdf</span>
                </div>
                <Download className="w-3 h-3 text-gray-400 group-hover:text-blue-500" />
              </button>
              <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
                生成最终验收报告
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
          <h1 className="text-2xl font-bold text-gray-900">RoCE 集群拓扑可视化</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700">
            <RefreshCw className="w-4 h-4" /> 实时刷新
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white">
            <Share2 className="w-4 h-4" /> 导出拓扑
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 h-[600px] relative overflow-hidden flex items-center justify-center p-12">
        {/* Simplified Cluster Topology */}
        <svg className="w-full h-full" viewBox="0 0 800 500">
          {/* Spine Switches */}
          <g transform="translate(300, 50)">
            <rect width="200" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="100" y="25" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">RoCE Spine Switch Cluster</text>
          </g>

          {/* Connections */}
          {[150, 350, 550].map((x, i) => (
            <path key={i} d={`M${x+50} 180 L400 90`} stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,4" className="animate-pulse" />
          ))}

          {/* Leaf Switches */}
          {[150, 350, 550].map((x, i) => (
            <g key={i} transform={`translate(${x}, 180)`}>
              <rect width="100" height="40" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
              <text x="50" y="25" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Leaf-{i+1}</text>
            </g>
          ))}

          {/* GPU Nodes */}
          {[100, 200, 300, 400, 500, 600, 700].map((x, i) => (
            <g key={i}>
              <path d={`M${x} 350 L${i < 3 ? 200 : i < 5 ? 400 : 600} 220`} stroke="#10b981" strokeWidth="1" />
              <g transform={`translate(${x-20}, 350)`}>
                <rect width="40" height="30" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                <text x="20" y="20" textAnchor="middle" fill="#10b981" fontSize="8">GPU-{i+1}</text>
              </g>
            </g>
          ))}
        </svg>

        {/* Status Overlay */}
        <div className="absolute top-6 right-6 space-y-4">
          <div className="bg-slate-800/80 backdrop-blur p-4 rounded-xl border border-slate-700 w-64">
            <h4 className="text-xs font-bold text-white mb-3">集群流量概览</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400">总吞吐量</span>
                <span className="text-xs font-bold text-green-400">1.2 Tbps</span>
              </div>
              <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[75%]" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400">平均延迟</span>
                <span className="text-xs font-bold text-blue-400">1.15 μs</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400">PFC 暂停帧</span>
                <span className="text-xs font-bold text-orange-400">12 / s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBandwidthView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold text-gray-900">带宽测试实时监控</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700">
            <RefreshCw className="w-4 h-4" /> 开始测试
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white">
            <Download className="w-4 h-4" /> 导出测试数据
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-blue-500" />
            Device to Host / Host to Device (GB/s)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={BANDWIDTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Legend iconType="circle" />
                <Line type="monotone" dataKey="d2h" name="D2H" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="h2d" name="H2D" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-purple-500" />
            P2P Bandwidth (GB/s)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={BANDWIDTH_DATA}>
                <defs>
                  <linearGradient id="colorP2P" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="p2p" name="P2P" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorP2P)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-orange-500" />
            显存带宽与利用率 (VRAM)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BANDWIDTH_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} />
                  <RechartsTooltip />
                  <Bar dataKey="vram" name="VRAM 利用率 (%)" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-6">
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-100">
                <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">峰值显存带宽</p>
                <p className="text-2xl font-bold text-orange-600">2.4 TB/s</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">平均 P2P 延迟</p>
                <p className="text-2xl font-bold text-blue-600">1.8 μs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrecisionView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold text-gray-900">算力精度适配分析</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700">
            <RefreshCw className="w-4 h-4" /> 重新校验
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white">
            <Download className="w-4 h-4" /> 导出精度报告
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm flex flex-col items-center">
          <h3 className="font-bold text-gray-800 mb-8 self-start flex items-center gap-2">
            <Target className="w-5 h-5 text-red-500" />
            各精度等级与基线对比 (Radar Chart)
          </h3>
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={PRECISION_DATA}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="国产芯片 A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                <Radar name="行业基线 B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                <Legend />
                <RechartsTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">精度详细数据表</h3>
          <div className="space-y-4">
            {PRECISION_DATA.map((item, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold text-gray-900">{item.subject}</span>
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded",
                    item.A >= 95 ? "bg-green-100 text-green-600" : 
                    item.A >= 80 ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"
                  )}>
                    {item.A >= 95 ? '高精度' : item.A >= 80 ? '中精度' : '低精度'}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 mb-1">实测值</p>
                    <p className="text-sm font-bold text-blue-600">{item.A}%</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 mb-1">基线值</p>
                    <p className="text-sm font-bold text-gray-400">{item.B}%</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 mb-1">偏差</p>
                    <p className={cn(
                      "text-sm font-bold",
                      Math.abs(item.A - item.B) < 1 ? "text-green-500" : "text-red-500"
                    )}>{(item.A - item.B).toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCommView = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('list')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft className="w-5 h-5" /></button>
          <h1 className="text-2xl font-bold text-gray-900">通信库性能对比 (Tree vs Ring)</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700">
            <Settings2 className="w-4 h-4" /> 算法配置
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white">
            <BarChart3 className="w-4 h-4" /> 导出性能分析
          </button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-8 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          10 种通信库性能实测对比 (Gbps)
        </h3>
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={COMM_LIB_DATA} layout="vertical" margin={{ left: 40 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" fontSize={10} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" fontSize={10} axisLine={false} tickLine={false} width={100} />
              <RechartsTooltip />
              <Legend />
              <Bar dataKey="perf" name="实测性能" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              <Bar dataKey="baseline" name="理论峰值" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderDataModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="px-8 py-5 border-b flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">反馈测试数据</h2>
              <p className="text-xs text-gray-500 mt-0.5">任务: {selectedTask?.name}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsDataModalOpen(false)} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">测试吞吐量 (TFLOPS)</label>
              <input type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" placeholder="请输入实测数值" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">精度损失 (%)</label>
              <input type="number" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none" placeholder="请输入实测数值" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">测试环境备注</label>
            <textarea 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px]"
              placeholder="请描述测试使用的硬件环境、软件版本及关键配置参数..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">上传测试日志/截图</label>
            <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 transition-colors cursor-pointer">
              <div className="space-y-1 text-center">
                <Plus className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <span className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                    点击上传文件
                  </span>
                  <p className="pl-1">或拖拽至此处</p>
                </div>
                <p className="text-xs text-gray-500">支持 PNG, JPG, PDF, LOG (最大 10MB)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-t bg-gray-50/80 flex justify-end gap-3">
          <button 
            onClick={() => setIsDataModalOpen(false)}
            className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-white transition-colors"
          >
            取消
          </button>
          <button 
            onClick={() => {
              setDataSubmitted(true);
              setIsDataModalOpen(false);
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
          >
            提交反馈
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (view) {
      case 'list': return renderListView();
      case 'detail': return renderDetailView();
      case 'topology': return renderTopologyView();
      case 'bandwidth': return renderBandwidthView();
      case 'precision': return renderPrecisionView();
      case 'comm': return renderCommView();
      default: return renderListView();
    }
  };

  return (
    <div className="w-full h-full">
      {renderContent()}
      {isDataModalOpen && renderDataModal()}
    </div>
  );
}
