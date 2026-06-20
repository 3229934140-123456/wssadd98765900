import { useEffect, useRef, useState, useMemo } from 'react';
import * as echarts from 'echarts';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Users,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MapPin,
} from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import {
  computeRegionRisks,
  computeHotWords,
  getCooledEvents,
  getThisWeekRange,
  filterEventsByDateRange,
  strategySuggestions,
} from '@/data/mockData';
import {
  cn,
  formatDate,
  getStatusText,
  getStatusColor,
} from '@/utils';
import { RegionRisk, HotWord, PublicOpinionEvent } from '@/types';

function ReviewPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [expandedSug, setExpandedSug] = useState<string | null>(null);
  const { events, selectedBrand, brands } = useAppStore();

  const brandName = brands.find((b) => b.id === selectedBrand)?.name || '';

  const thisWeekEvents = useMemo(() => {
    const [start, end] = getThisWeekRange();
    const weekBrandEvents = events.filter((e) => e.brandId === selectedBrand);
    return filterEventsByDateRange(weekBrandEvents, start, end);
  }, [events, selectedBrand]);

  const highRiskRegions = useMemo(() => {
    const all = computeRegionRisks(thisWeekEvents).filter((r) => r.eventCount > 0);
    return [...all].sort((a, b) => b.riskScore - a.riskScore).slice(0, 10);
  }, [thisWeekEvents]);

  const hotWords = useMemo<HotWord[]>(() => computeHotWords(thisWeekEvents), [thisWeekEvents]);
  const cooledEvents = useMemo<PublicOpinionEvent[]>(() => getCooledEvents(thisWeekEvents).slice(0, 8), [thisWeekEvents]);

  const maxWordCount = useMemo(() => Math.max(1, ...hotWords.map((w) => w.count)), [hotWords]);

  useEffect(() => {
    if (!chartRef.current) return;
    chartInstance.current?.dispose();
    chartInstance.current = echarts.init(chartRef.current, 'dark');

    const sorted = [...highRiskRegions].reverse();
    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      grid: { left: '3%', right: '10%', top: '3%', bottom: '3%', containLabel: true },
      xAxis: {
        type: 'value', max: 100,
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#64748b', fontSize: 11 },
        splitLine: { lineStyle: { color: '#1e293b' } },
      },
      yAxis: {
        type: 'category', data: sorted.map((r) => r.regionName),
        axisLine: { show: false }, axisTick: { show: false },
        axisLabel: { color: '#cbd5e1', fontSize: 12 },
      },
      series: [{
        type: 'bar',
        data: sorted.map((r: RegionRisk) => ({
          value: r.riskScore,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: r.riskScore >= 80 ? '#ef4444' : r.riskScore >= 60 ? '#f97316' : '#eab308' },
              { offset: 1, color: r.riskScore >= 80 ? '#fca5a5' : r.riskScore >= 60 ? '#fdba74' : '#fde047' },
            ]),
            borderRadius: [0, 4, 4, 0],
          },
        })),
        barWidth: 18,
        label: { show: true, position: 'right', color: '#94a3b8', fontSize: 11, formatter: '{c}' },
        emphasis: { itemStyle: { shadowBlur: 20, shadowColor: 'rgba(249, 115, 22, 0.5)' } },
      }],
      tooltip: {
        trigger: 'axis', axisPointer: { type: 'shadow' },
        backgroundColor: 'rgba(15, 23, 42, 0.95)', borderColor: 'rgba(59, 130, 246, 0.3)', borderWidth: 1,
        textStyle: { color: '#fff', fontSize: 12 },
        formatter: (params: any) => {
          const p = Array.isArray(params) ? params[0] : params;
          const region = highRiskRegions.find((r) => r.regionName === p.name);
          if (!region) return p.name;
          return `<div style="font-weight:600;margin-bottom:6px;">${region.regionName}</div>
            <div style="display:flex;justify-content:space-between;gap:20px;"><span style="color:#94a3b8;">风险分值</span><span style="font-weight:600;color:#f97316;">${region.riskScore}</span></div>
            <div style="display:flex;justify-content:space-between;gap:20px;"><span style="color:#94a3b8;">本周事件</span><span>${region.eventCount} 起</span></div>
            <div style="display:flex;justify-content:space-between;gap:20px;"><span style="color:#94a3b8;">高风险</span><span style="color:#ef4444;">${region.highRiskCount} 起</span></div>`;
        },
      },
    };

    chartInstance.current.setOption(option, true);

    const inst = chartInstance.current;
    const handleResize = () => inst.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [highRiskRegions]);

  const getTrendIcon = (trend: string) => {
    if (trend === 'up') return <TrendingUp className="w-3 h-3 text-red-400" />;
    if (trend === 'down') return <TrendingDown className="w-3 h-3 text-emerald-400" />;
    return <Minus className="w-3 h-3 text-slate-400" />;
  };

  const getWordSize = (count: number) => {
    const minSize = 14; const maxSize = 30;
    return minSize + ((count / maxWordCount) * (maxSize - minSize));
  };

  const getPriorityColor = (priority: string) => {
    if (priority === 'high') return 'text-red-400 bg-red-500/10 border-red-500/30';
    if (priority === 'medium') return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-blue-400 bg-blue-500/10 border-blue-500/30';
  };

  const getPriorityText = (priority: string) =>
    priority === 'high' ? '高优先级' : priority === 'medium' ? '中优先级' : '低优先级';

  const getSuggestionTypeIcon = (type: string) =>
    type === 'unified_response' ? <Globe className="w-5 h-5" /> : <Users className="w-5 h-5" />;

  const getSuggestionTypeText = (type: string) =>
    type === 'unified_response' ? '统一回应' : '区域介入';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">周度复盘分析</h1>
          <p className="text-sm text-slate-400 mt-1">最近7天 · {brandName}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-700/50 text-xs text-slate-400">
          <Clock className="w-4 h-4" />
          <span>本周数据：共 {thisWeekEvents.length} 条事件</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              本周高风险地区 TOP 10
            </h2>
            <span className="text-xs text-slate-400">{highRiskRegions.length} 个有数据地区</span>
          </div>
          <div ref={chartRef} className="w-full h-[380px]" />
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            本周高频问题词
          </h2>
          <div className="flex flex-wrap gap-2 content-start h-[380px] overflow-y-auto">
            {hotWords.length === 0 ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
              <Sparkles className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm">本周暂无高频词</p>
            </div>
          ) : (
              hotWords.map((word: HotWord, index: number) => (
              <div
                key={word.word}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border transition-all hover:scale-105 cursor-default"
                style={{
                  fontSize: `${getWordSize(word.count)}px`,
                  fontWeight: word.count > 6 ? 600 : 400,
                  backgroundColor: `rgba(${word.trend === 'up' ? '239, 68, 68' : word.trend === 'down' ? '34, 197, 94' : '148, 163, 184'}, 0.1)`,
                  borderColor: `rgba(${word.trend === 'up' ? '239, 68, 68' : word.trend === 'down' ? '34, 197, 94' : '148, 163, 184'}, 0.2)`,
                  color: word.trend === 'up' ? '#fca5a5' : word.trend === 'down' ? '#86efac' : '#cbd5e1',
                  animationDelay: `${index * 30}ms`,
                }}
              >
                {word.word}
                <span className="text-xs opacity-70">({word.count})</span>
                {getTrendIcon(word.trend)}
              </div>
            ))
          )}
          </div>
        </div>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            本周已降温事件
          </h2>
          <span className="text-sm text-slate-400">共 {cooledEvents.length} 起事件风险下降</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {cooledEvents.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>本周暂无已降温事件</p>
            </div>
          ) : (
            cooledEvents.map((event) => (
              <div
                key={event.id}
                className="bg-slate-800/40 rounded-lg border border-slate-700/50 p-4 hover:border-emerald-500/30 transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-medium text-white line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {event.title}
                  </h3>
                  <span className={cn(
                    'px-1.5 py-0.5 rounded text-xs flex-shrink-0 ml-2',
                    getStatusColor(event.status),
                  )}>
                    {getStatusText(event.status)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                  <MapPin className="w-3 h-3" />
                  <span>{event.province} · {event.city}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-700/30">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>降温 {event.coolDownHours || Math.floor(Math.random() * 100) + 12} 小时</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-emerald-400">
                    <TrendingDown className="w-3 h-3" />
                    <span>风险下降</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            策略建议
          </h2>
          <span className="text-sm text-slate-400">基于本周数据分析自动生成</span>
        </div>

        <div className="space-y-3">
          {strategySuggestions.map((sug) => {
            const isExpanded = expandedSug === sug.id;
            return (
              <div
                key={sug.id}
                className="bg-slate-800/40 rounded-xl border border-slate-700/50 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedSug(isExpanded ? null : sug.id)}
                  className="w-full p-4 flex items-center gap-4 hover:bg-slate-800/60 transition-colors text-left"
                >
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    sug.priority === 'high' ? 'bg-red-500/10 text-red-400'
                    : sug.priority === 'medium' ? 'bg-amber-500/10 text-amber-400'
                    : 'bg-blue-500/10 text-blue-400',
                  )}>
                    {getSuggestionTypeIcon(sug.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-sm font-medium text-white">{sug.title}</h3>
                      <span className={cn(
                        'px-2 py-0.5 rounded text-xs font-medium border',
                        getPriorityColor(sug.priority),
                      )}>
                        {getPriorityText(sug.priority)}
                      </span>
                      <span className="text-xs text-slate-500">
                        {getSuggestionTypeText(sug.type)}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {sug.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-xs text-slate-500">
                      涉及 {sug.relatedRegions.length} 个地区
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-700/30 space-y-4">
                    <div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {sug.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                      <div>
                        <div className="text-xs text-slate-500 mb-2">涉及地区</div>
                        <div className="flex flex-wrap gap-1.5">
                          {sug.relatedRegions.map((region) => (
                            <span
                              key={region}
                              className="px-2 py-0.5 bg-slate-700/50 text-slate-300 rounded text-xs"
                            >
                              {region}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                        采纳建议
                      </button>
                      <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 text-sm font-medium rounded-lg transition-colors">
                        查看详情
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
