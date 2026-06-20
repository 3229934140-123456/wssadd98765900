import { create } from 'zustand';
import {
  RiskLevel,
  EventCategory,
  DisposalStatus,
  SortType,
  PublicOpinionEvent,
  RegionRisk,
  CityRisk,
  DrillLevel,
} from '@/types';
import {
  mockEvents,
  brands,
  computeRegionRisks,
  computeCityRisks,
  getPendingEvents,
} from '@/data/mockData';

interface AppState {
  selectedBrand: string;
  dateRange: [Date, Date];
  selectedCategories: EventCategory[];
  selectedProvince: string | null;
  selectedCity: string | null;
  drillLevel: DrillLevel;
  selectedEvent: PublicOpinionEvent | null;
  sortType: SortType;
  events: PublicOpinionEvent[];
  brands: typeof brands;

  setSelectedBrand: (brand: string) => void;
  setDateRange: (range: [Date, Date]) => void;
  toggleCategory: (category: EventCategory) => void;
  setSelectedProvince: (province: string | null) => void;
  setSelectedCity: (city: string | null) => void;
  setDrillLevel: (level: DrillLevel) => void;
  setSelectedEvent: (event: PublicOpinionEvent | null) => void;
  setSortType: (sort: SortType) => void;
  updateEventCategory: (eventId: string, category: EventCategory) => void;
  updateEventAssignee: (eventId: string, assignee: string) => void;
  updateEventStatus: (eventId: string, status: DisposalStatus) => void;
  confirmEvent: (eventId: string) => void;

  getAllFilteredEvents: () => PublicOpinionEvent[];
  getFilteredEvents: () => PublicOpinionEvent[];
  getCurrentRegionEvents: () => PublicOpinionEvent[];
  getSortedEvents: () => PublicOpinionEvent[];
  getPendingEvents: () => PublicOpinionEvent[];
  getComputedRegionRisks: () => RegionRisk[];
  getComputedCityRisks: (province: string) => CityRisk[];
  getCurrentDrillTitle: () => string;
}

const today = new Date();
const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

export const useAppStore = create<AppState>((set, get) => ({
  selectedBrand: 'brand1',
  dateRange: [thirtyDaysAgo, today],
  selectedCategories: [],
  selectedProvince: null,
  selectedCity: null,
  drillLevel: 'province',
  selectedEvent: null,
  sortType: 'spreadSpeed',
  events: mockEvents,
  brands,

  setSelectedBrand: (brand) =>
    set({ selectedBrand: brand, selectedProvince: null, selectedCity: null, selectedEvent: null, drillLevel: 'province' }),
  setDateRange: (range) =>
    set({ dateRange: range, selectedEvent: null }),
  toggleCategory: (category) =>
    set((state) => {
      const exists = state.selectedCategories.includes(category);
      return {
        selectedCategories: exists
          ? state.selectedCategories.filter((c) => c !== category)
          : [...state.selectedCategories, category],
        selectedEvent: null,
      };
    }),
  setSelectedProvince: (province) =>
    set({
      selectedProvince: province,
      selectedCity: null,
      drillLevel: province ? 'province' : 'province',
      selectedEvent: null,
    }),
  setSelectedCity: (city) =>
    set({ selectedCity: city, drillLevel: 'city', selectedEvent: null }),
  setDrillLevel: (level) => set({ drillLevel: level }),
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setSortType: (sort) => set({ sortType: sort }),

  updateEventCategory: (eventId, category) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === eventId ? { ...e, category } : e
      ),
      selectedEvent:
        state.selectedEvent?.id === eventId
          ? { ...state.selectedEvent, category }
          : state.selectedEvent,
    })),

  updateEventAssignee: (eventId, assignee) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === eventId ? { ...e, assignee } : e
      ),
      selectedEvent:
        state.selectedEvent?.id === eventId
          ? { ...state.selectedEvent, assignee }
          : state.selectedEvent,
    })),

  updateEventStatus: (eventId, status) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === eventId ? { ...e, status } : e
      ),
      selectedEvent:
        state.selectedEvent?.id === eventId
          ? { ...state.selectedEvent, status }
          : state.selectedEvent,
    })),

  confirmEvent: (eventId) =>
    set((state) => ({
      events: state.events.map((e) =>
        e.id === eventId
          ? { ...e, status: DisposalStatus.CONFIRMED, confirmedAt: new Date().toISOString() }
          : e
      ),
    })),

  getAllFilteredEvents: () => {
    const state = get();
    let filtered = [...state.events];

    filtered = filtered.filter((e) => e.brandId === state.selectedBrand);

    const [startDate, endDate] = state.dateRange;
    filtered = filtered.filter((e) => {
      const eventDate = new Date(e.firstPublishTime);
      return eventDate >= startDate && eventDate <= endDate;
    });

    if (state.selectedCategories.length > 0) {
      filtered = filtered.filter(
        (e) => e.category && state.selectedCategories.includes(e.category)
      );
    }

    return filtered;
  },

  getFilteredEvents: () => {
    return get().getAllFilteredEvents();
  },

  getCurrentRegionEvents: () => {
    const state = get();
    const allFiltered = state.getAllFilteredEvents();

    if (state.drillLevel === 'city' && state.selectedCity) {
      return allFiltered.filter((e) => e.city === state.selectedCity);
    }
    if (state.selectedProvince) {
      return allFiltered.filter((e) => e.province === state.selectedProvince);
    }
    return allFiltered;
  },

  getSortedEvents: () => {
    const state = get();
    const pending = state.getPendingEvents();
    const sorted = [...pending];

    switch (state.sortType) {
      case 'spreadSpeed':
        return sorted.sort((a, b) => b.spreadSpeed - a.spreadSpeed);
      case 'sentiment':
        const sentimentOrder = { negative: 0, mixed: 1, neutral: 2 };
        return sorted.sort(
          (a, b) => sentimentOrder[a.sentiment] - sentimentOrder[b.sentiment]
        );
      case 'localMedia':
        return sorted.sort(
          (a, b) => b.localMediaInvolvement - a.localMediaInvolvement
        );
      default:
        return sorted;
    }
  },

  getPendingEvents: () => {
    const all = get().getAllFilteredEvents();
    return getPendingEvents(all);
  },

  getComputedRegionRisks: () => {
    const events = get().getAllFilteredEvents();
    return computeRegionRisks(events);
  },

  getComputedCityRisks: (province: string) => {
    const events = get().getAllFilteredEvents();
    return computeCityRisks(events, province);
  },

  getCurrentDrillTitle: () => {
    const state = get();
    if (state.drillLevel === 'city' && state.selectedCity) {
      return state.selectedCity;
    }
    if (state.selectedProvince) {
      return state.selectedProvince;
    }
    return '';
  },
}));
