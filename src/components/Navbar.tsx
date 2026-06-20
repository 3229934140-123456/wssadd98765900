import { NavLink } from 'react-router-dom';
import { Map, ListTodo, BarChart3, Shield } from 'lucide-react';
import { cn } from '@/utils';

const navItems = [
  { to: '/', label: '风险地图', icon: Map },
  { to: '/pending', label: '待处理清单', icon: ListTodo },
  { to: '/review', label: '复盘分析', icon: BarChart3 },
];

export function Navbar() {
  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 flex items-center px-6 sticky top-0 z-50">
      <div className="flex items-center gap-3 mr-10">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Shield className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-wide">舆情风险地图</h1>
          <p className="text-xs text-slate-400">集团品牌公关部</p>
        </div>
      </div>

      <nav className="flex items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-blue-500/20 text-blue-400 shadow-inner'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                )
              }
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="ml-auto flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs text-emerald-400 font-medium">实时监测中</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
          公
        </div>
      </div>
    </header>
  );
}
