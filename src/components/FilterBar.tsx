import { Calendar, Filter, RefreshCw, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { EventCategory } from '@/types';
import { cn, getCategoryText, getCategoryColor } from '@/utils';
import { useAppStore } from '@/store/useAppStore';

export function FilterBar() {
  const { brands, selectedBrand, setSelectedBrand, selectedCategories, toggleCategory, dateRange, setDateRange } = useAppStore();
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const brandRef = useRef<HTMLDivElement>(null);

  const categories = Object.values(EventCategory);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) {
        setShowBrandDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    const newDate = new Date(value);
    if (type === 'start') {
      setDateRange([newDate, dateRange[1]]);
    } else {
      setDateRange([dateRange[0], newDate]);
    }
  };

  const handleReset = () => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    setSelectedBrand('brand1');
    setDateRange([thirtyDaysAgo, today]);
  };

  const selectedBrandName = brands.find(b => b.id === selectedBrand)?.name || '全部品牌';

  return (
    <div className="bg-slate-900/60 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 mb-6">
      <div className="flex items-center gap-6 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400 font-medium">品牌</span>
          <div className="relative" ref={brandRef}>
            <button
              onClick={() => setShowBrandDropdown(!showBrandDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white hover:border-slate-600 transition-colors min-w-[140px justify-between"
            >
              <span>{selectedBrandName}</span>
              <ChevronDown className={cn('w-4 h-4 text-slate-400 transition-transform', showBrandDropdown && 'rotate-180')} />
            </button>
            {showBrandDropdown && (
              <div className="absolute z-20 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                {brands.map((brand) => (
                  <button
                    key={brand.id}
                    onClick={() => {
                      setSelectedBrand(brand.id);
                      setShowBrandDropdown(false);
                    }}
                    className={cn(
                      'w-full px-3 py-2 text-sm text-left hover:bg-slate-700/50 transition-colors',
                      selectedBrand === brand.id && 'text-blue-400 bg-slate-700/30'
                    )}
                  >
                    {brand.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            时间
          </span>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={formatDate(dateRange[0])}
              onChange={(e) => handleDateChange('start', e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
            <span className="text-slate-500">至</span>
            <input
              type="date"
              value={formatDate(dateRange[1])}
              onChange={(e) => handleDateChange('end', e.target.value)}
              className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-400 font-medium flex items-center gap-1.5">
            <Filter className="w-4 h-4" />
            类型
          </span>
          <div className="flex items-center gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200',
                    isActive
                      ? getCategoryColor(cat) + ' border-current'
                      : 'text-slate-400 bg-slate-800 border-slate-700 hover:border-slate-600'
                  )}
                >
                  {getCategoryText(cat)}
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleReset}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          重置
        </button>
      </div>
    </div>
  );
}
