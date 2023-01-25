export const formatCurrency = (currency) => {
  if (!currency) {
    return 0;
  }

  return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
