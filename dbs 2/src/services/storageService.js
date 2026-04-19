const STORAGE_KEYS = {
  users: "agritrace_registered_users",
  products: "agritrace_local_products",
  batches: "agritrace_local_batches",
  logs: "agritrace_local_logs",
  locations: "agritrace_local_locations",
  notifications: "agritrace_local_notifications",
};

export const DEFAULT_USERS = [
  {
    user_id: 1,
    name: "Riya Farmer",
    email: "farmer@agritrace.app",
    password: "Farmer@123",
    role: "Farmer",
    orgName: "Green Valley Farm",
    phone: "+91 98765 11111",
    region: "Karnataka",
  },
  {
    user_id: 2,
    name: "Amit Processor",
    email: "processor@agritrace.app",
    password: "Processor@123",
    role: "Processor",
    orgName: "Harvest Foods",
    phone: "+91 98765 22222",
    region: "Maharashtra",
  },
  {
    user_id: 3,
    name: "Neha Distributor",
    email: "distributor@agritrace.app",
    password: "Distributor@123",
    role: "Distributor",
    orgName: "FreshLink Logistics",
    phone: "+91 98765 33333",
    region: "Tamil Nadu",
  },
  {
    user_id: 4,
    name: "Karan Retailer",
    email: "retailer@agritrace.app",
    password: "Retailer@123",
    role: "Retailer",
    orgName: "Farm Basket Store",
    phone: "+91 98765 44444",
    region: "Kerala",
  },
  {
    user_id: 5,
    name: "Admin User",
    email: "admin@agritrace.app",
    password: "Admin@123",
    role: "Admin",
    orgName: "AgriTrace HQ",
    phone: "+91 98765 55555",
    region: "Karnataka",
  },
];

function readJson(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function ensureSeedData() {
  if (!localStorage.getItem(STORAGE_KEYS.users)) {
    writeJson(STORAGE_KEYS.users, DEFAULT_USERS);
  }
}

export function getStoredUsers() {
  ensureSeedData();
  return readJson(STORAGE_KEYS.users, DEFAULT_USERS);
}

export function saveStoredUsers(users) {
  writeJson(STORAGE_KEYS.users, users);
}

export function getCollection(name) {
  return readJson(STORAGE_KEYS[name], []);
}

export function saveCollection(name, items) {
  writeJson(STORAGE_KEYS[name], items);
}

export function upsertCollectionItem(name, item, idField) {
  const current = getCollection(name);
  const next = current.some((entry) => entry[idField] === item[idField])
    ? current.map((entry) => (entry[idField] === item[idField] ? item : entry))
    : [item, ...current];
  saveCollection(name, next);
  return item;
}

export function createLocalId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
}
