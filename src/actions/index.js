import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';

import { FECTH_RENTAL_SUCCESS, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT, LOGIN_SUCCESS, LOGIN_FAILURE, FECTH_RENTALS_INIT, FECTH_RENTALS_FAIL, LOGOUT } from './types';

const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit = () => {
  return {
    type: FETCH_RENTAL_BY_ID_INIT
  }
}

const fecthRentalByIdSuccess = (rental) => {
  return {
    type: FETCH_RENTAL_BY_ID_SUCCESS,
    rental
  }
}

const fecthRentalsSuccess = (rentals) => {
  return {
    type: FECTH_RENTAL_SUCCESS,
    rentals
  }
}

const fetchRentalsInit = () => {
  return {
    type: FECTH_RENTALS_INIT
  }
}

const fetchRentalsFail = (errors) => {
  return {
    type: FECTH_RENTALS_FAIL,
    errors
  }
};

export const fetchRentals = (city) => {
  const url = city ? `/rentals?city=${city}` : '/rentals';

  return dispatch => {
    dispatch(fetchRentalsInit());

    axiosInstance.get(url)
      .then(res => res.data )
      .then(rentals => dispatch(fecthRentalsSuccess(rentals)))
      .catch(({response}) => dispatch(fetchRentalsFail(response.data.errors)))
  }
}

export const fetchRentalById = (rentalId) => {
  return function(dispatch) {
    dispatch(fetchRentalByIdInit());

    axiosInstance.get(`/rentals/${rentalId}`)
      .then(res => res.data)
      .then(rental => dispatch(fecthRentalByIdSuccess(rental))
      );
  }
}

export const createRental = (rentalData) => {
  return axiosInstance.post('/rentals', rentalData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors));
}

// AUTH ACTIONS
export const register = (userData) => {
  return axios.post('/api/v1/users/register', userData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors));
}

const loginSuccess = (token) => {
  const username = authService.getUsername();
  return {
    type: LOGIN_SUCCESS,
    token,
    username
  }
}

const loginFailure = (errors) => {
  return {
    type: LOGIN_FAILURE,
    errors
  }
}

export const checkAuthState = () => {
  return dispatch => {
    if(authService.isAuthenticated()) {
      dispatch(loginSuccess());
    }
  }
}

export const login = (userData) => {
  return dispatch => {
    return axios.post('api/v1/users/auth', userData)
      .then(res => res.data)
      .then(token => {
        authService.saveToken(token);
        dispatch(loginSuccess(token));
      })
      .catch(({response}) => {
        dispatch(loginFailure(response.data.errors))
      });
  }
}

export const logout = () => {
  authService.invalidate();
  
  return {
    type: LOGOUT
  }
}

export const createBooking = (booking) => {
  return axiosInstance.post('/bookings', booking)
          .then(res => res.data)
          .catch(({response}) => Promise.reject(response.data.errors))
}