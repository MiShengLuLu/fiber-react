import React, { render, Component } from './react'

const root = document.getElementById('root')

const JSX = (
  <div>
    <p>React Fiber</p>
    <p>Hi Fiber</p>
  </div>
)
// render(JSX, root)

class Greating extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        { this.props.title } Fiber React
      </div>
    )
  }
}
render(<Greating title="Hello" />, root)

function Heart (props) {
  return (
    <div>
      &hearts;
      <br />
      { props.title }
    </div>
  )
}
// render(<Heart title="Hello Fiber React" />, root)
