import React from 'react'
import { storiesOf } from '@storybook/react'
import { Add } from '../components/icons/Add'
import { Arrow } from '../components/icons/Arrow'
import { CheckBox } from '../components/icons/CheckBox'
import { CheckMark } from '../components/icons/CheckMark'
import { CircleCheck } from '../components/icons/CircleCheck'
import { Lock } from '../components/icons/Lock'
import { Logo } from '../components/icons/Logo'
import { Mail } from '../components/icons/Mail'
import { Ocular0 } from '../components/icons/Ocular0'
import { Remove } from '../components/icons/Remove'
import { VrGuy } from '../components/icons/VrGuy'

storiesOf('Icons', module)
  .add('Add', () => <Add />)
  .add('Arrow', () => <Arrow />)
  .add('CheckBox', () => <CheckBox />)
  .add('CheckMark', () => <CheckMark />)
  .add('CircleCheck', () => <CircleCheck />)
  .add('Lock', () => <Lock />)
  .add('Logo', () => <Logo />)
  .add('Mail', () => <Mail />)
  .add('Ocular0', () => <Ocular0 />)
  .add('Remove', () => <Remove />)
  .add('VRGuy', () => <VrGuy />)
