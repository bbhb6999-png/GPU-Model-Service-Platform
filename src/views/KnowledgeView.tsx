import React from 'react';
import { 
  Plus, 
  Search, 
  Database, 
  FileUp, 
  Scissors, 
  SearchCode, 
  BookText,
  ChevronRight,
  MoreHorizontal,
  CheckCircle2,
  HardDrive,
  Cpu,
  RefreshCw,
  Download,
  Trash2,
  Settings2,
  Eye,
  Layers,
  History,
  Copy,
  ExternalLink,
  Filter,
  FileText,
  MessageSquare,
  Type as TypeIcon
} from 'lucide-react';
import { cn } from '../lib/utils';

interface KnowledgeViewProps {
  activeSubMenu?: string;
}

export default function KnowledgeView({ activeSubMenu = 'vector' }: KnowledgeViewProps) {
  const vectorLibraries = [
    { id: 'KB-001', name: '企业内部规章制度', type: '文本', volume: '1,240', time: '2026-04-01 10:00', status: 'ready' },
    { id: 'KB-002', name: '产品技术文档库', type: '文本', volume: '8,560', time: '2026-04-02 14:30', status: 'ready' },
    { id: 'KB-003', name: '2025 行业研究报告', type: '文本', volume: '12,400', time: '2026-04-05 09:00', status: 'processing' },
    { id: 'KB-004', name: '产品宣传图册', type: '图像', volume: '450', time: '2026-04-06 16:00', status: 'ready' },
  ];

  const splitTasks = [
    { id: 'SPL-001', name: '员工手册.pdf', rule: '语义段落', status: 'completed', volume: '128 块', time: '2026-04-07 09:00' },
    { id: 'SPL-002', name: '技术规格书.docx', rule: '固定长度', status: 'processing', volume: '45/200 块', time: '2026-04-07 10:15' },
    { id: 'SPL-003', name: '法律条文汇编.txt', rule: '正则匹配', status: 'pending', volume: '-', time: '2026-04-07 11:00' },
  ];

  const synonyms = [
    { id: 'SYN-001', word: 'GPU', synonyms: ['图形处理器', '显卡'], near: ['加速卡', '算力芯片'], time: '2026-04-01' },
    { id: 'SYN-002', word: 'LLM', synonyms: ['大语言模型', '生成式 AI'], near: ['预训练模型'], time: '2026-04-02' },
    { id: 'SYN-003', word: '适配', synonyms: ['兼容', '调优'], near: ['迁移', '部署'], time: '2026-04-03' },
  ];

  if (activeSubMenu === 'split') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">文本语料在线切分工具</h1>
            <p className="text-gray-500 mt-1 text-sm">将长文本自动切分为独立可处理的文本单元，适配 AI 训练与检索</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              下载切分结果
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              新建切分任务
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-gray-800">切分任务列表</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                    <tr>
                      <th className="px-6 py-4">任务 ID</th>
                      <th className="px-6 py-4">文本名称</th>
                      <th className="px-6 py-4">切分规则</th>
                      <th className="px-6 py-4">状态</th>
                      <th className="px-6 py-4">数据量</th>
                      <th className="px-6 py-4 text-right">操作</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {splitTasks.map((task) => (
                      <tr key={task.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-mono text-gray-500">{task.id}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-900">{task.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{task.rule}</td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border",
                            task.status === 'completed' ? "bg-green-50 text-green-600 border-green-100" : 
                            task.status === 'processing' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-gray-50 text-gray-400 border-gray-100"
                          )}>
                            {task.status === 'processing' && <RefreshCw className="w-2 h-2 animate-spin" />}
                            {task.status === 'completed' ? '已完成' : task.status === 'processing' ? '处理中' : '待处理'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{task.volume}</td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="预览">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="下载">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors" title="重新切分">
                              <RefreshCw className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-bold text-gray-800">切分结果预览</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-xs leading-relaxed text-gray-600">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-blue-600">Chunk #{i}</span>
                      <span className="text-[10px] text-gray-400">342 字符</span>
                    </div>
                    这是切分后的文本单元示例内容。系统会根据您设置的语义逻辑或固定规则，将长篇文档拆解为适合向量化索引的小块。每个块都保留了必要的上下文信息...
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6">切分规则配置</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">切分模式</label>
                  <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                    <option>语义逻辑 (推荐)</option>
                    <option>固定长度切分</option>
                    <option>正则匹配切分</option>
                    <option>自定义脚本</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">切分粒度</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['词语', '句子', '段落'].map((g) => (
                      <button key={g} className={cn(
                        "py-2 text-xs border rounded-lg transition-all",
                        g === '段落' ? "bg-blue-50 border-blue-200 text-blue-600 font-bold" : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                      )}>{g}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">块大小 (Tokens)</label>
                  <input type="number" defaultValue={512} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">重叠度 (Overlap)</label>
                  <input type="number" defaultValue={50} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
              <button className="w-full mt-6 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors">
                应用配置并切分
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubMenu === 'retrieval') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">知识检索工具</h1>
            <p className="text-gray-500 mt-1 text-sm">在选定知识库中进行语义检索，测试 Top-K 召回效果与匹配精度</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">选择知识库</label>
              <select className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                <option>企业内部规章制度</option>
                <option>产品技术文档库</option>
                <option>2025 行业研究报告</option>
              </select>
            </div>
            <div className="md:col-span-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Top-K 数量 (1-20)</label>
              <input type="number" min={1} max={20} defaultValue={5} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="输入问题或关键词进行检索..." 
                className="w-full pl-10 pr-24 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <button className="absolute right-1 top-1 bottom-1 px-4 bg-blue-600 text-white rounded text-xs font-bold hover:bg-blue-700">
                检索
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <SearchCode className="w-4 h-4 text-blue-600" />
              检索结果召回
            </h3>
            {[
              { score: '0.942', text: '员工年假申请流程：员工需提前 5 个工作日在 OA 系统提交申请，经部门负责人审批后生效。未休年假可顺延至次年 3 月底。' },
              { score: '0.885', text: '请假制度补充说明：除年假外，病假需提供二级以上医院证明。事假原则上每月不超过 2 天，需提前报备。' },
              { score: '0.721', text: '办公区域管理规范：员工应保持工位整洁，下班后关闭电子设备电源。严禁在办公区域吸烟或大声喧哗。' },
            ].map((res, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-300 transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-bold">匹配度: {res.score}</span>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 text-gray-400 hover:text-blue-600"><Copy className="w-3.5 h-3.5" /></button>
                    <button className="p-1 text-gray-400 hover:text-blue-600"><ExternalLink className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {res.text.split('年假').map((part, index, array) => (
                    <React.Fragment key={index}>
                      {part}
                      {index < array.length - 1 && <span className="bg-yellow-100 text-yellow-800 font-bold px-0.5 rounded">年假</span>}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-bold text-gray-800">历史检索记录</h3>
              <History className="w-4 h-4 text-gray-400" />
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { q: '如何申请年假？', time: '10:25' },
                { q: 'GPU 显存限制是多少？', time: '昨天' },
                { q: 'API 调用频率限制', time: '昨天' },
              ].map((h, i) => (
                <div key={i} className="px-6 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="text-xs font-medium text-gray-700 truncate">{h.q}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{h.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeSubMenu === 'synonym') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">同义词库管理</h1>
            <p className="text-gray-500 mt-1 text-sm">管理行业术语的同义词与近义词关联，提升检索与写作的语义理解能力</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <FileUp className="w-4 h-4" />
              批量导入
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              新增词条
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="搜索中心词或关联词..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">词条 ID</th>
                  <th className="px-6 py-4">中心词</th>
                  <th className="px-6 py-4">同义词组</th>
                  <th className="px-6 py-4">近义词组</th>
                  <th className="px-6 py-4">创建时间</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {synonyms.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{item.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{item.word}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {item.synonyms.map((s, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded border border-blue-100">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {item.near.map((s, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded border border-gray-100">{s}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-400">{item.time}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Settings2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
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
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">向量知识库管理</h1>
          <p className="text-gray-500 mt-1 text-sm">构建私有知识库，支持高维向量存储、语义相似度匹配与跨模态检索</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            创建知识库
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
            <FileUp className="w-4 h-4" />
            上传数据
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <div className="flex gap-4 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="搜索知识库名称或 ID..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none">
              <option>全部类型</option>
              <option>文本</option>
              <option>图像</option>
            </select>
            <select className="px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none">
              <option>全部状态</option>
              <option>已就绪</option>
              <option>处理中</option>
            </select>
          </div>
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th className="px-6 py-4">知识库 ID</th>
                <th className="px-6 py-4">名称</th>
                <th className="px-6 py-4">数据类型</th>
                <th className="px-6 py-4">数据量</th>
                <th className="px-6 py-4">创建时间</th>
                <th className="px-6 py-4">状态</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vectorLibraries.map((lib) => (
                <tr key={lib.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-gray-500">{lib.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">{lib.name}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border",
                      lib.type === '文本' ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-purple-50 text-purple-600 border-purple-100"
                    )}>
                      {lib.type === '文本' ? <FileText className="w-2.5 h-2.5" /> : <Layers className="w-2.5 h-2.5" />}
                      {lib.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{lib.volume} 向量</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{lib.time}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border",
                      lib.status === 'ready' ? "bg-green-50 text-green-600 border-green-100" : "bg-blue-50 text-blue-600 border-blue-100"
                    )}>
                      {lib.status === 'processing' && <RefreshCw className="w-2 h-2 animate-spin" />}
                      {lib.status === 'ready' ? '已就绪' : '处理中'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="查看数据">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="检索测试">
                        <SearchCode className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="编辑">
                        <Settings2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors" title="删除">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">总向量存储</p>
            <p className="text-xl font-bold text-gray-900">22,650,400</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">检索成功率</p>
            <p className="text-xl font-bold text-gray-900">99.8%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">存储占用</p>
            <p className="text-xl font-bold text-gray-900">45.2 GB</p>
          </div>
        </div>
      </div>
    </div>
  );
}

