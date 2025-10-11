import webpush from "web-push";
import prisma from "../config/prisma";

webpush.setVapidDetails(
  "mailto:akash16799@gmail.com",
  process.env.VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export const sendNotification = async (userId: string, payload: any) => {
  const subscriptions = await prisma.notificationSubscription.findMany({
    where: { userId },
  });
  console.log("Subscriptions:", subscriptions);
  subscriptions.forEach(async (sub) => {
    try {
      await webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        },
        JSON.stringify(payload)
      );
    } catch (err) {
      console.error("Push error:", err);
    }
  });
};
