import axios from 'axios';

import { FECTH_RENTAL_SUCCESS, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT } from './types';

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
    axios.get('/api/v1/rentals')
    .then(res =>  res.data)
    .then(rentals => dispatch(fecthRentalsSuccess(rentals))
    );
  }

};

export const fetchRentalById = (rentalId) => {
  return function(dispatch) {
    dispatch(fetchRentalByIdInit());

    axios.get(`/api/v1/rentals/${rentalId}`)
      .then(res => res.data)
      .then(rental => dispatch(fecthRentalByIdSuccess(rental))
      );
  }
} 