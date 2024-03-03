/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { type JSX } from 'react'
import { View, StyleSheet, ViewStyle, FlexStyle } from 'react-native'
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient'

interface AContainerProps {
  /**
   * Color of the top of the container
   **/
  topColor: string
  bottomColor: string
  topColorWeight: 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7
  gap?: number
  style: ViewStyle
  children: JSX.Element | JSX.Element[]
  scale?: number
  /**
   *    Height of the container
   **/
  height: number
  radiusEffect:
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'top'
    | 'bottom'
    | 'all'

  /**
   *  Style of the linear gradient container
   **/
  linearGradientStyle?: ViewStyle
  /**
   *  Props of the linear gradient container
   **/
  linearGradientProps?: Omit<LinearGradientProps, 'style'>

  padding?: number
  /**
   *  Style of the content container
   **/
  contentContainerStyle?: ViewStyle
  /**
   *  Justify children in the container
   **/
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between'
  /**
   * Align children in the container
   * */

  alignItems?: 'center' | 'flex-start' | 'flex-end'
  /**
   * Flex direction of the container
   * */
  flexDirection?: 'row' | 'column'
  /**
   * Flex of the container
   * */
  flex?: number
}

const AContainer = (props: AContainerProps): JSX.Element => {
  const {
    children,
    topColor,
    bottomColor,
    topColorWeight,
    scale,
    style,
    height,
    padding,
    radiusEffect,
    linearGradientStyle,
    linearGradientProps,
    contentContainerStyle,
    justifyContent,
    alignItems,
    flexDirection,
    flex,
  } = props
  return (
    <View
      style={[
        {
          position: 'relative',
          backgroundColor: 'transparent',
          minHeight: height ?? 200,
          width: '100%',
        },
        style,
      ]}>
      <LinearGradient
        {...linearGradientProps}
        colors={
          linearGradientProps?.colors ?? [
            topColor ? topColor : '#269B71',
            bottomColor ? bottomColor : '#008069',
          ]
        }
        locations={linearGradientProps?.locations ?? [topColorWeight, 0.8]}
        style={[
          radiusStyles[radiusEffect ?? 'all'],
          {
            height: '100%',
            width: '100%',
            position: 'absolute',
            transform: [{ scale: scale ? scale : 1 }],
            ...linearGradientStyle,
          },
        ]}
      />

      <View
        style={[
          {
            position: 'absolute',
            height: '100%',
            width: '100%',
            justifyContent,
            alignItems,
            flexDirection,
            flex,
            padding: padding ? padding : 0,
          },
          contentContainerStyle,
        ]}>
        {children}
      </View>
    </View>
  )
}

const radiusStyles = StyleSheet.create<any>({
  topLeft: {
    borderTopLeftRadius: 200,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  topRight: {
    borderTopLeftRadius: 50,
    borderTopRightRadius: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bottomLeft: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 50,
  },
  bottomRight: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 200,
  },
  top: {
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  bottom: (height: number) => ({
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: height,
    borderBottomRightRadius: height,
  }),
  all: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
})

AContainer.name = 'AContainer'
export { AContainer, AContainerProps }
