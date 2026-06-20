import {
  RiskLevel,
  EventCategory,
  Sentiment,
  MediaTier,
  DisposalStatus,
  RegionRisk,
  PublicOpinionEvent,
  HotWord,
  StrategySuggestion,
  Brand,
  CityRisk,
} from '@/types';

export const brands: Brand[] = [
  { id: 'brand1', name: '集团主品牌' },
  { id: 'brand2', name: '子品牌A' },
  { id: 'brand3', name: '子品牌B' },
  { id: 'brand4', name: '新业务线' },
];

export const provinces = [
  '北京', '天津', '河北', '山西', '内蒙古',
  '辽宁', '吉林', '黑龙江',
  '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东',
  '河南', '湖北', '湖南', '广东', '广西', '海南',
  '重庆', '四川', '贵州', '云南', '西藏',
  '陕西', '甘肃', '青海', '宁夏', '新疆',
  '台湾', '香港', '澳门',
];

export const provincePositions: Record<string, { x: number; y: number }> = {
  '北京': { x: 72, y: 22 }, '天津': { x: 75, y: 25 }, '河北': { x: 70, y: 28 },
  '山西': { x: 63, y: 30 }, '内蒙古': { x: 65, y: 15 }, '辽宁': { x: 80, y: 18 },
  '吉林': { x: 85, y: 12 }, '黑龙江': { x: 88, y: 8 }, '上海': { x: 78, y: 45 },
  '江苏': { x: 73, y: 42 }, '浙江': { x: 72, y: 50 }, '安徽': { x: 65, y: 45 },
  '福建': { x: 70, y: 58 }, '江西': { x: 60, y: 55 }, '山东': { x: 70, y: 35 },
  '河南': { x: 58, y: 38 }, '湖北': { x: 53, y: 45 }, '湖南': { x: 50, y: 55 },
  '广东': { x: 55, y: 68 }, '广西': { x: 42, y: 65 }, '海南': { x: 48, y: 78 },
  '重庆': { x: 40, y: 48 }, '四川': { x: 30, y: 42 }, '贵州': { x: 38, y: 58 },
  '云南': { x: 25, y: 58 }, '西藏': { x: 12, y: 45 }, '陕西': { x: 48, y: 35 },
  '甘肃': { x: 32, y: 28 }, '青海': { x: 20, y: 32 }, '宁夏': { x: 40, y: 28 },
  '新疆': { x: 10, y: 20 }, '台湾': { x: 78, y: 65 }, '香港': { x: 62, y: 72 },
  '澳门': { x: 58, y: 72 },
};

