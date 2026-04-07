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
  Play
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
  AreaChart,
  Area
} from 'recharts';

const ENGINES = [
  { name: 'vLLM (开源)', model: 'Llama-3-70B', gpu: '昇腾 910B', quant: 'AWQ / GPTQ', latency: '42ms', tps: '12.5', concurrency: '32', status: 'ready' },
  { name: 'TGI (开源)', model: 'Llama-3-70B', gpu: '昇腾 910B', quant: 'FP16', latency: '58ms', tps: '8.2', concurrency: '16', status: 'ready' },
  { name: 'MindIE (厂商专用)', model: 'Llama-3-70B', gpu: '昇腾 910B', quant: 'W8A8', latency: '35ms', tps: '18.4', concurrency: '64', status: 'ready' },
  { name: 'LMDeploy (开源)', model: 'Llama-3-70B', gpu: '昇腾 910B', quant: 'TurboMind', latency: '48ms', tps: '10.5', concurrency: '24', status: 'ready' },
];

const MONITOR_DATA = [
  { time: '10:00', latency: 42, tps: 12 },
  { time: '10:05', latency: 45, tps: 15 },
  { time: '10:10', latency: 38, tps: 18 },
  { time: '10:15', latency: 40, tps: 14 },
  { time: '10:20', latency: 44, tps: 16 },
  { time: '10:25', latency: 41, tps: 13 },
];

export default function EngineAdaptationView() {
  const [selectedEngine, setSelectedEngine] = useState('MindIE');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">推理引擎适配管理</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> 创建评测任务
        </button>
      </div>

      {/* Engine Selection */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {['MindIE (厂商专用)', 'vLLM (开源)', 'TGI (开源)', 'LMDeploy (开源)'].map((engine) => (
          <div 
            key={engine}
            onClick={() => setSelectedEngine(engine)}
            className={cn(
              "p-5 rounded-xl border-2 cursor-pointer transition-all",
              selectedEngine === engine ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-100" : "border-gray-100 bg-white hover:border-gray-200"
            )}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={cn(
                "p-2 rounded-lg",
                selectedEngine === engine ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"
              )}>
                <Zap className="w-5 h-5" />
              </div>
              {selectedEngine === engine && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
            </div>
            <p className={cn(
              "text-sm font-bold",
              selectedEngine === engine ? "text-blue-900" : "text-gray-700"
            )}>{engine}</p>
            <p className="text-[10px] text-gray-400 mt-1 font-medium uppercase tracking-widest">推理引擎</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">模型选择:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none font-bold">
            <option>Llama-3-70B</option>
            <option>Qwen-72B</option>
            <option>DeepSeek-V3</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">状态:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>就绪</option>
            <option>评测中</option>
          </select>
        </div>
        <button className="ml-auto flex items-center gap-2 px-6 py-1.5 bg-gray-900 text-white rounded-md text-sm font-bold hover:bg-black transition-colors">
          <Play className="w-3 h-3" /> 一键启动评测
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Engine Table */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">推理引擎适配指标</h3>
            <button className="text-xs text-blue-600 hover:underline">下载引擎配置</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">引擎名称</th>
                  <th className="px-6 py-4">适配模型</th>
                  <th className="px-6 py-4">首 token 时延</th>
                  <th className="px-6 py-4">TPS</th>
                  <th className="px-6 py-4">并发数</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ENGINES.map((engine, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-gray-900">{engine.name}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{engine.quant}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{engine.model}</td>
                    <td className="px-6 py-4 text-sm font-mono font-bold text-blue-600">{engine.latency}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{engine.tps}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-900">{engine.concurrency}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button className="text-blue-600 hover:underline text-xs font-bold">评测</button>
                      <button className="text-gray-600 hover:underline text-xs font-bold">优化</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Monitor */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-800">实时性能监控</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-gray-400 uppercase">Live</span>
              </div>
            </div>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MONITOR_DATA}>
                  <defs>
                    <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" hide />
                  <YAxis hide />
                  <Tooltip />
                  <Area type="monotone" dataKey="latency" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLatency)" strokeWidth={2} name="时延 (ms)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] text-gray-400 font-bold uppercase">当前并发</p>
                <p className="text-lg font-bold text-gray-900">128</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] text-gray-400 font-bold uppercase">平均速率</p>
                <p className="text-lg font-bold text-gray-900">45.2 <span className="text-xs font-normal">req/s</span></p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600 p-6 rounded-xl text-white shadow-lg shadow-blue-100">
            <h4 className="font-bold mb-2">优化建议</h4>
            <ul className="text-xs space-y-2 text-blue-100">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full mt-1 shrink-0" />
                建议开启 KV Cache 优化，可降低 15% 首 token 时延。
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-white rounded-full mt-1 shrink-0" />
                当前 GPU 负载较低，可尝试增加并发数至 64。
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
