import { sendNotification } from "../services/notificationService";

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
      body = `Client: ${order.clientName}`;
      break;
    case "edited":
      title = "Bill Edited";
      body = `Client: ${order.clientName}`;
      break;
    case "deleted":
      title = "Bill Deleted";
      body = `Client: ${order.clientName}`;
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
      body = `Client: ${order.clientName}`;
      break;
    case "edited":
      title = "Order Edited";
      body = `Client: ${order.clientName}`;
      break;
    case "deleted":
      title = "Order Deleted";
      body = `Client: ${order.clientName}`;
      break;
  }

  if (order.status) body += `\nStatus: ${order.status}`;
  if (order.orderDate) {
    const date = new Date(order.orderDate);
    body += `\nDate: ${date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })}`;
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
