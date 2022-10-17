export const getFilterDateWithCondition = (
  list: any[],
  field: string,
  condition: string
) => list.filter((data) => data[field].indexOf(condition) !== -1);
