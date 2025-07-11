import axios from "axios";

const API_URL = "http://localhost:8080"; 

export const requestRide = async (passengerId, pickUpLocation, dropUpLocation) => {
  return axios.post(`${API_URL}/ride/request`, {
    passengerId,
    pickUpLocation,
    dropUpLocation,
  });
};

export const respondToRide = async (rideId, driverId, action) => {
  return axios.post(`${API_URL}/ride/${rideId}/respond`, {
    driverId,
    action,
  });
};

export const updateDriverLocation = async (driverId, latitude, longitude) => {
  return axios.post(`${API_URL}/driver/status`, {
    driverId,
    latitude,
    longitude,
  });
};
