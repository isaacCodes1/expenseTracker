const conversionRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75
};

const convertCurrency = (amount, fromCurrency, toCurrency) => {
  const fromRate = conversionRates[fromCurrency];
  const toRate = conversionRates[toCurrency];
  
  if (!fromRate || !toRate) {
    throw new Error('Invalid currency');
  }

  return (amount / fromRate) * toRate;
};

module.exports = { convertCurrency };
