self.addEventListener("push", (event) => {
  console.log("[Service Worker] Push Received");

  let data = {};
  try {
    data = event.data.json();
  } catch (e) {
    console.error("[Service Worker] Error parsing push data", e);
    return;
  }

  self.registration.showNotification(data.title || "Notification", {
    body: data.body || "",
    icon: "/logo.jpg",
    data: { url: data.url || "/" },
  });

  console.log("[Service Worker] Notification shown", data);
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data.url;
  event.waitUntil(clients.openWindow(url));
});
