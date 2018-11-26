import React from 'react'
import { storiesOf } from '@storybook/react'
import { Button } from '../components/forms/ui/Button'
import { Footnote } from '../components/forms/ui/Footnote'
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs'

const stories = storiesOf('UI', module)

stories.addDecorator(withKnobs)

stories
  .add('Button', () => <Button>{text('Label', 'Hello Storybook')}</Button>)
  .add('Footnote', () => <Footnote>Footnote text</Footnote>)
