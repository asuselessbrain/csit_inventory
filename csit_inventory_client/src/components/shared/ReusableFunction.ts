import { format } from "date-fns";

export const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), "yyyy-MM-dd");
  } catch {
    return dateString;
  }
};