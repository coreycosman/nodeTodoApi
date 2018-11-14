import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../actions/auth-action";
import { compose } from "redux"
import PropTypes from "prop-types";

class Signup extends Component {
  componentDidMount() {
    if(this.props.auth.loggedIn) {
      this.props.history.push('/dashboard')
    }
  }

  onSubmit = (formProps) => {
    this.props.signup(formProps, () => {
      this.props.history.push('/dashboard');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.onSubmit) }>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <div>{ this.props.errors.email }</div>

        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <div>{ this.props.errors.password }</div>

        <fieldset>
          <label>Password Confirmation</label>
          <Field
            name="confirmation"
            type="password"
            component="input"
            autoComplete="none"
          />
        </fieldset>
        <div>{ this.props.errors.confirmation }</div>
        <button>Signup</button>
      </form>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {

  return {
    auth: state.auth,
    errors: state.errors.errorsObject
  };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'signup'
  })
)(Signup);
