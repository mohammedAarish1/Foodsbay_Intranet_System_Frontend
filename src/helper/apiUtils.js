import api from "../config/axiosConfig.js";

 const addAPI = async (url, formData) => {
  try {
    const response = await api.post(url, formData);
    return response;
  } catch (error) {
    throw error
    
  }
};

 const getAPI = async (url, id) => {
  try {
    console.log('iddddddddddddd',id)
    const response = await api.get(url);
    return response;
  } catch (error) {
    throw error
    
  }
};

export {addAPI,getAPI}
