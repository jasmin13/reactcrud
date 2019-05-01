import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { loginUser, resetMsg } from "./../../store/actions/authAction";
import { Field, reduxForm } from "redux-form";
import renderField from "./../../utils/renderField";
import { required, longEnough, email } from "../../validation/validate";

const form = reduxForm({
  form: "SignIn"
});

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/home");
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
    //console.log(this.props);
  }

  componentWillUnmount() {
    this.props.resetMsg();
  }

  render() {
    const { handleSubmit, submitting, errors, success } = this.props;
    console.log(success);
    return (
      <div className="container">
        <div className="row">
          <section className="section section-login">
            <div className="valign-wrapper row login-box">
              <div className="col card hoverable s10 pull-s1 m6 pull-m3 l0 pull-l0">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  <div className="card-content">
                    <h5 className="grey-text text-darken-3">Sign In</h5>
                    {Object.keys(errors).length !== 0 ? (
                      <div className="card red darken-1">
                        <div className="card-content white-text">
                          <p>{errors.toString()}</p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {Object.keys(success).length !== 0 ? (
                      <div className="card green darken-1">
                        <div className="card-content white-text">
                          <p>{success.toString()}</p>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="row">
                      <div className="input-field col s12">
                        <Field
                          id="email"
                          placeholder="Email"
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
                          type="password"
                          placeholder="Password"
                          id="password"
                          name="password"
                          onChange={this.handleChange}
                          value={this.state.password}
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
                      Login
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

SignIn.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  resetMsg: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  success: state.success
});

export default connect(
  mapStateToProps,
  { loginUser, resetMsg }
)(form(SignIn));
