import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  ChevronDown, 
  Menu as MenuIcon,
  ChevronRight,
  LogOut,
  Settings as SettingsIcon,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { MENU_ITEMS } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeMenu: string;
  activeSubMenu: string;
  onMenuChange: (menuId: string, subMenuId: string) => void;
}

export default function Layout({ children, activeMenu, activeSubMenu, onMenuChange }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([activeMenu]);

  const toggleMenu = (item: any) => {
    const isExpanded = expandedMenus.includes(item.id);
    if (!isExpanded) {
      setExpandedMenus(prev => [...prev, item.id]);
      if (item.children && item.children.length > 0) {
        onMenuChange(item.id, item.children[0].id);
      }
    } else {
      setExpandedMenus(prev => prev.filter(m => m !== item.id));
    }
  };

  return (
    <div className="flex h-screen bg-[#f0f2f5] font-sans text-[#000000d9]">
      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-[#001529] text-white transition-all duration-300 flex flex-col shrink-0",
          isSidebarCollapsed ? "w-20" : "w-64"
        )}
      >
        <div className="h-16 flex items-center px-6 gap-3 border-b border-white/10 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          {!isSidebarCollapsed && (
            <span className="font-bold text-lg tracking-tight">模型服务平台</span>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
          {MENU_ITEMS.map((item) => (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => toggleMenu(item)}
                className={cn(
                  "w-full flex items-center px-6 py-3 hover:bg-white/10 transition-colors group",
                  activeMenu === item.id ? "text-blue-400" : "text-gray-400"
                )}
              >
                <item.icon className={cn("w-5 h-5 shrink-0", activeMenu === item.id ? "text-blue-400" : "text-gray-400")} />
                {!isSidebarCollapsed && (
                  <>
                    <span className="ml-3 flex-1 text-left text-sm font-medium">{item.title}</span>
                    <ChevronDown 
                      className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        expandedMenus.includes(item.id) ? "rotate-180" : ""
                      )} 
                    />
                  </>
                )}
              </button>
              
              <AnimatePresence>
                {!isSidebarCollapsed && expandedMenus.includes(item.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#000c17]"
                  >
                    {item.children?.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => onMenuChange(item.id, sub.id)}
                        className={cn(
                          "w-full text-left pl-14 pr-6 py-2.5 text-sm transition-colors",
                          activeSubMenu === sub.id 
                            ? "text-white bg-blue-600" 
                            : "text-gray-400 hover:text-white"
                        )}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="w-full flex items-center justify-center p-2 hover:bg-white/10 rounded-md transition-colors"
          >
            <MenuIcon className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="搜索模型、任务或文档..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm border border-blue-200 group-hover:bg-blue-200 transition-colors">
                JD
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-700 leading-none">Admin User</p>
                <p className="text-xs text-gray-400 mt-1">bbhb6999@gmail.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
          
          <footer className="mt-12 py-6 border-t border-gray-200 text-center text-sm text-gray-400">
            <p>© 2026 GPU 模型服务平台 | 版本号 v2.4.0-release</p>
          </footer>
        </main>
      </div>
    </div>
  );
}
