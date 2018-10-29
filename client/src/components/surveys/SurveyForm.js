import _ from 'lodash';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
  { label: "SURVEY TITLE", name: "title", noValueError: 'You must provide a title' },
  { label: "SUBJECT LINE", name: "subject", noValueError: 'You must provide a email' },
  { label: "EMAIL BODY", name: "body", noValueError: 'You must provide a body' },
  { label: "RECIPIENT LIST", name: "emails", noValueError: 'You must provide a email' },
];

class SurveyForm extends Component {

  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field key={name} component={SurveyField} type="text" label={label} name={name} />
      );
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link className='red btn-flat left white-text' to="/surveys">
            Cancel</Link>
          <button className="teal btn-flat right white-text" type="submit">
            Next<i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.emails = validateEmails(values.emails || '');

  _.each(FIELDS, ({ name, noValueError }) => {
    if (!values[name]) {
      errors[name] = noValueError;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm'
})(SurveyForm);