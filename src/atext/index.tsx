import React from 'react'
import {
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  Text,
  TextProps,
} from 'react-native'

interface ATextProps {
  /**
   * If true, it will render an ellipsis when the text exceeds the width of the viewport or maxWidth set.
   * @default false
   * **/
  isTruncated?: boolean
  /**
   * Used to make the text bold.
   * @default false
   * **/
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
   * A horizontal line through the center of the text.
   * @default false
   * **/
  strikeThrough?: boolean

  sub?: boolean
  /**
   * Used to highlight the text with a specific color.
   * @default undefined * */
  highlight?: string
  /**
   * Used to change the color of the text.
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
 * AText is a component used to render text.
 * 
 * @example
 *  <AText
          textColor='secondary'
          highlight="red"
          p={10}
        >
          This is a text
    </AText>
**/
const AText: React.FC<ATextProps & TextProps> = ({
  children,
  ...props
}): React.JSX.Element => {
  const {
    isTruncated,
    bold,
    italic,
    underline,
    strikeThrough,
    sub,
    highlight,
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
          fontSize: FontSize[size ?? FontSize.md],
          fontWeight: bold ? 'bold' : 'normal',
          fontStyle: italic ? 'italic' : 'normal',
          textDecorationLine: underline
            ? 'underline'
            : strikeThrough
            ? 'line-through'
            : 'none',
          lineHeight: sub ? 16 : 20,
          backgroundColor: highlight,
          overflow: isTruncated ? 'hidden' : 'visible',
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
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  '6xl': 64,
}

AText.displayName = 'AText'
AText.prototype = Text.prototype

AText.defaultProps = {
  isTruncated: false,
  bold: false,
  italic: false,
  underline: false,
  strikeThrough: false,
  sub: false,
  highlight: undefined,
  textColor: '#09090B',
  size: 'md',
  p: 1,
  m: 1,
  borderRadius: 1,
}

export { AText, ATextProps }
