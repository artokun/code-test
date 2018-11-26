import React, { Component } from 'react'
import styled from 'styled-components'
import * as am4core from '@amcharts/amcharts4/core'
import * as am4charts from '@amcharts/amcharts4/charts'
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
import { Ocular2 } from '../icons'
import exportIcon from '../../assets/export.svg'
import { mobile } from '../../styles/media'

am4core.useTheme(am4themes_animated)

interface IBossChartProps {
  boss: {
    name: string
    img: string
  }
}

class BossChart extends Component<IBossChartProps> {
  chart: any

  componentDidMount() {
    let chart = am4core.create('chartdiv', am4charts.PieChart)
    let series = chart.series.push(new am4charts.PieSeries())
    let shadow = series.slices.template.filters.push(
      new am4core.DropShadowFilter()
    )
    let gradient = new am4core.LinearGradient()
    let fillModifier = new am4core.LinearGradientModifier()
    gradient.addColor(am4core.color('#F0B35D'))
    gradient.addColor(am4core.color('#BE681E'))
    fillModifier.gradient = gradient

    shadow.width = 150
    shadow.height = 150
    shadow.dx = 5
    shadow.dy = 5
    shadow.blur = 10

    chart.data = playerData.reverse()
    // chart.startAngle = 0
    // chart.endAngle = 0
    chart.hiddenState.properties.endAngle = 180
    chart.hiddenState.properties.opacity = 0

    series.labels.template.html =
      '<div class="label"><span class="label-1">{value.value}%</span><span class="label-2">{category}</span></div>'
    // '<div class="label"><span class="pie" style="transform: rotateZ({deg}deg)"/></span><span class="label-1">{value.value}%</span><span class="label-2">{category}</span></div>'
    series.dataFields.value = 'value'
    series.dataFields.radiusValue = 'radius'
    series.dataFields.category = 'player'
    series.slices.template.cornerRadius = 0
    series.slices.template.tooltipText = ''
    series.slices.template.stroke = am4core.color('#F7961B')
    series.ticks.template.stroke = am4core.color('#ffffff')
    series.ticks.template.strokeWidth = 2
    series.colors.list = [
      am4core.color('#996130'),
      am4core.color('#9e6532'),
      am4core.color('#af713a'),
      am4core.color('#c78144'),
      am4core.color('#d68c4c'),
      am4core.color('#db904f')
    ]

    this.chart = chart
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose()
    }
  }

  render() {
    const { img, name } = this.props.boss
    return (
      <BossChartWrapper>
        <Ocular2 className="ocular2" />
        <div className="title">
          <span>Damage Score</span>
          {/* <img src={exportIcon} alt="export" /> */}
        </div>
        <PieChart id="chartdiv" />
        <img className="boss" src={img} alt={name} />
      </BossChartWrapper>
    )
  }
}

const BossChartWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  position: relative;

  .title {
    top: -10px;
    display: flex;
    align-items: center;
    position: absolute;
    color: #a8b2ce;
    font-weight: regular;
    font-size: 12px;
    font-family: Eina03;
    text-transform: uppercase;
    letter-spacing: 2.77px;

    /* span {
      margin-right: 15px;
    }

    img {
      height: 21px;
      position: relative;
      top: -2px;
    } */
  }

  .ocular2 {
    position: absolute;
    opacity: 0.1;
  }

  .label {
    display: flex;
    flex-direction: column;
    /* padding-left: 50px; */

    &-1 {
      color: #ffffff;
      font-size: 20px;
      font-family: Eina03;
      font-weight: bold;
      letter-spacing: 0;
    }
    &-2 {
      color: #a8b2ce;
      font-size: 12px;
      font-family: Eina03;
      text-transform: uppercase;
      letter-spacing: 2.77px;
    }
    /* .pie {
      display: inline-block;
      position: absolute;
      left: 0;
      height: 35px;
      width: 35px;
      border-radius: 50%;
      border: 1px solid #f7961b;
      overflow: hidden;

      &:after {
        content: '';
        display: inline-block;
        position: absolute;
        left: 50%;
        bottom: 50%;
        opacity: 0.8;
        height: 35px;
        width: 35px;
        background: linear-gradient(-225deg, #f0b35d 0%, #be681e 100%);
      }
    } */
  }

  .boss {
    position: absolute;
    height: 40%;
    filter: drop-shadow(0px 21px 24px rgba(0, 0, 0, 0.5));
  }

  @media ${mobile} {
    display: none;
  }
`

const PieChart = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`

const playerData = [
  {
    player: 'Eric Hoffman',
    value: 22,
    radius: 85,
    deg: 265
  },
  {
    player: 'Kiel Cummings',
    value: 16,
    radius: 80,
    deg: 205
  },
  {
    player: 'Siqi Chen',
    value: 13,
    radius: 75,
    deg: 135
  },
  {
    player: 'Dominic Damian',
    value: 13,
    radius: 70,
    deg: 85
  },
  {
    player: 'Brian Jowers',
    value: 12,
    radius: 65,
    deg: 15
  },
  {
    player: 'Arthur Longbottom',
    value: 10,
    radius: 60,
    deg: -15
  }
]

export { BossChart }
