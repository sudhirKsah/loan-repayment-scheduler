const { addMonths, addWeeks, addQuarters, format } = require("date-fns");

const generateSchedule = (disbursementDate, principal, tenure, frequency, interestRate, moratoriumPeriod) => {
  const principalAmount = parseFloat(principal);
  const annualRate = parseFloat(interestRate) / 100;
  const moratorium = parseInt(moratoriumPeriod);
  const tenureMonths = parseInt(tenure);

  const periodsPerYear = frequency === "monthly" ? 12 : frequency === "weekly" ? 52 : 4;
  const ratePerPeriod = annualRate / periodsPerYear;

  const numberOfPayments = frequency === "monthly" ? tenureMonths : 
                          frequency === "weekly" ? Math.floor(tenureMonths * 52 / 12) : 
                          Math.floor(tenureMonths / 3);

  const emi = principalAmount * ratePerPeriod * Math.pow(1 + ratePerPeriod, numberOfPayments) 
            / (Math.pow(1 + ratePerPeriod, numberOfPayments) - 1);

  let balance = principalAmount;
  let startDate = new Date(disbursementDate);
  const schedule = [];

  for (let i = 0; i < moratorium; i++) {
    const interestForPeriod = balance * ratePerPeriod;
    const date = frequency === "monthly" 
      ? addMonths(startDate, i)
      : frequency === "weekly" 
      ? addWeeks(startDate, i)
      : addQuarters(startDate, i);

    schedule.push({
      paymentNumber: i + 1,
      date: format(date, "yyyy-MM-dd"),
      openingBalance: balance.toFixed(2),
      emi: 0,
      interest: interestForPeriod.toFixed(2),
      principal: 0,
      closingBalance: balance.toFixed(2),
    });
  }

  startDate = frequency === "monthly" 
    ? addMonths(startDate, moratorium)
    : frequency === "weekly" 
    ? addWeeks(startDate, moratorium)
    : addQuarters(startDate, moratorium);

  for (let i = 0; i < numberOfPayments; i++) {
    const interestForPeriod = balance * ratePerPeriod;
    const principalForPeriod = emi - interestForPeriod;
    balance -= principalForPeriod;

    const date = frequency === "monthly" 
      ? addMonths(startDate, i)
      : frequency === "weekly" 
      ? addWeeks(startDate, i)
      : addQuarters(startDate, i);

    schedule.push({
      paymentNumber: moratorium + i + 1,
      date: format(date, "yyyy-MM-dd"),
      openingBalance: (balance + principalForPeriod).toFixed(2),
      emi: emi.toFixed(2),
      interest: interestForPeriod.toFixed(2),
      principal: principalForPeriod.toFixed(2),
      closingBalance: Math.max(0, balance).toFixed(2),
    });
  }

  return schedule;
};

module.exports = { generateSchedule };