
export const formatCurrency = (amount: number): string => {
  // Simplify amounts over 1 lakh
  if (amount >= 100000) {
    return (amount / 100000).toFixed(1) + ' L';
  } else if (amount >= 1000) {
    return (amount / 1000).toFixed(1) + ' K';
  }
  return amount.toString();
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};
