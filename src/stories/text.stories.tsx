import React from 'react'
import { storiesOf } from '@storybook/react'
import { Label } from '../components/text/Label'
import { Paragraph } from '../components/text/Paragraph'
import { SubTitle } from '../components/text/SubTitle'
import { Title } from '../components/text/Title'

storiesOf('Text', module)
  .add('Label', () => <Label>Label</Label>)
  .add('Paragraph', () => <Paragraph>Paragraph</Paragraph>)
  .add('SubTitle', () => <SubTitle>SubTitle</SubTitle>)
  .add('Title', () => <Title>Title</Title>)
