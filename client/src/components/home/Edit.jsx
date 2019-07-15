import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { editUser, getUser } from "./../../store/actions/userAction";
import { Field, reduxForm, change } from "redux-form";
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
  constructor(props) {
    super(props);
  }

  handleChange = e => {
    const { id, value } = e.target;

    this.props.dispatch(change("Edit", id, value));
  };

  handleFormSubmit = user => {
    this.props.editUser({ ...user, id: this.props.id }, this.props.history);
  };

  componentWillReceiveProps(nextProps) {
    const {
      firstName: oFirstName,
      lastName: oLastName,
      email: oEmail,
      phone: oPhone
    } = this.props.user;
    const { firstName, lastName, email, phone } = nextProps.user;
    oFirstName !== firstName &&
      this.props.dispatch(change("Edit", "firstName", firstName));
    oLastName !== lastName &&
      this.props.dispatch(change("Edit", "lastName", lastName));
    oEmail !== email && this.props.dispatch(change("Edit", "email", email));
    oPhone !== phone && this.props.dispatch(change("Edit", "phone", phone));
  }

  componentDidMount() {
    this.props.getUser(this.props.id, this.props.history);
  }

  render() {
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
