import React, { useState } from 'react';
import { 
  Plus, 
  Download, 
  Search, 
  ChevronRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  MessageSquare,
  ArrowRight,
  FileText
} from 'lucide-react';
import { cn } from '../../lib/utils';

const TASKS = [
  { name: 'RoCE 网络配置', type: '网络配置', owner: '李工', start: '2026-04-01', status: 'completed', progress: 100 },
  { name: '存储 ROCE 网络对接', type: '存储对接', owner: '王工', start: '2026-04-02', status: 'processing', progress: 75 },
  { name: '端网拓扑可视', type: '可视化', owner: '赵工', start: '2026-04-03', status: 'processing', progress: 40 },
  { name: 'GPU 服务器监控', type: '监控', owner: '张工', start: '2026-04-04', status: 'pending', progress: 0 },
  { name: '性能数据显示', type: '监控', owner: '李工', start: '2026-04-05', status: 'pending', progress: 0 },
  { name: 'GPU 侧巡检', type: '巡检', owner: '王工', start: '2026-04-05', status: 'pending', progress: 0 },
  { name: '基础及深度检测', type: '检测', owner: '赵工', start: '2026-04-06', status: 'pending', progress: 0 },
  { name: '问题诊断分析 & 故障闭环', type: '诊断', owner: '张工', start: '2026-04-06', status: 'pending', progress: 0 },
  { name: '集合通信库对接流量调优', type: '调优', owner: '李工', start: '2026-04-07', status: 'pending', progress: 0 },
];

export default function NetworkAdaptationView() {
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">存储及网络适配管理</h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" /> 下载操作指导手册
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> 创建适配任务
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">任务状态:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>已完成</option>
            <option>进行中</option>
            <option>待处理</option>
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
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">任务类型:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>网络配置</option>
            <option>存储对接</option>
          </select>
        </div>
      </div>

      {/* Process Visualization */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-800 mb-8">任务流程可视化</h3>
        <div className="relative flex justify-between items-center">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 -z-10"></div>
          {[
            { label: '创建任务', status: 'completed' },
            { label: '测试验证', status: 'completed' },
            { label: '问题单跟进', status: 'processing' },
            { label: '回归测试', status: 'pending' },
            { label: '闭环归档', status: 'pending' },
          ].map((node, i) => (
            <div key={i} className="flex flex-col items-center group cursor-pointer">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center border-4 bg-white transition-all",
                node.status === 'completed' ? "border-green-500 text-green-500" : 
                node.status === 'processing' ? "border-blue-500 text-blue-500 shadow-lg shadow-blue-100" :
                "border-gray-100 text-gray-300"
              )}>
                {node.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <span className="text-sm font-bold">{i + 1}</span>}
              </div>
              <span className={cn(
                "mt-3 text-sm font-bold",
                node.status === 'completed' ? "text-green-600" : 
                node.status === 'processing' ? "text-blue-600" : "text-gray-400"
              )}>{node.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">任务名称</th>
              <th className="px-6 py-4">任务类型</th>
              <th className="px-6 py-4">负责人</th>
              <th className="px-6 py-4">开始时间</th>
              <th className="px-6 py-4">状态</th>
              <th className="px-6 py-4">进度</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {TASKS.map((task, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{task.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{task.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{task.owner}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{task.start}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold border",
                    task.status === 'completed' ? "text-green-600 bg-green-50 border-green-100" :
                    task.status === 'processing' ? "text-blue-600 bg-blue-50 border-blue-100" :
                    "text-gray-400 bg-gray-50 border-gray-100"
                  )}>
                    {task.status === 'completed' ? '已完成' : task.status === 'processing' ? '进行中' : '待处理'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${task.progress}%` }} />
                  </div>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-600 hover:underline text-xs font-bold">查看</button>
                  <button 
                    onClick={() => { setSelectedTask(task); setShowIssueModal(true); }}
                    className="text-orange-600 hover:underline text-xs font-bold"
                  >
                    反馈结果
                  </button>
                  <button 
                    disabled={task.progress < 100}
                    className={cn(
                      "text-xs font-bold",
                      task.progress === 100 ? "text-green-600 hover:underline" : "text-gray-300 cursor-not-allowed"
                    )}
                  >
                    闭环
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Issue Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">问题单记录 - {selectedTask?.name}</h2>
              <button onClick={() => setShowIssueModal(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">问题描述</label>
                <textarea 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px]"
                  placeholder="请输入测试中发现的问题详情..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">处理人</label>
                  <input type="text" className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm" defaultValue={selectedTask?.owner} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">处理进度</label>
                  <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                    <option>待处理</option>
                    <option>处理中</option>
                    <option>已解决</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">回归结果</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="regression" className="text-blue-600" />
                    <span className="text-sm text-gray-600">通过</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="regression" className="text-blue-600" />
                    <span className="text-sm text-gray-600">不通过</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setShowIssueModal(false)} className="px-6 py-2 border border-gray-200 rounded-md text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">取消</button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors">提交反馈</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
