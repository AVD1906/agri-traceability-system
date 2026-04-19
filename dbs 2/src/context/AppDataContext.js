import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import batchService from "../services/batchService";
import locationService from "../services/locationService";
import logService, { notificationService } from "../services/logService";
import productService from "../services/productService";
import { useUser } from "./UserContext";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const { isAuthenticated, user } = useUser();
  const [products, setProducts] = useState([]);
  const [batches, setBatches] = useState([]);
  const [locations, setLocations] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState({
    products: false,
    batches: false,
    locations: false,
    notifications: false,
  });

  const setSectionLoading = useCallback((section, value) => {
    setLoading((current) => ({ ...current, [section]: value }));
  }, []);

  const fetchProducts = useCallback(async () => {
    setSectionLoading("products", true);
    try {
      const data = await productService.getAll();
      setProducts(data);
      return data;
    } finally {
      setSectionLoading("products", false);
    }
  }, [setSectionLoading]);

  const fetchBatches = useCallback(
    async (productList = []) => {
      setSectionLoading("batches", true);
      try {
        const data = await batchService.getAll(productList);
        setBatches(data);
        return data;
      } finally {
        setSectionLoading("batches", false);
      }
    },
    [setSectionLoading]
  );

  const fetchLocations = useCallback(async () => {
    setSectionLoading("locations", true);
    try {
      const data = await locationService.getAll();
      setLocations(data);
      return data;
    } finally {
      setSectionLoading("locations", false);
    }
  }, [setSectionLoading]);

  const fetchNotifications = useCallback(async () => {
    if (!user?.user_id) {
      setNotifications([]);
      return [];
    }

    setSectionLoading("notifications", true);
    try {
      const data = await notificationService.getAll(user.user_id);
      const sorted = [...data].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setNotifications(sorted);
      return sorted;
    } finally {
      setSectionLoading("notifications", false);
    }
  }, [setSectionLoading, user?.user_id]);

  const refreshAll = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    const freshProducts = await fetchProducts();
    await Promise.all([
      fetchBatches(freshProducts),
      fetchLocations(),
      fetchNotifications(),
    ]);
  }, [
    fetchBatches,
    fetchLocations,
    fetchNotifications,
    fetchProducts,
    isAuthenticated,
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      setProducts([]);
      setBatches([]);
      setLocations([]);
      setNotifications([]);
      return;
    }

    refreshAll();
  }, [isAuthenticated, refreshAll, user?.user_id]);

  const createProduct = useCallback(async (payload) => {
    const created = await productService.create(payload);
    setProducts((current) => [created, ...current]);
    return created;
  }, []);

  const createBatch = useCallback(async (payload) => {
    const created = await batchService.create(payload);
    setBatches((current) => [created, ...current]);
    return created;
  }, []);

  const createLocation = useCallback(async (payload) => {
    const created = await locationService.create(payload);
    setLocations((current) => [created, ...current]);
    return created;
  }, []);

  const createLog = useCallback(
    async (payload) => {
      const created = await logService.create(payload);
      const message = `${payload.stage} stage added for batch ${payload.batch_id}`;
      if (user?.user_id) {
        const notification = await notificationService.create({
          user_id: user.user_id,
          message,
        });
        setNotifications((current) => [notification, ...current]);
      }
      return created;
    },
    [user?.user_id]
  );

  const markNotificationAsRead = useCallback(async (id) => {
    await notificationService.markAsRead(id);
    setNotifications((current) =>
      current.map((notification) =>
        String(notification.notification_id) === String(id)
          ? { ...notification, status: "Read" }
          : notification
      )
    );
  }, []);

  const unreadCount = useMemo(
    () =>
      notifications.filter((notification) => notification.status === "Unread")
        .length,
    [notifications]
  );

  const value = useMemo(
    () => ({
      products,
      batches,
      locations,
      notifications,
      unreadCount,
      loading,
      fetchProducts,
      fetchBatches,
      fetchLocations,
      fetchNotifications,
      refreshAll,
      createProduct,
      createBatch,
      createLocation,
      createLog,
      markNotificationAsRead,
    }),
    [
      batches,
      createBatch,
      createLocation,
      createLog,
      createProduct,
      fetchBatches,
      fetchLocations,
      fetchNotifications,
      fetchProducts,
      loading,
      locations,
      markNotificationAsRead,
      notifications,
      products,
      refreshAll,
      unreadCount,
    ]
  );

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  const value = useContext(AppDataContext);
  if (!value) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }
  return value;
}
