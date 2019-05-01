import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "./../../store/actions/authAction";
import { Field, reduxForm } from "redux-form";
import { asyncValidate } from "./../../validation/asyncValidate";
import renderField from "./../../utils/renderField";
import { required, longEnough, email } from "../../validation/validate";

const form = reduxForm({
  form: "SignUp",
  asyncValidate,
  asyncBlurFields: ["email"]
});

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirm: "",
      errors: {}
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleFormSubmit = () => {
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm
    };

    this.props.registerUser(user, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/home");
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    /* const { errors } = this.state;
    console.log(errors); */
    return (
      <div className="container">
        <div className="row">
          <section className="section section-register">
            <div className="valign-wrapper row register-box">
              <div className="col card hoverable s10 pull-s1 m6 pull-m3 l0 pull-l0">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  <div className="card-content">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>
                    <div className="row">
                      <div className="input-field col s12">
                        <Field
                          placeholder="First Name"
                          id="firstName"
                          name="firstName"
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.firstName}
                          component={renderField}
                          validate={[required]}
                        />
                      </div>
                      <div className="input-field col s12">
                        <Field
                          placeholder="Last Name"
                          id="lastName"
                          name="lastName"
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.lastName}
                          component={renderField}
                          validate={[required]}
                        />
                      </div>
                      <div className="input-field col s12">
                        <Field
                          placeholder="Email"
                          id="email"
                          name="email"
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.email}
                          component={renderField}
                          validate={[required, email]}
                        />
                      </div>
                      <div className="input-field col s12">
                        <Field
                          placeholder="Password"
                          type="password"
                          id="password"
                          name="password"
                          onChange={this.handleChange}
                          value={this.state.password}
                          component={renderField}
                          validate={[required, longEnough]}
                        />
                      </div>
                      <div className="input-field col s12">
                        <Field
                          placeholder="Confirm Password"
                          type="password"
                          id="password_confirm"
                          name="password_confirm"
                          onChange={this.handleChange}
                          value={this.state.password_confirm}
                          component={renderField}
                          validate={[required, longEnough]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-action right-align">
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="submit"
                      disabled={submitting}
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(form(SignUp)));
