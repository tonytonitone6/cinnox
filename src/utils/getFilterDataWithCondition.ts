export const getFilterDataWithCondition = (list: any[], condition: string) =>
  list.filter((data) => {
    const { dt_txt: date } = data;
    return date.indexOf(condition) !== -1;
  });

export const getSliceData = (list: any[], len: number) => list.slice(0, len);
