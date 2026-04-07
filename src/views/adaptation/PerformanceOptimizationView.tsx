import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Search, 
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Activity,
  Zap,
  BarChart3,
  TrendingUp,
  Cpu,
  Layers
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

const OPT_TASKS = [
  { item: '模型架构', content: 'Llama-3 结构剪枝与量化适配', before: '120ms', after: '85ms', lift: '29.1%' },
  { item: '训练框架', content: 'DeepSpeed 并行策略优化', before: '420 TFLOPS', after: '580 TFLOPS', lift: '38.1%' },
  { item: '训练方法 (算子)', content: 'FlashAttention-2 算子融合', before: '1.0x', after: '1.4x', lift: '40.0%' },
  { item: '精度训练', content: 'BF16 混合精度调优', before: 'Loss 0.45', after: 'Loss 0.42', lift: '6.7%' },
  { item: '模型评估', content: 'MMLU 基准测试对齐', before: '72.5', after: '74.8', lift: '3.2%' },
  { item: '并行策略', content: '张量并行 + 流水线并行优化', before: '1.0x', after: '1.25x', lift: '25.0%' },
  { item: '硬件优化', content: 'RoCE 网络端网协同调优', before: '85Gbps', after: '98Gbps', lift: '15.3%' },
];

const LOSS_DATA = [
  { step: 0, loss: 4.5, acc: 0.1 },
  { step: 100, loss: 3.2, acc: 0.35 },
  { step: 200, loss: 2.1, acc: 0.58 },
  { step: 300, loss: 1.5, acc: 0.72 },
  { step: 400, loss: 1.1, acc: 0.81 },
  { step: 500, loss: 0.8, acc: 0.88 },
];

export default function PerformanceOptimizationView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">国产芯片模型性能优化管理</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> 创建优化任务
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">模型类型:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>大语言模型</option>
            <option>多模态模型</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">优化阶段:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>架构分析</option>
            <option>算子优化</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">时间周期:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>最近 7 天</option>
            <option>最近 30 天</option>
          </select>
        </div>
      </div>

      {/* Process Visualization */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-8">优化流程可视化</h3>
        <div className="relative flex justify-between items-center">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10"></div>
          {[
            '架构分析', '框架适配', '算子优化', '精度调优', '效果评估', '并行策略', '硬件适配'
          ].map((node, i) => (
            <div key={i} className="flex flex-col items-center group cursor-pointer">
              <div className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center border-2 bg-white transition-all",
                i < 4 ? "border-green-500 text-green-500" : 
                i === 4 ? "border-blue-500 text-blue-500 shadow-lg shadow-blue-100" :
                "border-gray-100 text-gray-300"
              )}>
                {i < 4 ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{i + 1}</span>}
              </div>
              <span className={cn(
                "mt-3 text-xs font-bold",
                i < 4 ? "text-green-600" : 
                i === 4 ? "text-blue-600" : "text-gray-400"
              )}>{node}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Optimization Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">性能优化指标</h3>
            <button className="text-xs text-blue-600 hover:underline">导出优化报告</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">优化项</th>
                  <th className="px-6 py-4">优化内容</th>
                  <th className="px-6 py-4">优化前</th>
                  <th className="px-6 py-4">优化后</th>
                  <th className="px-6 py-4">提升率</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {OPT_TASKS.map((task, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{task.item}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{task.content}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{task.before}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{task.after}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> {task.lift}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:underline text-xs font-bold">详情</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6">Loss & Accuracy 曲线</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={LOSS_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="step" hide />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey="loss" stroke="#3b82f6" strokeWidth={2} dot={false} name="Loss" />
                  <Line type="monotone" dataKey="acc" stroke="#10b981" strokeWidth={2} dot={false} name="Accuracy" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-blue-500" />
                <span className="text-xs text-gray-500">Loss</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-green-500" />
                <span className="text-xs text-gray-500">Accuracy</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6">性能提升分布</h3>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={OPT_TASKS.slice(0, 4)}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="item" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="lift" fill="#3b82f6" radius={[4, 4, 0, 0]} name="提升率 (%)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
