const { expect } = require('chai');
const { convertCurrency } = require('../utils/currencyConverter');

describe('Currency Conversion', () => {
  it('should convert USD to EUR correctly', () => {
    const amount = 100;
    const result = convertCurrency(amount, 'USD', 'EUR');
    expect(result).to.equal(85);  // Assuming conversion rate is 0.85
  });
});
