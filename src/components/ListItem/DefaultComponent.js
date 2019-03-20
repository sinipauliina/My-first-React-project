import React from 'react'
import './listitem.css'
import uuidv4 from 'uuid/v4'

class DefaultComponent extends React.Component {
  render() {
    const {participant, deleteRow, changeEditMode} = this.props

    return (
      <div className="table_row" key={uuidv4()}>
        <div>
          <div id="item_name">{participant.name}</div>
          <div id="item_email">{participant.email}</div>
          <div id="item_phone">{participant.phone}</div>
        </div>
        <div className="icons">
          <span className="icon-edit fas fa-pen" onClick={changeEditMode} />
          <span
            className="icon-trash fas fa-trash"
            onClick={() => deleteRow(participant.id)}
          />
        </div>
      </div>
    )
  }
}

export default DefaultComponent
