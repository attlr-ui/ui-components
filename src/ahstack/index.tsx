/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React from 'react'
import { FlexStyle, View, ViewProps } from 'react-native'

interface AhStackProps extends Omit<ViewProps, 'style[`flexDirection`]'> {
  gap?: number
  width?: number
  height?: number
  flex?: number
  padding?: number
  margin?: number
  mt?: number
  mb?: number
  ml?: number
  mr?: number
  pt?: number
  pb?: number
  pl?: number
  pr?: number
  bg?: string
  /**
   * @default 'flex-start'
   */
  justifyContent?: FlexStyle['justifyContent']
  alignItems?: FlexStyle['alignItems']
  alignSelf?: FlexStyle['alignSelf']
  flexWrap?: FlexStyle['flexWrap']
  flexBasis?: FlexStyle['flexBasis']
  flexShrink?: FlexStyle['flexShrink']
  flexGrow?: FlexStyle['flexGrow']
  /**
   * borderRadius
   *  @default 6
   **/
  br?: number
}

const AhStack = (props: AhStackProps): React.JSX.Element => {
  return (
    <View
      {...props}
      style={[
        {
          flex: props.flex,
          width: props.width,
          height: props.height,
          padding: props.padding,
          margin: props.margin,
          gap: props.gap,
          marginTop: props.mt,
          marginBottom: props.mb,
          marginLeft: props.ml,
          marginRight: props.mr,
          paddingTop: props.pt,
          paddingBottom: props.pb,
          paddingLeft: props.pl,
          paddingRight: props.pr,
          backgroundColor: props.bg,
          justifyContent: props.justifyContent,
          alignItems: props.alignItems,
          alignSelf: props.alignSelf,
          borderRadius: 6,
        },
        props.style,
        {
          flexDirection: 'row',
          flexWrap: props.flexWrap,
          flexBasis: props.flexBasis,
          flexShrink: props.flexShrink,
          flexGrow: props.flexGrow,
        },
      ]}>
      {props.children}
    </View>
  )
}

AhStack.name = 'AhStack'
export { AhStack, AhStackProps }
