import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Play, 
  Square, 
  Settings2, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Activity,
  Layers,
  Server,
  Monitor,
  Download
} from 'lucide-react';
import { cn } from '../../lib/utils';

const INSTANCES = [
  { id: 'INS-001', type: '裸金属', config: '8 * 昇腾 910B | 512G RAM', access: 'SSH / WebShell', status: 'running', owner: '李工' },
  { id: 'INS-002', type: '虚机直通', config: '4 * 昇腾 910B | 256G RAM', access: 'VNC', status: 'stopped', owner: '王工' },
  { id: 'INS-003', type: 'vGPU 虚拟化', config: '1 * 昇腾 910B (1/4) | 64G RAM', access: 'WebShell', status: 'error', owner: '赵工' },
  { id: 'INS-004', type: '容器化', config: '2 * 昇腾 910B | 128G RAM', access: 'K8s Exec', status: 'running', owner: '张工' },
];

const OPTIMIZATION_ITEMS = [
  'GPU-Operator 调度', '自研 GPU 调度框架', '预训练 / 增量预训练', 
  '全参微调 / LoRA 微调', '多机训练', '卡粒度分布式推理', 
  '单机分布式推理', '多机分布式推理', '业务监控', 
  'GPU 故障感知', '作业自动恢复', '算力切分管理'
];

export default function ClusterAdaptationView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">小集群训练 / 推理 / 微调适配优化</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> 创建实例
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: '实例总数', value: '24', icon: Layers, color: 'text-blue-600 bg-blue-50' },
          { label: '运行中', value: '18', icon: Activity, color: 'text-green-600 bg-green-50' },
          { label: '已停止', value: '4', icon: Square, color: 'text-gray-600 bg-gray-50' },
          { label: '异常', value: '2', icon: AlertCircle, color: 'text-red-600 bg-red-50' },
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
          <span className="text-sm text-gray-500">实例类型:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>裸金属</option>
            <option>虚机直通</option>
            <option>vGPU 虚拟化</option>
            <option>容器化</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">状态:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>运行中</option>
            <option>已停止</option>
            <option>异常</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">负责人:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>李工</option>
            <option>王工</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Instance Table */}
        <div className="lg:col-span-3 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">实例管理</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-gray-50 text-xs font-bold text-gray-600 rounded hover:bg-gray-100">批量启动</button>
              <button className="px-3 py-1 bg-gray-50 text-xs font-bold text-gray-600 rounded hover:bg-gray-100">批量停止</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">实例 ID</th>
                  <th className="px-6 py-4">实例类型</th>
                  <th className="px-6 py-4">配置信息</th>
                  <th className="px-6 py-4">状态</th>
                  <th className="px-6 py-4">负责人</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {INSTANCES.map((ins) => (
                  <tr key={ins.id} className={cn(
                    "hover:bg-gray-50/50 transition-colors",
                    ins.status === 'error' ? "bg-red-50/30" : ""
                  )}>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">{ins.id}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{ins.access}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{ins.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{ins.config}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border",
                        ins.status === 'running' ? "text-green-600 bg-green-50 border-green-100" :
                        ins.status === 'stopped' ? "text-gray-400 bg-gray-50 border-gray-100" :
                        "text-red-600 bg-red-50 border-red-100"
                      )}>
                        {ins.status === 'running' ? '运行中' : ins.status === 'stopped' ? '已停止' : '异常'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{ins.owner}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><Play className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"><Square className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"><Settings2 className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Optimization Items */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">适配优化功能</h3>
          <div className="space-y-2">
            {OPTIMIZATION_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group cursor-pointer">
                <span className="text-xs font-medium text-gray-700 group-hover:text-blue-700">{item}</span>
                <button className="text-gray-300 group-hover:text-blue-500">
                  <Download className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-xs font-bold text-blue-600 border border-blue-100 rounded-lg hover:bg-blue-50 transition-colors">
            下载全部优化方案
          </button>
        </div>
      </div>
    </div>
  );
}
