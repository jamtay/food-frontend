import React, { Component } from 'react'

class Link extends Component {
  render() {
    return (
      <div className="flex mt2 items-start">
        <div className="flex items-center">
        </div>
        <div className="ml1">
          <div>
            {this.props.food.name} ({this.props.food.description})
          </div>
        </div>
      </div>
    )
  }
}

export default Link