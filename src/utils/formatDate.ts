/**
 * Returns the appropriate suffix for a given day of the month
 * 
 * @param day the day of the month from API date string
 * @returns the suffix string (e.g., "ST", "ND", "RD", "TH")
 */

const getDaySuffix = (day: number) => {
  // Handle special cases for 11th, 12th, and 13th
  if (day >= 11 && day <= 13) {
    return "TH";
  }

  // Determine suffix based on the last digit of the day
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

/**
 * Formats a date string into a more readable format with day suffix and month name
 * 
 * @param dateString the date string from the API (e.g., "2023-10-05")
 * @returns formatted date string (e.g., "5TH OCTOBER")
 */

export const getDayDate = (dateString: string | undefined) => {
  // Return empty string if dateString is undefined
  if (!dateString) {
    return "";
  }

  const date = new Date(dateString);
  const month = date.toLocaleString("en-US", { month: "long" }).toUpperCase();
  const day = date.getDate();
  const suffix = getDaySuffix(day);

  return `${day}${suffix} ${month}`;
};
