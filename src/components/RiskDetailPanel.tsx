import { useState } from 'react';
import { X, MapPin, TrendingUp, Users, MessageSquare, Tag, Clock, ChevronRight, User } from 'lucide-react';
import { PublicOpinionEvent, EventCategory, DisposalStatus } from '@/types';
import {
  cn,
  getRiskLevelText,
  getRiskLevelColor,
  getCategoryText,
  getCategoryColor,
  getSentimentText,
  getSentimentColor,
  getMediaTierText,
  formatDate,
  formatNumber,
  getStatusText,
  getStatusColor,
} from '@/utils';
import { useAppStore } from '@/store/useAppStore';

interface RiskDetailPanelProps {
  province: string | null;
  events: PublicOpinionEvent[];
}

const assigneeList = ['张明', '李娜', '王芳', '刘伟', '陈静', '赵强', '孙丽', '周军'];

export function RiskDetailPanel({ province, events }: RiskDetailPanelProps) {
  const { selectedEvent, setSelectedEvent, updateEventCategory, updateEventAssignee, updateEventStatus } = useAppStore();
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showAssigneeMenu, setShowAssigneeMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  if (!province) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500">
        <MapPin className="w-16 h-16 mb-4 opacity-30" />
        <p className="text-lg font-medium">点击地图查看区域详情</p>
        <p className="text-sm mt-2">选择省份查看当地舆情风险</p>
      </div>
    );
  }

  const handleCategorySelect = (category: EventCategory) => {
    if (selectedEvent) {
      updateEventCategory(selectedEvent.id, category);
    }
    setShowCategoryMenu(false);
  };

  const handleAssigneeSelect = (assignee: string) => {
    if (selectedEvent) {
      updateEventAssignee(selectedEvent.id, assignee);
    }
    setShowAssigneeMenu(false);
  };

  const handleStatusSelect = (status: DisposalStatus) => {
    if (selectedEvent) {
      updateEventStatus(selectedEvent.id, status);
    }
    setShowStatusMenu(false);
  };

  const renderEventDetail = () => {
    if (!selectedEvent) return null;

    return (
      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-white leading-relaxed">
              {selectedEvent.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn('px-2 py-0.5 rounded text-xs font-medium', getRiskLevelColor(selectedEvent.riskLevel))}>
                {getRiskLevelText(selectedEvent.riskLevel)}
              </span>
              <span className={cn('px-2 py-0.5 rounded text-xs font-medium', getSentimentColor(selectedEvent.sentiment))}>
                {getSentimentText(selectedEvent.sentiment)}
              </span>
              <span className="text-xs text-slate-500">
                {getMediaTierText(selectedEvent.mediaTier)}
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedEvent(null)}
            className="p-1 rounded hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">首发平台</div>
            <div className="text-sm font-medium text-white flex items-center gap-1">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              {selectedEvent.firstPlatform}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">转发峰值</div>
            <div className="text-sm font-medium text-white flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              {formatNumber(selectedEvent.repostPeak)}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">扩散速度</div>
            <div className="mt-1.5">
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${selectedEvent.spreadSpeed}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-1">{selectedEvent.spreadSpeed}%</div>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">本地媒体参与</div>
            <div className="mt-1.5">
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${selectedEvent.localMediaInvolvement}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-1">{selectedEvent.localMediaInvolvement}%</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400 mb-2">主要话题</div>
          <div className="flex flex-wrap gap-2">
            {selectedEvent.mainTopics.map((topic, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-md text-xs border border-blue-500/20"
              >
                #{topic}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400 mb-2">典型原文</div>
          <div className="bg-slate-800/30 rounded-lg p-3 border-l-2 border-blue-500/50 text-sm text-slate-300 leading-relaxed">
            "{selectedEvent.typicalContent}"
          </div>
          <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(selectedEvent.firstPublishTime)} 首发
          </div>
        </div>

        <div className="pt-3 border-t border-slate-700/50 space-y-3">
          <div className="text-sm font-medium text-slate-300">事件处置</div>

          <div className="relative">
            <div className="text-xs text-slate-500 mb-1.5">事件分类</div>
            <button
              onClick={() => {
                setShowCategoryMenu(!showCategoryMenu);
                setShowAssigneeMenu(false);
                setShowStatusMenu(false);
              }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-left flex items-center justify-between hover:border-slate-600 transition-colors"
            >
              {selectedEvent.category ? (
                <span className={cn('font-medium', getCategoryColor(selectedEvent.category).split(' ')[0])}>
                  {getCategoryText(selectedEvent.category)}
                </span>
              ) : (
                <span className="text-slate-500">请选择分类</span>
              )}
              <ChevronRight className={cn('w-4 h-4 text-slate-500 transition-transform', showCategoryMenu && 'rotate-90')} />
            </button>
            {showCategoryMenu && (
              <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                {Object.values(EventCategory).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={cn(
                      'w-full px-3 py-2 text-sm text-left hover:bg-slate-700/50 flex items-center gap-2 transition-colors',
                      selectedEvent.category === cat && 'bg-slate-700/30'
                    )}
                  >
                    <Tag className="w-3.5 h-3.5 text-slate-500" />
                    <span className={getCategoryColor(cat).split(' ')[0]}>
                      {getCategoryText(cat)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="text-xs text-slate-500 mb-1.5">处置责任人</div>
            <button
              onClick={() => {
                setShowAssigneeMenu(!showAssigneeMenu);
                setShowCategoryMenu(false);
                setShowStatusMenu(false);
              }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-left flex items-center justify-between hover:border-slate-600 transition-colors"
            >
              {selectedEvent.assignee ? (
                <span className="text-white font-medium flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  {selectedEvent.assignee}
                </span>
              ) : (
                <span className="text-slate-500 flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  指派责任人
                </span>
              )}
              <ChevronRight className={cn('w-4 h-4 text-slate-500 transition-transform', showAssigneeMenu && 'rotate-90')} />
            </button>
            {showAssigneeMenu && (
              <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                {assigneeList.map((name) => (
                  <button
                    key={name}
                    onClick={() => handleAssigneeSelect(name)}
                    className={cn(
                      'w-full px-3 py-2 text-sm text-left hover:bg-slate-700/50 transition-colors',
                      selectedEvent.assignee === name && 'bg-slate-700/30 text-blue-400'
                    )}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="text-xs text-slate-500 mb-1.5">处置状态</div>
            <button
              onClick={() => {
                setShowStatusMenu(!showStatusMenu);
                setShowCategoryMenu(false);
                setShowAssigneeMenu(false);
              }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-left flex items-center justify-between hover:border-slate-600 transition-colors"
            >
              <span className={cn('font-medium', getStatusColor(selectedEvent.status).split(' ')[0])}>
                {getStatusText(selectedEvent.status)}
              </span>
              <ChevronRight className={cn('w-4 h-4 text-slate-500 transition-transform', showStatusMenu && 'rotate-90')} />
            </button>
            {showStatusMenu && (
              <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                {[DisposalStatus.PENDING, DisposalStatus.CONFIRMED, DisposalStatus.PROCESSING, DisposalStatus.COOLED, DisposalStatus.RESOLVED].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleStatusSelect(status)}
                    className={cn(
                      'w-full px-3 py-2 text-sm text-left hover:bg-slate-700/50 transition-colors',
                      selectedEvent.status === status && 'bg-slate-700/30'
                    )}
                  >
                    <span className={getStatusColor(status).split(' ')[0]}>
                      {getStatusText(status)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderEventList = () => {
    if (selectedEvent) return null;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white">
            {province} 舆情事件
          </h3>
          <span className="text-sm text-slate-400">
            共 {events.length} 起
          </span>
        </div>

        <div className="space-y-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-1 -mr-1">
          {events.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>暂无舆情事件</p>
            </div>
          ) : (
            events.map((event) => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="w-full text-left p-3 bg-slate-800/40 hover:bg-slate-800/80 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0',
                    event.riskLevel === 'critical' && 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse',
                    event.riskLevel === 'high' && 'bg-orange-500 shadow-lg shadow-orange-500/50',
                    event.riskLevel === 'medium' && 'bg-yellow-500',
                    event.riskLevel === 'low' && 'bg-emerald-500',
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                      {event.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className={cn('px-1.5 py-0.5 rounded text-xs', getRiskLevelColor(event.riskLevel))}>
                        {getRiskLevelText(event.riskLevel)}
                      </span>
                      <span className="text-xs text-slate-500">{event.city}</span>
                      <span className="text-xs text-slate-500">·</span>
                      <span className="text-xs text-slate-500">{formatDate(event.firstPublishTime)}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 flex-shrink-0 mt-1" />
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {!selectedEvent && (
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">{province || '请选择区域'}</h2>
          </div>
          {province && (
            <span className="text-sm text-slate-400">
              {events.length} 起事件
            </span>
          )}
        </div>
      )}

      <div className="flex-1 overflow-y-auto pr-1">
        {province ? (selectedEvent ? renderEventDetail() : renderEventList()) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-500">
            <MapPin className="w-16 h-16 mb-4 opacity-30" />
            <p className="text-lg font-medium">点击地图查看区域详情</p>
            <p className="text-sm mt-2">选择省份查看当地舆情风险</p>
          </div>
        )}
      </div>
    </div>
  );
}
