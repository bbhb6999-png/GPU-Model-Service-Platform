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
  Cpu,
  UserCheck,
  Box
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip as RechartsTooltip 
} from 'recharts';

// --- Constants & Mock Data ---

const TEST_ITEMS = [
  '芯片性能测试', '芯片功能验证', 'BIOS 开发测试', 'OS 兼容性测试', 
  '装备备件开发测试', 'repo 开发测试', '单板测试', '信号测试', 
  '系统集成测试', '整机热测试', '整机气候测试', '电磁骚扰测试', 
  '电磁抗扰测试', '压力测试', '机械测试', '可靠性测试'
];

const CHIPS_DATA = [
  { id: 'GPU-001', model: '昇腾 910B', vendor: '华为', productLine: '服务器 A 系列', progress: 85, status: '进行中', priority: '高', owner: '张工', deadline: '2026-05-15' },
  { id: 'GPU-002', model: '昇腾 910C', vendor: '华为', productLine: '服务器 B 系列', progress: 45, status: '进行中', priority: '高', owner: '李工', deadline: '2026-06-20' },
  { id: 'GPU-003', model: '天数智芯 BI-V100', vendor: '天数智芯', productLine: '通用计算系列', progress: 100, status: '已完成', priority: '中', owner: '王工', deadline: '2026-04-10' },
  { id: 'GPU-004', model: '海光 DCU Z100', vendor: '海光', productLine: '国产化系列', progress: 20, status: '待处理', priority: '低', owner: '赵工', deadline: '2026-07-05' },
  { id: 'GPU-005', model: '寒武纪 思元 370', vendor: '寒武纪', productLine: 'AI 推理系列', progress: 65, status: '进行中', priority: '中', owner: '孙工', deadline: '2026-05-30' },
];

const STATUS_COLORS = {
  '已完成': 'text-green-600 bg-green-50 border-green-200',
  '进行中': 'text-blue-600 bg-blue-50 border-blue-200',
  '待处理': 'text-orange-600 bg-orange-50 border-orange-200',
  '异常': 'text-red-600 bg-red-50 border-red-200',
};

// --- Components ---

