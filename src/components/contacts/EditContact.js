import React, { Component, Fragment } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
// import uuid from "uuid";
import axios from "axios";

class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    //Check for Errors
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ errors: { email: "E-mail is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    const updatedContact = { name, email, phone };
    const { id } = this.props.match.params;
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updatedContact
    );
    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
    this.props.history.push("/");
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <Fragment>
              <div className="card mb-3">
                <div className="card-header">Edit Contact</div>
                <div className="card-body">
                  <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                    <TextInputGroup
                      name="name"
                      type="text"
                      placeholder="Enter Name..."
                      value={name}
                      onChange={this.onChange}
                      label="Name"
                      error={errors.name}
                    />
                    <TextInputGroup
                      name="email"
                      type="email"
                      placeholder="Enter E-mail..."
                      value={email}
                      onChange={this.onChange}
                      label="E-mail"
                      error={errors.email}
                    />
                    <TextInputGroup
                      name="phone"
                      type="text"
                      placeholder="Enter Phone..."
                      value={phone}
                      onChange={this.onChange}
                      label="Phone"
                      error={errors.phone}
                    />
                    <input
                      type="submit"
                      value="Update Contact"
                      className="btn btn-light btn-block"
                    />
                  </form>
                </div>
              </div>
            </Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default EditContact;
