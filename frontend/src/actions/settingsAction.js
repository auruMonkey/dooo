import axios from "axios"

//login action
export const getSettings = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_SETTINGS_REQUEST" })
    //config axios
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    //request to backend
    await axios.get("/api/settings", config).then((response) => {
      dispatch({ type: "GET_SETTINGS_SUCCESS", payload: response.data })
      localStorage.setItem("settingsInfo", JSON.stringify(response.data))
    })
  } catch (error) {
    dispatch({
      type: "GET_SETTINGS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
