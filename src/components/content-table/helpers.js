export const getDifferenceOfDatesByDay = (currentDate) => {
  const _currentDate = new Date(currentDate);
  const __nowDate = new Date();
  __nowDate.setHours(3, 0, 0, 0);

  return __nowDate - _currentDate >= 0;
};