export const cities: Record<string, { name: string; x: number; y: number }[]> = {
  '北京': [{ name: '北京市', x: 72, y: 22 }],
  '天津': [{ name: '天津市', x: 75, y: 25 }],
  '河北': [
    { name: '石家庄', x: 68, y: 30 }, { name: '唐山', x: 76, y: 27 },
    { name: '保定', x: 70, y: 26 }, { name: '廊坊', x: 74, y: 23 },
  ],
  '山西': [
    { name: '太原', x: 62, y: 30 }, { name: '大同', x: 66, y: 24 },
    { name: '临汾', x: 60, y: 36 },
  ],
  '内蒙古': [
    { name: '呼和浩特', x: 60, y: 18 }, { name: '包头', x: 56, y: 17 },
    { name: '鄂尔多斯', x: 52, y: 22 },
  ],
  '辽宁': [
    { name: '沈阳', x: 78, y: 17 }, { name: '大连', x: 82, y: 24 },
    { name: '鞍山', x: 80, y: 20 },
  ],
  '吉林': [
    { name: '长春', x: 84, y: 13 }, { name: '吉林', x: 86, y: 15 },
    { name: '延边', x: 90, y: 13 },
  ],
  '黑龙江': [
    { name: '哈尔滨', x: 87, y: 8 }, { name: '大庆', x: 84, y: 7 },
    { name: '齐齐哈尔', x: 82, y: 6 },
  ],
  '上海': [{ name: '上海市', x: 78, y: 45 }],
  '江苏': [
    { name: '南京', x: 70, y: 42 }, { name: '苏州', x: 74, y: 44 },
    { name: '无锡', x: 72, y: 43 }, { name: '常州', x: 71, y: 42 },
    { name: '南通', x: 75, y: 42 },
  ],
  '浙江': [
    { name: '杭州', x: 71, y: 49 }, { name: '宁波', x: 75, y: 50 },
    { name: '温州', x: 70, y: 56 }, { name: '金华', x: 69, y: 53 },
    { name: '嘉兴', x: 73, y: 47 },
  ],
  '安徽': [
    { name: '合肥', x: 64, y: 45 }, { name: '芜湖', x: 66, y: 47 },
    { name: '蚌埠', x: 65, y: 42 },
  ],
  '福建': [
    { name: '福州', x: 69, y: 56 }, { name: '厦门', x: 68, y: 60 },
    { name: '泉州', x: 69, y: 58 },
  ],
  '江西': [
    { name: '南昌', x: 60, y: 53 }, { name: '九江', x: 61, y: 50 },
    { name: '赣州', x: 58, y: 60 },
  ],
  '山东': [
    { name: '济南', x: 68, y: 33 }, { name: '青岛', x: 74, y: 33 },
    { name: '烟台', x: 76, y: 30 }, { name: '潍坊', x: 71, y: 33 },
    { name: '临沂', x: 70, y: 37 },
  ],
  '河南': [
    { name: '郑州', x: 56, y: 37 }, { name: '洛阳', x: 52, y: 37 },
    { name: '开封', x: 58, y: 37 }, { name: '新乡', x: 56, y: 35 },
  ],
  '湖北': [
    { name: '武汉', x: 52, y: 44 }, { name: '宜昌', x: 46, y: 45 },
    { name: '襄阳', x: 50, y: 40 },
  ],
  '湖南': [
    { name: '长沙', x: 50, y: 53 }, { name: '株洲', x: 51, y: 55 },
    { name: '湘潭', x: 49, y: 55 }, { name: '衡阳', x: 50, y: 60 },
  ],
  '广东': [
    { name: '广州', x: 54, y: 65 }, { name: '深圳', x: 58, y: 70 },
    { name: '东莞', x: 56, y: 67 }, { name: '佛山', x: 52, y: 66 },
    { name: '珠海', x: 53, y: 70 },
  ],
  '广西': [
    { name: '南宁', x: 42, y: 65 }, { name: '柳州', x: 42, y: 61 },
    { name: '桂林', x: 46, y: 60 },
  ],
  '海南': [
    { name: '海口', x: 47, y: 76 }, { name: '三亚', x: 50, y: 82 },
  ],
  '重庆': [{ name: '重庆市', x: 40, y: 48 }],
  '四川': [
    { name: '成都', x: 28, y: 42 }, { name: '绵阳', x: 28, y: 38 },
    { name: '德阳', x: 28, y: 40 }, { name: '宜宾', x: 32, y: 48 },
  ],
  '贵州': [
    { name: '贵阳', x: 38, y: 56 }, { name: '遵义', x: 37, y: 52 },
    { name: '六盘水', x: 35, y: 60 },
  ],
  '云南': [
    { name: '昆明', x: 24, y: 58 }, { name: '大理', x: 20, y: 58 },
    { name: '丽江', x: 21, y: 54 },
  ],
  '西藏': [
    { name: '拉萨', x: 10, y: 46 }, { name: '日喀则', x: 8, y: 50 },
  ],
  '陕西': [
    { name: '西安', x: 47, y: 35 }, { name: '咸阳', x: 46, y: 35 },
    { name: '宝鸡', x: 42, y: 35 },
  ],
  '甘肃': [
    { name: '兰州', x: 32, y: 28 }, { name: '天水', x: 36, y: 32 },
    { name: '酒泉', x: 24, y: 25 },
  ],
  '青海': [
    { name: '西宁', x: 20, y: 32 }, { name: '格尔木', x: 15, y: 32 },
  ],
  '宁夏': [
    { name: '银川', x: 40, y: 27 }, { name: '石嘴山', x: 40, y: 25 },
  ],
  '新疆': [
    { name: '乌鲁木齐', x: 8, y: 20 }, { name: '伊犁', x: 4, y: 22 },
    { name: '喀什', x: 6, y: 30 },
  ],
  '台湾': [
    { name: '台北', x: 78, y: 63 }, { name: '高雄', x: 77, y: 68 },
  ],
  '香港': [{ name: '香港', x: 62, y: 72 }],
  '澳门': [{ name: '澳门', x: 58, y: 72 }],
};

