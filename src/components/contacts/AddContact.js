import React, { Component, Fragment } from "react";
import { Consumer } from "../../context";
import TextInputGroup from "../layout/TextInputGroup";
import uuid from "uuid";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  onSubmit = (dispatch, e) => {
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
    const newContact = { name, email, phone, id: uuid() };
    dispatch({ type: "ADD_CONTACT", payload: newContact });
    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });
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
                <div className="card-header">Add Contact</div>
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
                      value="Add Contact"
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

export default AddContact;
