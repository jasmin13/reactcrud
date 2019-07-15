import React, { Component } from "react";
import "./../../styles/style.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import {
  getAllUser,
  deleteUser,
  searchUser
} from "./../../store/actions/userAction";
import { resetMsg } from "./../../store/actions/authAction";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      success: {}
    };
  }

  componentDidMount() {
    this.props.getAllUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleSearch = e => {
    this.props.getAllUser(e.target.value);
  };

  handleDelete = e => {
    e.preventDefault();
    this.props.deleteUser(e.target.id, this.props.history);
  };

  componentWillUnmount() {
    this.props.resetMsg();
  }

  render() {
    const { person } = this.props.user;
    const per = Object.keys(person);

    return (
      <div>
        <div className="row">
          <div className="col s1" />
          <div className="col s10">
            <div className="col s7 left">
              <h4 className="header left">React Crud</h4>
            </div>
            <div className="col s5 right addbtn">
              <span className="flow-text">
                <Link
                  to="/add"
                  className="waves-effect waves-light btn header right"
                >
                  Add
                </Link>
              </span>
            </div>
          </div>
          <div className="col s1" />
        </div>

        <div className="row">
          <div className="col s10">
            <div className="col s7 left" />
            <div className="col s5 right addbtn">
              <span className="flow-text">
                <input
                  type="text"
                  id="search"
                  name="search"
                  placeholder="Search"
                  onChange={this.handleSearch}
                />
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col s1" />
          <div className="col s10">
            {Object.keys(this.props.success).length !== 0 ? (
              <div className="card green darken-1">
                <div className="card-content white-text">
                  <p>{this.props.success.toString()}</p>
                </div>
              </div>
            ) : (
              ""
            )}
            <table>
              <thead>
                <tr>
                  <th data-field="firstName">FirstName</th>
                  <th data-field="lastName">LastName</th>
                  <th data-field="email">Email</th>
                  <th data-field="phone">Phone</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {per.map(perKey => {
                  return (
                    <tr key={perKey}>
                      <td>{person[perKey].firstName}</td>
                      <td>{person[perKey].lastName}</td>
                      <td>{person[perKey].email}</td>
                      <td>{person[perKey].phone}</td>
                      <td>
                        <Link to={"/edit/" + person[perKey]._id}>
                          <i className="material-icons">edit</i>
                        </Link>
                        <Link
                          to={"/delete/" + person[perKey]._id}
                          onClick={this.handleDelete}
                        >
                          <i className="material-icons" id={person[perKey]._id}>
                            delete
                          </i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="col s1" />
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
  resetMsg: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  success: state.success,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getAllUser, deleteUser, searchUser, resetMsg }
)(Home);
