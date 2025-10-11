import express from "express";
import prisma from "../config/prisma";

const router = express.Router();

router.post("/subscribe", async (req, res) => {
  const { userId, subscription } = req.body;

  await prisma.notificationSubscription.upsert({
    where: { endpoint: subscription.endpoint },
    update: {
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
      userId,
    },
    create: {
      userId,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
  });

  res.status(201).json({ message: "Subscribed successfully" });
});

export default router;
