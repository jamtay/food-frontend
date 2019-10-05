import React, { Component } from 'react'
import { CollapsibleItem } from 'react-materialize'

class FoodItem extends Component {

  getPara = props => {
    if (props.item !== undefined && props.item !== null) {
      return <p>{props.paraStart}{props.item}{props.paraEnd}</p>
    }
    return undefined
  }

  getFoodCostPara = props => {
    if (props.item !== undefined && props.item !== null) {
      const formatter = new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GDP',
        minimumFractionDigits: 2
      })
      props.item = formatter.format(props.item).replace('GDP', '').replace(/\s/g, '')
      return this.getPara(props)
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
      <CollapsibleItem header={this.props.food.name}>
        <div className="white-text">
            <div className="col m3">
              <p className="left-align"><b>{this.props.food.description}</b></p>
            </div>
            <div className="col m9">
              {this.getFoodCostPara({
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
      </CollapsibleItem>
    )
  }
}

export default FoodItem