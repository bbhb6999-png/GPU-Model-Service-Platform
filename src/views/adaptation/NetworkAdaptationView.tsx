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
  CheckCircle
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
  Area
} from 'recharts';

// --- Constants & Mock Data ---

const ADAPTATION_METRICS = [
  { id: 'NET-001', name: '参数 RoCE 网络', type: '网络配置', progress: 100, status: '已完成', owner: '李工', deadline: '2026-04-10' },
  { id: 'NET-002', name: '存储 ROCE 网络对接', type: '存储对接', progress: 85, status: '进行中', owner: '王工', deadline: '2026-04-15' },
  { id: 'NET-003', name: 'ROCE 网络管理软件端网拓扑可视', type: '可视化', progress: 60, status: '进行中', owner: '赵工', deadline: '2026-04-20' },
  { id: 'NET-004', name: 'GPU 服务器监控', type: '监控', progress: 100, status: '已完成', owner: '张工', deadline: '2026-04-05' },
  { id: 'NET-005', name: '性能数据显示', type: '监控', progress: 90, status: '进行中', owner: '李工', deadline: '2026-04-12' },
  { id: 'NET-006', name: 'GPU 侧巡检', type: '巡检', progress: 45, status: '进行中', owner: '王工', deadline: '2026-04-25' },
  { id: 'NET-007', name: '基础及深度检测', type: '检测', progress: 20, status: '待处理', owner: '赵工', deadline: '2026-05-01' },
  { id: 'NET-008', name: '问题诊断分析故障闭环', type: '诊断', progress: 75, status: '进行中', owner: '张工', deadline: '2026-04-18' },
  { id: 'NET-009', name: '集合通信库对接流量调优', type: '调优', progress: 30, status: '待处理', owner: '李工', deadline: '2026-05-10' },
];

const STATUS_COLORS = {
  '已完成': 'text-green-600 bg-green-50 border-green-200',
  '进行中': 'text-blue-600 bg-blue-50 border-blue-200',
  '待处理': 'text-orange-600 bg-orange-50 border-orange-200',
  '异常': 'text-red-600 bg-red-50 border-red-200',
};

const MONITOR_DATA = [
  { time: '10:00', latency: 1.2, bandwidth: 85 },
  { time: '10:05', latency: 1.4, bandwidth: 88 },
  { time: '10:10', latency: 1.1, bandwidth: 92 },
  { time: '10:15', latency: 1.8, bandwidth: 78 },
  { time: '10:20', latency: 1.3, bandwidth: 84 },
  { time: '10:25', latency: 1.2, bandwidth: 89 },
  { time: '10:30', latency: 1.1, bandwidth: 95 },
];

// --- Components ---

