import { render } from '@redwoodjs/testing/web'

import Lobby from './Lobby'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Lobby', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Lobby />)
    }).not.toThrow()
  })
})
