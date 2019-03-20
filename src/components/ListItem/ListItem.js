import React from 'react'

import {isNameValid} from '../../helpers'
import {isEmailValid} from '../../helpers'
import {isPhoneValid} from '../../helpers'
import EditComponent from './EditComponent'
import DefaultComponent from './DefaultComponent'

import './listitem.css'

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

  render() {
    const {isInEditMode} = this.state

    return isInEditMode ? (
      <EditComponent
        name={this.state.name}
        email={this.state.email}
        phone={this.state.phone}
        handleChange={this.handleChange}
        handleCancel={this.handleCancel}
        handleSave={this.handleSave}
      />
    ) : (
      <DefaultComponent
        participant={this.props.participant}
        changeEditMode={this.changeEditMode}
        deleteRow={this.props.deleteRow}
      />
    )
  }
}

export default ListItem
