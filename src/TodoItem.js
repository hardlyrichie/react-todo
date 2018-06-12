import React, { Component } from 'react';

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
      editable: false,
    };

    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);    
    this.handleCheck = this.handleCheck.bind(this);   
  }

  handleDeleteItem() {
    this.props.onDelete(this.props.todo);
  }

  handleEdit() {
    this.setState({ editable: true });
  }

  handleEditSubmit(event) {
    event.preventDefault();

    this.props.onEdit(this.input.value, this.props.todo);

    this.setState({ editable: false });    
  }

  handleCheck(event) {
    this.setState({ isChecked: event.target.checked });
  }

  componentDidUpdate() {
    if (this.state.editable) {
      this.input.focus();
    }
  }

  render() {
    let todo;

    if (this.state.editable) {
      todo = (
        <form onSubmit={this.handleEditSubmit} className='form'>
          <input type="text" defaultValue={this.props.todo} ref={input => this.input = input} onBlur={this.handleEditSubmit}/>
        </form>
      );
    } else {
      todo = this.props.todo;
    }

    return (
      <div className={this.state.isChecked ? 'TodoItem disabled' : 'TodoItem'}>
        <input type="checkbox" onChange={this.handleCheck}/>
        <span onDoubleClick={this.handleEdit}>
          {todo}
        </span>
        <button onClick={this.handleDeleteItem}>X</button>
      </div>
    );
  }
}

export default TodoItem;