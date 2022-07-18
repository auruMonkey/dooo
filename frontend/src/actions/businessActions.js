import axios from "axios"

//login action
export const loginB = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "BUSINESS_LOGIN_REQUEST" })
    //config axios
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    }
    //request to backend
    await axios
      .post("/api/business/login", { email, password }, config)
      .then((response) => {
        dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
        localStorage.setItem("businessInfo", JSON.stringify(response.data))
        localStorage.removeItem("userInfo")
      })
  } catch (error) {
    dispatch({
      type: "BUSINESS_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

//logout action
export const logoutB = () => (dispatch) => {
  localStorage.removeItem("businessInfo")
  dispatch({ type: "BUSINESS_LOGOUT" })
}

export const getBusinessById = (idBsn) => async (dispatch) => {
  try {
    const config = { headers: { "Content-type": "application/json" } }
    dispatch({ type: "GET_BUSINESS_BY_ID_REQUEST" })
    await axios.post("/api/business/id", { idBsn }, config).then((response) => {
      dispatch({ type: "GET_BUSINESS_BY_ID_SUCCESS", payload: response.data })
    })
  } catch (error) {
    dispatch({
      type: "GET_BUSINESS_BY_ID_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// register new business
export const businessRegister =
  (
    name,
    email,
    password,
    phonenumber,
    businessname,
    description,
    category,
    address,
    lat,
    lng,
    apt,
    isNew,
    id,
    newName
  ) =>
  async (dispatch) => {
    let othrcat
    let newCategory
    // config headers
    const config = { headers: { "Content-type": "application/json" } }
    try {
      dispatch({ type: "BUSINESS_REGISTER_REQUEST" })
      if (isNew) {
        newCategory = await axios
          .post("/api/settings", { id, category, newName }, config)
          .then((response) => {
            dispatch({ type: "GET_SETTINGS_SUCCESS", payload: response.data })
            localStorage.setItem("settingsInfo", JSON.stringify(response.data))
          })
      }

      await axios
        .post(
          "/api/business",
          {
            name,
            email,
            password,
            phonenumber,
            businessname,
            description,
            category,
            address,
            lat,
            lng,
            apt,
          },
          config
        )
        .then((response) => {
          dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
          dispatch({
            type: "BUSINESS_REGISTER_SUCCESS",
            payload: response.data,
          })
          localStorage.setItem("businessInfo", JSON.stringify(response.data))

          //   dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data })
        })
    } catch (error) {
      dispatch({
        type: "BUSINESS_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
// update personal information
export const updatePersonalBusiness =
  (name, email, phone, id) => async (dispatch) => {
    try {
      dispatch({ type: "BUSINESS_UPDATE_PROFILE_REQUEST" })

      await axios
        .put(
          "/api/business/profile/personal",
          { name, email, phone, id },
          {
            headers: { "Content-type": "application/json" },
          }
        )
        .then((response) => {
          dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
          dispatch({
            type: "BUSINESS_UPDATE_PROFILE_SUCCESS",
            payload: response.data,
          })

          localStorage.setItem("businessInfo", JSON.stringify(response.data))
        })
    } catch (error) {
      dispatch({
        type: "BUSINESS_UPDATE_PROFILE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
// update business information
export const updateBusinessBusiness =
  (businessName, details, experience, id) => async (dispatch) => {
    try {
      dispatch({ type: "BUSINESS_B_UPDATE_PROFILE_REQUEST" })

      await axios
        .put(
          "/api/business/profile/business",
          { businessName, details, experience, id },
          {
            headers: { "Content-type": "application/json" },
          }
        )
        .then((response) => {
          dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
          dispatch({
            type: "BUSINESS_B_UPDATE_PROFILE_SUCCESS",
            payload: response.data,
          })

          localStorage.setItem("businessInfo", JSON.stringify(response.data))
        })
    } catch (error) {
      dispatch({
        type: "BUSINESS_B_UPDATE_PROFILE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

// update location information
export const addLocation =
  (id, newLocation, newLong, newLat) => async (dispatch) => {
    try {
      dispatch({ type: "BUSINESS_UPDATE_LOCATION_REQUEST" })

      await axios
        .put(
          "/api/business/location/add",
          { newLocation, newLong, newLat, id },
          {
            headers: { "Content-type": "application/json" },
          }
        )
        .then((response) => {
          dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
          dispatch({
            type: "BUSINESS_UPDATE_LOCATION_SUCCESS",
            payload: response.data,
          })

          localStorage.setItem("businessInfo", JSON.stringify(response.data))
        })
    } catch (error) {
      dispatch({
        type: "BUSINESS_UPDATE_LOCATION_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

// delete location information
export const deleteLocation = (bId, id, address) => async (dispatch) => {
  try {
    dispatch({ type: "BUSINESS_DELETE_LOCATION_REQUEST" })

    await axios
      .put(
        "/api/business/location/delete",
        { bId, id, address },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((response) => {
        dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
        dispatch({
          type: "BUSINESS_DELETE_LOCATION_SUCCESS",
          payload: response.data,
        })

        localStorage.setItem("businessInfo", JSON.stringify(response.data))
      })
  } catch (error) {
    dispatch({
      type: "BUSINESS_DELETE_LOCATION_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// update services information
export const addService = (id, name, duration, price) => async (dispatch) => {
  try {
    dispatch({ type: "BUSINESS_UPDATE_SERVICES_REQUEST" })

    await axios
      .put(
        "/api/business/service/add",
        { id, name, duration, price },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((response) => {
        dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
        dispatch({
          type: "BUSINESS_UPDATE_SERVICES_SUCCESS",
          payload: response.data,
        })

        localStorage.setItem("businessInfo", JSON.stringify(response.data))
      })
  } catch (error) {
    dispatch({
      type: "BUSINESS_UPDATE_SERVICES_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// delete location information
export const deleteService = (bId, id) => async (dispatch) => {
  try {
    dispatch({ type: "BUSINESS_DELETE_SERVICE_REQUEST" })

    await axios
      .put(
        "/api/business/service/delete",
        { bId, id },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((response) => {
        dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
        dispatch({
          type: "BUSINESS_DELETE_SERVICE_SUCCESS",
          payload: response.data,
        })

        localStorage.setItem("businessInfo", JSON.stringify(response.data))
      })
  } catch (error) {
    dispatch({
      type: "BUSINESS_DELETE_SERVICE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// delete location information
export const editService = (bid, id, edServ) => async (dispatch) => {
  try {
    dispatch({ type: "BUSINESS_EDIT_SERVICE_REQUEST" })

    await axios
      .put(
        "/api/business/service/edit",
        { bid, id, edServ },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((response) => {
        console.log(response.data)
        dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
        // dispatch({
        //   type: "BUSINESS_EDIT_SERVICE_SUCCESS",
        //   payload: response.data,
        // })

        localStorage.setItem("businessInfo", JSON.stringify(response.data))
      })
  } catch (error) {
    dispatch({
      type: "BUSINESS_EDIT_SERVICE_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// update business information
export const updateScheduleBusiness =
  (bid, sid, shift, lunch, daysOff, locationSch) => async (dispatch) => {
    try {
      dispatch({ type: "BUSINESS_SCHEDULE_UPDATE_REQUEST" })
      await axios
        .post(
          "/api/business/schedule",
          { bid, sid, shift, lunch, daysOff, locationSch },
          {
            headers: { "Content-type": "application/json" },
          }
        )
        .then((response) => {
          dispatch({ type: "BUSINESS_LOGIN_SUCCESS", payload: response.data })
          dispatch({
            type: "BUSINESS_SCHEDULE_UPDATE_SUCCESS",
            payload: response.data,
          })
          localStorage.setItem("businessInfo", JSON.stringify(response.data))
        })
    } catch (error) {
      dispatch({
        type: "BUSINESS_SCHEDULE_UPDATE_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
// update business information
export const getBusinessApnById = (apnArray) => async (dispatch) => {
  try {
    dispatch({ type: "GET_BUSINESS_APPOINTMENT_REQUEST" })
    await axios
      .post(
        "/api/business/appointment",
        { apnArray },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((response) => {
        dispatch({
          type: "GET_BUSINESS_APPOINTMENT_SUCCESS",
          payload: response.data,
        })
      })
  } catch (error) {
    dispatch({
      type: "GET_BUSINESS_APPOINTMENT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
// update business information
export const acceptBusinessApn = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ACCEPT_BUSINESS_APPOINTMENT_REQUEST" })
    await axios
      .post(
        "/api/business/appointment/accept",
        { id },
        {
          headers: { "Content-type": "application/json" },
        }
      )
      .then((response) => {
        dispatch({
          type: "ACCEPT_BUSINESS_APPOINTMENT_SUCCESS",
          payload: response.data,
        })
        dispatch({
          type: "GET_BUSINESS_APPOINTMENT_SUCCESS",
          payload: response.data,
        })
      })
  } catch (error) {
    dispatch({
      type: "ACCEPT_BUSINESS_APPOINTMENT_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
