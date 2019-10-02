import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { ALL_FOOD_QUERY } from './FoodsList'
import gql from 'graphql-tag'

const CREATE_FOOD_ITEM = gql`
    mutation CreateFoodItem($description: String!, $name: String!) {
        createFoodItem(description: $description, name: $name) {
            id
            name
            description
        }
    }
`
class CreateFood extends Component {
  state = {
    description: '',
    name: ''
  }

  render() {
    const { description, name } = this.state
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={description}
            onChange={e => this.setState({description: e.target.value })}
            type="text"
            placeholder="A description of the food"
          />
          <input
            className="mb2"
            value={name}
            onChange={e => this.setState({name: e.target.value })}
            type="text"
            placeholder="The name of the food"
          />
        </div>
        <Mutation
          mutation={CREATE_FOOD_ITEM}
          variables={{ description, name }}
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
          {postMutation => <button onClick={postMutation}>Create</button>}
        </Mutation>
      </div>
    )
  }
}

export default CreateFood