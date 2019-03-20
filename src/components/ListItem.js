import React from 'react'

import {isNameValid} from '../helpers'
import {isEmailValid} from '../helpers'
import {isPhoneValid} from '../helpers'

import './listitem.css'

import uuidv4 from 'uuid/v4'

class ListItem extends React.Component {
  state = {
    isInEditMode: false,
    name: this.props.participant.name,
    email: this.props.participant.email,
    phone: this.props.participant.phone,
    id: this.props.participant.id,
  }

  changeEditMode = () => {
    const {
      participant: {name, email, phone},
    } = this.props

    this.setState({
      isInEditMode: true,
      name,
      email,
      phone,
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  isValid = () => {
    const {name, email, phone} = this.state

    return isNameValid(name) && isEmailValid(email) && isPhoneValid(phone)
  }

  handleCancel = () => {
    this.setState({isInEditMode: false})
  }

  handleSave = () => {
    const {name, email, phone, id} = this.state

    this.setState({
      isInEditMode: false,
    })

    if (this.isValid()) {
      this.props.editRow({
        name,
        email,
        phone,
        id,
      })
    } else {
      const alertText =
        'I could not edit the row as you suggested. :(\n\n' +
        'These values were invalid:\n' +
        (!isNameValid(name) ? '- name: ' + name + '\n' : '') +
        (!isEmailValid(email) ? '- e-mail address: ' + email + '\n' : '') +
        (!isPhoneValid(phone) ? '- phone number: ' + phone : '')

      alert(alertText)
    }
  }

  renderEditView = () => {
    const {name, email, phone} = this.state

    return (
      <div className="edit_form">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={name}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail address"
            value={email}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={phone}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input type="button" value="Cancel" onClick={this.handleCancel} />
          <input type="submit" value="Save" onClick={this.handleSave} />
        </div>
      </div>
    )
  }

  renderDefaultView = () => {
    const {participant, deleteRow} = this.props

    return (
      <div className="table_row" key={uuidv4()}>
        <div>
          <div id="item_name">{participant.name}</div>
          <div id="item_email">{participant.email}</div>
          <div id="item_phone">{participant.phone}</div>
        </div>
        <div className="icons">
          <span
            className="icon-edit fas fa-pen"
            onClick={this.changeEditMode}
          />
          <span
            className="icon-trash fas fa-trash"
            onClick={() => deleteRow(participant.id)}
          />
        </div>
      </div>
    )
  }

  render() {
    return this.state.isInEditMode
      ? this.renderEditView()
      : this.renderDefaultView()
  }
}

export default ListItem
