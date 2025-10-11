import { useEffect } from "react";
import api from "@/utils/api";
import urlBase64ToUint8Array from "../../../server/src/utils/urlBase64ToUint8Array";

export default function usePushNotification(userId: string | null) {
  useEffect(() => {
    if (!userId) return;
    subscribeForPush(userId);
  }, [userId]);
}

export async function subscribeForPush(userId: string | null) {
  if (!userId) return;
  if (!("serviceWorker" in navigator)) return;

  const registration = await navigator.serviceWorker.register("/sw.js");

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "BJWTWhU2aUKlswZ-lHeBL7oJ4HzEbZQCy0CrTJIed6tMOiUW8JFsXCzDhS36L9m1laHVPQKkUE4UkB1VB4RX3pE"
    ),
  });

  await api.post("/notification/subscribe", { userId, subscription });
}
