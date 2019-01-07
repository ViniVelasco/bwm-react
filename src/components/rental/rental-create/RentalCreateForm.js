import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { BwmInput } from 'components/shared/form/BwmInput';
import { BwmResError } from 'components/shared/form/BwmResError';
import { BwmTextArea } from '../../shared/form/BwmTextArea';
import { BwmSelect } from '../../shared/form/BwmSelect';
import { BwmFileUpload } from '../../shared/form/BwmFileUpload';

const RentalCreateForm = props => {
  const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props
  return (
    <form onSubmit={handleSubmit(submitCb)}>
      <Field
        name="title"
        type="text"
        className='form-control'
        label="Title"
        component={BwmInput}
      />
      <Field
        name="description"
        type="text"
        className='form-control'
        rows='6'
        label="Description"
        component={BwmTextArea}
      />
      <Field
        name="city"
        type="text"
        className='form-control'
        label="City"
        component={BwmInput}
      />
      <Field
        name="street"
        type="text"
        className='form-control'
        label="Street"
        component={BwmInput}
      />
      <Field
        options={options}
        name="category"
        className='form-control'
        label="Category"
        component={BwmSelect}
      />
      <Field
        name="image"
        label="Image"
        component={BwmFileUpload}
      />
      <Field
        name="bedrooms"
        type="number"
        className='form-control'
        label="Beedrooms"
        component={BwmInput}
      />
      <Field
        name="dailyRate"
        type="text"
        className='form-control'
        label="Daily Rate"
        symbol='$'
        component={BwmInput}
      />
      <Field
        name="shared"
        type="checkbox"
        label="Shared"
        component={BwmInput}
      />
      <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
        Create Rental
      </button>
      <BwmResError errors={errors} />
    </form>
  )
}

export default reduxForm({
  form: 'rentalCreateForm',
  initialValues: { shared: false, category: 'apartment' }
})(RentalCreateForm)