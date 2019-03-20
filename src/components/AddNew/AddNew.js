import React from 'react'

import {isNameValid} from '../../helpers'
import {isEmailValid} from '../../helpers'
import {isPhoneValid} from '../../helpers'

import './addnew.css'

import uuidv4 from 'uuid/v4'

class AddNew extends React.Component {
  state = {
    name: '',
    email: '',
    phone: '',
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

  handleSave = () => {
    const {name, email, phone} = this.state

    if (this.isValid()) {
      this.props.addRow({
        name,
        email,
        phone,
        id: uuidv4(),
      })
    } else {
      const alertText =
        'I could not add the new row you suggested. :(\n\n' +
        'These values were invalid:\n' +
        (!isNameValid(name) ? '- name: ' + name + '\n' : '') +
        (!isEmailValid(email) ? '- e-mail address: ' + email + '\n' : '') +
        (!isPhoneValid(phone) ? '- phone number: ' + phone : '')

      alert(alertText)
    }
  }

  render() {
    const {name, email, phone} = this.state

    return (
      <div className="addnew_form">
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
          <input type="submit" value="Add new" onClick={this.handleSave} />
        </div>
      </div>
    )
  }
}

export default AddNew
