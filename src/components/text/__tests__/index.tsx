import React from 'react'
import { render } from 'react-testing-library'
import * as components from '../'

describe('Text Components', () => {
  for (let [name, component] of Object.entries(components)) {
    describe(name, () => {
      test('should render without errors', () => {
        const Component = component
        const { container } = render(<Component>Test</Component>)
        expect(container).toHaveTextContent(/test/i)
      })
    })
  }
})
