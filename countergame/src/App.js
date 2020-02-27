import React from 'react';
import './App.css';
import axios from 'axios'


class App extends React.Component {
  constructor(props) {
    var localPoints = window.localStorage.getItem('points')
    if (localPoints === null){
      localPoints = 20
    }
    super(props);
    this.state = {
      points: localPoints
    };
  }

  gamble = async () => {
    var points = await axios.get('http://localhost:3001/')
    points = points.data
    return points
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
    if (this.state.points === 0) {
      this.setState({
        points: 20
      })
    } else {
      const added = await this.gamble()
      this.setState({
        points: (this.state.points - 1 + added.reward),
        untilNextReward: added.untilNextReward
      })
      window.localStorage.setItem('points', this.state.points)
    }
  }

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <button onClick={this.handlePress()} alt="logo" >
            PUSH ME
          </button>
          {this.text()}
          {this.state.untilNextReward && this.untilNext()}
        </header>
      </div>
    );
  }
}

export default App;
