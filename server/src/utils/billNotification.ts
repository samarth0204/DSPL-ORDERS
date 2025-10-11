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
      body = `A new bill has been created for order #${order.id} (${order.clientName}).`;
      break;
    case "edited":
      title = "Bill Edited";
      body = `A bill for order #${order.id} (${order.clientName}) has been edited.`;
      break;
    case "deleted":
      title = "Bill Deleted";
      body = `A bill for order #${order.id} (${order.clientName}) has been deleted.`;
      break;
  }

  // Add more details if bill info is present
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
        url: `https://order.divydaminispices.com/order/${order.id}`,
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
      body = `A new order has been created.\nOrder #: ${order.id}, Client: ${order.clientName}`;
      break;
    case "edited":
      title = "Order Edited";
      body = `Order #${order.id} (${order.clientName}) has been edited.`;
      break;
    case "deleted":
      title = "Order Deleted";
      body = `Order #${order.id} (${order.clientName}) has been deleted.`;
      break;
  }

  // Add more order details if available
  if (order.status) body += `\nStatus: ${order.status}`;
  if (order.orderDate) body += `, Date: ${order.orderDate}`;

  const userIds = Array.isArray(userId) ? userId : [userId];
  await Promise.all(
    userIds.map((uid) =>
      sendNotification(uid, {
        title,
        body,
        url: `https://order.divydaminispices.com/order/${order.id}`,
      })
    )
  );
}
