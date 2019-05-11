import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addUser } from "./../../store/actions/userAction";
import { Field, reduxForm } from "redux-form";
import { asyncValidatePerson } from "./../../validation/asyncValidate";
import renderField from "./../../utils/renderField";
import { required, phoneNumber, email } from "../../validation/validate";

const form = reduxForm({
  form: "Add",
  asyncValidate: asyncValidatePerson,
  asyncBlurFields: ["email"]
});

class Add extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      errors: {}
    };
  }

  handleChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value
    });
  };

  handleFormSubmit = () => {
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    };

    this.props.addUser(user, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  render() {
    const { handleSubmit, submitting } = this.props;
    console.log(this.props);
    return (
      <div className="container">
        <div className="row">
          <section className="section section-register">
            <div className="valign-wrapper row register-box">
              <div className="col card hoverable s10 pull-s1 m6 pull-m3 l0 pull-l0">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  <div className="card-content">
                    <h5 className="grey-text text-darken-3">Add Form</h5>
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
                          placeholder="Phone"
                          id="phone"
                          name="phone"
                          type="text"
                          onChange={this.handleChange}
                          value={this.state.phone}
                          component={renderField}
                          validate={[required, phoneNumber]}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="card-action right-align">
                    <Link
                      to="/home"
                      className="waves-effect waves-teal btn-flat"
                    >
                      Cancle
                    </Link>
                    <button
                      className="btn waves-effect waves-light"
                      type="submit"
                      name="submit"
                      disabled={submitting}
                    >
                      Submit
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

Add.propTypes = {
  addUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addUser }
)(withRouter(form(Add)));
