import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Search, 
  FileUp, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  Database,
  Cpu,
  Activity,
  Zap
} from 'lucide-react';
import { cn } from '../../lib/utils';

const ADAPTATION_ITEMS = [
  { item: '大语言模型 (Llama-3)', type: '模型适配', precision: 'BF16', status: 'completed', data: 'llama3_test_v1.json' },
  { item: '文生图模型 (SDXL)', type: '模型适配', precision: 'FP16', status: 'processing', data: 'sdxl_eval.csv' },
  { item: '计算算子 (MatMul)', type: '算子类型', precision: 'FP32', status: 'completed', data: 'matmul_perf.log' },
  { item: '通信算子 (AllReduce)', type: '算子类型', precision: 'FP16', status: 'processing', data: '-' },
  { item: '多机 RoCE 高性能组网', type: '网络与精度', precision: '-', status: 'pending', data: '-' },
  { item: '10 种通信库算子 (tree/ring)', type: '网络与精度', precision: '-', status: 'pending', data: '-' },
  { item: '带宽测试 (DeviceToHost)', type: '网络与精度', precision: '-', status: 'completed', data: 'bw_test_01.txt' },
  { item: '精度验证 (INT8/INT4)', type: '网络与精度', precision: 'INT8', status: 'processing', data: '-' },
];

export default function OperatorAdaptationView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">国产芯片算子适配管理</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> 下载适配指导手册
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> 创建适配任务
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '总任务数', value: '42', icon: Database, color: 'text-blue-600 bg-blue-50' },
          { label: '进行中', value: '15', icon: Activity, color: 'text-orange-600 bg-orange-50' },
          { label: '已完成', value: '24', icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
          { label: '异常', value: '3', icon: AlertCircle, color: 'text-red-600 bg-red-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className={cn("p-3 rounded-lg", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">模型类型:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>大语言模型</option>
            <option>文生图模型</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">精度类型:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>FP32</option>
            <option>BF16</option>
            <option>FP16</option>
            <option>INT8</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">任务状态:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>已完成</option>
            <option>进行中</option>
            <option>异常</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">适配项</th>
              <th className="px-6 py-4">模型类型</th>
              <th className="px-6 py-4">精度类型</th>
              <th className="px-6 py-4">测试状态</th>
              <th className="px-6 py-4">测试数据</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {ADAPTATION_ITEMS.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.item}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.type}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-500">{item.precision}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold border",
                    item.status === 'completed' ? "text-green-600 bg-green-50 border-green-100" :
                    item.status === 'processing' ? "text-blue-600 bg-blue-50 border-blue-100" :
                    "text-gray-400 bg-gray-50 border-gray-100"
                  )}>
                    {item.status === 'completed' ? '已完成' : item.status === 'processing' ? '进行中' : '待处理'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400 italic">
                  {item.data !== '-' ? (
                    <span className="flex items-center gap-1 text-blue-600 not-italic cursor-pointer hover:underline">
                      <FileUp className="w-3 h-3" /> {item.data}
                    </span>
                  ) : '未上传'}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-600 hover:underline text-xs font-bold">上传数据</button>
                  <button className="text-gray-600 hover:underline text-xs font-bold">查看详情</button>
                  <button className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manuals Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: '多机 RoCE 组网', desc: '高性能网络拓扑配置与调优指南', icon: Zap },
          { title: '宽适配测试', desc: '跨芯片型号与 OS 的兼容性测试标准', icon: Cpu },
          { title: '算力精度适配', desc: 'FP32/BF16/INT8 精度对齐与验证手册', icon: Activity },
        ].map((manual, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 transition-all group cursor-pointer">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <manual.icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{manual.title}</h4>
            <p className="text-sm text-gray-500 mb-4">{manual.desc}</p>
            <button className="text-xs font-bold text-blue-600 flex items-center gap-1">
              立即下载 <Download className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
