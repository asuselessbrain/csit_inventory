import { Prisma } from "../../generated/prisma/client";

export const filtering = (
  inputFilter:
    | Prisma.StudentWhereInput[]
    | Prisma.AdminWhereInput[]
    | Prisma.TeacherWhereInput[]
    | Prisma.CoursesWhereInput[]
    | Prisma.TaskWhereInput[]
    | Prisma.ProjectThesisWhereInput[],
  filterData: Record<string, any>,
) => {
  const filterConditions = Object.keys(filterData).map((key) => {
    let value = filterData[key];

    // FIX: Check if incoming value is a string and has comma, then split into array
    if (typeof value === "string" && value.includes(",")) {
      value = value.split(","); // "FIRST,SECOND" becomes ["FIRST", "SECOND"]
    }

    if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    }

    // Now logic checks if it is an array (from split above or raw input)
    const isArray = Array.isArray(value);
    const filterCondition = isArray ? { in: value } : { equals: value };

    if (key.includes(".")) {
      const parts = key.split(".");
      let nestedFilter: any = filterCondition;
      for (let i = parts.length - 1; i >= 0; i--) {
        const partKey = parts[i] as string;
        nestedFilter = { [partKey]: nestedFilter };
      }
      return nestedFilter;
    }

    return { [key]: filterCondition };
  });

  if (filterConditions.length > 0) {
    (inputFilter as any[]).push({ AND: filterConditions });
  }
};
