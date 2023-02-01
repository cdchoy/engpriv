import React, { Component } from 'react'

interface ButtonProps {
  title: string
  queryCount: string
}

interface ButtonState {
}

export default class Button extends Component<{}, ButtonProps, ButtonState> {
  constructor (props: ButtonProps | Readonly<ButtonProps>) {
    super(props)
    this.state = {
      title: 'Enter Query Count Here',
      queryCount: ''
    }
    this.onClick = this.onClick.bind(this)
  }

  onClick (e: any) {
    console.log('here1')
    e.title = ('ahh')
    e.queryCount = document.getElementById('querycnt')
    console.log('here2')
  }

  render () {
    return (
      <div className='button'>
        <button>help</button>
      </div>
    )
  }
};
