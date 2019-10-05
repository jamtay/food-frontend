import React, { Component, Fragment } from 'react'
import FoodItem from './FoodItem'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'

import { Collapsible } from 'react-materialize';

export const ALL_FOOD_QUERY = gql`
    query AllFoodQuery {
        allFoods {
            id
            name
            description
            createdBy {
                id
                name
            }
            calories
            protein
            cost
            vegan
        }
    }
`

const NEW_FOODS_SUBSCRIPTION = gql`
    subscription {
        foodSubscription {
            id
            name
            description
            createdBy {
                id
                name
            }
            calories
            protein
            cost
            vegan
        }
    }
`

class FoodsList extends Component {

  _subscribeToFoodSubscriptions = subscribeToMore => {
    subscribeToMore({
      document: NEW_FOODS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const foodSubscription = subscriptionData.data.foodSubscription

        const exists = prev.allFoods.find(({ id }) => id === foodSubscription.id)
        if (exists) return prev

        return Object.assign({}, prev, {
          allFoods: [foodSubscription, ...prev.allFoods]
        })
      }
    })
  }

  _getFoodsToRender = data => {
    return data.allFoods
  }

  render() {
    return (
      <Query query={ALL_FOOD_QUERY}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Fetching</div>
          if (error) {
            {error.graphQLErrors.map(({ message }, i) => (
              console.log(message)
            ))}
            return <div>${error.message}</div>
          }

          this._subscribeToFoodSubscriptions(subscribeToMore)

          const linksToRender = this._getFoodsToRender(data)

          return (
            <Fragment>
              <div className="row">
                <div className="text-header-top-margin col s6">
                  <h4 className="white-text left-align">Food Items</h4>
                </div>
                <div className="table-top-margin col s6 right-align">
                  <Link to="/create">
                    <a
                      className="btn-floating btn-large waves-effect waves-light red"><i
                      className="material-icons">add</i></a>
                  </Link>
                </div>
              </div>
              <div className="table-top-margin">
              <Collapsible popout>
                {linksToRender.map((food, index) => (
                  <FoodItem
                    key={food.id}
                    food={food}
                    index={index}
                  />
                ))}
              </Collapsible>
              </div>
            </Fragment>
          )
        }}
      </Query>
    )
  }
}

export default FoodsList