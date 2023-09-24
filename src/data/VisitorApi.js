import axios from "axios";
import { BACKEND_BASE_URL } from "../api/Api";

export const fetchVisitors = async () => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/visitor/`, {
      headers: {
        Accept: "application/json",
      },
    });
    console.log("Fetched visitor data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching visitor data");
  }
};

export const deleteVisitor = async (visitorId) => {
  try {
    await axios.delete(`${BACKEND_BASE_URL}/visitor/${visitorId}/`);
    console.log("Visitor deleted successfully");
  } catch (error) {
    throw new Error("Error deleting visitor");
  }
};
