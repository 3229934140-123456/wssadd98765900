import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (hours < 1) return '刚刚';
  if (hours < 24) return `${hours}小时前`;
  if (days < 7) return `${days}天前`;

  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

export function getRiskLevelText(level: string): string {
  const map: Record<string, string> = {
    low: '低风险',
    medium: '中风险',
    high: '高风险',
    critical: '极高风险',
  };
  return map[level] || level;
}

export function getRiskLevelColor(level: string): string {
  const map: Record<string, string> = {
    low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    medium: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    high: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    critical: 'text-red-400 bg-red-500/10 border-red-500/30',
  };
  return map[level] || '';
}

export function getCategoryText(category: string): string {
  const map: Record<string, string> = {
    misunderstanding: '误解投诉',
    quality: '质量争议',
    labor: '劳动纠纷',
    regulatory: '监管关注',
  };
  return map[category] || category;
}

export function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    misunderstanding: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    quality: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    labor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    regulatory: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
  };
  return map[category] || '';
}

export function getSentimentText(sentiment: string): string {
  const map: Record<string, string> = {
    negative: '负面',
    mixed: '混合',
    neutral: '中性',
  };
  return map[sentiment] || sentiment;
}

export function getSentimentColor(sentiment: string): string {
  const map: Record<string, string> = {
    negative: 'text-red-400 bg-red-500/10',
    mixed: 'text-amber-400 bg-amber-500/10',
    neutral: 'text-gray-400 bg-gray-500/10',
  };
  return map[sentiment] || '';
}

export function getMediaTierText(tier: string): string {
  const map: Record<string, string> = {
    national: '国家级媒体',
    provincial: '省级媒体',
    local: '本地媒体',
    social: '社交媒体',
    kol: '自媒体/KOL',
  };
  return map[tier] || tier;
}

export function getStatusText(status: string): string {
  const map: Record<string, string> = {
    pending: '待处理',
    confirmed: '已确认',
    processing: '处理中',
    cooled: '已降温',
    resolved: '已解决',
  };
  return map[status] || status;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    pending: 'text-gray-400 bg-gray-500/10',
    confirmed: 'text-blue-400 bg-blue-500/10',
    processing: 'text-amber-400 bg-amber-500/10',
    cooled: 'text-cyan-400 bg-cyan-500/10',
    resolved: 'text-emerald-400 bg-emerald-500/10',
  };
  return map[status] || '';
}

export function getRiskHeatColor(score: number): string {
  if (score >= 80) return 'rgba(239, 68, 68, 0.85)';
  if (score >= 60) return 'rgba(249, 115, 22, 0.75)';
  if (score >= 40) return 'rgba(251, 191, 36, 0.65)';
  if (score >= 20) return 'rgba(56, 189, 248, 0.5)';
  return 'rgba(148, 163, 184, 0.3)';
}
