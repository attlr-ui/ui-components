/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { forwardRef, useState } from 'react'

import type { StyleProp, ViewStyle, TextInputProps } from 'react-native'

import { Text, StyleSheet, Dimensions, View, TextInput } from 'react-native'

interface AInputProps {
  /**
   *  Icon to be displayed on the left side of the input
   **/
  iconLeft?: JSX.Element
  /**
   *  Icon to be displayed on the right side of the input
   **/
  iconRight?: JSX.Element
  /**
   *  Variant of the input
   * - default: default input
   * - underline: input with underline
   **/
  variant?: 'default' | 'underline'
  /**
   *  Size of the input
   * - sm: small
   * - md: medium
   * - lg: large
   * - full: full width
   **/
  size?: 'sm' | 'md' | 'lg' | 'full'
  /**
   *  Style of the icon on the left side of the input
   **/
  leftIconStyle?: StyleProp<ViewStyle>
  /**
   *  Style of the icon on the right side of the input
   **/
  rightIconStyle?: StyleProp<ViewStyle>
  /**
   *  Style of the label of the input
   **/
  labelStyle?: StyleProp<ViewStyle>
  /**
   *  The text to be displayed as the label of the input
   **/
  label?: string
  /**
   *  Style of the input container
   **/
  containerStyle?: StyleProp<ViewStyle>
  /**
   *  Style of the input element
   **/
  inputContainerStyle?: StyleProp<ViewStyle>
  /**
   *  Style of the icons of the input (both left and right)
   **/
  iconStyle?: StyleProp<ViewStyle>
}

const AInput: React.ForwardRefExoticComponent<
  AInputProps & TextInputProps & React.RefAttributes<TextInput>
> = forwardRef<TextInput, AInputProps & TextInputProps>((props, ref) => {
  const {
    variant = 'default',
    style,
    label,
    labelStyle,
    containerStyle,
    ...otherProps
  } = props
  const [isFocused, setIsFocused] = useState(false)
  return (
    <View
      style={[
        containerStyles.base,
        { borderColor: isFocused ? '#18181B' : '#A1A1AA' },
        containerStyle,
      ]}>
      {label && <Text style={[labelStyles.base, labelStyle]}>{label}</Text>}

      <View
        accessibilityLabel="text-input"
        accessibilityHint="Keyboard will be displayed when you tap here"
        style={[
          inputContainerStyles.base,
          containerStyles[props.size ?? 'md'],
          variant === 'underline' && inputContainerStyles.underline,
          isFocused &&
            inputStyle[
              `${variant}-underline` as
                | 'focused-underline'
                | 'default-underline'
            ],
          otherProps.inputContainerStyle,
        ]}>
        {props.iconLeft && (
          <View style={[iconStyles.base, props.iconStyle, props.leftIconStyle]}>
            {props.iconLeft}
          </View>
        )}

        <TextInput
          ref={ref}
          {...otherProps}
          style={[inputStyle.base, inputStyle[props.size ?? 'md'], style]}
          onFocus={(e) => {
            setIsFocused(true)
            otherProps.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            otherProps.onFocus?.(e)
          }}
        />

        {props.iconRight && (
          <View
            style={[iconStyles.base, props.iconStyle, props.rightIconStyle]}>
            {props.iconRight}
          </View>
        )}
      </View>
    </View>
  )
})

const inputStyle = StyleSheet.create({
  base: {
    flex: 1,
    minHeight: 40,
    fontSize: 18,
  },
  // size styles here
  sm: {
    padding: 6,
  },
  md: {
    padding: 7.5,
  },
  lg: {
    padding: 8,
  },
  full: {
    padding: 10,
  },
  // Focus variant styles here
  'focused-underline': {
    borderBottomColor: '#18181B',
    borderBottomWidth: 1.5,
  },
  'default-underline': {
    borderColor: '#18181B',
    borderWidth: 1.5,
  },
})

const iconStyles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
})

const containerStyles = StyleSheet.create({
  base: {
    flexDirection: 'column',
    minWidth: 100,
    gap: 2,
  },
  // size styles here
  sm: {
    width: Dimensions.get('window').width * 0.2,
  },
  md: {
    width: Dimensions.get('window').width * 0.5,
  },
  lg: {
    width: Dimensions.get('window').width * 0.8,
  },
  full: {
    width: Dimensions.get('window').width,
  },
})

const inputContainerStyles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#A1A1AA',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    backgroundColor: 'transparent',
  },
  underline: {
    borderWidth: 0,
    borderBottomWidth: 1,
  },
})

const labelStyles = StyleSheet.create({
  base: {
    fontSize: 18,
    color: '#18181B',
    fontWeight: '600',
  },
})

AInput.displayName = 'AInput'

export { AInput, type AInputProps }
