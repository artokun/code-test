import React from 'react'
import { storiesOf } from '@storybook/react'
import { VrGuy } from '../components/icons/VrGuy'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome />)
storiesOf('Icons', module).add('VRGuy', () => <VrGuy />)

const Welcome = () => {
  return <div>Welcome</div>
}
