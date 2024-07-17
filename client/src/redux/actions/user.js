import axios from "axios";
import { server } from "../../server";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    // Check if error.response is defined
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;

    dispatch({
      type: "LoadUserFail",
      payload: errorMessage,
    });
  }
};



export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
      
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    // Check if error.response is defined
    const errorMessage = error.response && error.response.data && error.response.data.message
      ? error.response.data.message
      : error.message;

    dispatch({
      type: "LoadSellerFail",
      payload: errorMessage,
    });
  }
};