export default function NetworkAdaptationView() {
  const [view, setView] = useState<'list' | 'detail' | 'topology' | 'monitor'>('list');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const statsData = useMemo(() => [
    { name: '已完成', value: 2, color: '#10b981' },
    { name: '进行中', value: 5, color: '#3b82f6' },
    { name: '待处理', value: 2, color: '#f59e0b' },
  ], []);

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    if (task.name.includes('拓扑可视')) {
      setView('topology');
    } else if (task.name.includes('监控') || task.name.includes('性能数据')) {
      setView('monitor');
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
        <span className="text-gray-900 font-medium">存储及网络适配</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">存储及网络适配管理</h1>
          <p className="text-sm text-gray-500 mt-1">智算中心 RoCE 网络与高性能存储适配管理，涵盖监控、巡检、调优及故障闭环</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> 下载操作指导手册
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
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">总适配进度</p>
            <p className="text-2xl font-bold text-gray-900">68.2%</p>
            <p className="text-[10px] text-blue-600 font-bold mt-1">RoCE 网络已就绪</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">核心指标状态</p>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-xl font-bold text-green-600">2</p>
              <p className="text-[10px] text-gray-500">已闭环</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-xl font-bold text-blue-600">5</p>
              <p className="text-[10px] text-gray-500">测试中</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-xl font-bold text-orange-500">2</p>
              <p className="text-[10px] text-gray-500">待启动</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">网络流量状态</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-600">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">92.4 <span className="text-xs font-normal text-gray-400">Gbps</span></p>
              <p className="text-[10px] text-green-500 font-bold">RoCE 链路负载正常</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">待处理故障单</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">3 <span className="text-xs font-normal text-gray-400">个</span></p>
              <p className="text-[10px] text-red-500 font-bold">1 个为 P0 级存储超时</p>
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
            <option>网络配置</option>
            <option>存储对接</option>
            <option>监控巡检</option>
            <option>性能调优</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">负责人:</span>
          <select className="text-sm font-medium outline-none bg-transparent">
            <option>全部</option>
            <option>李工</option>
            <option>王工</option>
            <option>张工</option>
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
            {ADAPTATION_METRICS.map((task) => (
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
          <p className="text-xs text-gray-500">共 {ADAPTATION_METRICS.length} 条记录</p>
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
        <span className="hover:text-blue-600 cursor-pointer" onClick={() => setView('list')}>存储及网络适配</span>
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
              <p className="text-sm text-gray-500 mt-1">任务类型: {selectedTask?.type} | 负责人: {selectedTask?.owner} | 截止日期: {selectedTask?.deadline}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" /> 操作指导附件
            </button>
            <button 
              onClick={() => setIsIssueModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-600 rounded-md text-sm font-medium text-white hover:bg-orange-700 transition-colors shadow-sm"
            >
              <AlertTriangle className="w-4 h-4" /> 反馈结果
            </button>
            <button 
              disabled={!feedbackSubmitted}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm",
                feedbackSubmitted ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              <ShieldCheck className="w-4 h-4" /> 任务闭环
            </button>
          </div>
        </div>

        {/* Process Flow */}
        <div className="px-8 py-8 bg-gray-50/50 rounded-xl border border-gray-100">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">适配全流程节点</h3>
          <div className="flex items-center">
            {[
              { label: '任务创建', status: 'completed', time: '04-01' },
              { label: '方案测试', status: 'completed', time: '04-03' },
              { label: '问题单处理', status: 'processing', time: '进行中' },
              { label: '回归测试', status: 'pending', time: '待处理' },
              { label: '结果反馈', status: 'pending', time: '待处理' },
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
              <ClipboardList className="w-5 h-5 text-blue-600" />
              任务详细说明
            </h3>
            <div className="prose prose-sm max-w-none text-gray-600">
              <p>针对 {selectedTask?.name} 的适配工作，主要包含以下核心步骤：</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>环境准备：确认 GPU 服务器 RoCE 网卡固件版本与交换机配置匹配。</li>
                <li>连通性测试：验证端到端 RDMA 连通性，执行 ib_write_bw 压力测试。</li>
                <li>性能基准：记录不同消息大小下的延迟与带宽表现。</li>
                <li>异常模拟：模拟链路闪断、拥塞丢包等场景，验证重传机制。</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-gray-400" />
              操作日志
            </h3>
            <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
              {[
                { user: '李工', action: '提交了初步测试报告', time: '2026-04-05 14:20' },
                { user: '系统', action: '自动触发了性能基准校验', time: '2026-04-03 09:00' },
                { user: '王工', action: '更新了 RoCE 参数配置', time: '2026-04-01 16:45' },
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
              <MessageSquare className="w-5 h-5 text-orange-500" />
              当前问题单 (2)
            </h3>
            <div className="space-y-4">
              {[
                { title: 'RoCE 拥塞控制参数不生效', level: '高', status: '处理中' },
                { title: '大包传输带宽波动异常', level: '中', status: '待回归' },
              ].map((bug, i) => (
                <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className={cn(
                      "text-[9px] font-bold px-2 py-0.5 rounded",
                      bug.level === '高' ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                    )}>{bug.level}优先级</span>
                    <span className="text-[10px] text-gray-400 group-hover:text-blue-600 font-medium">{bug.status}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800">{bug.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-green-500" />
              验收材料
            </h3>
            <div className="p-4 bg-green-50/50 rounded-xl border border-dashed border-green-200 text-center">
              <FileText className="w-10 h-10 text-green-200 mx-auto mb-3" />
              <p className="text-xs text-gray-500">请上传最终测试报告与反馈结果</p>
              <button className="mt-4 px-4 py-1.5 bg-white border border-green-200 rounded-lg text-[10px] font-bold text-green-600 hover:bg-green-50 transition-colors">
                上传文件
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
          <h1 className="text-2xl font-bold text-gray-900">端网拓扑可视化</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700">
            <RefreshCw className="w-4 h-4" /> 实时刷新
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white">
            <Share2 className="w-4 h-4" /> 分享拓扑
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 h-[600px] relative overflow-hidden flex items-center justify-center p-12">
        {/* Simple Simulated Topology SVG */}
        <svg className="w-full h-full" viewBox="0 0 800 500">
          {/* Connections */}
          <path d="M400 100 L200 250" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
          <path d="M400 100 L400 250" stroke="#3b82f6" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M400 100 L600 250" stroke="#ef4444" strokeWidth="2" className="animate-pulse" />
          
          <path d="M200 250 L100 400" stroke="#10b981" strokeWidth="1" />
          <path d="M200 250 L200 400" stroke="#10b981" strokeWidth="1" />
          <path d="M200 250 L300 400" stroke="#10b981" strokeWidth="1" />
          
          <path d="M600 250 L500 400" stroke="#10b981" strokeWidth="1" />
          <path d="M600 250 L600 400" stroke="#10b981" strokeWidth="1" />
          <path d="M600 250 L700 400" stroke="#10b981" strokeWidth="1" />

          {/* Nodes */}
          {/* Core Switch */}
          <g transform="translate(360, 60)">
            <rect width="80" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="40" y="35" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">核心交换机</text>
            <text x="40" y="50" textAnchor="middle" fill="#3b82f6" fontSize="8">RoCE Spine</text>
          </g>

          {/* Leaf Switches */}
          <g transform="translate(160, 220)">
            <rect width="80" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="40" y="35" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Leaf-01</text>
          </g>
          <g transform="translate(360, 220)">
            <rect width="80" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <text x="40" y="35" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Leaf-02</text>
          </g>
          <g transform="translate(560, 220)">
            <rect width="80" height="60" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="2" />
            <text x="40" y="35" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">Leaf-03</text>
            <circle cx="70" cy="10" r="4" fill="#ef4444" className="animate-ping" />
          </g>

          {/* GPU Servers */}
          {[100, 200, 300, 500, 600, 700].map((x, i) => (
            <g key={i} transform={`translate(${x-25}, 380)`}>
              <rect width="50" height="40" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
              <text x="25" y="25" textAnchor="middle" fill="#10b981" fontSize="8">GPU-{i+1}</text>
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-slate-800/80 backdrop-blur p-4 rounded-xl border border-slate-700 space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-[10px] text-slate-300">正常链路 (100G)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-[10px] text-slate-300">RoCE 流量活跃</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[10px] text-slate-300">拥塞告警 (PFC 触发)</span>
          </div>
        </div>

        {/* Info Panel */}
        <div className="absolute top-6 right-6 w-64 bg-slate-800/80 backdrop-blur p-4 rounded-xl border border-slate-700">
          <h4 className="text-xs font-bold text-white mb-4">节点详细状态</h4>
          <div className="space-y-3">
            <div className="p-2 bg-slate-900 rounded border border-slate-700">
              <p className="text-[10px] text-slate-400">当前活跃链路</p>
              <p className="text-sm font-bold text-white">48 / 64</p>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-slate-700">
              <p className="text-[10px] text-slate-400">平均延迟 (μs)</p>
              <p className="text-sm font-bold text-blue-400">1.25</p>
            </div>
            <div className="p-2 bg-slate-900 rounded border border-red-900/50">
              <p className="text-[10px] text-red-400">丢包计数 (24h)</p>
              <p className="text-sm font-bold text-red-500">12</p>
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
          <h1 className="text-2xl font-bold text-gray-900">性能监控与数据显示</h1>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4" /> 最近 24 小时
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white">
            <FileCheck className="w-4 h-4" /> 生成巡检报告
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" />
            RoCE 网络延迟 (μs)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MONITOR_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Line type="monotone" dataKey="latency" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-500" />
            带宽利用率 (%)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONITOR_DATA}>
                <defs>
                  <linearGradient id="colorBand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={10} axisLine={false} tickLine={false} />
                <RechartsTooltip />
                <Area type="monotone" dataKey="bandwidth" stroke="#10b981" fillOpacity={1} fill="url(#colorBand)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">GPU 服务器实时状态巡检</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'GPU 核心温度', value: '62°C', status: 'normal' },
              { label: 'VRAM 占用', value: '78.4 GB', status: 'normal' },
              { label: 'PFC 暂停帧', value: '124', status: 'warning' },
              { label: 'RDMA 错误率', value: '0.0001%', status: 'normal' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{item.label}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">{item.value}</span>
                  <span className={cn(
                    "w-2 h-2 rounded-full",
                    item.status === 'normal' ? "bg-green-500" : "bg-orange-500 animate-pulse"
                  )} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderIssueModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="px-8 py-5 border-b flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">问题单反馈与处理</h2>
              <p className="text-xs text-gray-500 mt-0.5">任务: {selectedTask?.name}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsIssueModalOpen(false)} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">问题描述</label>
            <textarea 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[120px]"
              placeholder="请详细描述测试中发现的问题现象、复现步骤及初步分析..."
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">严重程度</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none">
                <option>P0 - 致命 (系统不可用)</option>
                <option>P1 - 严重 (核心功能受阻)</option>
                <option>P2 - 一般 (非核心功能异常)</option>
                <option>P3 - 优化 (建议性改进)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">处理人</label>
              <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-[10px] font-bold">
                  {selectedTask?.owner.charAt(0)}
                </div>
                <span className="text-sm text-gray-700">{selectedTask?.owner}</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-blue-900">提示：回归测试要求</p>
                <p className="text-[10px] text-blue-700 mt-1 leading-relaxed">
                  提交反馈后，任务状态将变更为“待回归”。只有在回归测试通过并上传验证数据后，方可执行“任务闭环”操作。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-t bg-gray-50/80 flex justify-end gap-3">
          <button 
            onClick={() => setIsIssueModalOpen(false)}
            className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-white transition-colors"
          >
            取消
          </button>
          <button 
            onClick={() => {
              setFeedbackSubmitted(true);
              setIsIssueModalOpen(false);
            }}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg text-sm font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-100"
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
      case 'monitor': return renderMonitorView();
      default: return renderListView();
    }
  };

  return (
    <div className="w-full h-full">
      {renderContent()}
      {isIssueModalOpen && renderIssueModal()}
    </div>
  );
}
