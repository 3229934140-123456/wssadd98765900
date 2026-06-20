import { useState } from 'react';
import {
  X,
  MapPin,
  TrendingUp,
  Users,
  MessageSquare,
  Tag,
  Clock,
  ChevronRight,
  User,
  ChevronLeft,
  Building2,
} from 'lucide-react';
import { PublicOpinionEvent, EventCategory, DisposalStatus, CityRisk } from '@/types';
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
  drillLevel: 'province' | 'city';
  province: string | null;
  city: string | null;
  cityRisks: CityRisk[];
  events: PublicOpinionEvent[];
}

const assigneeList = ['张明', '李娜', '王芳', '刘伟', '陈静', '赵强', '孙丽', '周军'];

export function RiskDetailPanel({
  drillLevel,
  province,
  city,
  cityRisks,
  events,
}: RiskDetailPanelProps) {
  const {
    selectedEvent,
    setSelectedEvent,
    updateEventCategory,
    updateEventAssignee,
    updateEventStatus,
    setSelectedProvince,
    setSelectedCity,
  } = useAppStore();

  const [showCategoryMenu, setShowCategoryMenu] = useState(false);
  const [showAssigneeMenu, setShowAssigneeMenu] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const title = drillLevel === 'city' ? city : province;
  const isProvinceLevel = drillLevel === 'province' && province && !selectedEvent;

  const handleBackToProvince = () => {
    setSelectedCity(null);
    setSelectedEvent(null);
  };

  const handleBackToCities = () => {
    setSelectedEvent(null);
  };

  const handleProvinceClear = () => {
    setSelectedProvince(null);
    setSelectedCity(null);
    setSelectedEvent(null);
  };

  const handleCityClick = (cityName: string) => {
    setSelectedCity(cityName);
  };

  const handleCategorySelect = (category: EventCategory) => {
    if (selectedEvent) updateEventCategory(selectedEvent.id, category);
    setShowCategoryMenu(false);
  };

  const handleAssigneeSelect = (assignee: string) => {
    if (selectedEvent) updateEventAssignee(selectedEvent.id, assignee);
    setShowAssigneeMenu(false);
  };

  const handleStatusSelect = (status: DisposalStatus) => {
    if (selectedEvent) updateEventStatus(selectedEvent.id, status);
    setShowStatusMenu(false);
  };

  if (!province && !city) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500">
        <MapPin className="w-16 h-16 mb-4 opacity-30" />
        <p className="text-lg font-medium">点击地图查看区域详情</p>
        <p className="text-sm mt-2">选择省份查看当地舆情风险</p>
      </div>
    );
  }

  const renderEventDetail = () => {
    if (!selectedEvent) return null;
    const e = selectedEvent;

    return (
      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
        <div className="flex items-center gap-2 -mx-1">
          <button
            onClick={drillLevel === 'city' ? handleBackToCities : handleBackToCities}
            className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            返回{drillLevel === 'city' ? city : province}事件列表
          </button>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-base font-semibold text-white leading-relaxed">
              {e.title}
            </h3>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={cn('px-2 py-0.5 rounded text-xs font-medium border', getRiskLevelColor(e.riskLevel))}>
                {getRiskLevelText(e.riskLevel)}
              </span>
              <span className={cn('px-2 py-0.5 rounded text-xs font-medium', getSentimentColor(e.sentiment))}>
                {getSentimentText(e.sentiment)}
              </span>
              <span className="text-xs text-slate-500">{getMediaTierText(e.mediaTier)}</span>
              <span className="text-xs text-slate-500">· {e.province} · {e.city}</span>
            </div>
          </div>
          <button
            onClick={handleBackToCities}
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
              {e.firstPlatform}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">转发峰值</div>
            <div className="text-sm font-medium text-white flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              {formatNumber(e.repostPeak)}
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">扩散速度</div>
            <div className="mt-1.5">
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-500 to-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${e.spreadSpeed}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-1">{e.spreadSpeed}%</div>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700/50">
            <div className="text-xs text-slate-400 mb-1">本地媒体参与</div>
            <div className="mt-1.5">
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${e.localMediaInvolvement}%` }}
                />
              </div>
              <div className="text-xs text-slate-500 mt-1">{e.localMediaInvolvement}%</div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-xs text-slate-400 mb-2">主要话题</div>
          <div className="flex flex-wrap gap-2">
            {e.mainTopics.map((topic, idx) => (
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
            "{e.typicalContent}"
          </div>
          <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(e.firstPublishTime)} 首发
          </div>
        </div>

        <div className="pt-3 border-t border-slate-700/50 space-y-3">
          <div className="text-sm font-medium text-slate-300">事件处置</div>

          <div className="relative">
            <div className="text-xs text-slate-500 mb-1.5">事件分类</div>
            <button
              onClick={() => { setShowCategoryMenu(!showCategoryMenu); setShowAssigneeMenu(false); setShowStatusMenu(false); }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-left flex items-center justify-between hover:border-slate-600 transition-colors"
            >
              {e.category ? (
                <span className={cn('font-medium', getCategoryColor(e.category).split(' ')[0])}>
                  {getCategoryText(e.category)}
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
                      e.category === cat && 'bg-slate-700/30'
                    )}
                  >
                    <Tag className="w-3.5 h-3.5 text-slate-500" />
                    <span className={getCategoryColor(cat).split(' ')[0]}>{getCategoryText(cat)}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="text-xs text-slate-500 mb-1.5">处置责任人</div>
            <button
              onClick={() => { setShowAssigneeMenu(!showAssigneeMenu); setShowCategoryMenu(false); setShowStatusMenu(false); }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-left flex items-center justify-between hover:border-slate-600 transition-colors"
            >
              {e.assignee ? (
                <span className="text-white font-medium flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  {e.assignee}
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
                      e.assignee === name && 'bg-slate-700/30 text-blue-400'
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
              onClick={() => { setShowStatusMenu(!showStatusMenu); setShowCategoryMenu(false); setShowAssigneeMenu(false); }}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-left flex items-center justify-between hover:border-slate-600 transition-colors"
            >
              <span className={cn('font-medium', getStatusColor(e.status).split(' ')[0])}>
                {getStatusText(e.status)}
              </span>
              <ChevronRight className={cn('w-4 h-4 text-slate-500 transition-transform', showStatusMenu && 'rotate-90')} />
            </button>
            {showStatusMenu && (
              <div className="absolute z-10 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                {[DisposalStatus.PENDING, DisposalStatus.CONFIRMED, DisposalStatus.PROCESSING, DisposalStatus.COOLED, DisposalStatus.RESOLVED].map((s) => (
                  <button
                    key={s}
                    onClick={() => handleStatusSelect(s)}
                    className={cn(
                      'w-full px-3 py-2 text-sm text-left hover:bg-slate-700/50 transition-colors',
                      e.status === s && 'bg-slate-700/30'
                    )}
                  >
                    <span className={getStatusColor(s).split(' ')[0]}>{getStatusText(s)}</span>
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
          <h3 className="text-base font-semibold text-white">{title} 舆情事件</h3>
          <span className="text-sm text-slate-400">共 {events.length} 起</span>
        </div>

        <div className="space-y-2 max-h-[calc(100vh-360px)] overflow-y-auto pr-1 -mr-1">
          {events.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p>当前筛选条件下无舆情事件</p>
            </div>
          ) : (
            events.map((ev) => (
              <button
                key={ev.id}
                onClick={() => setSelectedEvent(ev)}
                className="w-full text-left p-3 bg-slate-800/40 hover:bg-slate-800/80 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0',
                    ev.riskLevel === 'critical' && 'bg-red-500 shadow-lg shadow-red-500/50 animate-pulse',
                    ev.riskLevel === 'high' && 'bg-orange-500 shadow-lg shadow-orange-500/50',
                    ev.riskLevel === 'medium' && 'bg-yellow-500',
                    ev.riskLevel === 'low' && 'bg-emerald-500',
                  )} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white font-medium truncate group-hover:text-blue-400 transition-colors">
                      {ev.title}
                    </div>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={cn('px-1.5 py-0.5 rounded text-xs', getRiskLevelColor(ev.riskLevel))}>
                        {getRiskLevelText(ev.riskLevel)}
                      </span>
                      <span className="text-xs text-slate-500">{ev.city}</span>
                      <span className="text-xs text-slate-500">·</span>
                      <span className="text-xs text-slate-500">{formatDate(ev.firstPublishTime)}</span>
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

  const renderCityList = () => {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 -mx-1 mb-2">
          {drillLevel === 'city' && (
            <button
              onClick={handleBackToProvince}
              className="flex items-center gap-1 px-2 py-1 text-xs text-slate-400 hover:text-white hover:bg-slate-700/50 rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              返回省份视图
            </button>
          )}
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-400" />
            {province} · 城市列表
          </h3>
          <button
            onClick={handleProvinceClear}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            清空选择
          </button>
        </div>

        <div className="space-y-2">
          {cityRisks.length === 0 ? (
            <div className="text-center py-6 text-slate-500">
              <Building2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">无城市数据</p>
            </div>
          ) : (
            cityRisks.map((c) => (
              <button
                key={c.cityName}
                onClick={() => handleCityClick(c.cityName)}
                className={cn(
                  'w-full p-3 rounded-lg border transition-all text-left group',
                  city === c.cityName
                    ? 'bg-blue-500/10 border-blue-500/30'
                    : 'bg-slate-800/40 hover:bg-slate-800/70 border-slate-700/50 hover:border-slate-600'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-2.5 h-2.5 rounded-full flex-shrink-0',
                      c.riskScore >= 80 && 'bg-red-500 animate-pulse shadow shadow-red-500/50',
                      c.riskScore >= 60 && c.riskScore < 80 && 'bg-orange-500',
                      c.riskScore >= 40 && c.riskScore < 60 && 'bg-yellow-500',
                      c.riskScore >= 20 && c.riskScore < 40 && 'bg-cyan-500',
                      c.riskScore < 20 && 'bg-slate-600',
                    )} />
                    <div>
                      <div className={cn(
                        'text-sm font-medium',
                        city === c.cityName ? 'text-blue-300' : 'text-white group-hover:text-blue-400'
                      )}>
                        {c.cityName}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {c.eventCount} 起事件 · {c.highRiskCount} 起高风险
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={cn(
                        'text-lg font-bold',
                        c.riskScore >= 80 && 'text-red-400',
                        c.riskScore >= 60 && c.riskScore < 80 && 'text-orange-400',
                        c.riskScore >= 40 && c.riskScore < 60 && 'text-yellow-400',
                        c.riskScore >= 20 && c.riskScore < 40 && 'text-cyan-400',
                        c.riskScore < 20 && 'text-slate-500',
                      )}>
                        {c.riskScore || '—'}
                      </div>
                      <div className="text-[10px] text-slate-500">风险分值</div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        <div className="pt-3 mt-3 border-t border-slate-700/40">
          <button
            onClick={() => setSelectedCity(null)}
            className="w-full text-xs text-slate-400 hover:text-white p-2 rounded hover:bg-slate-800/60 transition-colors"
          >
            查看全省事件（{events.length} 起）
          </button>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    if (selectedEvent) return null;

    return (
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-bold text-white">
            {title || '请选择区域'}
          </h2>
          {drillLevel === 'city' && (
            <span className="text-xs text-slate-500">· {province}</span>
          )}
        </div>
        {title && !selectedEvent && (
          <button
            onClick={handleProvinceClear}
            className="text-xs text-slate-400 hover:text-white transition-colors"
          >
            清空
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      {renderHeader()}

      <div className="flex-1 overflow-y-auto pr-1">
        {selectedEvent ? (
          renderEventDetail()
        ) : drillLevel === 'province' && province && cityRisks.length > 0 ? (
          <div className="space-y-6">
            {renderCityList()}
            {events.length > 0 && (
              <div className="pt-4 border-t border-slate-700/40">
                {renderEventList()}
              </div>
            )}
          </div>
        ) : (
          renderEventList()
        )}
      </div>
    </div>
  );
}
