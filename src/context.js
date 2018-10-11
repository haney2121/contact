import React, { Component } from "react";

const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [
      {
        id: 1,
        name: "Justin Haney",
        email: "jahaney@west.com",
        phone: "251-447-9323"
      },
      {
        id: 2,
        name: "Brad Hughes",
        email: "brad@west.com",
        phone: "251-123-6549"
      },
      {
        id: 3,
        name: "Chase Harrison",
        email: "chase@west.com",
        phone: "251-555-6881"
      }
    ],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
