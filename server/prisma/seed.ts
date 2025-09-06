import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
// import { dummyOrders } from "../src/constants"; // assume this is the file where your array is

const prisma = new PrismaClient();

async function main() {
  // 1. Create admin Akash
  const hashedAdminPass = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.upsert({
    where: { username: "admin-akash" },
    update: {},
    create: {
      username: "admin-akash",
      password: hashedAdminPass,
      roles: ["ADMIN", "FULFILLMENT", "SALESMAN"], // 👈 fix here
      contactNumber: "1234567890",
    },
  });

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
