import axios from "axios";

import {
  ADMIN_EVENT_REQUEST,
  ADMIN_EVENT_SUCCESS,
  ADMIN_EVENT_FAIL,
  NEW_EVENT_REQUEST,
  NEW_EVENT_SUCCESS,
  NEW_EVENT_FAIL,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/eventConstants";

// Get All EVENTs For Admin
export const getAdminEVENT = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_EVENT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/events");

    dispatch({
      type: ADMIN_EVENT_SUCCESS,
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create EVENT
export const createEVENT = (EventData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      `/api/v1/admin/event/new`,
      EventData,
      config
    );

    dispatch({
      type: NEW_EVENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update EVENT
export const updateEVENT = (id, eventData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_EVENT_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(
      `/api/v1/admin/event/${id}`,
      eventData,
      config
    );

    dispatch({
      type: UPDATE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete EVENT
export const deleteEVENT = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/event/${id}`);

    dispatch({
      type: DELETE_EVENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};