import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { provinceData } from '@/data/mapData';
import { regionRisks } from '@/data/mockData';
import { getRiskHeatColor } from '@/utils';

interface ChinaHeatMapProps {
  selectedProvince: string | null;
  onProvinceClick: (province: string) => void;
}

export function ChinaHeatMap({ selectedProvince, onProvinceClick }: ChinaHeatMapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    chartInstance.current = echarts.init(chartRef.current, 'dark');

    const riskMap = new Map(regionRisks.map((r) => [r.regionName, r]));

    const scatterData = provinceData.map((p) => {
      const risk = riskMap.get(p.name);
      const score = risk?.riskScore || 20;
      return {
        name: p.name,
        value: [p.x, p.y, score],
        itemStyle: {
          color: getRiskHeatColor(score),
        },
      };
    });

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 1,
        padding: [12, 16],
        textStyle: {
          color: '#fff',
          fontSize: 13,
        },
        formatter: (params: any) => {
          const risk = riskMap.get(params.name);
          if (!risk) return params.name;
          return `
            <div style="font-weight: 600; margin-bottom: 8px; font-size: 14px;">${params.name}</div>
            <div style="display: flex; justify-content: space-between; gap: 24px; margin-bottom: 4px;">
              <span style="color: #94a3b8;">风险分值</span>
              <span style="font-weight: 600; color: ${getRiskHeatColor(risk.riskScore)}">${risk.riskScore}</span>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 24px; margin-bottom: 4px;">
              <span style="color: #94a3b8;">事件总数</span>
              <span style="font-weight: 500;">${risk.eventCount} 起</span>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 24px;">
              <span style="color: #94a3b8;">高风险事件</span>
              <span style="font-weight: 500; color: #f97316;">${risk.highRiskCount} 起</span>
            </div>
          `;
        },
      },
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      xAxis: {
        type: 'value',
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        type: 'value',
        show: false,
        min: 0,
        max: 90,
        inverse: true,
      },
      series: [
        {
          type: 'effectScatter',
          data: scatterData,
          symbolSize: (val: number[]) => {
            const score = val[2];
            return Math.max(18, Math.min(55, score * 0.55));
          },
          rippleEffect: {
            brushType: 'stroke',
            scale: 3,
            period: 4,
          },
          label: {
            show: true,
            position: 'bottom',
            formatter: '{b}',
            color: '#94a3b8',
            fontSize: 11,
            distance: 2,
          },
          itemStyle: {
            shadowBlur: 15,
            shadowColor: 'rgba(59, 130, 246, 0.4)',
          },
          emphasis: {
            scale: 1.3,
            label: {
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 13,
            },
            itemStyle: {
              shadowBlur: 25,
            },
          },
          selectedMode: 'single',
        },
      ],
    };

    chartInstance.current.setOption(option);

    chartInstance.current.on('click', (params: any) => {
      if (params.componentType === 'series') {
        onProvinceClick(params.name);
      }
    });

    const handleResize = () => {
      chartInstance.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chartInstance.current?.dispose();
    };
  }, [onProvinceClick]);

  useEffect(() => {
    if (!chartInstance.current) return;

    chartInstance.current.dispatchAction({
      type: 'unselect',
    });

    if (selectedProvince) {
      const index = provinceData.findIndex((p) => p.name === selectedProvince);
      if (index >= 0) {
        chartInstance.current.dispatchAction({
          type: 'select',
          seriesIndex: 0,
          dataIndex: index,
        });
      }
    }
  }, [selectedProvince]);

  return (
    <div
      ref={chartRef}
      className="w-full h-full"
      style={{ minHeight: '500px' }}
    />
  );
}
