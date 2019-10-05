import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import { ALL_FOOD_QUERY } from './FoodsList'
import gql from 'graphql-tag'
import { messageMap } from '../errors/messages'
import { Link } from 'react-router-dom'

const CREATE_FOOD_ITEM = gql`
    mutation CreateFoodItem(
        $description: String!, $name: String!,
        $cost: Float, $calories: Int, $protein: Int, $vegan: Boolean
    ) {
        createFoodItem(
            description: $description, name: $name,
            cost: $cost, calories: $calories, protein: $protein, vegan: $vegan
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
class CreateFood extends Component {
  state = {
    errors: []
  }

  _isInvalid = (errors, field) => {
    return errors.filter(error => {
      return error.includes(field)
    }).length > 0 ? 'mb2 white-text invalid' : 'mb2 white-text'
  }


  _mapVeganOption = value => {
    if (value) {
      return value === 'Yes'
    }
  }

  render() {
    const { description, name, cost, calories, protein, errors, vegan } = this.state
    return (
      <div>
        <div className="row">
          <div className="text-header-top-margin col s6">
            <h4 className="white-text left-align">Create Food Item</h4>
          </div>
          <div className="table-top-margin col s6 right-align">
            <Link to="/all-foods">
              <a
                className="btn-floating btn-large waves-effect waves-light green"><i
                className="material-icons">search</i></a>
            </Link>
          </div>
        </div>
        <div className="flex flex-column mt3 white-text">
          <input
            className={this._isInvalid(errors, 'name')}
            value={name}
            onChange={e => this.setState({name: e.target.value })}
            type="text"
            placeholder="The name of the food"
          />
          <input
            className={this._isInvalid(errors, 'description')}
            value={description}
            onChange={e => this.setState({description: e.target.value })}
            type="text"
            placeholder="A description of the food"
          />
          <input
            className={this._isInvalid(errors, 'cost')}
            value={cost}
            onChange={e => this.setState({cost:
              parseFloat(e.target.value)
            })}
            type="number"
            placeholder="The cost of the food"
          />
          <input
            className={this._isInvalid(errors, 'calories')}
            value={calories}
            onChange={e => this.setState({calories:
              parseInt(e.target.value)
            })}
            type="number"
            placeholder="Food's calories"
          />
          <input
            className={this._isInvalid(errors, 'protein')}
            value={protein}
            onChange={e => this.setState({protein:
              parseInt(e.target.value)
            })}
            type="number"
            placeholder="Food's protein"
          />
          <div className="left-align">
            <label><b>Vegan?</b></label>
            <label className="green-text padded-radio">
              <input
                name="vegan"
                type="radio"
                value="Yes"
                onChange={e =>
                  this.setState({
                    vegan:
                      this._mapVeganOption(e.target.value)
                  })
                }
              />
              <span>Yes</span>
            </label>
            <label className="red-text padded-radio">
              <input
                name="vegan"
                type="radio"
                value="No"
                onChange={e =>
                  this.setState({vegan:
                      this._mapVeganOption(e.target.value)
                  })
                }
              />
              <span>No</span>
            </label>
          </div>
        </div>
        <pre>{errors.map((message, i) => (
           <p className="red-text left-align" key={i}><i className="tiny material-icons">error</i>{message}</p>
        ))}
      </pre>
        <pre className="left-align red-text">{errors.message}</pre>
        <Mutation
          mutation={CREATE_FOOD_ITEM}
          variables={{ name, description, cost, calories, protein, vegan }}
          onCompleted={() => this.props.history.push('/all-foods')}
          onError={error => {
            if (error.networkError) {
              let friendlyErrors = []
              error.networkError.result.errors.map(({ message }, i) => {
                friendlyErrors.push(messageMap[message])
              })
              this.setState({errors: friendlyErrors})
            }
          }}
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