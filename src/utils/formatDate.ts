const getDaySuffix = (day: number) => {
  if (day >= 11 && day <= 13) {
    return "TH";
  }

  switch (day % 10) {
    case 1:
      return "ST";
    case 2:
      return "ND";
    case 3:
      return "RD";
    default:
      return "TH";
  }
};

export const getDayDate = (dateString: string | undefined) => {
  if (!dateString) {
    return "";
  }
  
  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const day = date.getDate();
  const suffix = getDaySuffix(day);

  return `${day}${suffix} ${month}`;
};
