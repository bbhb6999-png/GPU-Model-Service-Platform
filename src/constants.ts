import { 
  Cpu, 
  Terminal, 
  Database, 
  Puzzle, 
  Zap, 
  BarChart3,
  Server,
  Network,
  Settings,
  Activity,
  PlayCircle,
  FileText,
  Search,
  Users,
  Bell,
  ChevronDown,
  ChevronRight,
  Plus,
  Download,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
  LayoutDashboard,
  Workflow,
  ShieldCheck,
  History,
  BookOpen
} from 'lucide-react';

export interface MenuItem {
  id: string;
  title: string;
  icon: any;
  children?: { id: string; title: string }[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'adaptation',
    title: '适配服务',
    icon: Cpu,
    children: [
      { id: 'chip', title: '服务器及芯片适配' },
      { id: 'storage', title: '存储及网络适配' },
      { id: 'operator', title: '算子适配' },
      { id: 'cluster', title: '小集群适配优化' },
      { id: 'performance', title: '模型性能优化' },
      { id: 'engine', title: '推理引擎适配' },
      { id: 'model-adapt', title: '模型推理适配' },
    ]
  },
  {
    id: 'prompt',
    title: '提示词工程',
    icon: Terminal,
    children: [
      { id: 'preset', title: '预置提示词模板' },
      { id: 'custom', title: '自定义提示词模板' },
    ]
  },
  {
    id: 'knowledge',
    title: '知识库服务',
    icon: Database,
    children: [
      { id: 'vector', title: '向量知识库' },
      { id: 'split', title: '文本切分' },
      { id: 'retrieval', title: '知识检索' },
      { id: 'synonym', title: '同义词库' },
    ]
  },
  {
    id: 'plugin',
    title: '插件服务',
    icon: Puzzle,
    children: [
      { id: 'management', title: '插件管理' },
      { id: 'workflow', title: '可视化工作流编排' },
      { id: 'agent', title: '自主决策智能体' },
    ]
  },
  {
    id: 'inference',
    title: '推理服务',
    icon: Zap,
    children: [
      { id: 'models', title: '模型库' },
      { id: 'api', title: '推理 API 接入' },
      { id: 'deploy', title: '模型推理部署' },
      { id: 'auth', title: '应用管理授权' },
    ]
  },
  {
    id: 'evaluation',
    title: '大模型评估',
    icon: BarChart3,
    children: [
      { id: 'tasks', title: '评估任务管理' },
      { id: 'custom-eval', title: '自定义评估' },
      { id: 'auto-eval', title: '自动化评估' },
    ]
  }
];

export const STATUS_COLORS = {
  completed: 'text-green-600 bg-green-50 border-green-200',
  processing: 'text-blue-600 bg-blue-50 border-blue-200',
  pending: 'text-orange-600 bg-orange-50 border-orange-200',
  error: 'text-red-600 bg-red-50 border-red-200',
};
