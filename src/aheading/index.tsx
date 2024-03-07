import React from 'react'
import {
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  Text,
  TextProps,
} from 'react-native'

interface AHeadingProps {
  bold?: boolean
  /**
   * Used to make the text italic.
   * @default false
   * **/
  italic?: boolean
  /**
   * Used to make the text underline.
   * @default false
   * **/
  underline?: boolean
  /**
   * Used to highlight the text.
   * @default undefined
   * **/
  highlight?: string
  /**
   * A color to highlight the text.
   * @default "#09090B"
   * **/
  textColor?: 'primary' | 'secondary' | 'ghost' | string
  /**
   * Used to change the size of the text.
   * @default "md"
   * **/
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
  /**
   * Padding all around the text.
   **/
  p?: DimensionValue
  /**
   * Margin all around the text.
   **/
  m?: DimensionValue
  /**
   * Padding top.
   **/
  pt?: DimensionValue
  /**
   * Padding right.
   **/
  pr?: DimensionValue
  /**
   * Padding bottom.
   **/
  pb?: DimensionValue
  /**
   * Padding left.
   **/
  pl?: DimensionValue
  /**
   * Margin top.
   **/
  mt?: DimensionValue
  /**
   * Margin right.
   **/
  mr?: DimensionValue
  /**
   * Margin bottom.
   **/
  mb?: DimensionValue
  /**
   * Margin left.
   **/
  ml?: DimensionValue
  /**
   * Margin left and right.
   **/
  px?: DimensionValue
  /**
   * Margin top and bottom.
   **/
  py?: DimensionValue
  /**
   * Margin left and right.
   **/
  mx?: DimensionValue
  /**
   * Margin top and bottom.
   **/
  my?: DimensionValue
  /**
   * Border radius.
   **/
  borderRadius?: AnimatableNumericValue
  /**
   * Border width.
   **/
  borderWidth?: number
  /**
   * Border color.
   **/
  borderColor?: ColorValue
}

/**
 * AHeading is a component used to render a text with a heading style.
 * @example
 *    <AHeading
          textColor='primary'
          highlight="red"
          size='xl'
          underline
        >
          This is a heading</AHeading>
      </AvStack >
 **/
const AHeading: React.FC<AHeadingProps & TextProps> = ({
  children,
  ...props
}): React.JSX.Element => {
  const {
    bold,
    italic,
    underline,
    textColor,
    size,
    mt,
    mb,
    ml,
    mr,
    px,
    py,
    mx,
    my,
    p,
    m,
    pb,
    pl,
    pr,
    pt,
    borderRadius,
    borderWidth,
    borderColor,
    ...rest
  } = props

  return (
    <Text
      {...rest}
      accessibilityRole="text"
      style={[
        {
          color:
            textColor === 'primary'
              ? '#09090B'
              : textColor === 'secondary'
              ? '#fff'
              : textColor === 'ghost'
              ? '#D4D4D8'
              : textColor,
          fontSize: FontSize[size ?? 'xl'],
          fontWeight: bold === undefined || bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal',
          textDecorationLine: underline ? 'underline' : 'none',
          backgroundColor: props.highlight,
        },
        {
          marginTop: mt,
          marginBottom: mb,
          marginLeft: ml,
          marginRight: mr,
          paddingHorizontal: px,
          paddingVertical: py,
          marginHorizontal: mx,
          marginVertical: my,
          padding: p,
          margin: m,
          paddingBottom: pb,
          paddingLeft: pl,
          paddingRight: pr,
          paddingTop: pt,
          borderRadius,
          borderWidth,
          borderColor,
        },
        props.style,
      ]}>
      {children}
    </Text>
  )
}

const FontSize: { [key: string]: number } = {
  xs: 20,
  sm: 22,
  md: 24,
  lg: 26,
  xl: 28,
  '2xl': 30,
  '3xl': 32,
  '4xl': 36,
  '5xl': 48,
  '6xl': 64,
}

AHeading.displayName = 'AHeading'
AHeading.prototype = Text.prototype

AHeading.defaultProps = {
  bold: true,
  italic: false,
  underline: false,
  highlight: undefined,
  textColor: '#09090B',
  size: 'xl',
  p: 1,
  m: 1,
  borderRadius: 1,
}

export { AHeading, AHeadingProps }
