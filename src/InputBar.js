import React, { Component } from 'react';

class InputBar extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.onAdd(this.textInput.value);

    this.textInput.value = '';
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder='New Todo' ref={input => this.textInput = input}/>
      </form>
    );
  }
}

export default InputBar;