export default function ChipAdaptationView() {
  const [view, setView] = useState<'list' | 'detail'>('list');
  const [selectedChip, setSelectedChip] = useState<any>(null);
  const [selectedTestItem, setSelectedTestItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stats for the ring charts
  const statsData = useMemo(() => [
    { name: '已完成', value: 12, color: '#10b981' },
    { name: '进行中', value: 3, color: '#3b82f6' },
    { name: '待处理', value: 1, color: '#f59e0b' },
  ], []);

  const handleViewDetail = (chip: any) => {
    setSelectedChip(chip);
    setView('detail');
  };

  const handleOpenExperiment = (item: string) => {
    setSelectedTestItem(item);
    setIsModalOpen(true);
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
        <span className="text-gray-900 font-medium">服务器及芯片适配</span>
      </nav>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">服务器及芯片适配管理</h1>
          <p className="text-sm text-gray-500 mt-1">对国产 GPU 芯片在服务器硬件上的适配进度、测试指标及问题进行全生命周期管理</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4" /> 刷新
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> 导出
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
            <p className="text-2xl font-bold text-gray-900">78.5%</p>
            <p className="text-[10px] text-green-600 font-bold mt-1">较上周 +4.2%</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">测试项状态分布</p>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <p className="text-xl font-bold text-green-600">12</p>
              <p className="text-[10px] text-gray-500">已完成</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-xl font-bold text-blue-600">3</p>
              <p className="text-[10px] text-gray-500">进行中</p>
            </div>
            <div className="w-px h-8 bg-gray-100" />
            <div className="text-center">
              <p className="text-xl font-bold text-orange-500">1</p>
              <p className="text-[10px] text-gray-500">待处理</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">活跃芯片型号</p>
          <div className="flex flex-wrap gap-2">
            {['昇腾 910B', 'BI-V100', 'DCU Z100'].map(tag => (
              <span key={tag} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold border border-blue-100">{tag}</span>
            ))}
            <span className="px-2 py-1 bg-gray-50 text-gray-400 rounded text-[10px] font-bold border border-gray-100">+2</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">待闭环问题单</p>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900">5 <span className="text-xs font-normal text-gray-400">个</span></p>
              <p className="text-[10px] text-red-500 font-bold">3 个为高优先级</p>
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
            placeholder="搜索芯片型号..." 
            className="text-sm outline-none w-48"
          />
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">芯片厂商:</span>
          <select className="text-sm font-medium outline-none bg-transparent">
            <option>全部</option>
            <option>华为</option>
            <option>天数智芯</option>
            <option>海光</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">适配状态:</span>
          <select className="text-sm font-medium outline-none bg-transparent">
            <option>全部</option>
            <option>已完成</option>
            <option>进行中</option>
            <option>待处理</option>
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
              <th className="px-6 py-4">芯片型号</th>
              <th className="px-6 py-4">厂商</th>
              <th className="px-6 py-4">产品线</th>
              <th className="px-6 py-4">适配进度</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4">优先级</th>
              <th className="px-6 py-4">负责人</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {CHIPS_DATA.map((chip) => (
              <tr key={chip.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center text-blue-600">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-gray-900">{chip.model}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{chip.vendor}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{chip.productLine}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden min-w-[80px]">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all duration-1000",
                          chip.progress === 100 ? "bg-green-500" : "bg-blue-500"
                        )} 
                        style={{ width: `${chip.progress}%` }} 
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-gray-700">{chip.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border",
                    STATUS_COLORS[chip.status as keyof typeof STATUS_COLORS]
                  )}>
                    {chip.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-[10px] font-bold px-2 py-0.5 rounded border",
                    chip.priority === '高' ? 'text-red-600 border-red-100 bg-red-50' : 
                    chip.priority === '中' ? 'text-orange-600 border-orange-100 bg-orange-50' : 
                    'text-blue-600 border-blue-100 bg-blue-50'
                  )}>{chip.priority}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{chip.owner}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleViewDetail(chip)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 ml-auto"
                  >
                    查看详情 <ChevronRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          <p className="text-xs text-gray-500">共 {CHIPS_DATA.length} 条记录</p>
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
        <span className="hover:text-blue-600 cursor-pointer" onClick={() => setView('list')}>服务器及芯片适配</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{selectedChip?.model} 详情</span>
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
                <h1 className="text-2xl font-bold text-gray-900">{selectedChip?.model} 适配详情</h1>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-bold border",
                  STATUS_COLORS[selectedChip?.status as keyof typeof STATUS_COLORS]
                )}>
                  {selectedChip?.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">芯片厂商: {selectedChip?.vendor} | 产品线: {selectedChip?.productLine} | 负责人: {selectedChip?.owner}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <FileCheck className="w-4 h-4" /> 生成报告
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> 导出数据
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">总任务进度</p>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900">{selectedChip?.progress}%</span>
              <span className="text-xs text-blue-600 font-bold mb-1">12/16 已完成</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: `${selectedChip?.progress}%` }} />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">计划完成时间</p>
            <p className="text-lg font-bold text-gray-800">{selectedChip?.deadline}</p>
            <p className="text-[10px] text-gray-400">剩余 35 天</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">当前风险项</p>
            <p className="text-lg font-bold text-red-600">2 <span className="text-xs font-normal text-gray-400">个</span></p>
            <p className="text-[10px] text-red-400">整机热测试、压力测试</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">适配优先级</p>
            <div className="flex items-center gap-2">
              <span className={cn(
                "w-2 h-2 rounded-full",
                selectedChip?.priority === '高' ? 'bg-red-500' : 'bg-blue-500'
              )} />
              <span className="text-lg font-bold text-gray-800">{selectedChip?.priority}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 16 Test Items Grid */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              16 项核心适配测试指标
            </h3>
            <span className="text-xs text-gray-400">点击卡片查看详细实验数据</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {TEST_ITEMS.map((item, index) => {
              // Mock different status for each item
              const isCompleted = index < 12;
              const isError = index === 13 || index === 14;
              const isProcessing = !isCompleted && !isError;

              return (
                <div 
                  key={index}
                  onClick={() => handleOpenExperiment(item)}
                  className={cn(
                    "p-4 rounded-xl border transition-all cursor-pointer group hover:shadow-md",
                    isCompleted ? "bg-green-50/30 border-green-100 hover:border-green-300" :
                    isError ? "bg-red-50/30 border-red-100 hover:border-red-300" :
                    "bg-blue-50/30 border-blue-100 hover:border-blue-300"
                  )}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center",
                      isCompleted ? "bg-green-100 text-green-600" :
                      isError ? "bg-red-100 text-red-600" :
                      "bg-blue-100 text-blue-600"
                    )}>
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : 
                       isError ? <AlertCircle className="w-4 h-4" /> : 
                       <Clock className="w-4 h-4" />}
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-gray-300 group-hover:text-gray-500" />
                  </div>
                  <p className="text-xs font-bold text-gray-900 leading-tight mb-1">{item}</p>
                  <p className={cn(
                    "text-[10px] font-bold",
                    isCompleted ? "text-green-600" : isError ? "text-red-600" : "text-blue-600"
                  )}>
                    {isCompleted ? '已通过' : isError ? '异常' : '测试中'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar in Detail View */}
        <div className="space-y-6">
          {/* Problem List */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              待闭环问题单 (5)
            </h3>
            <div className="space-y-4">
              {[
                { title: '整机热测试显存过热', level: '高', status: '处理中' },
                { title: 'OS 兼容性驱动报错', level: '高', status: '待分析' },
                { title: '信号完整性测试抖动超标', level: '中', status: '处理中' },
              ].map((bug, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <span className={cn(
                      "text-[8px] font-bold px-1.5 py-0.5 rounded",
                      bug.level === '高' ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"
                    )}>{bug.level}优先级</span>
                    <span className="text-[10px] text-gray-400 group-hover:text-blue-600 font-medium">{bug.status}</span>
                  </div>
                  <p className="text-xs font-bold text-gray-800 truncate">{bug.title}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-xs font-bold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
              查看全部问题
            </button>
          </div>

          {/* Test Reports */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-gray-400" />
              阶段性测试报告
            </h3>
            <div className="space-y-3">
              {[
                { name: '硬件准入测试报告_v1.pdf', size: '2.4MB', date: '2026-04-01' },
                { name: '信号完整性初步分析.docx', size: '1.1MB', date: '2026-03-28' },
              ].map((file, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-400 group-hover:text-blue-600">
                    <Download className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">{file.name}</p>
                    <p className="text-[10px] text-gray-400">{file.size} • {file.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExperimentModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        <div className="px-8 py-5 border-b flex items-center justify-between bg-gray-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">实验详情 - {selectedTestItem}</h2>
              <p className="text-xs text-gray-500 mt-0.5">芯片型号: {selectedChip?.model} | 任务 ID: EXP-20260409-001</p>
            </div>
          </div>
          <button 
            onClick={() => setIsModalOpen(false)} 
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Process Nodes */}
          <div className="px-8 py-8 bg-white border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">实验流程节点</h3>
            <div className="flex items-center">
              {[
                { label: '实验申请', status: 'completed', time: '04-01' },
                { label: '方案评审', status: 'completed', time: '04-03' },
                { label: '环境搭建', status: 'completed', time: '04-05' },
                { label: '数据采集', status: 'processing', time: '进行中' },
                { label: '报告生成', status: 'pending', time: '待处理' },
                { label: 'TR4A 评审', status: 'pending', time: '待处理' },
              ].map((node, i, arr) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center relative z-10">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all",
                      node.status === 'completed' ? "bg-green-500 border-green-500 text-white" :
                      node.status === 'processing' ? "bg-white border-blue-500 text-blue-500 shadow-lg shadow-blue-100" :
                      "bg-white border-gray-200 text-gray-300"
                    )}>
                      {node.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : (i + 1)}
                    </div>
                    <span className={cn(
                      "mt-2 text-[10px] font-bold",
                      node.status === 'completed' ? "text-green-600" :
                      node.status === 'processing' ? "text-blue-600" : "text-gray-400"
                    )}>{node.label}</span>
                    <span className="text-[8px] text-gray-400 mt-0.5">{node.time}</span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className={cn(
                      "flex-1 h-0.5 mx-2 -mt-8",
                      node.status === 'completed' ? "bg-green-500" : "bg-gray-100"
                    )} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Detailed Info Grid */}
          <div className="p-8 grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8">
            {[
              { label: '实验领域', value: '硬件适配与验证', icon: Layers },
              { label: '部门', value: '算力架构适配部', icon: Users },
              { label: '申请人', value: '张工 (ID: 10293)', icon: UserCheck },
              { label: '产品线', value: selectedChip?.productLine, icon: Tag },
              { label: '版本', value: 'v2.4.0-release', icon: History },
              { label: '型号', value: selectedChip?.model, icon: Cpu },
              { label: 'EUT 类别', value: '计算加速卡', icon: Box },
              { label: '实验类别', value: '准入/兼容性测试', icon: ClipboardList },
              { label: '优先级', value: selectedChip?.priority, icon: AlertTriangle, color: selectedChip?.priority === '高' ? 'text-red-600' : 'text-blue-600' },
              { label: 'EUT 数量', value: '4 台 (SN: 001-004)', icon: Layers },
              { label: '计划 TR4A 时间', value: '2026-05-15', icon: Calendar },
              { label: '参与人员', value: '李工、王工、赵工、陈工', icon: Users },
              { label: '预估来科日期', value: '2026-04-10', icon: Calendar },
              { label: '实验地点', value: '深圳光明 1 号实验室', icon: MapPin },
            ].map((info, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                  <info.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{info.label}</p>
                  <p className={cn("text-sm font-bold text-gray-800", info.color)}>{info.value}</p>
                </div>
              </div>
            ))}
            
            <div className="col-span-2 md:col-span-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">实验项目与测试结果</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-gray-800">实验项目: {selectedTestItem}</p>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      针对 {selectedChip?.model} 在 {selectedChip?.productLine} 上的{selectedTestItem}。
                      主要验证其在满负载运行下的稳定性、功耗表现以及与系统 BIOS/OS 的协同工作能力。
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-green-600">测试结果: 进行中 (初步数据正常)</p>
                    <div className="mt-3 grid grid-cols-3 gap-4">
                      <div className="bg-white p-3 rounded border border-gray-100">
                        <p className="text-[10px] text-gray-400 mb-1">当前通过率</p>
                        <p className="text-lg font-bold text-gray-900">92.5%</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-100">
                        <p className="text-[10px] text-gray-400 mb-1">已发现问题</p>
                        <p className="text-lg font-bold text-orange-500">1</p>
                      </div>
                      <div className="bg-white p-3 rounded border border-gray-100">
                        <p className="text-[10px] text-gray-400 mb-1">剩余用例</p>
                        <p className="text-lg font-bold text-gray-900">4 / 48</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-5 border-t bg-gray-50/80 flex justify-end gap-3">
          <button 
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-600 hover:bg-white transition-colors"
          >
            取消
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100">
            导出实验报告
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-full">
      {view === 'list' ? renderListView() : renderDetailView()}
      {isModalOpen && renderExperimentModal()}
    </div>
  );
}
