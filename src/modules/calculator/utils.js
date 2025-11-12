export const toSafeNumber = (value) => {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
};

export const clampNumber = (value, { min = 0, max = Number.POSITIVE_INFINITY } = {}) => {
  const numericValue = toSafeNumber(value);
  return Math.min(Math.max(numericValue, min), max);
};

export const sumAgeBasedDeduction = (ages = [], { ceilingAge, perYear }) => {
  if (!Array.isArray(ages) || !ceilingAge || !perYear) {
    return 0;
  }

  return ages.reduce((total, age) => {
    const parsedAge = Number(age);
    if (!Number.isFinite(parsedAge)) {
      return total;
    }

    const remainingYears = ceilingAge - parsedAge;
    if (remainingYears <= 0) {
      return total;
    }

    return total + remainingYears * perYear;
  }, 0);
};

export const formatCurrency = (value) => {
  if (value === null || value === undefined) {
    return '-';
  }

  if (typeof value !== 'number') {
    return value;
  }

  return value.toLocaleString('ko-KR');
};
