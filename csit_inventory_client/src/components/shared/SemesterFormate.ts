export const getSemesterFormate = (semester: string) => {
  switch (semester) {
    case "FIRST":
      return "1st";
    case "SECOND":
      return "2nd";
    case "THIRD":
      return "3rd";
    case "FOURTH":
      return "4th";
    case "FIFTH":
      return "5th";
    case "SIXTH":
      return "6th";
    case "SEVENTH":
      return "7th";
    case "EIGHTH":
      return "8th";
    default:
      return semester;
  }
};
