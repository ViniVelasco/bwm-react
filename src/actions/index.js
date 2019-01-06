import axios from 'axios';
import authService from 'services/auth-service';
import axiosService from 'services/axios-service';

import { FECTH_RENTAL_SUCCESS, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from './types';

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

export const fetchRentals = () => {
  return dispatch => {
    axiosInstance.get('/rentals')
    .then(res =>  res.data)
    .then(rentals => dispatch(fecthRentalsSuccess(rentals))
    );
  }

};

export const fetchRentalById = (rentalId) => {
  return function(dispatch) {
    dispatch(fetchRentalByIdInit());

    axiosInstance.get(`/rentals/${rentalId}`)
      .then(res => res.data)
      .then(rental => dispatch(fecthRentalByIdSuccess(rental))
      );
  }
}

// AUTH ACTIONS

export const register = (userData) => {
  return axios.post('/api/v1/users/register', userData).then(
    res => res.data,
    err => Promise.reject(err.response.data.errors));
}

const loginSuccess = (token) => {
  return {
    type: LOGIN_SUCCESS,
    token
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