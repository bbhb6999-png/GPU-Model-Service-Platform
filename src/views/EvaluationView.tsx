import React, { useState } from 'react';
import { 
  Plus, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  FileSpreadsheet,
  Settings2,
  Calendar,
  Layers,
  Target,
  Zap,
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  ShieldAlert,
  Lock,
  Eye,
  Download,
  MoreHorizontal,
  Activity,
  UserCheck,
  Ban,
  AlertTriangle,
  Play,
  Pause,
  Trash2,
  FileText,
  Workflow,
  Cpu,
  Bell,
  Clock3,
  CheckCircle,
  ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import { STATUS_COLORS } from '../constants';

interface EvaluationViewProps {
  activeSubMenu?: string;
}

export default function EvaluationView({ activeSubMenu = 'tasks' }: EvaluationViewProps) {
  // --- Sub-page 1: Evaluation Task Management ---
  const renderTaskManagement = () => {
    const tasks = [
      { id: 'EV-2001', model: 'Llama-3-70B', dataset: 'C-Eval / MMLU', status: 'completed', progress: '100%', time: '2026-04-05' },
      { id: 'EV-2002', model: 'Qwen-Max', dataset: 'MedQA-CN', status: 'processing', progress: '65%', time: '2026-04-07' },
      { id: 'EV-2003', model: 'DeepSeek-V3', dataset: 'HumanEval', status: 'pending', progress: '0%', time: '2026-04-08' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">大模型评估任务管理</h1>
            <p className="text-gray-500 mt-1 text-sm">全流程管理评估数据集、推理结果生成、格式转换与结果分析</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              导出报告
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              新建评估任务
            </button>
          </div>
        </div>

        {/* Evaluation Flow Steps */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-8">评估全流程指引</h3>
          <div className="relative flex justify-between">
            <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
            {[
              { label: '数据集创建', icon: FileSpreadsheet, status: 'completed' },
              { label: '结果生成', icon: Zap, status: 'processing' },
              { label: '格式转换', icon: Workflow, status: 'pending' },
              { label: '生成评估结果', icon: BarChart3, status: 'pending' },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center group cursor-pointer">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all",
                  step.status === 'completed' ? "border-green-500 text-green-500" : 
                  step.status === 'processing' ? "border-blue-500 text-blue-500 shadow-lg shadow-blue-100" :
                  "border-gray-200 text-gray-300"
                )}>
                  <step.icon className="w-5 h-5" />
                </div>
                <span className={cn(
                  "mt-3 text-xs font-bold",
                  step.status === 'completed' ? "text-green-600" : 
                  step.status === 'processing' ? "text-blue-600" : "text-gray-400"
                )}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="flex gap-4 flex-1 max-w-xl">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="搜索任务名称或模型..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none" />
              </div>
              <select className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none">
                <option>全部状态</option>
                <option>已完成</option>
                <option>进行中</option>
              </select>
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><RefreshCw className="w-4 h-4" /></button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">任务 ID</th>
                  <th className="px-6 py-4">评估模型</th>
                  <th className="px-6 py-4">数据集</th>
                  <th className="px-6 py-4">评估状态</th>
                  <th className="px-6 py-4">完成度</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{task.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{task.model}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{task.dataset}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border",
                        STATUS_COLORS[task.status as keyof typeof STATUS_COLORS]
                      )}>
                        {task.status === 'completed' ? '已完成' : task.status === 'processing' ? '进行中' : '待处理'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden min-w-[60px]">
                          <div className={cn("h-full rounded-full", task.status === 'completed' ? "bg-green-500" : "bg-blue-500")} style={{ width: task.progress }} />
                        </div>
                        <span className="text-xs font-mono text-gray-600">{task.progress}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {task.status === 'processing' ? (
                          <button className="p-1.5 text-gray-400 hover:text-orange-600 transition-colors"><Pause className="w-4 h-4" /></button>
                        ) : (
                          <button className="p-1.5 text-gray-400 hover:text-green-600 transition-colors"><Play className="w-4 h-4" /></button>
                        )}
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><FileText className="w-4 h-4" /></button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
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

  // --- Sub-page 2: Custom Evaluation ---
  const renderCustomEval = () => {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">自定义场景评估</h1>
            <p className="text-gray-500 mt-1 text-sm">按场景任务选择评估数据集，保证评估与实际业务场景一致</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            创建自定义评估
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-blue-600" />
              场景评估配置
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">场景类型</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm">
                  <option>通用对话</option>
                  <option>代码生成</option>
                  <option>医疗咨询</option>
                  <option>金融分析</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">评估指标</label>
                <div className="space-y-2">
                  {['准确率', '响应速度', '安全性', '幻觉率'].map((metric) => (
                    <label key={metric} className="flex items-center gap-2 p-2 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors">
                      <input type="checkbox" defaultChecked className="w-3 h-3 text-blue-600" />
                      <span className="text-xs text-gray-700 font-medium">{metric}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">权重配置</label>
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-md space-y-3">
                  <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase">
                    <span>性能权重</span>
                    <span>60%</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
              启动评估任务
            </button>
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">自定义评估任务</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="搜索场景..." className="pl-10 pr-4 py-1.5 bg-white border border-gray-200 rounded-md text-sm focus:outline-none" />
                </div>
              </div>
            </div>
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-bold text-gray-900">暂无自定义评估任务</h4>
              <p className="text-xs text-gray-500 mt-1 max-w-xs">
                配置左侧参数并启动评估，系统将根据您的业务场景生成定制化的评估报告。
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --- Sub-page 3: Automated Evaluation ---
  const renderAutoEval = () => {
    const schedules = [
      { id: 'SCH-001', name: '每周基准测试', resource: '4x A100', cron: '0 2 * * 0', next: '2026-04-12 02:00', status: 'active' },
      { id: 'SCH-002', name: '每日安全扫描', resource: '2x A100', cron: '0 1 * * *', next: '2026-04-08 01:00', status: 'active' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">评估任务自动化调度</h1>
            <p className="text-gray-500 mt-1 text-sm">复用推理资源执行评估，支持定时调度与错峰分流策略</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            新建自动化任务
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Clock3 className="w-4 h-4 text-blue-600" />
              调度任务配置
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">执行资源</label>
                <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm">
                  <option>空闲推理资源 (错峰)</option>
                  <option>专用评估集群</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">调度周期 (Cron)</label>
                <input type="text" defaultValue="0 2 * * 0" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm font-mono" />
                <p className="text-[10px] text-gray-400 mt-1">每周日凌晨 2 点执行</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">错峰策略</label>
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <p className="text-[10px] text-blue-700 leading-relaxed">
                    系统将自动检测推理服务负载，当 GPU 利用率低于 20% 时启动评估任务。
                  </p>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">通知方式</label>
                <div className="flex gap-2">
                  <button className="flex-1 py-1.5 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-600">邮件</button>
                  <button className="flex-1 py-1.5 bg-blue-600 border border-blue-600 rounded text-[10px] font-bold text-white">钉钉/企微</button>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors">
              保存调度任务
            </button>
          </div>

          <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">调度任务列表</h3>
              <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><RefreshCw className="w-4 h-4" /></button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-6 py-4">任务名称</th>
                    <th className="px-6 py-4">执行资源</th>
                    <th className="px-6 py-4">调度周期</th>
                    <th className="px-6 py-4">下次运行时间</th>
                    <th className="px-6 py-4">状态</th>
                    <th className="px-6 py-4 text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {schedules.map((sch) => (
                    <tr key={sch.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-gray-900">{sch.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono">{sch.id}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{sch.resource}</td>
                      <td className="px-6 py-4 text-sm font-mono text-gray-500">{sch.cron}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{sch.next}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-green-50 text-green-600 border border-green-100 text-[10px] font-bold">
                          已启用
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><Settings2 className="w-4 h-4" /></button>
                          <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><Activity className="w-4 h-4" /></button>
                          <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
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

  const renderContent = () => {
    switch (activeSubMenu) {
      case 'tasks': return renderTaskManagement();
      case 'custom-eval': return renderCustomEval();
      case 'auto-eval': return renderAutoEval();
      default: return renderTaskManagement();
    }
  };

  return (
    <div className="w-full h-full">
      {renderContent()}
    </div>
  );
}
