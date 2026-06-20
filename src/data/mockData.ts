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
} from '@/types';

export const brands: Brand[] = [
  { id: 'brand1', name: '集团主品牌' },
  { id: 'brand2', name: '子品牌A' },
  { id: 'brand3', name: '子品牌B' },
  { id: 'brand4', name: '新业务线' },
];

const provinces = [
  '北京', '天津', '河北', '山西', '内蒙古',
  '辽宁', '吉林', '黑龙江',
  '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东',
  '河南', '湖北', '湖南', '广东', '广西', '海南',
  '重庆', '四川', '贵州', '云南', '西藏',
  '陕西', '甘肃', '青海', '宁夏', '新疆',
  '台湾', '香港', '澳门',
];

const cities: Record<string, string[]> = {
  '北京': ['北京市'],
  '天津': ['天津市'],
  '河北': ['石家庄', '唐山', '保定', '廊坊'],
  '山西': ['太原', '大同', '临汾'],
  '内蒙古': ['呼和浩特', '包头', '鄂尔多斯'],
  '辽宁': ['沈阳', '大连', '鞍山'],
  '吉林': ['长春', '吉林', '延边'],
  '黑龙江': ['哈尔滨', '大庆', '齐齐哈尔'],
  '上海': ['上海市'],
  '江苏': ['南京', '苏州', '无锡', '常州', '南通'],
  '浙江': ['杭州', '宁波', '温州', '金华', '嘉兴'],
  '安徽': ['合肥', '芜湖', '蚌埠'],
  '福建': ['福州', '厦门', '泉州'],
  '江西': ['南昌', '九江', '赣州'],
  '山东': ['济南', '青岛', '烟台', '潍坊', '临沂'],
  '河南': ['郑州', '洛阳', '开封', '新乡'],
  '湖北': ['武汉', '宜昌', '襄阳'],
  '湖南': ['长沙', '株洲', '湘潭', '衡阳'],
  '广东': ['广州', '深圳', '东莞', '佛山', '珠海'],
  '广西': ['南宁', '柳州', '桂林'],
  '海南': ['海口', '三亚'],
  '重庆': ['重庆市'],
  '四川': ['成都', '绵阳', '德阳', '宜宾'],
  '贵州': ['贵阳', '遵义', '六盘水'],
  '云南': ['昆明', '大理', '丽江'],
  '西藏': ['拉萨', '日喀则'],
  '陕西': ['西安', '咸阳', '宝鸡'],
  '甘肃': ['兰州', '天水', '酒泉'],
  '青海': ['西宁', '格尔木'],
  '宁夏': ['银川', '石嘴山'],
  '新疆': ['乌鲁木齐', '伊犁', '喀什'],
  '台湾': ['台北', '高雄'],
  '香港': ['香港'],
  '澳门': ['澳门'],
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

export const regionRisks: RegionRisk[] = provinces.map((name, index) => {
  const score = randomInt(15, 95);
  const eventCount = randomInt(1, 15);
  return {
    regionCode: `prov_${index + 1}`,
    regionName: name,
    riskLevel: getRiskLevel(score),
    riskScore: score,
    eventCount,
    highRiskCount: Math.min(eventCount, randomInt(0, Math.ceil(eventCount / 2))),
  };
});

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

const topics = [
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

function generateEvents(): PublicOpinionEvent[] {
  const events: PublicOpinionEvent[] = [];
  const statuses = [DisposalStatus.PENDING, DisposalStatus.CONFIRMED, DisposalStatus.PROCESSING, DisposalStatus.COOLED, DisposalStatus.RESOLVED];
  const sentiments = [Sentiment.NEGATIVE, Sentiment.MIXED, Sentiment.NEUTRAL];
  const mediaTiers = [MediaTier.NATIONAL, MediaTier.PROVINCIAL, MediaTier.LOCAL, MediaTier.SOCIAL, MediaTier.KOL];
  const categories = [EventCategory.MISUNDERSTANDING, EventCategory.QUALITY, EventCategory.LABOR, EventCategory.REGULATORY];

  const highRiskProvinces = ['广东', '浙江', '江苏', '北京', '上海', '四川', '山东', '湖北'];

  for (let i = 0; i < 60; i++) {
    const isHighRiskArea = Math.random() > 0.5;
    const province = isHighRiskArea ? randomChoice(highRiskProvinces) : randomChoice(provinces);
    const cityList = cities[province] || [province];
    const city = randomChoice(cityList);
    const spreadSpeed = randomInt(10, 95);
    const riskScore = randomInt(isHighRiskArea ? 50 : 20, 95);

    const daysAgo = randomInt(0, 20);
    const hoursAgo = randomInt(0, 23);
    const publishDate = new Date();
    publishDate.setDate(publishDate.getDate() - daysAgo);
    publishDate.setHours(publishDate.getHours() - hoursAgo);

    const status = i < 20 ? DisposalStatus.PENDING : randomChoice(statuses);
    const hasCategory = status !== DisposalStatus.PENDING;
    const hasAssignee = status !== DisposalStatus.PENDING;

    events.push({
      id: `event_${i + 1}`,
      title: randomChoice(eventTitles),
      city,
      province,
      riskLevel: getRiskLevel(riskScore),
      category: hasCategory ? randomChoice(categories) : undefined,
      sentiment: randomChoice(sentiments),
      firstPlatform: randomChoice(platforms),
      firstPublishTime: publishDate.toISOString(),
      repostPeak: randomInt(100, 50000),
      spreadSpeed,
      localMediaInvolvement: randomInt(5, 90),
      mediaTier: randomChoice(mediaTiers),
      mainTopics: Array.from({ length: randomInt(2, 5) }, () => randomChoice(topics)).filter((v, i, a) => a.indexOf(v) === i),
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

export const hotWords: HotWord[] = [
  { word: '质量问题', count: 128, trend: 'up' },
  { word: '售后服务', count: 96, trend: 'up' },
  { word: '退款难', count: 87, trend: 'stable' },
  { word: '虚假宣传', count: 75, trend: 'up' },
  { word: '强制加班', count: 68, trend: 'down' },
  { word: '价格欺诈', count: 62, trend: 'up' },
  { word: '安全隐患', count: 58, trend: 'stable' },
  { word: '物流延迟', count: 54, trend: 'down' },
  { word: '服务态度', count: 49, trend: 'up' },
  { word: '隐私泄露', count: 45, trend: 'up' },
  { word: '产品缺陷', count: 42, trend: 'stable' },
  { word: '监管处罚', count: 38, trend: 'down' },
  { word: '环保问题', count: 35, trend: 'stable' },
  { word: '缺货', count: 32, trend: 'up' },
  { word: '劳动纠纷', count: 30, trend: 'down' },
  { word: '门店关闭', count: 28, trend: 'up' },
  { word: '品牌形象', count: 25, trend: 'stable' },
  { word: '客服敷衍', count: 23, trend: 'up' },
  { word: '数据安全', count: 21, trend: 'up' },
  { word: '供应链', count: 19, trend: 'down' },
];

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

export function getEventsByProvince(provinceName: string): PublicOpinionEvent[] {
  return mockEvents.filter(e => e.province === provinceName);
}

export function getEventsByCity(cityName: string): PublicOpinionEvent[] {
  return mockEvents.filter(e => e.city === cityName);
}

export function getHighRiskRegions(limit = 10): RegionRisk[] {
  return [...regionRisks].sort((a, b) => b.riskScore - a.riskScore).slice(0, limit);
}

export function getCooledEvents(): PublicOpinionEvent[] {
  return mockEvents.filter(e => e.status === DisposalStatus.COOLED || e.status === DisposalStatus.RESOLVED);
}

export function getPendingEvents(): PublicOpinionEvent[] {
  return mockEvents.filter(e => e.status === DisposalStatus.PENDING || e.status === DisposalStatus.CONFIRMED);
}
