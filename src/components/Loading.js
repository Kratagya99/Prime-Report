import React, { Component } from 'react'
import spinner from './Book.gif'
export default class Loading extends Component {
  render() {
    return (
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '70vh',   // takes most of the screen height
          width: '100%'
        }}
      >
        <img src={spinner} alt='spinner'/>
      </div>
    )
  }
}
