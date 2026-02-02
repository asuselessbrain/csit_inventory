import { ProjectThesisStatus } from "../../../../generated/prisma/enums";
import { prisma } from "../../../lib/prisma";

const getAdminDashboardData = async () => {
  const totalStudents = await prisma.student.count({
    where: { isDeleted: false },
  });

  const totalTeachers = await prisma.teacher.count({
    where: { isDeleted: false },
  });

  const totalCourses = await prisma.courses.count({
    where: { status: "ACTIVE" },
  });

  const totalProjectTheses = await prisma.projectThesis.count({
    where: { status: ProjectThesisStatus.in_PROGRESS },
  });

  const pendingProposals = await prisma.projectThesis.count({
    where: { status: ProjectThesisStatus.PENDING },
  });

  const projectStatusCounts = await prisma.projectThesis.groupBy({
    by: ["status"],
    _count: {
      status: true,
    },
  });

  const projectDepartments = await prisma.projectThesis.findMany({
    select: {
      supervisor: true,
    },
  });

  const pieChartData = projectStatusCounts.map((item) => ({
    name: item.status,
    value: item._count.status,
  }));

  const deptCounts: Record<string, number> = {};

  const deptAcronymMap: Record<string, string> = {
    Computer_Science_And_Engineering: "CSE",
    Computer_Science_And_Information_Technology: "CSIT",
    Electrical_And_Electronic_Engineering: "EEE",
    Civil_Engineering: "CE",
    Business_Administration: "BBA",
  };

  projectDepartments.forEach((project) => {
    const enumDept = project.supervisor?.department;

    if (enumDept) {
      const shortName = deptAcronymMap[enumDept as string] || enumDept;

      deptCounts[shortName as string] =
        (deptCounts[shortName as string] || 0) + 1;
    }
  });

  const barChartData = Object.entries(deptCounts).map(([key, value]) => ({
    department: key,
    count: value,
  }));
  return {
    counts: {
      totalStudents,
      totalTeachers,
      totalCourses,
      totalProjectTheses,
      pendingProposals,
    },
    charts: {
      pieChartData,
      barChartData,
    },
  };
};

const teacherDashboardData = async (email: string) => {
  const isTeacherExist = await prisma.teacher.findUniqueOrThrow({
    where: { email },
  });

  const teacherId = isTeacherExist.id;
  const [
    totalActiveProjects,
    pendingRequests,
    completedProjects,
    projectStatusCounts,
    recentProposals,
  ] = await Promise.all([
    prisma.projectThesis.count({
      where: {
        supervisorId: teacherId,
        status: ProjectThesisStatus.in_PROGRESS,
      },
    }),

    prisma.projectThesis.count({
      where: {
        supervisorId: teacherId,
        status: ProjectThesisStatus.PENDING,
      },
    }),

    prisma.projectThesis.count({
      where: {
        supervisorId: teacherId,
        status: ProjectThesisStatus.COMPLETED,
      },
    }),

    prisma.projectThesis.groupBy({
      by: ["status"],
      where: {
        supervisorId: teacherId,
      },
      _count: {
        status: true,
      },
    }),

    prisma.projectThesis.findMany({
      where: {
        supervisorId: teacherId,
        status: ProjectThesisStatus.PENDING,
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        projectTitle: true,
        createdAt: true,
        student: {
          select: { name: true, id: true },
        },
      },
    }),
  ]);

  const pieChartData = projectStatusCounts.map((item) => ({
    name: item.status,
    value: item._count.status,
  }));

  const recentProposalsData = recentProposals.map((prop) => ({
    id: prop.id,
    title: prop.projectTitle,
    date: prop.createdAt,
    studentName: prop.student?.name || "N/A",
  }));

  return {
    counts: {
      totalActiveProjects,
      pendingRequests,
      completedProjects,
    },
    charts: {
      pieChartData,
    },
    tables: {
      recentProposals: recentProposalsData,
    },
  };
};

const studentDashboardData = async (email: string) => {
    console.log(email)
  const student = await prisma.student.findUniqueOrThrow({
    where: { email },
  });

  const studentId = student.id;

  const myProject = await prisma.projectThesis.findFirst({
    where: {
      studentId: studentId,
    },
    include: {
      supervisor: {
        select: {
          name: true,
          email: true,
          department: true,
          designation: true,
        },
      },
      tasks: {
        select: {
          id: true,
          status: true,
        },
      },
    },
  });

  if (!myProject) {
    return {
      hasProject: false,
      message: "You haven't submitted any proposal yet.",
    };
  }

  const totalTasks = myProject.tasks.length;
  const completedTasks = myProject.tasks.filter(
    (t) =>t.status === "DONE",
  ).length;

  const progressPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const pendingTasksCount = totalTasks - completedTasks;

  return {
    hasProject: true,
    overview: {
      projectTitle: myProject.projectTitle,
      status: myProject.status,
      progress: progressPercentage,
      totalTasks,
      completedTasks,
      pendingTasksCount,
    },
    supervisor: {
      name: myProject.supervisor?.name || "Not Assigned",
      email: myProject.supervisor?.email,
      designation: myProject.supervisor?.designation,
    },
    recentTasks: await prisma.task.findMany({
      where: { projectThesisId: myProject.id },
      take: 3,
      orderBy: { createdAt: "desc" },
      select: { title: true, status: true, dueDate: true },
    }),
  };
};

export const DashboardService = {
  getAdminDashboardData,
  teacherDashboardData,
  studentDashboardData
};
