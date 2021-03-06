import React from 'react'

import AddNew from '../AddNew/AddNew'
import List from '../List/List'

import './main.css'

import uuidv4 from 'uuid/v4'
import validator from 'validator'

class Main extends React.Component {
  state = {
    participants: [],
  }

  componentDidMount() {
    fetch('https://randomuser.me/api/?results=20&inc=name,email,phone')
      .then(response => response.json())
      .then(data => {
        const dataWithID = data.results.map((participant, i) => {
          return {
            ...participant,
            name: participant.name.first + ' ' + participant.name.last,
            phone: validator.whitelist(participant.phone, '0-9'),
            id: uuidv4(i),
          }
        })

        this.setState({participants: dataWithID})
      })
  }

  addRow = newParticipant => {
    const {participants} = this.state

    this.setState({participants: [...participants, newParticipant]})
  }

  editRow = editedParticipant => {
    const {participants} = this.state

    const index = participants.findIndex(x => x.id === editedParticipant.id)

    const editedParticipants = [...participants]
    editedParticipants.splice(index, 1, {
      name: editedParticipant.name,
      email: editedParticipant.email,
      phone: editedParticipant.phone,
    })

    this.setState({
      participants: editedParticipants,
    })
  }

  deleteRow = id => {
    const {participants} = this.state

    this.setState({
      participants: participants.filter(participant => participant.id !== id),
    })
  }

  render() {
    const {participants} = this.state

    return (
      <main>
        <div className="main_container">
          <h1>List of participants</h1>
          <AddNew addRow={this.addRow} />
          <List
            participants={participants}
            editRow={this.editRow}
            deleteRow={this.deleteRow}
          />
        </div>
      </main>
    )
  }
}

export default Main
