import { useState } from 'react';
import {
  ListTodo,
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  MessageSquare,
  Radio,
  MapPin,
  ChevronRight,
  Zap,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { SortType } from '@/types';
import {
  cn,
  getRiskLevelText,
  getRiskLevelColor,
  getSentimentText,
  getSentimentColor,
  getMediaTierText,
  formatDate,
  formatNumber,
  getStatusText,
  getStatusColor,
  getCategoryText,
  getCategoryColor,
} from '@/utils';

function PendingPage() {
  const { sortType, setSortType, getSortedEvents, confirmEvent, getPendingEvents } = useAppStore();
  const [confirmedIds, setConfirmedIds] = useState<Set<string>>(new Set());

  const sortedEvents = getSortedEvents();
  const pendingEvents = getPendingEvents();
  const pendingCount = pendingEvents.filter(e => e.status === 'pending').length;
  const highRiskCount = pendingEvents.filter(e => e.riskLevel === 'critical' || e.riskLevel === 'high').length;
  const todayNewCount = sortedEvents.filter(e => {
    const eventDate = new Date(e.firstPublishTime);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  }).length;
  const confirmedCount = confirmedIds.size;

  const sortOptions: { key: SortType; label: string; icon: typeof TrendingUp }[] = [
    { key: 'spreadSpeed', label: '扩散速度', icon: Zap },
    { key: 'sentiment', label: '情绪倾向', icon: MessageSquare },
    { key: 'localMedia', label: '本地媒体', icon: Radio },
  ];

  const handleConfirm = (eventId: string) => {
    confirmEvent(eventId);
    setConfirmedIds(prev => new Set(prev).add(eventId));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">待处理事件</p>
              <p className="text-3xl font-bold text-white mt-2">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <ListTodo className="w-6 h-6 text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">高风险</p>
              <p className="text-3xl font-bold text-red-400 mt-2">{highRiskCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">今日新增</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{todayNewCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Clock className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">晨会已确认</p>
              <p className="text-3xl font-bold text-emerald-400 mt-2">{confirmedCount}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50">
        <div className="p-5 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-blue-400" />
              待处理事件清单
            </h2>
            <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
              {sortOptions.map((option) => {
                const Icon = option.icon;
                const isActive = sortType === option.key;
                return (
                  <button
                    key={option.key}
                    onClick={() => setSortType(option.key)}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-blue-500/20 text-blue-400 shadow-inner'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-5 py-3 w-12">
                  #
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3">
                  事件标题
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3 w-24">
                  风险等级
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3 w-28">
                  所属地区
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3 w-28">
                  情绪倾向
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3 w-32">
                  扩散指数
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3 w-32">
                  媒体层级
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3 w-24">
                  首发时间
                </th>
                <th className="text-left text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3 w-24">
                  状态
                </th>
                <th className="text-center text-xs font-medium text-slate-400 uppercase tracking-wider px-4 py-3 w-28">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {sortedEvents.map((event, index) => {
                const isConfirmed = confirmedIds.has(event.id) || event.status === 'confirmed';
                return (
                  <tr
                    key={event.id}
                    className={cn(
                      'transition-colors',
                      isConfirmed ? 'bg-emerald-500/5' : 'hover:bg-slate-800/30'
                    )}
                  >
                    <td className="px-5 py-4 text-sm text-slate-500 font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          'w-2 h-2 rounded-full flex-shrink-0',
                          event.riskLevel === 'critical' && 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse',
                          event.riskLevel === 'high' && 'bg-orange-500 shadow-lg shadow-orange-500/50',
                          event.riskLevel === 'medium' && 'bg-yellow-500',
                          event.riskLevel === 'low' && 'bg-emerald-500',
                        )} />
                        <span className={cn(
                          'text-sm font-medium',
                          isConfirmed ? 'text-slate-400' : 'text-white'
                        )}>
                          {event.title}
                        </span>
                        {event.category && (
                          <span className={cn(
                            'px-1.5 py-0.5 rounded text-xs',
                            getCategoryColor(event.category)
                          )}>
                            {getCategoryText(event.category)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        'px-2 py-1 rounded text-xs font-medium',
                        getRiskLevelColor(event.riskLevel)
                      )}>
                        {getRiskLevelText(event.riskLevel)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm text-slate-300">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {event.city}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        'px-2 py-1 rounded text-xs font-medium',
                        getSentimentColor(event.sentiment)
                      )}>
                        {getSentimentText(event.sentiment)}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"
                            style={{ width: `${event.spreadSpeed}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 w-8">{event.spreadSpeed}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-300">
                      {getMediaTierText(event.mediaTier)}
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-400">
                      {formatDate(event.firstPublishTime)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn(
                        'px-2 py-1 rounded text-xs font-medium',
                        getStatusColor(event.status)
                      )}>
                        {getStatusText(event.status)}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {isConfirmed ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-sm font-medium">
                          <CheckCircle2 className="w-4 h-4" />
                          已确认
                        </span>
                      ) : (
                        <button
                          onClick={() => handleConfirm(event.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4" />
                          晨会确认
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {sortedEvents.length === 0 && (
          <div className="py-16 text-center">
            <ListTodo className="w-16 h-16 mx-auto mb-4 text-slate-700" />
            <p className="text-slate-400 text-lg">暂无待处理事件</p>
            <p className="text-slate-500 text-sm mt-2">所有事件都已处理完成</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PendingPage;
