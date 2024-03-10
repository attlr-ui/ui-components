import React from 'react'
import { View, type ViewProps } from 'react-native'

interface ACenterProps extends ViewProps {
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
  /**
   *  Center the children vertically
   * @default true
   **/
  vertical?: boolean
  /**
   *  Center the children horizontally
   * @default true
   **/
  horizontal?: boolean
}

/**
 * ACenter is a layout component that centers its children vertically and horizontally by default.
 * It is a wrapper around the View component and accepts all the props that a View component would accept.
 *
 * @example
 * <ACenter>
 *  <Text>Centered</Text>
 * </ACenter>
 * */

const ACenter: React.FC<ACenterProps> = (props): React.JSX.Element => {
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
    vertical = true,
    horizontal = true,
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
        style,
        {
          justifyContent: vertical ? 'center' : 'flex-start',
          alignItems: horizontal ? 'center' : 'flex-start'
        }
      ]}>
      {props.children}
    </View>
  )
}

export { ACenter, type ACenterProps }
