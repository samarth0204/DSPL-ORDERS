import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcrypt";
import { dummyOrders } from "../src/constants"; // assume this is the file where your array is

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
      role: "ADMIN",
    },
  });

  // 2. Create salesman users
  const salesmanNames = [...new Set(dummyOrders.map((o) => o.salesManName))];
  const salesmanMap: Record<string, string> = {};

  for (const name of salesmanNames) {
    const password = await bcrypt.hash(`${name.toLowerCase()}123`, 10);
    const user = await prisma.user.upsert({
      where: { username: name },
      update: {},
      create: {
        username: name,
        password,
        role: "SALESMAN",
      },
    });
    salesmanMap[name] = user.id;
  }

  // 3. Seed orders
  for (const order of dummyOrders) {
    await prisma.order.create({
      data: {
        clientName: order.clientName,
        deliveryDetails: order.deliveryDetails,
        status: order.status,
        orderDate: new Date(order.orderDate),
        salesman: { connect: { id: salesmanMap[order.salesManName] } },
        products: {
          create: order.products.map((p) => ({
            name: p.name,
            size: p.size,
            orderBy: p.order_by,
            quantity: p.quantity,
          })),
        },
        fulfillments: {
          create: order.fulfillments.map((f) => {
            // Calculate amount based on fulfilled products
            const amount = 100;
            return {
              id: f.id,
              date: new Date(f.date),
              amount,
              status: order.status === "Completed" ? "PAID" : "PENDING",
              fulfilledProducts: {
                create: f.fulfilledProducts.map((fp) => ({
                  name: fp.name,
                  size: fp.size,
                  orderBy: fp.order_by,
                  quantity: fp.quantity,
                })),
              },
            };
          }),
        },
      },
    });
  }

  console.log("🌱 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
