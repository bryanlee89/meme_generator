import React, { Component } from 'react';
import { connect } from 'react-redux';
import  "../styles/index.css";
import MemeItem from './MemeItem';
import MyMemes from './MyMemes'
import { Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class App extends Component {
  constructor(){
    super();

    this.state = {
      memeLimit: 10,
      text0: '',
      text1: ''
    }
  }

  moreMemes(){
    this.setState({memeLimit: this.state.memeLimit+10})
  }

  render() {
    return (
      <div>
        <h2><u>Welcome to the Meme Generator!</u></h2>
        <br></br>
        <MyMemes />
        <h4><i>1. Write some text</i></h4>
        <h4><i>2. Click one of the memes below</i></h4>
        <br></br>
        <Form inline>
          <FormGroup>
            <ControlLabel>Top</ControlLabel>
            <FormControl
              type="text"
              onChange={event => this.setState({text0: event.target.value})}
            >
            </FormControl>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Bottom</ControlLabel>
            <FormControl
              type="text"
              onChange={event => this.setState({text1: event.target.value})}
            >
            </FormControl>
          </FormGroup>
        </Form>


        {
          this.props.memes.slice(0, this.state.memeLimit).map((meme, index) => {
            return (
              <MemeItem
                key={index}
                meme={meme}
                text0={this.state.text0}
                text1={this.state.text1}
              />
            )
          })
        }
        <div className="meme-button" onClick={() => {
            this.setState({memeLimit: this.state.memeLimit+10})
          }}>Load 10 more memes...</div>

      </div>
    )
  }
}

function mapStateToProps(state){
  return state
}

export default connect(mapStateToProps, null)(App);
