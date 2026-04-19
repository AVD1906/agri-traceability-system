import API from "../api";
import {
  createLocalId,
  getCollection,
  saveCollection,
  upsertCollectionItem,
} from "./storageService";

function normalizeLog(log) {
  return {
    log_id: log.log_id ?? createLocalId("log"),
    batch_id: log.batch_id,
    user_id: log.user_id,
    user_name: log.user_name || log.actor_name || "Current User",
    location_id: log.location_id,
    location_name: log.location_name || "Unknown location",
    stage: log.stage,
    status: log.status || "Pending",
    timestamp: log.timestamp || new Date().toISOString(),
    source: log.source || "local",
  };
}

function normalizeNotification(notification) {
  return {
    notification_id:
      notification.notification_id ?? createLocalId("notification"),
    user_id: notification.user_id,
    message: notification.message,
    status: notification.status || "Unread",
    created_at: notification.created_at || new Date().toISOString(),
    source: notification.source || "local",
  };
}

const logService = {
  getByBatch: async (batchId) => {
    const localItems = getCollection("logs")
      .filter((log) => String(log.batch_id) === String(batchId))
      .map(normalizeLog);

    try {
      const response = await API.get(`/logs/${batchId}`);
      const remoteItems = (response.data || []).map((item) =>
        normalizeLog({ ...item, source: "api" })
      );
      const merged = [...remoteItems];
      localItems.forEach((local) => {
        if (!merged.some((item) => String(item.log_id) === String(local.log_id))) {
          merged.push(local);
        }
      });
      return merged;
    } catch {
      return localItems;
    }
  },

  create: async (payload) => {
    const optimistic = normalizeLog(payload);

    try {
      const response = await API.post("/logs", payload);
      return normalizeLog({
        ...payload,
        ...response.data,
        source: "api",
      });
    } catch {
      return upsertCollectionItem("logs", optimistic, "log_id");
    }
  },
};

export const notificationService = {
  getAll: async (userId) => {
    const localItems = getCollection("notifications")
      .filter((notification) => String(notification.user_id) === String(userId))
      .map(normalizeNotification);

    try {
      const response = await API.get(`/notifications/${userId}`);
      const remoteItems = (response.data || []).map((item) =>
        normalizeNotification({ ...item, source: "api" })
      );
      const merged = [...remoteItems];
      localItems.forEach((local) => {
        if (
          !merged.some(
            (item) =>
              String(item.notification_id) === String(local.notification_id)
          )
        ) {
          merged.push(local);
        }
      });
      return merged;
    } catch {
      return localItems;
    }
  },

  create: async (payload) => {
    const optimistic = normalizeNotification(payload);

    try {
      await API.post("/notifications", payload);
      return optimistic;
    } catch {
      return upsertCollectionItem(
        "notifications",
        optimistic,
        "notification_id"
      );
    }
  },

  markAsRead: async (id) => {
    try {
      await API.put(`/notifications/read/${id}`);
    } catch {
      const current = getCollection("notifications");
      const updated = current.map((notification) =>
        String(notification.notification_id) === String(id)
          ? { ...notification, status: "Read" }
          : notification
      );
      saveCollection("notifications", updated);
    }
  },
};

export default logService;
