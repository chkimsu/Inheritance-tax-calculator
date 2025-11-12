export const FIELD_LABELS = {
  REAL_ESTATE: '부동산 상속 재산',
  SPOUSE: '배우자 상속 금액',
  FINANCIAL: '금융 상속 재산',
  DEBT: '채무 금액',
  APPRAISAL: '감정평가 수수료',
  FUNERAL: '장례 비용',
  GENERATION_SKIP: '세대 생략 상속 비용',
  SHARED_HOUSING: '공동주택공제금액',
  DISASTER_LOSS: '재해손실금액',
  PRIOR_GIFT: '동일인 증여 금액',
};

export const CARD_TITLES = ['자녀 수', '연로자 수', '미성년자 수', '장애인 수'];

export const FUNERAL_RANGE = {
  min: 5_000_000,
  max: 10_000_000,
};

export const DEDUCTIONS = {
  SPOUSE_LIMIT: 3_000_000_000,
  CHILD_PER_PERSON: 50_000_000,
  ELDER_PER_PERSON: 50_000_000,
  PERSONAL: 500_000_000,
  FINANCIAL_RATE: 0.2,
  FINANCIAL_LIMIT: 200_000_000,
  SHARED_RESIDENCE_LIMIT: 600_000_000,
  MINOR_AGE_LIMIT: 19,
  MINOR_PER_YEAR: 10_000_000,
  DISABILITY_AGE_LIMIT: 80,
  DISABILITY_PER_YEAR: 10_000_000,
  REPORT_CREDIT_RATE: 0.03,
};

export const TAX_BRACKETS = [
  { limit: 100_000_000, rate: 0.1, deduction: 0 },
  { limit: 500_000_000, rate: 0.2, deduction: 10_000_000 },
  { limit: 1_000_000_000, rate: 0.3, deduction: 60_000_000 },
  { limit: 3_000_000_000, rate: 0.4, deduction: 160_000_000 },
  { limit: Number.POSITIVE_INFINITY, rate: 0.5, deduction: 460_000_000 },
];
