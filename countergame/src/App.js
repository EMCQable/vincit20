import React from 'react';
import './App.css';
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    let localPoints = Number(window.localStorage.getItem('points'))
    if (localPoints === null) {
      localPoints = 20
    }
    super(props);
    this.state = {
      points: localPoints
    };
  }

  gamble = async (points) => {
    const pointObject = {
      points
    }
    let newPoints = await axios.post('/', pointObject)
    newPoints = newPoints.data
    return newPoints
  }

  hasPoints = () => {
    return (
      <p>
        Push the button to gamble for points. You currently have {this.state.points} points.
      </p>
    )
  }

  noPoints = () => {
    return (
      <p>
        You currently have {this.state.points} points. Push the button if you wish to restart.
      </p>
    )
  }

  untilNext = () => {
    return (
      <p>
        Someone has to press the button {this.state.untilNextReward} times until the next reward is given.
      </p>
    )
  }

  text = () => {
    if (this.state.points === 0) {
      return (this.noPoints())
    } else {
      return (this.hasPoints())
    }
  }

  handlePress = () => async () => {
    const added = await this.gamble(this.state.points)
    this.setState({
      points: added.points,
      untilNextReward: added.untilNextReward
    })
    window.localStorage.setItem('points', this.state.points)
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <button onClick={this.handlePress()} alt="logo" >
            PUSH ME
          </button>
          {this.text()}
          {this.state.untilNextReward && !(this.state.points === 0) && this.untilNext()}
        </header>
      </div>
    );
  }
}

export default App;
