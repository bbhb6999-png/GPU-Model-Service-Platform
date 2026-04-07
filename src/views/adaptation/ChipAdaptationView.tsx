import React, { useState } from 'react';
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
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';

const TEST_ITEMS = [
  '芯片性能测试', '芯片功能验证', 'BIOS 开发测试', 'OS 兼容性测试', 
  '装备备件开发测试', 'repo 开发测试', '单板测试', '信号测试', 
  '系统集成测试', '整机热测试', '整机气候测试', '电磁骚扰测试', 
  '电磁抗扰测试', '压力测试', '机械测试', '可靠性测试'
];

export default function ChipAdaptationView() {
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const getStatusStyle = (progress: number) => {
    if (progress === 100) return 'text-green-600 bg-green-50 border-green-200';
    if (progress >= 50) return 'text-blue-600 bg-blue-50 border-blue-200';
    return 'text-orange-600 bg-orange-50 border-orange-200';
  };

  const getStatusLabel = (progress: number) => {
    if (progress === 100) return '已完成';
    if (progress >= 50) return '进行中';
    return '待处理';
  };

  const mockData = TEST_ITEMS.map((item, index) => ({
    id: index + 1,
    name: item,
    status: Math.random() > 0.3 ? (Math.random() > 0.5 ? 100 : 65) : 20,
    priority: ['高', '中', '低'][Math.floor(Math.random() * 3)],
    owner: '张工',
    deadline: '2026-05-20'
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">服务器及芯片适配管理</h1>
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">GPU 型号列表</h3>
          <div className="flex flex-wrap gap-2">
            {['昇腾 910B', '昇腾 910C', '天数智芯 BI-V100', '海光 DCU Z100'].map(model => (
              <span key={model} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold border border-blue-100">{model}</span>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-2">总适配进度</h3>
          <div className="flex items-end justify-between mb-2">
            <span className="text-3xl font-bold text-gray-900">78%</span>
            <span className="text-xs text-green-600 font-bold">+5% 本周</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 rounded-full" style={{ width: '78%' }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-4">测试项完成率</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">已完成</p>
              <p className="text-xl font-bold text-green-600">12 / 16</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">进行中</p>
              <p className="text-xl font-bold text-blue-600">3 / 16</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">芯片型号:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>昇腾 910B</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">产品线:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>服务器 A 系列</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">优先级:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>高</option>
            <option>中</option>
            <option>低</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">状态:</span>
          <select className="text-sm border-gray-200 rounded-md bg-gray-50 px-2 py-1 outline-none">
            <option>全部</option>
            <option>已完成</option>
            <option>进行中</option>
            <option>待处理</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-4">序号</th>
              <th className="px-6 py-4">测试指标项</th>
              <th className="px-6 py-4">测试状态</th>
              <th className="px-6 py-4">优先级</th>
              <th className="px-6 py-4">负责人</th>
              <th className="px-6 py-4">计划完成时间</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-500">{item.id}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.name}</td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border",
                    getStatusStyle(item.status)
                  )}>
                    {getStatusLabel(item.status)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "text-xs font-bold",
                    item.priority === '高' ? 'text-red-500' : item.priority === '中' ? 'text-orange-500' : 'text-blue-500'
                  )}>{item.priority}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{item.owner}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.deadline}</td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => { setSelectedTask(item); setShowDetail(true); }}
                    className="text-blue-600 hover:text-blue-800 text-sm font-bold"
                  >
                    查看详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {showDetail && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50">
              <h2 className="text-xl font-bold text-gray-900">测试任务详情 - {selectedTask?.name}</h2>
              <button onClick={() => setShowDetail(false)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {[
                  { label: '实验领域', value: '硬件适配' },
                  { label: '部门', value: '算力架构部' },
                  { label: '申请人', value: '张工' },
                  { label: '产品线', value: '服务器 A 系列' },
                  { label: '版本', value: 'v2.4.0' },
                  { label: '型号', value: '昇腾 910B' },
                  { label: 'EUT 类别', value: '计算节点' },
                  { label: '实验类别', value: '准入测试' },
                  { label: 'EUT 数量', value: '2 台' },
                  { label: '计划 TR4A 时间', value: '2026-05-15' },
                  { label: '参与人员', value: '李工、王工、赵工' },
                  { label: '预估来科日期', value: '2026-04-10' },
                  { label: '实验地点', value: '深圳 1 号实验室' },
                  { label: '实验项目', value: selectedTask?.name },
                ].map((info, i) => (
                  <div key={i}>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{info.label}</p>
                    <p className="text-sm font-medium text-gray-800">{info.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-10 border-t pt-8">
                <h3 className="font-bold text-gray-900 mb-4">测试报告预览</h3>
                <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">暂无正式报告，测试进行中...</p>
                  <button className="mt-4 px-4 py-2 bg-white border border-gray-200 rounded-md text-xs font-bold text-gray-600 hover:bg-gray-50">上传初步数据</button>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button onClick={() => setShowDetail(false)} className="px-6 py-2 border border-gray-200 rounded-md text-sm font-bold text-gray-600 hover:bg-gray-100 transition-colors">关闭</button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-md text-sm font-bold hover:bg-blue-700 transition-colors">导出任务详情</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
