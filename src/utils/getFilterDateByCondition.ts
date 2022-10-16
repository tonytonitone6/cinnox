export const getFilterDateWithCondition = (list: any[], condition: string) =>
  list.filter((data) => {
    const { dt_txt: date } = data;
    return date.indexOf(condition) !== -1;
  });
