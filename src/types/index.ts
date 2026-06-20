export enum RiskLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum EventCategory {
  MISUNDERSTANDING = 'misunderstanding',
  QUALITY = 'quality',
  LABOR = 'labor',
  REGULATORY = 'regulatory',
}

export enum Sentiment {
  NEGATIVE = 'negative',
  MIXED = 'mixed',
  NEUTRAL = 'neutral',
}

export enum MediaTier {
  NATIONAL = 'national',
  PROVINCIAL = 'provincial',
  LOCAL = 'local',
  SOCIAL = 'social',
  KOL = 'kol',
}

export enum DisposalStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PROCESSING = 'processing',
  COOLED = 'cooled',
  RESOLVED = 'resolved',
}

export interface RegionRisk {
  regionCode: string;
  regionName: string;
  riskLevel: RiskLevel;
  riskScore: number;
  eventCount: number;
  highRiskCount: number;
}

export interface PublicOpinionEvent {
  id: string;
  title: string;
  city: string;
  province: string;
  riskLevel: RiskLevel;
  category?: EventCategory;
  sentiment: Sentiment;
  firstPlatform: string;
  firstPublishTime: string;
  repostPeak: number;
  spreadSpeed: number;
  localMediaInvolvement: number;
  mediaTier: MediaTier;
  mainTopics: string[];
  typicalContent: string;
  status: DisposalStatus;
  assignee?: string;
  confirmedAt?: string;
  resolvedAt?: string;
  coolDownHours?: number;
}

export interface HotWord {
  word: string;
  count: number;
  trend: 'up' | 'down' | 'stable';
}

export interface StrategySuggestion {
  id: string;
  type: 'unified_response' | 'regional_intervention';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  relatedRegions: string[];
  relatedEvents: string[];
}

export interface Brand {
  id: string;
  name: string;
}

export type SortType = 'spreadSpeed' | 'sentiment' | 'localMedia';
