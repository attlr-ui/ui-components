import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  type TextProps,
  type ViewProps,
  type StyleProp,
} from 'react-native'
import { Image, ImageProps } from 'expo-image'

interface AAvatarProps {
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
  borderRadius?: 'xs' | 'sm' | 'md' | 'lg' | 'full'
  _text?: StyleProp<TextProps>
  _badge?: StyleProp<ViewProps>
  bg?: string
}

const AAvatarContext: React.Context<
  AAvatarProps & {
    IMAGE_SOURCE: boolean
    updateImageSource?: (isAvailable: boolean) => void
  }
> = React.createContext<AAvatarProps & { IMAGE_SOURCE: boolean }>({
  IMAGE_SOURCE: false,
})

const AAvatar: React.FC<AAvatarProps & ViewProps> = ({
  children,
  size,
  style,
  bg,
  borderRadius,
  ...props
}): React.JSX.Element => {
  const [imageSource, setImageSource] = React.useState(false)

  const checkImageSource = React.useCallback(():
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | undefined => {
    return React.Children.toArray(children).find(
      (child) => (child as any).type === AAvatarImage
    ) as React.ReactElement<any, string | React.JSXElementConstructor<any>>
  }, [children])

  React.useEffect((): void => {
    if (checkImageSource()) {
      setImageSource(true)
    }
  }, [])

  return (
    <AAvatarContext.Provider
      value={{
        size,
        borderRadius,
        IMAGE_SOURCE: imageSource,
        updateImageSource(isAvailable: boolean) {
          setImageSource(isAvailable)
        },
      }}>
      <View
        {...props}
        style={[
          {
            width: avatarSizes[size ?? 'md'],
            height: avatarSizes[size ?? 'md'],
            backgroundColor: bg ? bg : 'gray',
            borderRadius: avatarBorderRadius[borderRadius ?? 'md'],
          },
          {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
          style,
        ]}>
        {children}
      </View>
    </AAvatarContext.Provider>
  )
}

/**
 * Text component for the Avatar, only used when the image is not available
 * **/
const AAvatarFallbackText: React.FC<TextProps> = ({
  children,
  style,
}): React.JSX.Element => {
  const { IMAGE_SOURCE } = React.useContext(AAvatarContext)

  if (IMAGE_SOURCE) {
    return <></>
  }

  return (
    <Text style={[styles.fallbackText, style]}>
      {typeof children === 'string' ? fallbackTextFormat(children) : children}
    </Text>
  )
}

/**
 * Image component for the Avatar, uses expo-image for better performance but you can pass any other image component
 * **/
const AAvatarImage: React.FC<ImageProps> = ({
  children,
  style,
  ...props
}): React.JSX.Element => {
  const { updateImageSource, IMAGE_SOURCE } = React.useContext(AAvatarContext)

  if (!props.source) {
    console.warn('AAvatarImage: source prop is required')
    return <></>
  }

  React.useEffect((): void => {
    if (updateImageSource && !IMAGE_SOURCE) {
      updateImageSource(true)
    }
  }, [])

  return (
    <Image
      source={props.source}
      contentFit={props.contentFit ?? 'fill'}
      placeholderContentFit="fill"
      placeholder={
        props.placeholder ?? 'https://picsum.photos/seed/696/3000/2000'
      }
      style={[
        {
          width: '100%',
          height: '100%',
          borderRadius: 100,
        },
        style,
      ]}
    />
  )
}

interface AAvatarBadgeProps {
  status?: 'online' | 'offline' | 'busy' | 'away'
  /**
   * Style for the badge dot
   **/
  _badge?: StyleProp<ViewProps>
  /**
   * Style for the badge container
   **/
  _badgeContainer?: StyleProp<ViewProps>
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Background color for the badge
   **/
  bg?: string
  round?: number
}
/**
 * Badge component for the Avatar, use to show a badge on the bottom right corner of the Avatar
 * */
const AAvatarBadge: React.FC<AAvatarBadgeProps> = (
  props
): React.JSX.Element => {
  return (
    <View
      style={[
        avatarBadgeStyle.badge,
        avatarBadgeStyle[props.position ?? 'bottom-right'],
        avatarBadgeStyle[props.size ?? 'md'],
        {
          backgroundColor: props.bg ?? '#D4D4D8',
          borderRadius: props.round ?? 100,
        },
        props._badgeContainer,
      ]}>
      <View
        style={[
          avatarBadgeStyle.dot,
          avatarBadgeStyle[props.status ?? 'online'],
          props._badge,
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  fallbackText: {
    color: 'black',
    fontSize: 20,
  },
})

AAvatar.displayName = 'AAvatar'
AAvatarFallbackText.displayName = 'AAvatarFallbackText'
AAvatarImage.displayName = 'AAvatarImage'

const fallbackTextFormat = (name: string): string => {
  if (name && name.length > 2 && name.includes(' ')) {
    return (name.split(' ')[0][0] + name.split(' ')[1][0]).toUpperCase()
  }
  if (name && name.length > 1) {
    return name.substring(0, 2).toUpperCase()
  }
  return 'NN'
}

const avatarSizes: { [key: string]: number } = {
  xs: 20,
  sm: 24,
  md: 50,
  lg: 75,
  xl: 100,
  '2xl': 120,
  '3xl': 140,
  '4xl': 180,
  '5xl': 200,
  '6xl': 210,
} as const

const avatarBorderRadius: { [key: string]: number } = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  full: 100,
} as const

const avatarBadgeStyle = StyleSheet.create({
  badge: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: '75%',
    height: '75%',
    borderRadius: 100,
    backgroundColor: 'green',
  },
  online: {
    width: '75%',
    height: '75%',
    borderRadius: 100,
    backgroundColor: 'green',
  },
  offline: {
    width: '75%',
    height: '75%',
    borderRadius: 100,
    backgroundColor: 'gray',
  },
  busy: {
    width: '75%',
    height: '75%',
    borderRadius: 100,
    backgroundColor: 'red',
  },
  away: {
    width: '75%',
    height: '75%',
    borderRadius: 100,
    backgroundColor: 'yellow',
  },
  // position
  'top-right': {
    top: 0,
    right: 0,
  },
  'top-left': {
    top: 0,
    left: 0,
  },
  'bottom-right': {
    bottom: 0,
    right: 0,
  },
  'bottom-left': {
    bottom: 0,
    left: 0,
  },
  // size
  xs: {
    width: 10,
    height: 10,
  },
  sm: {
    width: 12,
    height: 12,
  },
  md: {
    width: 14,
    height: 14,
  },
  lg: {
    width: 16,
    height: 16,
  },
  xl: {
    width: 18,
    height: 18,
  },
})

export {
  AAvatar,
  AAvatarProps,
  AAvatarFallbackText,
  AAvatarImage,
  AAvatarBadge,
  AAvatarBadgeProps,
}
