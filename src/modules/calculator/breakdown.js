import { DEDUCTIONS, FIELD_LABELS, FUNERAL_RANGE, TAX_BRACKETS } from './constants';
import { clampNumber, sumAgeBasedDeduction, toSafeNumber } from './utils';

const DEFAULT_AGE_STATE = {
  Child: [],
  disabled: [],
};

const CARD_KEY_MAP = {
  자녀: '자녀 수',
  연로자: '연로자 수',
};

const getCounterValue = (counters = {}, key) => toSafeNumber(counters[key]);

const calculateProgressiveTax = (base) => {
  const taxable = Math.max(toSafeNumber(base), 0);
  for (const bracket of TAX_BRACKETS) {
    if (taxable <= bracket.limit) {
      return taxable * bracket.rate - bracket.deduction;
    }
  }
  return 0;
};

export const buildBreakdown = ({
  amounts = {},
  counters = {},
  ages = DEFAULT_AGE_STATE,
  heirType = '배우자',
} = {}) => {
  const realEstate = toSafeNumber(amounts[FIELD_LABELS.REAL_ESTATE]);
  const spouseAmount = toSafeNumber(amounts[FIELD_LABELS.SPOUSE]);
  const financial = toSafeNumber(amounts[FIELD_LABELS.FINANCIAL]);
  const debt = toSafeNumber(amounts[FIELD_LABELS.DEBT]);
  const appraisal = toSafeNumber(amounts[FIELD_LABELS.APPRAISAL]);
  const funeralInput = toSafeNumber(amounts[FIELD_LABELS.FUNERAL]);
  const sharedHousing = toSafeNumber(amounts[FIELD_LABELS.SHARED_HOUSING]);
  const disasterLoss = toSafeNumber(amounts[FIELD_LABELS.DISASTER_LOSS]);
  const priorGift = toSafeNumber(amounts[FIELD_LABELS.PRIOR_GIFT]);
  const generationSkipSurcharge = toSafeNumber(amounts[FIELD_LABELS.GENERATION_SKIP]);

  const totalAssets = realEstate + financial;
  const withGifts = totalAssets + priorGift;
  const netAssets = withGifts - debt;
  const funeralDeduction = netAssets <= 0 ? 0 : clampNumber(funeralInput, FUNERAL_RANGE);
  const taxableEstate = Math.max(netAssets - funeralDeduction, 0);

  const spouseDeduction =
    heirType === '배우자' ? Math.min(spouseAmount, DEDUCTIONS.SPOUSE_LIMIT) : 0;

  const childCount = getCounterValue(counters, CARD_KEY_MAP.자녀);
  const elderCount = getCounterValue(counters, CARD_KEY_MAP.연로자);

  const childDeduction = childCount * DEDUCTIONS.CHILD_PER_PERSON;
  const elderDeduction = elderCount * DEDUCTIONS.ELDER_PER_PERSON;

  const minorDeduction = sumAgeBasedDeduction(ages.Child, {
    ceilingAge: DEDUCTIONS.MINOR_AGE_LIMIT,
    perYear: DEDUCTIONS.MINOR_PER_YEAR,
  });

  const disabilityDeduction = sumAgeBasedDeduction(ages.disabled, {
    ceilingAge: DEDUCTIONS.DISABILITY_AGE_LIMIT,
    perYear: DEDUCTIONS.DISABILITY_PER_YEAR,
  });

  const personalDeduction = DEDUCTIONS.PERSONAL;
  const financialDeduction = Math.min(financial * DEDUCTIONS.FINANCIAL_RATE, DEDUCTIONS.FINANCIAL_LIMIT);
  const sharedResidenceDeduction = Math.min(sharedHousing, DEDUCTIONS.SHARED_RESIDENCE_LIMIT);

  const deductionAfterBasics =
    taxableEstate -
    spouseDeduction -
    childDeduction -
    elderDeduction -
    minorDeduction -
    disabilityDeduction -
    personalDeduction -
    financialDeduction -
    sharedResidenceDeduction -
    disasterLoss -
    appraisal;

  const taxableBase = Math.max(deductionAfterBasics, 0);
  const calculatedTax = calculateProgressiveTax(taxableBase);
  const reportCredit = calculatedTax * DEDUCTIONS.REPORT_CREDIT_RATE;
  const totalDue = Math.max(calculatedTax - reportCredit + generationSkipSurcharge, 0);

  const deductionTotal =
    spouseDeduction +
    childDeduction +
    elderDeduction +
    minorDeduction +
    disabilityDeduction +
    personalDeduction +
    financialDeduction +
    sharedResidenceDeduction +
    disasterLoss +
    appraisal;

  const allowanceLimit = Math.max(taxableEstate - personalDeduction, 0);

  const rows = {
    '상속재산금액': totalAssets,
    '장례비용': funeralDeduction,
    '채무부담액': debt,
    '사전증여금액': priorGift,
    '과세가액': taxableEstate,
    '배우자공제': spouseDeduction,
    '자녀공제': childDeduction,
    '고령자공제': elderDeduction,
    '미성년자공제': minorDeduction,
    '장애인공제': disabilityDeduction,
    '인적공제': personalDeduction,
    '금융재산 공제': financialDeduction,
    '동거주택상속 공제': sharedResidenceDeduction,
    '재해손실금액': disasterLoss,
    '감정평가 수수료': appraisal,
    '공제금액합계': deductionTotal,
    '상속공제 적용한도금액': allowanceLimit,
    '상속세 과세표준': taxableBase,
    '산출세액': calculatedTax,
    '신고세액공제금액': reportCredit,
    '세대생략상속분': generationSkipSurcharge,
    '총납부액': totalDue,
  };

  const tableRows = Object.entries(rows).map(([name, amount]) => ({
    name,
    amount,
  }));

  const summary = {
    taxableEstate,
    taxableBase,
    calculatedTax,
    reportCredit,
    totalDue,
  };

  return {
    rows,
    tableRows,
    summary,
    meta: {
      totalAssets,
      deductionTotal,
      counters,
      ages,
    },
  };
};
