import React, { Component } from 'react'

class FoodItem extends Component {

  getPara = props => {
    if (props.item !== undefined && props.item !== null) {
      return <p>{props.paraStart}{props.item}{props.paraEnd}</p>
    }
    return undefined
  }

  getVeganValue = isVegan => {
    if (isVegan === undefined || isVegan === null) {
      return 'Unknown'
    } else {
      return isVegan ? 'Yes' : 'No'
    }
  }

  render() {
    return (
      <div className="section background-gray">
        <div className="divider"></div>
        <div className="left-align">
          <h5>{this.props.food.name}</h5>
        </div>
        <div>
          <div className="col m3">
            <p className="left-align">{this.props.food.description}</p>
          </div>
          <div className="col m9">
            {this.getPara({
              item: this.props.food.cost,
              paraStart: 'Cost: £',
              paraEnd: ''
            })}
            {this.getPara({
              item: this.props.food.calories,
              paraStart: 'Calories: ',
              paraEnd: ' KCal'
            })}
            {this.getPara({
              item: this.props.food.protein,
              paraStart: 'Protein: ',
              paraEnd: ' grams'
            })}
            {this.getPara({
              item: this.getVeganValue(this.props.food.vegan),
              paraStart: 'Vegan?: ',
              paraEnd: ''
            })}
            {this.getPara({
              item: this.props.food.createdBy.name,
              paraStart: 'Created By: ',
              paraEnd: ''
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default FoodItem