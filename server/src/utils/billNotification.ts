import { sendNotification } from "../services/notificationService";
import prisma from "../config/prisma";

export async function notifyBillAction({
  userId,
  action,
  order,
  bill,
}: {
  userId: string | string[];
  action: "created" | "edited" | "deleted";
  order: any;
  bill?: any;
}) {
  let title = "";
  let body = "";

  switch (action) {
    case "created":
      title = "Bill Created";
      body = `A new bill has been created for (${order.clientName}).`;
      break;
    case "edited":
      title = "Bill Edited";
      body = `A bill for order of (${order.clientName}) has been edited.`;
      break;
    case "deleted":
      title = "Bill Deleted";
      body = `A bill for order of (${order.clientName}) has been deleted.`;
      break;
  }

  if (bill) {
    body += `\nBill Number: ${bill.billNumber || bill.id}`;
    if (bill.amount) body += `, Amount: ₹${bill.amount}`;
    if (bill.status) body += `, Status: ${bill.status}`;
  }

  const userIds = Array.isArray(userId) ? userId : [userId];

  await Promise.all(
    userIds.map((uid) =>
      sendNotification(uid, {
        title,
        body,
        ...(action !== "deleted" && {
          url: `https://order.divydaminispices.com/order/${order.id}`,
        }),
      })
    )
  );
}

export async function notifyOrderAction({
  userId,
  action,
  order,
}: {
  userId: string | string[];
  action: "created" | "edited" | "deleted";
  order: any;
}) {
  let title = "";
  let body = "";

  switch (action) {
    case "created":
      title = "Order Created";
      body = `A new order has been created.\nfor Client: ${order.clientName}`;
      break;
    case "edited":
      title = "Order Edited";
      body = `Order for (${order.clientName}) has been edited.`;
      break;
    case "deleted":
      title = "Order Deleted";
      body = `Order for (${order.clientName}) has been deleted.`;
      break;
  }

  if (order.status) body += `\nStatus: ${order.status}`;
  if (order.orderDate) body += `, Date: ${order.orderDate}`;

  const userIds = Array.isArray(userId) ? userId : [userId];

  await Promise.all(
    userIds.map((uid) =>
      sendNotification(uid, {
        title,
        body,
        ...(action !== "deleted" && {
          url: `https://order.divydaminispices.com/order/${order.id}`,
        }),
      })
    )
  );
}
