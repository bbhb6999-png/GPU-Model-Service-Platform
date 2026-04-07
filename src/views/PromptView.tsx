import React from 'react';
import { 
  Plus, 
  Search, 
  FileText, 
  Copy, 
  Save, 
  Download, 
  Hash,
  MessageSquare,
  Layout,
  Briefcase,
  Stethoscope,
  GraduationCap,
  Building2,
  ChevronRight,
  RefreshCw,
  Trash2,
  Settings2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PromptViewProps {
  activeSubMenu?: string;
}

export default function PromptView({ activeSubMenu = 'preset' }: PromptViewProps) {
  const categories = [
    { name: '全部', icon: Layout },
    { name: '政府政务', icon: Building2 },
    { name: '金融企业', icon: Briefcase },
    { name: '医疗健康', icon: Stethoscope },
    { name: '教育科研', icon: GraduationCap },
  ];

  const templates = [
    { title: '公文写作助手', desc: '根据关键词生成标准格式的政府公文草案', category: '政府政务', tags: ['公文', '写作'], time: '2026-04-01', words: '1200' },
    { title: '代码审查专家', desc: '深度分析代码逻辑，发现潜在漏洞与优化点', category: '教育科研', tags: ['编程', 'QA'], time: '2026-03-28', words: '850' },
    { title: '金融研报摘要', desc: '提取长篇金融研究报告的核心观点与数据', category: '金融企业', tags: ['研报', '摘要'], time: '2026-04-05', words: '1500' },
    { title: '病历辅助录入', desc: '将口述或非结构化文本转化为标准电子病历', category: '医疗健康', tags: ['医疗', 'NLP'], time: '2026-04-02', words: '600' },
  ];

  const customTemplates = [
    { id: 'TPL-001', name: '客服自动回复', creator: '张三', time: '2026-04-07 10:00', status: 'active' },
    { id: 'TPL-002', name: '营销文案生成', creator: '李四', time: '2026-04-06 15:30', status: 'active' },
    { id: 'TPL-003', name: '周报自动汇总', creator: '王五', time: '2026-04-05 09:00', status: 'draft' },
  ];

  if (activeSubMenu === 'custom') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">自定义提示词模板管理</h1>
            <p className="text-gray-500 mt-1 text-sm">灵活嵌入自定义变量，适配个性化业务场景</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              <Download className="w-4 h-4" />
              导出
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-100 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition-colors shadow-sm">
              <Trash2 className="w-4 h-4" />
              批量删除
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              新建模板
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="搜索模板名称或 ID..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                <tr>
                  <th className="px-6 py-4">模板 ID</th>
                  <th className="px-6 py-4">模板名称</th>
                  <th className="px-6 py-4">创建人</th>
                  <th className="px-6 py-4">创建时间</th>
                  <th className="px-6 py-4">状态</th>
                  <th className="px-6 py-4 text-right">操作</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {customTemplates.map((tpl) => (
                  <tr key={tpl.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">{tpl.id}</td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{tpl.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{tpl.creator}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{tpl.time}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border",
                        tpl.status === 'active' ? "bg-green-50 text-green-600 border-green-100" : "bg-gray-50 text-gray-400 border-gray-100"
                      )}>
                        {tpl.status === 'active' ? '已发布' : '草稿'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Settings2 className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                          <Copy className="w-4 h-4" />
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

        {/* Editor Preview (Mock) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-gray-800">模板编辑预览 (富文本 + 变量)</h3>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded text-xs font-medium text-gray-600 hover:bg-gray-50">
                <Hash className="w-3 h-3" />
                插入变量
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 rounded text-xs font-medium text-white hover:bg-blue-700">
                <Save className="w-3 h-3" />
                保存模板
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[200px] font-mono text-sm">
              <p className="text-gray-400 mb-4"># 在下方编辑您的提示词，点击上方按钮插入变量</p>
              <p>你是一个专业的 <span className="bg-blue-100 text-blue-700 px-1 rounded">{"{role}"}</span>，请根据以下信息撰写一份 <span className="bg-blue-100 text-blue-700 px-1 rounded">{"{type}"}</span>：</p>
              <p className="mt-4">【主题】：<span className="bg-blue-100 text-blue-700 px-1 rounded">{"{subject}"}</span></p>
              <p>【内容】：<span className="bg-blue-100 text-blue-700 px-1 rounded">{"{content}"}</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">预置提示词模板管理</h1>
          <p className="text-gray-500 mt-1 text-sm">覆盖政府、企业、传媒、教育、医疗全场景的行业预置模板</p>
        </div>
        <div className="flex gap-3">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            导出模板
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar: Categories */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 px-2">行业分类</h3>
            <nav className="space-y-1">
              {categories.map((cat, i) => (
                <button 
                  key={i}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                    i === 0 ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Right Content: Templates */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="按行业 / 场景筛选模板..." 
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {templates.map((tpl, i) => (
              <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                    <FileText className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                  </div>
                  <div className="flex gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="查看详情">
                      <Search className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="复制模板">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors" title="导出">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <h4 className="mt-4 font-bold text-gray-900">{tpl.title}</h4>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">{tpl.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {tpl.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded font-medium uppercase tracking-wider">#{tag}</span>
                    ))}
                  </div>
                  <span className="text-[10px] text-gray-400 font-medium">{tpl.time}</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-400">
                  <span>适用场景: {tpl.category}</span>
                  <span>约 {tpl.words} 字</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
