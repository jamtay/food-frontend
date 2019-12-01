import React, { Component } from 'react'
import { CollapsibleItem } from 'react-materialize'
import { Mutation } from 'react-apollo'
import { Link } from 'react-router-dom'
import { ALL_FOOD_QUERY } from './FoodsList'
import gql from 'graphql-tag'

const DELETE_MUTATION = gql`
    mutation DeleteFoodItem(
        $id: ID!
    ) {
        deleteFoodItem(
            id: $id
        ) {
            id
            name
            description
            cost
            calories
            protein
            vegan
        }
    }
`


class FoodItem extends Component {

  state = {
    id: this.props.food.id
  }

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

  getRedirectLink = () => {
    return this.props.listType === 'ALL' ? '/all-foods' : '/my-foods'
  }

  render() {
    const { id } = this.state
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

              {/*TODO: Only display delete button if belongs to user*/}
              <Mutation
                mutation={DELETE_MUTATION}
                variables={{id}}
                onCompleted={() => this.props.history.push(this.getRedirectLink())}
                onError={error => {
                  if (error.graphQLErrors) {
                    // TODO: Check it is not possible to delete and then show error
                  }
                  console.log(error)
                }}
                update={(store, { data: { deleteFoodItem } }) => {
                  // TODO find out what to do here to make it delete
                  // const data = store.readQuery({
                  //   query: ALL_FOOD_QUERY
                  // })
                  // data.allFoods.unshift(createFoodItem)
                  // store.writeQuery({
                  //   query: ALL_FOOD_QUERY,
                  //   data
                  // })
                }}
              >
                {postMutation =>
                  <div>
                    <Link to={this.getRedirectLink()} onClick={postMutation}>
                      <a className="btn-floating btn-small waves-effect waves-light red">
                        <i className="material-icons">delete_outline</i>
                      </a>
                    </Link>
                  </div>
                }
              </Mutation>
            </div>
          </div>
      </CollapsibleItem>
    )
  }
}

export default FoodItem