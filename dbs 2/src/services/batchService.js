import API from "../api";
import {
  createLocalId,
  getCollection,
  upsertCollectionItem,
} from "./storageService";

function normalizeBatch(batch) {
  return {
    batch_id: batch.batch_id ?? createLocalId("batch"),
    product_id: batch.product_id,
    product_name: batch.product_name || "Unknown product",
    quantity: batch.quantity,
    harvest_date: batch.harvest_date,
    expiry_date: batch.expiry_date || "",
    status: batch.status || "Pending",
    certificate_id: batch.certificate_id || "Pending",
    authority: batch.authority || "Awaiting review",
    created_at: batch.created_at || new Date().toISOString(),
    source: batch.source || "local",
  };
}

async function getBatchesForProducts(products) {
  const requests = products.map((product) =>
    API.get(`/batches/product/${product.product_id}`).then((response) =>
      (response.data || []).map((batch) =>
        normalizeBatch({
          ...batch,
          product_name: product.product_name,
          source: "api",
        })
      )
    )
  );

  const results = await Promise.all(requests);
  return results.flat();
}

const batchService = {
  getAll: async (products = []) => {
    const localItems = getCollection("batches").map(normalizeBatch);

    if (!products.length) {
      return localItems;
    }

    try {
      const remoteItems = await getBatchesForProducts(products);
      const merged = [...remoteItems];
      localItems.forEach((local) => {
        if (!merged.some((item) => String(item.batch_id) === String(local.batch_id))) {
          merged.push(local);
        }
      });
      return merged;
    } catch {
      return localItems;
    }
  },

  create: async (payload) => {
    const optimistic = normalizeBatch(payload);

    try {
      const response = await API.post("/batches", payload);
      return normalizeBatch({
        ...payload,
        ...response.data,
        source: "api",
      });
    } catch {
      return upsertCollectionItem("batches", optimistic, "batch_id");
    }
  },
};

export default batchService;
