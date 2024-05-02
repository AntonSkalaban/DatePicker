// eslint-disable-next-line @typescript-eslint/comma-dangle
export const getArrayFromLS = <T>(key: string): T[] => {
  const arr = localStorage.getItem(key);
  return arr ? JSON.parse(arr) : [];
};
