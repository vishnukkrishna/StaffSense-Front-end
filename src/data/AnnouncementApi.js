import axios from "axios";
import { BACKEND_BASE_URL } from "../api/Api";

export const fetchAnnouncements = async () => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/user/announcements/`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch announcements");
  }
};

export const addAnnouncement = async (newAnnouncement) => {
  try {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/user/announcements/`,
      newAnnouncement
    );
    console.log(response.data, "responsesss");
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add announcement");
  }
};

export const deleteAnnouncement = async (announcementId) => {
  try {
    await axios.delete(
      `${BACKEND_BASE_URL}/user/announcements/${announcementId}/delete/`
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete announcement");
  }
};
