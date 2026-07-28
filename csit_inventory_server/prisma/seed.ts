import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../src/lib/prisma";
import { UserRole } from "../generated/prisma/enums";
import { config } from "../src/config";

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
    return;
  }

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

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
