/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { FC, ReactNode, forwardRef } from 'react'

import {
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native'

import type {
  View,
  TextProps,
  StyleProp,
  ViewStyle,
  PressableProps,
} from 'react-native'

type AButtonProps = {
  /**
   *  Make the button an icon button (no text)
   **/
  icon?: boolean
  /**
   *  Icon to be displayed on the left side of the button
   **/
  iconLeft?: JSX.Element
  /**
   *  Icon to be displayed on the right side of the button
   **/
  iconRight?: JSX.Element
  /**
   *  Fill of the button
   * - solid: solid fill
   * - outline: outlined fill
   **/
  fill?: 'solid' | 'outline'
  /**
   *  Variant of the button
   * - default: default button
   * - danger: danger button
   * - ghost: ghost button
   **/
  variant?: 'default' | 'danger' | 'ghost' | 'outline'
  /**
   *  Loading state of the button
   **/
  loading?: boolean
  /**
   *  Size of the button
   * - sm: small
   * - md: medium
   * - lg: large
   * - full: full width
   **/
  size?: 'sm' | 'md' | 'lg' | 'full'
  /**
   *  Color of the loading indicator
   **/
  loadingColor?: string
  /**
   *  Size of the loading indicator
   * - small: small size
   * - large: large size
   **/
  loadSize?: 'small' | 'large'
  /**
   *  Custom loading indicator
   **/
  customLoadingIndicator?: JSX.Element
}

const AButton = forwardRef<View, PressableProps & AButtonProps>(
  (props, ref) => {
    const {
      children,
      icon,
      variant = 'default',
      loading,
      customLoadingIndicator,
      style,
      ...otherProps
    } = props

    return (
      <Pressable
        ref={ref}
        {...otherProps}
        style={({ pressed }): StyleProp<ViewStyle> =>
          [
            buttonStyles.base,
            buttonStyles[variant],
            buttonStyles[props.size ?? 'md'],
            buttonStyles[props.fill ?? 'solid'],
            // prettier-ignore
            (pressed || loading) ? { opacity: 0.8 } : {},
            style,
          ] as StyleProp<ViewStyle>
        }
        disabled={loading}>
        <>
          {!loading && props.iconLeft}
          {loading
            ? customLoadingIndicator ?? (
                <ActivityIndicator
                  size={props.loadSize ?? 'small'}
                  color={props.loadingColor ?? 'black'}
                />
              )
            : icon
            ? null
            : children}
          {!loading && props.iconRight}
        </>
      </Pressable>
    )
  }
)

type AButtonTextProps = {
  /**
   *  Variant of the button
   * - default: default button
   * - danger: danger button
   * - outline: outlined button
   * - ghost: ghost button
   **/
  variant?: 'default' | 'danger' | 'outline' | 'ghost'
  /**
   *  Size of the button
   * - sm: small
   * - md: medium
   * - lg: large
   * - full: full width
   **/
  size?: 'sm' | 'md' | 'lg' | 'full'
}

const AButtonText: FC<AButtonTextProps & TextProps> = (props) => {
  const { style, ...otherProps } = props
  return (
    <Text
      {...otherProps}
      style={[
        textStyles.base,
        textStyles[props.variant ?? 'default'],
        textStyles[props.size ?? 'md'],
        style,
      ]}
    />
  )
}

const buttonStyles = StyleSheet.create({
  // base styles here
  base: {
    minHeight: 40,
    minWidth: 100,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // variant styles here
  default: {
    backgroundColor: 'black',
  },
  danger: {
    backgroundColor: 'red',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  // Fill styles here
  solid: {
    backgroundColor: 'black',
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: 'black',
    borderWidth: 2,
  },
  // size styles here
  sm: {
    padding: 10,
    width: Dimensions.get('window').width * 0.2,
  },
  md: {
    padding: 10,
    width: Dimensions.get('window').width * 0.5,
  },
  lg: {
    padding: 11,
    width: Dimensions.get('window').width * 0.8,
  },
  full: {
    width: Dimensions.get('window').width,
    padding: 12,
  },
})

const textStyles = StyleSheet.create({
  // base styles here
  base: {
    fontSize: 16,
    fontWeight: '600',
  },
  // variant styles here
  default: {
    color: 'white',
  },
  danger: {
    color: 'white',
  },
  outline: {
    color: 'black',
  },
  ghost: {
    color: 'black',
  },
  // size styles here
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
  lg: {
    fontSize: 18,
  },
  full: {
    fontSize: 20,
  },
})

// Add displayName to help with debugging
AButton.displayName = 'AButton'
AButtonText.displayName = 'AButtonText'

export { AButton, AButtonText, AButtonProps, AButtonTextProps }
