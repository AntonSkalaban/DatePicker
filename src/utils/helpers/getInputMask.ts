export const getInputMask = (value: string) => {
  const newValue = value.replace(/\D/g, "");

  if (newValue.length <= 2) return newValue;

  if (newValue.length <= 4) return newValue.replace(/(\d{2})(\d{0,2})/, "$1/$2");

  return newValue.replace(/(\d{2})(\d{2})(\d{0,4})/, "$1/$2/$3");
};
