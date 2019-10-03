import React, { Component } from 'react'

class FoodItem extends Component {

  getPara = props => {
    if (props.item !== undefined && props.item !== null) {
      return <p>{props.paraStart}{props.item}{props.paraEnd}</p>
    }
    return undefined
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
              item: 'No',
              paraStart: 'Vegan?: ',
              paraEnd: ''
            })}
            {this.getPara({
              item: 'London',
              paraStart: 'Location: ',
              paraEnd: ''
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default FoodItem