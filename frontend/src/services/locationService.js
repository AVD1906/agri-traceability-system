import API from "../api";
import {
  createLocalId,
  getCollection,
  upsertCollectionItem,
} from "./storageService";

function normalizeLocation(location) {
  return {
    location_id: location.location_id ?? createLocalId("location"),
    name: location.name,
    type: location.type || "Farm",
    address: location.address || "Address not provided",
    source: location.source || "local",
  };
}

const locationService = {
  getAll: async () => {
    const localItems = getCollection("locations").map(normalizeLocation);

    try {
      const response = await API.get("/locations");
      const remoteItems = (response.data || []).map((item) =>
        normalizeLocation({ ...item, source: "api" })
      );
      const merged = [...remoteItems];
      localItems.forEach((local) => {
        if (
          !merged.some(
            (item) => String(item.location_id) === String(local.location_id)
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
    const optimistic = normalizeLocation(payload);

    try {
      const response = await API.post("/locations", payload);
      return normalizeLocation({
        ...payload,
        ...response.data,
        source: "api",
      });
    } catch {
      return upsertCollectionItem("locations", optimistic, "location_id");
    }
  },
};

export default locationService;
