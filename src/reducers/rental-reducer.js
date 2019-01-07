import { FECTH_RENTAL_SUCCESS, FETCH_RENTAL_BY_ID_SUCCESS, FETCH_RENTAL_BY_ID_INIT, FECTH_RENTALS_INIT, FECTH_RENTALS_FAIL } from '../actions/types';

const INITIAL_STATE = {
  rentals: {
    data: [],
    errors: []
  },
  rental : {
    data: {}
  }
}

export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
  switch(action.type) {
    case FECTH_RENTALS_INIT: 
      return {...state, data: [], errors: []}
    case FECTH_RENTAL_SUCCESS:
      return {...state, data: action.rentals};
    case FECTH_RENTALS_FAIL:
      return Object.assign({}, state, {errors: action.errors, data: []});
    default:
      return state;
  }
}

export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
  switch(action.type) {
    case FETCH_RENTAL_BY_ID_INIT:
      return {...state, data: {}}
    case FETCH_RENTAL_BY_ID_SUCCESS:
      return {...state, data: action.rental}
    default: 
      return state;
  }
}