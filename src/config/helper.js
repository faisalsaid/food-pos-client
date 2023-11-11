export const printOption = (value, options) => {
  const foundOption = options?.find((option) => option.value === value);
  return foundOption ? foundOption.label : '';
};
