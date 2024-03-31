import axiosApi from "./AxiosHelper";

const fetchUserDetails = async () => {
  try {
    const response = await axiosApi.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/authenticated`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

export default fetchUserDetails;
