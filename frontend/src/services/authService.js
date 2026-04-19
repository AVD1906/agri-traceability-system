import {
  createLocalId,
  getStoredUsers,
  saveStoredUsers,
} from "./storageService";

const TOKEN_KEY = "agritrace_token";
const USER_KEY = "agritrace_user";

function buildToken(user) {
  const payload = btoa(
    JSON.stringify({
      sub: user.user_id,
      email: user.email,
      role: user.role,
      ts: Date.now(),
    })
  );

  return `demo.${payload}.token`;
}

function sanitizeUser(user) {
  const { password, ...safeUser } = user;
  return safeUser;
}

const authService = {
  login: async ({ email, password, role }) => {
    const users = getStoredUsers();
    const found = users.find(
      (user) =>
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password &&
        (!role || user.role === role)
    );

    if (!found) {
      throw new Error("Invalid email, password, or role.");
    }

    const user = sanitizeUser(found);
    const token = buildToken(user);

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));

    return { token, user };
  },

  register: async (payload) => {
    const users = getStoredUsers();
    const emailTaken = users.some(
      (user) => user.email.toLowerCase() === payload.email.toLowerCase()
    );

    if (emailTaken) {
      throw new Error("An account with this email already exists.");
    }

    const user = {
      user_id:
        users.reduce((max, entry) => {
          const value = Number(entry.user_id);
          return Number.isFinite(value) ? Math.max(max, value) : max;
        }, 0) + 1,
      name: payload.name || `${payload.firstName || ""} ${payload.lastName || ""}`.trim(),
      email: payload.email,
      password: payload.password,
      role: payload.role,
      orgName: payload.orgName || "",
      phone: payload.phone || "",
      region: payload.region || "",
      localOnly: true,
      draftId: createLocalId("user"),
    };

    const nextUsers = [...users, user];
    saveStoredUsers(nextUsers);

    const safeUser = sanitizeUser(user);
    const token = buildToken(safeUser);

    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(safeUser));

    return { token, user: safeUser };
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser: () => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  getToken: () => localStorage.getItem(TOKEN_KEY),
};

export default authService;