function getRiskLevel(score: number): RiskLevel {
  if (score >= 80) return RiskLevel.CRITICAL;
  if (score >= 60) return RiskLevel.HIGH;
  if (score >= 40) return RiskLevel.MEDIUM;
  return RiskLevel.LOW;
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const provinceNamesList = provinces;

const eventTitles = [
  '产品质量问题引发消费者集体投诉',
  '员工劳动权益争议持续发酵',
  '市场监管部门立案调查涉嫌违规',
  '售后服务遭用户普遍不满',
  '新品发布被指虚假宣传',
  '食品安全问题引发公众担忧',
  '价格欺诈投诉量激增',
  '数据泄露事件引发隐私担忧',
  '门店服务态度遭网友吐槽',
  '物流配送延迟引发差评潮',
  '产品存在安全隐患被召回',
  '高管言论引发公众争议',
  '环保不达标被媒体曝光',
  '消费者退款难问题凸显',
  '产品被曝存在设计缺陷',
  '虚假促销活动被举报',
  '供应链问题导致缺货严重',
  '客户信息疑似被泄露',
  '品牌代言人陷入负面新闻',
  '线下门店突然关闭引质疑',
];

const platforms = ['微博', '抖音', '小红书', '微信公众号', 'B站', '知乎', '今日头条', '百度贴吧'];

export const topicsList = [
  '质量问题', '售后服务', '价格争议', '虚假宣传', '安全隐患',
  '劳动纠纷', '监管处罚', '隐私泄露', '物流问题', '退款困难',
  '服务态度', '产品缺陷', '环保问题', '供应链', '品牌形象',
];

const contents = [
  '有网友反映购买的产品使用不到一周就出现故障，联系客服多次均未得到有效回应，已向12315投诉。',
  '内部员工爆料公司存在强制加班、拖欠加班费等问题，目前已有数十名员工联合维权。',
  '据市场监管总局通报，该公司涉嫌违反不正当竞争法，已立案调查，拟作出行政处罚。',
  '多名消费者在社交平台反映售后服务体验差，报修后迟迟无人上门，客服态度敷衍。',
  '产品宣传页面号称"行业第一"，但实际检测数据显示远未达到宣传效果，涉嫌虚假宣传。',
  '有消费者食用后出现身体不适，医院诊断为食物中毒，已向当地食药监部门报告。',
  '促销活动标价与实际结算价不符，消费者质疑商家存在价格欺诈行为。',
  '网传公司用户数据库遭泄露，涉及数百万用户个人信息，公司尚未作出官方回应。',
];

const assignees = ['张明', '李娜', '王芳', '刘伟', '陈静', '赵强', '孙丽', '周军'];

const brandIds = ['brand1', 'brand2', 'brand3', 'brand4'];
const brandWeights = [0.45, 0.25, 0.18, 0.12];

function weightedBrandChoice(): string {
  const r = Math.random();
  let cumulative = 0;
  for (let i = 0; i < brandIds.length; i++) {
    cumulative += brandWeights[i];
    if (r < cumulative) return brandIds[i];
  }
  return brandIds[0];
}

function generateEvents(): PublicOpinionEvent[] {
  const events: PublicOpinionEvent[] = [];
  const statuses = [DisposalStatus.PENDING, DisposalStatus.CONFIRMED, DisposalStatus.PROCESSING, DisposalStatus.COOLED, DisposalStatus.RESOLVED];
  const sentiments = [Sentiment.NEGATIVE, Sentiment.MIXED, Sentiment.NEUTRAL];
  const mediaTiers = [MediaTier.NATIONAL, MediaTier.PROVINCIAL, MediaTier.LOCAL, MediaTier.SOCIAL, MediaTier.KOL];
  const categories = [EventCategory.MISUNDERSTANDING, EventCategory.QUALITY, EventCategory.LABOR, EventCategory.REGULATORY];

  const highRiskProvinces = ['广东', '浙江', '江苏', '北京', '上海', '四川', '山东', '湖北'];

  for (let i = 0; i < 80; i++) {
    const isHighRiskArea = Math.random() > 0.45;
    const province = isHighRiskArea ? randomChoice(highRiskProvinces) : randomChoice(provinces);
    const cityList = cities[province] || [{ name: province, x: 50, y: 50 }];
    const cityObj = randomChoice(cityList);
    const city = cityObj.name;
    const spreadSpeed = randomInt(10, 95);
    const riskScore = randomInt(isHighRiskArea ? 50 : 20, 95);

    const daysAgo = randomInt(0, 20);
    const hoursAgo = randomInt(0, 23);
    const publishDate = new Date();
    publishDate.setDate(publishDate.getDate() - daysAgo);
    publishDate.setHours(publishDate.getHours() - hoursAgo);

    const status = i < 28 ? DisposalStatus.PENDING : randomChoice(statuses);
    const hasCategory = status !== DisposalStatus.PENDING;
    const hasAssignee = status !== DisposalStatus.PENDING;

    events.push({
      id: `event_${i + 1}`,
      title: randomChoice(eventTitles),
      city,
      province,
      brandId: weightedBrandChoice(),
      riskLevel: getRiskLevel(riskScore),
      category: hasCategory ? randomChoice(categories) : undefined,
      sentiment: randomChoice(sentiments),
      firstPlatform: randomChoice(platforms),
      firstPublishTime: publishDate.toISOString(),
      repostPeak: randomInt(100, 50000),
      spreadSpeed,
      localMediaInvolvement: randomInt(5, 90),
      mediaTier: randomChoice(mediaTiers),
      mainTopics: Array.from({ length: randomInt(2, 5) }, () => randomChoice(topicsList)).filter((v, i, a) => a.indexOf(v) === i),
      typicalContent: randomChoice(contents),
      status,
      assignee: hasAssignee ? randomChoice(assignees) : undefined,
      confirmedAt: status === DisposalStatus.PENDING ? undefined : publishDate.toISOString(),
      resolvedAt: status === DisposalStatus.RESOLVED ? new Date(publishDate.getTime() + randomInt(2, 10) * 24 * 3600 * 1000).toISOString() : undefined,
      coolDownHours: status === DisposalStatus.COOLED ? randomInt(12, 120) : undefined,
    });
  }

  return events.sort((a, b) => new Date(b.firstPublishTime).getTime() - new Date(a.firstPublishTime).getTime());
}

export const mockEvents: PublicOpinionEvent[] = generateEvents();

export const strategySuggestions: StrategySuggestion[] = [
  {
    id: 'sug_1',
    type: 'unified_response',
    priority: 'high',
    title: '建议总部就产品质量问题发布统一声明',
    description: '本周全国多个省份集中出现产品质量相关负面舆情，话题热度持续上升，建议总部统一制定回应口径，避免各区域各自为政导致信息混乱。',
    relatedRegions: ['广东', '浙江', '江苏', '北京'],
    relatedEvents: ['event_1', 'event_3', 'event_7', 'event_12'],
  },
  {
    id: 'sug_2',
    type: 'regional_intervention',
    priority: 'high',
    title: '建议派遣区域团队赴广东省协助处置',
    description: '广东省本周高风险事件数量居全国首位，涉及多个城市，本地媒体参与度高，建议总部增派公关力量支援区域团队。',
    relatedRegions: ['广东'],
    relatedEvents: ['event_2', 'event_5', 'event_9'],
  },
  {
    id: 'sug_3',
    type: 'unified_response',
    priority: 'medium',
    title: '建议优化售后服务标准流程',
    description: '"售后服务"连续三周进入高频问题词榜，多地出现类似投诉，反映系统性问题，建议从公司层面优化服务标准。',
    relatedRegions: ['上海', '浙江', '四川', '山东'],
    relatedEvents: ['event_4', 'event_11', 'event_15'],
  },
  {
    id: 'sug_4',
    type: 'regional_intervention',
    priority: 'medium',
    title: '建议浙江省区加强与本地媒体沟通',
    description: '浙江省本地媒体参与度指数持续上升，部分报道存在失实情况，建议区域团队主动对接主流媒体，做好舆情引导。',
    relatedRegions: ['浙江'],
    relatedEvents: ['event_6', 'event_10'],
  },
  {
    id: 'sug_5',
    type: 'unified_response',
    priority: 'low',
    title: '建议开展员工关怀专项行动',
    description: '劳动纠纷类舆情有抬头趋势，虽目前风险等级不高，但处理不当易引发更大范围关注，建议HR部门牵头开展员工关怀行动。',
    relatedRegions: ['江苏', '湖北', '四川'],
    relatedEvents: ['event_8', 'event_13'],
  },
];

function riskScoreToLevel(score: number): RiskLevel {
  if (score >= 80) return RiskLevel.CRITICAL;
  if (score >= 60) return RiskLevel.HIGH;
  if (score >= 40) return RiskLevel.MEDIUM;
  return RiskLevel.LOW;
}

export function computeRegionRisks(events: PublicOpinionEvent[]): RegionRisk[] {
  const provinceMap = new Map<string, { scores: number[]; highCount: number; total: number }>();

  for (const p of provinces) {
    provinceMap.set(p, { scores: [], highCount: 0, total: 0 });
  }

  for (const ev of events) {
    const data = provinceMap.get(ev.province);
    if (!data) continue;
    const scoreMap: Record<string, number> = { critical: 90, high: 72, medium: 48, low: 24 };
    const baseScore = scoreMap[ev.riskLevel] ?? 20;
    const compositeScore = Math.min(100, Math.round(baseScore * 0.6 + ev.spreadSpeed * 0.25 + ev.localMediaInvolvement * 0.15));
    data.scores.push(compositeScore);
    data.total += 1;
    if (ev.riskLevel === RiskLevel.HIGH || ev.riskLevel === RiskLevel.CRITICAL) {
      data.highCount += 1;
    }
  }

  const result: RegionRisk[] = [];
  provinces.forEach((name, idx) => {
    const data = provinceMap.get(name)!;
    const hasEvents = data.scores.length > 0;
    const avgScore = hasEvents
      ? Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length)
      : 0;
    const maxScore = hasEvents ? Math.max(...data.scores) : 0;
    const finalScore = hasEvents ? Math.round(avgScore * 0.55 + maxScore * 0.45) : 0;

    result.push({
      regionCode: `prov_${idx + 1}`,
      regionName: name,
      riskLevel: hasEvents ? riskScoreToLevel(finalScore) : RiskLevel.LOW,
      riskScore: finalScore,
      eventCount: data.total,
      highRiskCount: data.highCount,
    });
  });

  return result;
}

