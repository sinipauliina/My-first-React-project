import React from 'react'
import './listitem.css'

class EditComponent extends React.Component {
  render() {
    const {
      name,
      email,
      phone,
      handleChange,
      handleCancel,
      handleSave,
    } = this.props

    return (
      <div className="edit_form">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            placeholder="E-mail address"
            value={email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone number"
            value={phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type="button" value="Cancel" onClick={handleCancel} />
          <input type="submit" value="Save" onClick={handleSave} />
        </div>
      </div>
    )
  }
}

export default EditComponent
