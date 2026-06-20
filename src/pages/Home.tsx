import { FilterBar } from '@/components/FilterBar';
import { ChinaHeatMap } from '@/components/ChinaHeatMap';
import { RiskDetailPanel } from '@/components/RiskDetailPanel';
import { useAppStore } from '@/store/useAppStore';
import { AlertTriangle, TrendingUp, Users, Activity } from 'lucide-react';
import { regionRisks } from '@/data/mockData';

function HomePage() {
  const { selectedProvince, setSelectedProvince, getFilteredEvents } = useAppStore();

  const filteredEvents = getFilteredEvents();
  const provinceEvents = selectedProvince
    ? filteredEvents.filter((e) => e.province === selectedProvince)
    : [];

  const totalEvents = filteredEvents.length;
  const highRiskCount = filteredEvents.filter((e) => e.riskLevel === 'critical' || e.riskLevel === 'high').length;
  const highRiskRegions = regionRisks.filter((r) => r.riskLevel === 'critical' || r.riskLevel === 'high').length;

  const handleProvinceClick = (province: string) => {
    setSelectedProvince(selectedProvince === province ? null : province);
  };

  return (
    <div className="space-y-6">
      <FilterBar />

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">舆情事件总数</p>
              <p className="text-3xl font-bold text-white mt-2">{totalEvents}</p>
              <p className="text-xs text-slate-500 mt-1">较昨日 +12</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">高风险事件</p>
              <p className="text-3xl font-bold text-orange-400 mt-2">{highRiskCount}</p>
              <p className="text-xs text-orange-400/70 mt-1">需重点关注</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">高风险地区</p>
              <p className="text-3xl font-bold text-red-400 mt-2">{highRiskRegions}</p>
              <p className="text-xs text-slate-500 mt-1">个省/直辖市</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-red-400" />
            </div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">处置责任人</p>
              <p className="text-3xl font-bold text-emerald-400 mt-2">8</p>
              <p className="text-xs text-slate-500 mt-1">人在岗</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">全国风险热力图</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span>低</span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/60 ml-1" />
              <span>中</span>
              <span className="w-3 h-3 rounded-full bg-orange-500/60 ml-1" />
              <span>高</span>
              <span className="w-3 h-3 rounded-full bg-red-500/60 ml-1" />
              <span>极高</span>
            </div>
          </div>
          <div className="h-[500px]">
            <ChinaHeatMap
              selectedProvince={selectedProvince}
              onProvinceClick={handleProvinceClick}
            />
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <RiskDetailPanel
            province={selectedProvince}
            events={provinceEvents}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
