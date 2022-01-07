import React from 'react'
import { graphql } from 'react-apollo'

import query from '../queries/CurrentUser'

class Header extends React.Component {

  renderButtons() {
    const { loading, user } = this.props.data

    if (loading) {
      return <div />
    }

    if (user) {
      return <div>logout</div>
    } else {
      return (
        <div>youre not signed in</div>
      )
    }

  }

  render() {

    return (
      <nav>
        <div className='nav-wrapper'>
          {this.renderButtons()}
        </div>
      </nav>
    )
  }
}

export default graphql(query)(Header)