export const getArrayFromLS = <T>(key: string): T[] | null => {
  const arr = localStorage.getItem(key);
  return arr ? JSON.parse(arr) : null;
};
