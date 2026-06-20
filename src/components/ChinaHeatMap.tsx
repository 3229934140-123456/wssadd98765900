import { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';
import { RegionRisk, CityRisk, DrillLevel } from '@/types';
import { getRiskHeatColor } from '@/utils';
import { provincePositions, cities } from '@/data/mockData';

interface ChinaHeatMapProps {
  drillLevel: DrillLevel;
  selectedProvince: string | null;
  selectedCity: string | null;
  provinceRisks: RegionRisk[];
  cityRisks: CityRisk[];
  onProvinceClick: (province: string) => void;
  onCityClick: (city: string) => void;
}

export function ChinaHeatMap({
  drillLevel,
  selectedProvince,
  selectedCity,
  provinceRisks,
  cityRisks,
  onProvinceClick,
  onCityClick,
}: ChinaHeatMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  const provinceRiskMap = useMemo(() => {
    return new Map(provinceRisks.map((r) => [r.regionName, r]));
  }, [provinceRisks]);

  const cityRiskMap = useMemo(() => {
    return new Map(cityRisks.map((c) => [c.cityName, c]));
  }, [cityRisks]);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) {
      chartInstance.current.dispose();
    }
    chartInstance.current = echarts.init(chartRef.current, 'dark');

    return () => {
      chartInstance.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current) return;

    let scatterData: any[];
    let labelData: any[] = [];

    if (drillLevel === 'city' && selectedProvince) {
      const cityList = cities[selectedProvince] || [];
      scatterData = cityRisks.map((c) => ({
        name: c.cityName,
        value: [c.x, c.y, c.riskScore > 0 ? c.riskScore : 5],
        realScore: c.riskScore,
        itemStyle: {
          color: c.riskScore > 0 ? getRiskHeatColor(c.riskScore) : 'rgba(100, 116, 139, 0.3)',
        },
      }));
      if (scatterData.length === 0) {
        scatterData = cityList.map((c) => ({
          name: c.name,
          value: [c.x, c.y, 5],
          realScore: 0,
          itemStyle: { color: 'rgba(100, 116, 139, 0.3)' },
        }));
      }
    } else {
      scatterData = provinceRisks.map((r) => {
        const pos = provincePositions[r.regionName];
        if (!pos) return null;
        return {
          name: r.regionName,
          value: [pos.x, pos.y, r.riskScore > 0 ? r.riskScore : 5],
          realScore: r.riskScore,
          itemStyle: {
            color: r.riskScore > 0 ? getRiskHeatColor(r.riskScore) : 'rgba(100, 116, 139, 0.25)',
          },
        };
      }).filter(Boolean);
    }

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 1,
        padding: [12, 16],
        textStyle: { color: '#fff', fontSize: 13 },
        formatter: (params: any) => {
          const name = params.name;
          let risk: any;
          if (drillLevel === 'city') {
            risk = cityRiskMap.get(name);
          } else {
            risk = provinceRiskMap.get(name);
          }
          const score = (risk && risk.riskScore) || params.data?.realScore || 0;
          const total = risk?.eventCount ?? 0;
          const high = risk?.highRiskCount ?? 0;

          if (score === 0 && total === 0) {
            return `
              <div style="font-weight:600;margin-bottom:6px;">${name}</div>
              <div style="color:#64748b;">暂无筛选范围内的数据</div>
            `;
          }

          return `
            <div style="font-weight:600;margin-bottom:8px;font-size:14px;">${name}</div>
            <div style="display:flex;justify-content:space-between;gap:24px;margin-bottom:4px;">
              <span style="color:#94a3b8;">风险分值</span>
              <span style="font-weight:600;color:${getRiskHeatColor(score)}">${score}</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:24px;margin-bottom:4px;">
              <span style="color:#94a3b8;">事件总数</span>
              <span style="font-weight:500;">${total} 起</span>
            </div>
            <div style="display:flex;justify-content:space-between;gap:24px;">
              <span style="color:#94a3b8;">高风险事件</span>
              <span style="font-weight:500;color:#f97316;">${high} 起</span>
            </div>
          `;
        },
      },
      grid: { left: 0, right: 0, top: 0, bottom: 0 },
      xAxis: { type: 'value', show: false, min: 0, max: 100 },
      yAxis: { type: 'value', show: false, min: 0, max: 90, inverse: true },
      series: [
        {
          type: 'effectScatter',
          data: scatterData,
          symbolSize: (val: number[]) => {
            const score = val[2];
            if (score <= 5) return 14;
            return Math.max(18, Math.min(58, score * 0.6));
          },
          rippleEffect: { brushType: 'stroke', scale: 3, period: 4 },
          label: {
            show: true,
            position: 'bottom',
            formatter: '{b}',
            color: '#94a3b8',
            fontSize: 11,
            distance: 3,
          },
          itemStyle: { shadowBlur: 15, shadowColor: 'rgba(59, 130, 246, 0.35)' },
          emphasis: {
            scale: 1.3,
            label: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
            itemStyle: { shadowBlur: 25 },
          },
          selectedMode: 'single',
        },
      ],
    };

    chartInstance.current.setOption(option, true);

    const instance = chartInstance.current;
    instance.off('click');
    instance.on('click', (params: any) => {
      if (params.componentType !== 'series') return;
      if (drillLevel === 'city') {
        onCityClick(params.name);
      } else {
        onProvinceClick(params.name);
      }
    });

    const handleResize = () => instance.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drillLevel, selectedProvince, provinceRisks, cityRisks, provinceRiskMap, cityRiskMap, onProvinceClick, onCityClick]);

  useEffect(() => {
    if (!chartInstance.current) return;
    chartInstance.current.dispatchAction({ type: 'unselect' });

    const targetName = drillLevel === 'city' ? selectedCity : selectedProvince;
    if (!targetName) return;

    const risks = drillLevel === 'city' ? cityRisks : provinceRisks;
    const nameField = drillLevel === 'city' ? 'cityName' : 'regionName';
    const idx = risks.findIndex((r: any) => r[nameField] === targetName);
    if (idx >= 0) {
      chartInstance.current.dispatchAction({
        type: 'select',
        seriesIndex: 0,
        dataIndex: idx,
      });
    }
  }, [drillLevel, selectedProvince, selectedCity, provinceRisks, cityRisks]);

  return (
    <div
      ref={chartRef}
      className="w-full h-full"
      style={{ minHeight: '500px' }}
    />
  );
}
