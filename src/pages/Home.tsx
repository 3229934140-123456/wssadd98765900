import { useCallback } from 'react';
import { FilterBar } from '@/components/FilterBar';
import { ChinaHeatMap } from '@/components/ChinaHeatMap';
import { RiskDetailPanel } from '@/components/RiskDetailPanel';
import { useAppStore } from '@/store/useAppStore';
import { AlertTriangle, TrendingUp, Users, Activity, ChevronLeft, Layers } from 'lucide-react';
import { cn } from '@/utils';

function HomePage() {
  const {
    drillLevel,
    selectedProvince,
    selectedCity,
    setSelectedProvince,
    setSelectedCity,
    getAllFilteredEvents,
    getCurrentRegionEvents,
    getComputedRegionRisks,
    getComputedCityRisks,
    brands,
    selectedBrand,
    selectedCategories,
    dateRange,
    events,
  } = useAppStore();

  const filteredEvents = getAllFilteredEvents();
  const regionEvents = getCurrentRegionEvents();
  const provinceRisks = getComputedRegionRisks();
  const cityRisks = selectedProvince ? getComputedCityRisks(selectedProvince) : [];

  const totalEvents = filteredEvents.length;
  const highRiskCount = filteredEvents.filter(
    (e) => e.riskLevel === 'critical' || e.riskLevel === 'high'
  ).length;
  const highRiskRegions = provinceRisks.filter(
    (r) => r.riskLevel === 'critical' || r.riskLevel === 'high'
  ).length;

  const brandName = brands.find((b) => b.id === selectedBrand)?.name || '';

  const handleProvinceClick = useCallback(
    (province: string) => {
      if (selectedProvince === province) {
        setSelectedProvince(null);
      } else {
        setSelectedProvince(province);
      }
    },
    [selectedProvince, setSelectedProvince]
  );

  const handleCityClick = useCallback(
    (city: string) => {
      setSelectedCity(city === selectedCity ? null : city);
    },
    [selectedCity, setSelectedCity]
  );

  const handleBackToProvince = () => {
    if (drillLevel === 'city') {
      setSelectedCity(null);
    }
  };

  const handleBackToCountry = () => {
    setSelectedProvince(null);
    setSelectedCity(null);
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
              <p className="text-xs text-slate-500 mt-1">{brandName}</p>
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
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                {drillLevel === 'city' ? (
                  <>
                    <Layers className="w-5 h-5 text-cyan-400" />
                    城市级热力图 · {selectedProvince}
                  </>
                ) : (
                  <>全国风险热力图</>
                )}
              </h2>
              {(selectedProvince || drillLevel === 'city') && (
                <div className="flex items-center gap-1">
                  {drillLevel === 'city' && (
                    <button
                      onClick={handleBackToProvince}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md border border-slate-700/50 transition-colors"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                      返回省级
                    </button>
                  )}
                  <button
                    onClick={handleBackToCountry}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-md border border-slate-700/50 transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    返回全国
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span>低</span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/60 ml-1" />
              <span>中</span>
              <span className="w-3 h-3 rounded-full bg-orange-500/60 ml-1" />
              <span>高</span>
              <span className="w-3 h-3 rounded-full bg-red-500/60 ml-1" />
              <span>极高</span>
              <span className="w-3 h-3 rounded-full bg-slate-500/50 ml-2 border border-slate-600" />
              <span>无数据</span>
            </div>
          </div>

          <div className="h-[500px]">
            <ChinaHeatMap
              drillLevel={drillLevel}
              selectedProvince={selectedProvince}
              selectedCity={selectedCity}
              provinceRisks={provinceRisks}
              cityRisks={cityRisks}
              onProvinceClick={handleProvinceClick}
              onCityClick={handleCityClick}
            />
          </div>

          <div className="mt-3 pt-3 border-t border-slate-700/40 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <span>
                <span className="text-slate-400">当前层级：</span>
                <span className={cn('font-medium', drillLevel === 'city' ? 'text-cyan-400' : 'text-slate-300')}>
                  {drillLevel === 'city' ? '城市视图' : '省级视图'}
                </span>
              </span>
              {selectedProvince && (
                <span>
                  <span className="text-slate-400">当前区域：</span>
                  <span className="text-slate-200 font-medium">
                    {selectedProvince}
                    {drillLevel === 'city' && selectedCity && ` · ${selectedCity}`}
                  </span>
                </span>
              )}
            </div>
            <div>点击省份 → 查看城市下钻 → 再点击城市查看详情</div>
          </div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-5">
          <RiskDetailPanel
            drillLevel={drillLevel}
            province={selectedProvince}
            city={selectedCity}
            cityRisks={cityRisks}
            events={regionEvents}
          />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
