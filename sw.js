self.addEventListener("push", event => {
    let data = {};

    try {
        data = event.data ? event.data.json() : {};
    } catch (error) {
        data = {};
    }

    const title = data.title || "Unsere Website ❤️";

    const options = {
        body: data.body || "Du hast eine neue Nachricht.",
        icon: "https://noahfsr.github.io/unser-programm/icon-192.png",
        badge: "https://noahfsr.github.io/unser-programm/icon-192.png",
        data: {
            url:
                data.url ||
                "https://noahfsr.github.io/unser-programm/"
        }
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});


self.addEventListener("notificationclick", event => {
    event.notification.close();

    const url =
        event.notification.data?.url ||
        "https://noahfsr.github.io/unser-programm/";

    event.waitUntil(
        clients.matchAll({
            type: "window",
            includeUncontrolled: true
        }).then(windowClients => {

            for (const client of windowClients) {
                if ("focus" in client) {
                    client.navigate(url);
                    return client.focus();
                }
            }

            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