export function computeCityRisks(events: PublicOpinionEvent[], provinceName: string): CityRisk[] {
  const cityObjs = cities[provinceName] || [];
  const cityMap = new Map<string, { scores: number[]; highCount: number; total: number }>();

  for (const c of cityObjs) {
    cityMap.set(c.name, { scores: [], highCount: 0, total: 0 });
  }

  for (const ev of events) {
    if (ev.province !== provinceName) continue;
    const data = cityMap.get(ev.city);
    if (!data) continue;
    const scoreMap: Record<string, number> = { critical: 90, high: 72, medium: 48, low: 24 };
    const baseScore = scoreMap[ev.riskLevel] ?? 20;
    const compositeScore = Math.min(100, Math.round(baseScore * 0.6 + ev.spreadSpeed * 0.25 + ev.localMediaInvolvement * 0.15));
    data.scores.push(compositeScore);
    data.total += 1;
    if (ev.riskLevel === RiskLevel.HIGH || ev.riskLevel === RiskLevel.CRITICAL) {
      data.highCount += 1;
    }
  }

  const result: CityRisk[] = [];
  for (const c of cityObjs) {
    const data = cityMap.get(c.name)!;
    const hasEvents = data.scores.length > 0;
    const avgScore = hasEvents
      ? Math.round(data.scores.reduce((a, b) => a + b, 0) / data.scores.length)
      : 0;
    const maxScore = hasEvents ? Math.max(...data.scores) : 0;
    const finalScore = hasEvents ? Math.round(avgScore * 0.55 + maxScore * 0.45) : 0;

    result.push({
      cityName: c.name,
      provinceName,
      x: c.x,
      y: c.y,
      riskScore: finalScore,
      riskLevel: hasEvents ? riskScoreToLevel(finalScore) : RiskLevel.LOW,
      eventCount: data.total,
      highRiskCount: data.highCount,
    });
  }

  return result;
}

