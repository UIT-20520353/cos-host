export const isFutureDate = (inputDate: string): boolean => {
  const currentDate = new Date();
  const selectedDate = new Date(inputDate);

  // Year
  if (selectedDate.getFullYear() < currentDate.getFullYear()) return false;
  if (selectedDate.getFullYear() > currentDate.getFullYear()) return true;

  // Month
  if (selectedDate.getMonth() < currentDate.getMonth()) return false;
  if (selectedDate.getMonth() > currentDate.getMonth()) return true;

  // Day of month
  return selectedDate.getDate() >= currentDate.getDate();
};
