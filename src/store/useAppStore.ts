import { create } from 'zustand';
import {
  RiskLevel,
  EventCategory,
  DisposalStatus,
  SortType,
  PublicOpinionEvent,
  RegionRisk,
} from '@/types';
import { mockEvents, regionRisks, brands } from '@/data/mockData';

interface AppState {
  selectedBrand: string;
  dateRange: [Date, Date];
  selectedCategories: EventCategory[];
  selectedProvince: string | null;
  selectedEvent: PublicOpinionEvent | null;
  sortType: SortType;
  events: PublicOpinionEvent[];
  regionRisks: RegionRisk[];
  brands: typeof brands;

  setSelectedBrand: (brand: string) => void;
  setDateRange: (range: [Date, Date]) => void;
  toggleCategory: (category: EventCategory) => void;
  setSelectedProvince: (province: string | null) => void;
  setSelectedEvent: (event: PublicOpinionEvent | null) => void;
  setSortType: (sort: SortType) => void;
  updateEventCategory: (eventId: string, category: EventCategory) => void;
  updateEventAssignee: (eventId: string, assignee: string) => void;
  updateEventStatus: (eventId: string, status: DisposalStatus) => void;
  confirmEvent: (eventId: string) => void;

  getFilteredEvents: () => PublicOpinionEvent[];
  getSortedEvents: () => PublicOpinionEvent[];
  getPendingEvents: () => PublicOpinionEvent[];
}

const today = new Date();
const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

export const useAppStore = create<AppState>((set, get) => ({
  selectedBrand: 'brand1',
  dateRange: [thirtyDaysAgo, today],
  selectedCategories: [],
  selectedProvince: null,
  selectedEvent: null,
  sortType: 'spreadSpeed',
  events: mockEvents,
  regionRisks,
  brands,

  setSelectedBrand: (brand) => set({ selectedBrand: brand }),
  setDateRange: (range) => set({ dateRange: range }),
  toggleCategory: (category) =>
    set((state) => {
      const exists = state.selectedCategories.includes(category);
      return {
        selectedCategories: exists
          ? state.selectedCategories.filter((c) => c !== category)
          : [...state.selectedCategories, category],
      };
    }),
  setSelectedProvince: (province) => set({ selectedProvince: province, selectedEvent: null }),
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

  getFilteredEvents: () => {
    const state = get();
    let filtered = [...state.events];

    if (state.selectedCategories.length > 0) {
      filtered = filtered.filter(
        (e) => e.category && state.selectedCategories.includes(e.category)
      );
    }

    if (state.selectedProvince) {
      filtered = filtered.filter((e) => e.province === state.selectedProvince);
    }

    const [startDate, endDate] = state.dateRange;
    filtered = filtered.filter((e) => {
      const eventDate = new Date(e.firstPublishTime);
      return eventDate >= startDate && eventDate <= endDate;
    });

    return filtered;
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
    const state = get();
    return state.events.filter(
      (e) =>
        e.status === DisposalStatus.PENDING ||
        e.status === DisposalStatus.CONFIRMED
    );
  },
}));
