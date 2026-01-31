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

export const getDesignationFormat = (designation: string) => {
  switch (designation) {
    case "LECTURER":
      return "Lecturer";
    case "ASSISTANT_PROFESSOR":
      return "Assistant Professor";
    case "ASSOCIATE_PROFESSOR":
      return "Associate Professor";
    case "PROFESSOR":
      return "Professor";
    default:
      return designation;
  }
};

export const getDepartmentFormat = (department?: string) => {
  if (!department) return "";

  const map: Record<string, string> = {
    Computer_Science_And_Information_Technology:
      "Computer Science and Information Technology",
    Computer_science_And_Communication_Engineering:
      "Computer Science and Communication Engineering",
    Electrical_And_Electronic_Engineering:
      "Electrical and Electronic Engineering",
    Physics_And_Mechanical_Engineering:
      "Physics and Mechanical Engineering",
    Mathematics: "Mathematics",
  };

  return map[department] || department;
};
