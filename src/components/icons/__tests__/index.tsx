import React from 'react'
import { render } from 'react-testing-library'
import * as components from '../'

describe('Icon Components', () => {
  for (let [name, component] of Object.entries(components)) {
    describe(name, () => {
      test('should render without errors', () => {
        const Component = component
        const { container } = render(<Component />)
        expect(container.firstChild).toContainHTML('svg')
      })
    })
  }
})
