import React from 'react'
import { View, type ViewProps } from 'react-native'

interface ABoxProps extends ViewProps {
  bg?: string
  border?: number
  radius?: number
  padding?: number
  margin?: number
  width?: number
  height?: number
  px?: number
  py?: number
  pt?: number
  pb?: number
  pl?: number
  pr?: number
  mx?: number
  my?: number
  mt?: number
  mb?: number
  ml?: number
  mr?: number
  elevation?: number
  shadowColor?: string
  shadowOffset?: {
    width: number
    height: number
  }
  shadowOpacity?: number
  shadowRadius?: number
}

const ABox: React.FC<ABoxProps> = (props): React.JSX.Element => {
  const {
    bg = 'transparent',
    border,
    radius,
    padding,
    margin,
    width,
    height,
    style,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    elevation = 0,
    shadowColor,
    shadowOffset,
    shadowOpacity,
    shadowRadius,
    ...rest
  } = props
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: bg,
          borderRadius: radius,
          borderWidth: border,
          padding,
          margin,
          width,
          height,
          shadowColor,
          shadowOpacity,
          shadowRadius,
          elevation,
          paddingBottom: pb,
          paddingLeft: pl,
          paddingRight: pr,
          paddingTop: pt,
          marginBottom: mb,
          marginLeft: ml,
          marginRight: mr,
          marginTop: mt,
          paddingVertical: py,
          marginVertical: my,
          paddingHorizontal: px,
          marginHorizontal: mx,
          shadowOffset
        },
        style
      ]}>
      {props.children}
    </View>
  )
}

export { ABox, type ABoxProps }
