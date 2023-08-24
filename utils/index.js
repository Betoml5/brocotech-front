export const formatCurrency = (currency) => {
  if (!currency || currency === 0 || currency === "0") {
    return 0;
  }

  return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
