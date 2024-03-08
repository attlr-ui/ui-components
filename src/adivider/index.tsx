import React from 'react'
import { View, StyleSheet, type StyleProp, ViewStyle } from 'react-native'

interface ADividerProps {
  //   size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * The border radius of the divider corners
   * @default 'xs'
   **/
  borderRadius?: 'xs' | 'sm' | 'md' | 'lg' | 'full'
  /**
   * The background color of the divider
   * @default '#D4D4D8'
   **/
  bg?: string
  /**
   * The thickness of the divider line
   * @default 1
   **/
  thickness?: number
  /**
   * Custom styles to be applied if supplied as an object
   * @default undefined
   * @type StyleProp<ViewStyle>
   **/
  style?: StyleProp<ViewStyle>
  /**
   * If true, the divider will be vertical
   * @default false
   **/
  vertical?: boolean
}

/**
 *  A thin line that separates content in a layout
 * @param props ADividerProps
 * @returns React.JSX.Element
 * @example
 * <ADivider
 *    vertical
 *    borderWidth={10}
 *    borderRadius='xs'
 *    borderColor='pink'
 *    size='sm'
 *    bg='red'
 * />
 * @link see more here https://docs.attlr-ui.org.za/components/adivider
 **/
const ADivider = (props: ADividerProps): React.JSX.Element => {
  const {
    //   size = 'md',
    borderRadius = 'xs',
    bg = '#D4D4D8',
    thickness = 1,
    style,
    vertical = false,
  } = props

  return (
    <View
      aria-label="Divider"
      accessibilityLabel="Divider"
      style={[
        vertical ? styles.verticalDivider : styles.horizontalDivider,
        {
          borderColor: bg,
          borderWidth: thickness,
          borderRadius:
            borderRadius === 'full' ? 9999 : borderRadius === 'md' ? 8 : 4,
        },
        // styles[size],
        style,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  horizontalDivider: {
    width: '100%',
    height: 1,
  },
  verticalDivider: {
    height: '100%',
    width: 1,
  },
  // size
  // xs: {
  //     width: '100%',
  //     height: 1,
  // },
  // sm: {
  //     width: '100%',
  //     height: 2,
  // },
  // md: {
  //     width: '100%',
  //     height: 4,
  // },
  // lg: {
  //     width: '100%',
  //     height: 8,
  // },
  // xl: {
  //     width: '100%',
  //     height: 16,
  // }
})

export { ADivider, type ADividerProps }
