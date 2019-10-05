import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { AUTH_TOKEN } from '../constants'

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN)
    return (
      <div className="flex padded-red-header justify-between nowrap white-text">
        <div className="flex flex-fixed">
          <div className="fw7 mr1">James - Food App</div>
          <Link to="/" className="ml1 underline white-text">
            All food
          </Link>
          {authToken && (
            <div className="flex">
              <div className="ml1">|</div>
              <Link to="/my-foods" className="ml1 underline white-text">
                My food
              </Link>
            </div>
          )}
          {authToken && (
            <div className="flex">
              <div className="ml1">|</div>
              <Link to="/create" className="ml1 underline white-text">
                Create
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-fixed">
          {authToken ? (
            <div
              className="underline white-text ml1 pointer"
              onClick={() => {
                localStorage.removeItem(AUTH_TOKEN)
                this.props.history.push(`/`)
              }}
            >
              logout
            </div>
          ) : (
            <Link to="/login" className="ml1 underline white-text">
              login
            </Link>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(Header)