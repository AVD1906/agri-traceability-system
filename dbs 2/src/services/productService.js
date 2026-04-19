import API from "../api";
import {
  createLocalId,
  getCollection,
  upsertCollectionItem,
} from "./storageService";

function normalizeProduct(product) {
  return {
    product_id: product.product_id ?? createLocalId("product"),
    product_name: product.product_name,
    category: product.category,
    farmer_id: product.farmer_id,
    farmer_name: product.farmer_name || product.owner_name || "Local Demo User",
    created_at: product.created_at || new Date().toISOString(),
    source: product.source || "local",
  };
}

const productService = {
  getAll: async () => {
    const localItems = getCollection("products").map(normalizeProduct);

    try {
      const response = await API.get("/products");
      const remoteItems = (response.data || []).map((item) =>
        normalizeProduct({ ...item, source: "api" })
      );

      const merged = [...remoteItems];
      localItems.forEach((local) => {
        if (!merged.some((item) => String(item.product_id) === String(local.product_id))) {
          merged.push(local);
        }
      });

      return merged;
    } catch {
      return localItems;
    }
  },

  create: async (payload) => {
    const optimistic = normalizeProduct(payload);

    try {
      const response = await API.post("/products", payload);
      const created = normalizeProduct({
        ...payload,
        ...response.data,
        source: "api",
      });
      return created;
    } catch {
      return upsertCollectionItem("products", optimistic, "product_id");
    }
  },
};

export default productService;
