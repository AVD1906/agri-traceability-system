import API from "../api";

const reportService = {
  getTrace: async (batchId) => {
    const response = await API.get(`/reports/trace/${batchId}`);
    return response.data || [];
  },

  getUserActivity: async () => {
    const response = await API.get("/reports/activity");
    return response.data || [];
  },
};

export default reportService;
