import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from 'actions';
import { BookingCard } from './BookingCard';

class BookingManage extends React.Component {

  componentWillMount() {
    this.props.dispatch(actions.fetchUserBookings());
  }

  renderBooking(bookings) {
    return bookings.map((booking, index) => <BookingCard booking={booking} key={index} />);
  }

  render() {
    const { data: bookings, isFetching } = this.props.userBookings;

    return (
      <section id='userBookings'>
        <h1 className='page-title'>My Bookings</h1>
        <div className='row'>
          { this.renderBooking(bookings)}
        </div>
        { !isFetching && bookings.length === 0 &&
          <div className='alert alert-warning'>
            You have no bookings created go to rentals section and book your place today.
            <Link style={{'margin-left': '10px'}} className='btn btn-bwm' to="/rentals">Available Rental</Link>
          </div>
        }

      </section>
    )
  }

}


function mapStateToProps(state) {
  return {
    userBookings: state.userBookings
  }
}

export default connect(mapStateToProps)(BookingManage)