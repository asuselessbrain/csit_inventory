import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma";
import { UserRole } from "../generated/prisma/enums";
import { config } from "../src/config";
import { courses } from "./courses";
import { teachers } from "./teachers";

async function main() {
  const adminEmail = "arfan.exprovia@gmail.com";
  const adminPassword = "Admin@12345";
  const saltRounds = Number(config.salt_rounds) || 12;

  console.log("Seeding super admin...");

  const existingUser = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (existingUser) {
    console.log("⚠️ Admin already exists in database with email:", adminEmail);
  } else {
    const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);

    await prisma.$transaction(async (tx) => {
      await tx.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          role: UserRole.ADMIN,
          isEmailVerified: true,
        },
      });

      await tx.admin.create({
        data: {
          email: adminEmail,
          name: "Super Admin",
          phoneNumber: "01700000000",
          photoUrl: "https://i.ibb.co/3sW328K/admin-avatar.png",
        },
      });
    });

    console.log("✅ Admin seeded successfully!");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
  }

  console.log("Seeding courses...");
  const createdCourses = await prisma.courses.createMany({
    data: courses,
    skipDuplicates: true,
  });
  console.log(`✅ Seeded ${createdCourses.count} courses successfully!`);

  console.log("Seeding teachers...");
  let teachersSeededCount = 0;
  for (const teacherData of teachers) {
    const existingTeacherUser = await prisma.user.findUnique({
      where: { email: teacherData.email },
    });

    if (!existingTeacherUser) {
      const hashedTeacherPassword = await bcrypt.hash(teacherData.password, saltRounds);

      await prisma.$transaction(async (tx) => {
        await tx.user.create({
          data: {
            email: teacherData.email,
            password: hashedTeacherPassword,
            role: UserRole.TEACHER,
            isEmailVerified: true,
          },
        });

        await tx.teacher.create({
          data: {
            email: teacherData.email,
            name: teacherData.name,
            phoneNumber: teacherData.phoneNumber,
            address: teacherData.address,
            faculty: teacherData.faculty,
            department: teacherData.department,
            joinedAt: teacherData.joinedAt,
            designation: teacherData.designation,
            isChairman: teacherData.isChairman,
            photoUrl: teacherData.photoUrl,
          },
        });
      });
      teachersSeededCount++;
    } else {
      console.log(`⚠️ Teacher user already exists with email: ${teacherData.email}`);
    }
  }
  console.log(`✅ Seeded ${teachersSeededCount} teachers successfully!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