export function computeHotWords(events: PublicOpinionEvent[]): HotWord[] {
  const wordCount = new Map<string, number>();

  for (const ev of events) {
    for (const topic of ev.mainTopics) {
      wordCount.set(topic, (wordCount.get(topic) || 0) + 1);
    }
  }

  const sortedWords = Array.from(wordCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);

  const maxCount = sortedWords.length > 0 ? sortedWords[0][1] : 1;

  return sortedWords.map(([word, count]) => {
    const ratio = count / maxCount;
    let trend: 'up' | 'down' | 'stable' = 'stable';
    if (ratio > 0.7) trend = 'up';
    else if (ratio < 0.3) trend = 'down';
    return { word, count, trend };
  });
}

export function getThisWeekRange(): [Date, Date] {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return [sevenDaysAgo, now];
}

export function filterEventsByDateRange(
  events: PublicOpinionEvent[],
  start: Date,
  end: Date
): PublicOpinionEvent[] {
  return events.filter((e) => {
    const d = new Date(e.firstPublishTime);
    return d >= start && d <= end;
  });
}

export function getCooledEvents(events: PublicOpinionEvent[]): PublicOpinionEvent[] {
  return events.filter(
    (e) => e.status === DisposalStatus.COOLED || e.status === DisposalStatus.RESOLVED
  );
}

export function getPendingEvents(events: PublicOpinionEvent[]): PublicOpinionEvent[] {
  return events.filter(
    (e) => e.status === DisposalStatus.PENDING || e.status === DisposalStatus.CONFIRMED
  );
}
