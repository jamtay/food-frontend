import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { ALL_FOOD_QUERY } from './FoodsList'
import gql from 'graphql-tag'

const CREATE_FOOD_ITEM = gql`
    mutation CreateFoodItem(
        $description: String!, $name: String!,
        $cost: Float!, $calories: Int!, $protein: Int!
    ) {
        createFoodItem(
            description: $description, name: $name,
            cost: $cost, calories: $calories, protein: $protein
        ) {
            id
            name
            description
            cost
            calories
            protein
        }
    }
`
class CreateFood extends Component {
  state = {
    description: '',
    name: '',
    cost: '',
    calories: '',
    protein: ''
  }

  render() {
    const { description, name, cost, calories, protein } = this.state
    return (
      <div>
        <h2>Create Food Item</h2>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={name}
            onChange={e => this.setState({name: e.target.value })}
            type="text"
            placeholder="The name of the food"
          />
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({description: e.target.value })}
            type="text"
            placeholder="A description of the food"
          />
          <input
            className="cost"
            value={cost}
            onChange={e => this.setState({cost:
              parseFloat(e.target.value)
            })}
            type="number"
            placeholder="The cost of the food"
          />
          <input
            className="calories"
            value={calories}
            onChange={e => this.setState({calories:
              parseInt(e.target.value)
            })}
            type="number"
            placeholder="The calories of the food"
          />
          <input
            className="protein"
            value={protein}
            onChange={e => this.setState({protein:
              parseInt(e.target.value)
            })}
            type="number"
            placeholder="The protein of the food"
          />
        </div>
        <Mutation
          mutation={CREATE_FOOD_ITEM}
          variables={{ name, description, cost, calories, protein}}
          onCompleted={() => this.props.history.push('/foods')}
          update={(store, { data: { createFoodItem } }) => {
            const data = store.readQuery({
              query: ALL_FOOD_QUERY
            })
            data.allFoods.unshift(createFoodItem)
            store.writeQuery({
              query: ALL_FOOD_QUERY,
              data
            })
          }}
        >
          {postMutation =>
            <div className="left-align">
              <button
                className="btn waves-effect waves-light submit-button" type="submit"
                name="action"
                onClick={postMutation}
              >Submit
                <i className="material-icons right">send</i>
              </button>
            </div>
          }
        </Mutation>
      </div>
    )
  }
}

export default CreateFood