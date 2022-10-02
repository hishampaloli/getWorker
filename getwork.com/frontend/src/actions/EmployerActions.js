import {
  EMPLOYER_PROFILE_FAIL,
  EMPLOYER_PROFILE_REQUEST,
  EMPLOYER_PROFILE_SUCCESS,
} from "../contants/employerContants";
import axios from "axios";


export const getEmployerProfile = () => async (dispatch) => {
    try {

        dispatch({
            type: EMPLOYER_PROFILE_REQUEST
        })


        const id = JSON.parse(localStorage.getItem("userInfo"));

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${id.token}`,
          },
        };


        const { data } = await axios.get(
            `/api/employer/profile/${id._id}`,
            config
          );
      
          console.log(data);


          dispatch({
            type: EMPLOYER_PROFILE_SUCCESS,
            payload: data
          })

        
    } catch (error) {
        dispatch({
            type: EMPLOYER_PROFILE_FAIL,
            error: error
        })
    }
}


