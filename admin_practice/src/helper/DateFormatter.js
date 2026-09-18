export const extractDate = (date) => {
  const formattedDat = date.split("T")[0];
  return formattedDat;
};
