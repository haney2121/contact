import React, { Component, Fragment } from "react";

class AddContact extends Component {
  state = {
    name: "",
    email: "",
    phone: ""
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { name, email, phone } = this.state;
    return (
      <Fragment>
        <div className="card mb-3">
          <div className="card-header">Add Contact</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Name..."
                  name="name"
                  value={name}
                  onChange={this.onChange}
                />
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter E-mail..."
                  name="email"
                  value={email}
                  onChange={this.onChange}
                />
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Phone Number..."
                  name="phone"
                  value={phone}
                  onChange={this.onChange}
                />
              </div>
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
  }
}

export default AddContact;
