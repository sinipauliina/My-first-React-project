import React from 'react'
import ListItem from '../ListItem/ListItem'
import './list.css'

const headerKeys = {
  email: 'email',
  phone: 'phone',
  name: 'name',
}

class List extends React.Component {
  state = {
    sortKey: headerKeys.name,
  }

  handleSort = e => {
    this.setState({
      sortKey: e.target.id,
    })
  }

  render() {
    const {participants, editRow, deleteRow} = this.props
    const {sortKey} = this.state
    const sortedParticipants = [...participants].sort((a, b) =>
      a[sortKey].localeCompare(b[sortKey])
    )

    return (
      <div className="table">
        <div className="table_header">
          <div>
            <div id={headerKeys.name} onClick={this.handleSort}>
              Name{' '}
              <span
                className={
                  sortKey === headerKeys.name ? 'arrow-on' : 'arrow-off'
                }
              >
                &darr;
              </span>
            </div>
            <div id="email" onClick={this.handleSort}>
              E-mail address{' '}
              <span
                className={
                  sortKey === headerKeys.email ? 'arrow-on' : 'arrow-off'
                }
              >
                &darr;
              </span>
            </div>
            <div id="phone" onClick={this.handleSort}>
              Phone number{' '}
              <span
                className={
                  sortKey === headerKeys.phone ? 'arrow-on' : 'arrow-off'
                }
              >
                &darr;
              </span>
            </div>
          </div>
          <div />
        </div>
        {sortedParticipants.map(x => (
          <ListItem
            key={x.id}
            participant={x}
            editRow={editRow}
            deleteRow={deleteRow}
          />
        ))}
      </div>
    )
  }
}

export default List
