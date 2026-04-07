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
  Layers,
  Settings2,
  Monitor,
  Play,
  ShieldCheck,
  Target,
  Workflow
} from 'lucide-react';
import { cn } from '../../lib/utils';

const COMBINATIONS = [
  { combo: 'MindIE + Llama-3 + 910B', scene: '对话 / 阅读理解', rate: '18.4 req/s', time: '35ms', concurrency: '64', resource: '72%', stability: '99.9%', score: '9.8', best: true },
  { combo: 'vLLM + Llama-3 + 910B', scene: '通用场景', rate: '12.5 req/s', time: '42ms', concurrency: '32', resource: '65%', stability: '99.5%', score: '8.5', best: false },
  { combo: 'TGI + Llama-3 + 910B', scene: '长文本理解', rate: '8.2 req/s', time: '58ms', concurrency: '16', resource: '58%', stability: '99.2%', score: '7.2', best: false },
];

export default function ModelInferenceView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">模型推理适配管理</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> 创建对比测试任务
        </button>
      </div>

      {/* Combination Config */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-6">组合测试配置</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">推理引擎 (多选)</label>
            <div className="space-y-2">
              {['MindIE', 'vLLM', 'TGI'].map(item => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" defaultChecked />
                  <span className="text-sm text-gray-600">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">适配模型 (多选)</label>
            <div className="space-y-2">
              {['Llama-3-70B', 'Qwen-72B', 'DeepSeek-V3'].map(item => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" defaultChecked={item === 'Llama-3-70B'} />
                  <span className="text-sm text-gray-600">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">GPU 卡 (多选)</label>
            <div className="space-y-2">
              {['昇腾 910B', '昇腾 910C'].map(item => (
                <label key={item} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-blue-600" defaultChecked={item === '昇腾 910B'} />
                  <span className="text-sm text-gray-600">{item}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-end">
            <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2">
              <Activity className="w-4 h-4" /> 启动平行对比测试
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-bold text-gray-800">推理适配指标</h3>
          <button className="text-xs text-blue-600 hover:underline">下载场景适配方案</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">测试组合</th>
                <th className="px-6 py-4">适用场景</th>
                <th className="px-6 py-4">响应速率</th>
                <th className="px-6 py-4">响应时间</th>
                <th className="px-6 py-4">稳定性</th>
                <th className="px-6 py-4">评分</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {COMBINATIONS.map((item, i) => (
                <tr key={i} className={cn(
                  "hover:bg-gray-50/50 transition-colors",
                  item.best ? "bg-green-50/30" : ""
                )}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{item.combo}</p>
                      {item.best && (
                        <span className="px-1.5 py-0.5 bg-green-500 text-white text-[8px] font-bold rounded uppercase">Best</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.scene}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-900">{item.rate}</td>
                  <td className="px-6 py-4 text-sm font-mono text-blue-600 font-bold">{item.time}</td>
                  <td className="px-6 py-4 text-sm text-green-600 font-bold">{item.stability}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-sm font-bold",
                      parseFloat(item.score) >= 9 ? "text-green-600" : "text-blue-600"
                    )}>{item.score}</span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-blue-600 hover:underline text-xs font-bold">详情</button>
                    {item.best && (
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-[10px] font-bold hover:bg-blue-700">一键部署</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Adaptation Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: '场景适配', desc: '对话 / 阅读理解 / 文生图 / PPT 生成', icon: Target },
          { title: '工程化能力', desc: 'RAG / Agent 工程、回流数据处理', icon: Workflow },
          { title: '高可用保障', desc: '负载均衡、故障感知与自动恢复', icon: ShieldCheck },
          { title: '效果评估', desc: '端到端业务效果自动化评估', icon: BarChart3 },
        ].map((feat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-lg flex items-center justify-center mb-4">
              <feat.icon className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">{feat.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
