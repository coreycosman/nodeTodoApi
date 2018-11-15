import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import * as actions from "../actions/auth-action";
import { compose } from "redux"

class Login extends Component {
  componentDidMount() {
    if(this.props.auth.loggedIn) {
      this.props.history.push('/dashboard')
    }
  }

  onSubmit = (formProps) => {
    this.props.login(formProps, () => {
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
        
        <button>Signup</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors.errorsObject
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({
    form: 'login'
  })
)(Login);
