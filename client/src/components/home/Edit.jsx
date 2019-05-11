import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { editUser, getUser } from "./../../store/actions/userAction";
import { Field, reduxForm, change } from "redux-form";
//import renderField from "./../../utils/renderField";
import { required, phoneNumber, email } from "../../validation/validate";

const form = reduxForm({
  form: "Edit"
});

const renderField = ({
  defaultValue,
  input,
  meta: { touched, error },
  ...others
}) => {
  const { value, ...newVal } = input;
  return (
    <div>
      <div>
        <input
          {...newVal}
          {...others}
          defaultValue={value ? value : defaultValue}
        />
        {touched && (error && <span style={{ color: "red" }}>{error}</span>)}
      </div>
    </div>
  );
};

class Edit extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      user: { firstName: "", lastName: "", email: "", phone: "" }
    };
  }

  handleChange = e => {
    const { id, value } = e.target;

    this.setState({
      [id]: value
    });
  };

  handleFormSubmit = () => {
    const userData = {
      id: this.state.user._id,
      firstName: this.state.firstName
        ? this.state.firstName
        : this.state.user.firstName,
      lastName: this.state.lastName
        ? this.state.lastName
        : this.state.user.lastName,
      email: this.state.email ? this.state.email : this.state.user.email,
      phone: this.state.phone ? this.state.phone : this.state.user.phone
    };
    this.props.editUser(userData, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }

    if (nextProps.user) {
      this.setState({
        user: nextProps.user
      });
    }
  }

  componentDidMount() {
    this.props.getUser(this.props.match.params.id, this.props.history);
  }

  render() {
    const { user } = this.state;
    const { handleSubmit, submitting } = this.props;
    return (
      <div className="container">
        <div className="row">
          <section className="section section-register">
            <div className="valign-wrapper row register-box">
              <div className="col card hoverable s10 pull-s1 m6 pull-m3 l0 pull-l0">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                  <div className="card-content">
                    <h5 className="grey-text text-darken-3">Edit Form</h5>
                    <div className="row">
                      <div className="input-field col s12">
                        <Field
                          placeholder="First Name"
                          id="firstName"
                          name="firstName"
                          type="text"
                          onChange={this.handleChange}
                          defaultValue={user.firstName}
                          component={renderField}
                          validate={required}
                        />
                      </div>
                      <div className="input-field col s12">
                        <Field
                          placeholder="Last Name"
                          id="lastName"
                          name="lastName"
                          type="text"
                          onChange={this.handleChange}
                          defaultValue={user.lastName}
                          component={renderField}
                          validate={required}
                        />
                      </div>
                      <div className="input-field col s12">
                        <Field
                          placeholder="Email"
                          id="email"
                          name="email"
                          type="text"
                          onChange={this.handleChange}
                          defaultValue={user.email}
                          component={renderField}
                          validate={[required, email]}
                        />
                      </div>
                      <div className="input-field col s12">
                        <Field
                          placeholder="Phone"
                          type="text"
                          id="phone"
                          name="phone"
                          onChange={this.handleChange}
                          defaultValue={user.phone}
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

Edit.propTypes = {
  editUser: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user.person,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editUser, getUser }
)(withRouter(form(Edit)));
