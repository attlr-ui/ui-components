import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextProps,
} from 'react-native'

interface ABadgeProps {
  fill?: 'solid' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  borderRadius?: 'xs' | 'sm' | 'md' | 'lg' | number
  variant?: 'success' | 'warning' | 'error' | 'info'
  gap?: number
}

const BadgeContext = React.createContext<ABadgeProps>({})

const ABadge: React.FC<
  ABadgeProps & { children: React.ReactNode; style: StyleProp<ViewStyle> }
> = ({ children, style, ...props }) => {
  return (
    <BadgeContext.Provider value={{ ...props }}>
      <View
        style={[
          badgeStyles.badge,
          fillStyles(props.variant ?? 'info')[props.fill ?? 'solid'],
          badgeStyles[props.size ?? 'sm'],
          typeof props.borderRadius === 'number'
            ? { borderRadius: props.borderRadius }
            : boarderRadius[props.borderRadius ?? 'sm'],
          style,
          {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: props.gap ?? 4,
          },
        ]}>
        {children}
      </View>
    </BadgeContext.Provider>
  )
}

const ABadgeText: React.FC<TextProps> = ({ ...props }) => {
  const badgeProps = React.useContext(BadgeContext)
  return (
    <Text
      {...props}
      style={[
        badgeTextStyles.badge,
        badgeTextStyles[badgeProps.variant ?? 'info'],
        badgeTextStyles[badgeProps.size ?? 'sm'],
        badgeProps.fill !== 'outline' && { color: 'white' },
        props.style,
      ]}
    />
  )
}

const fillStyles = (variant: ABadgeProps['variant']) =>
  StyleSheet.create({
    solid: {
      backgroundColor:
        variant === 'success'
          ? 'green'
          : variant === 'warning'
          ? 'yellow'
          : variant === 'error'
          ? 'red'
          : variant === 'info'
          ? 'black'
          : 'black',
    },
    outline: {
      borderWidth: 1,
      borderColor:
        variant === 'success'
          ? 'green'
          : variant === 'warning'
          ? 'yellow'
          : variant === 'error'
          ? 'red'
          : 'black',
      backgroundColor: 'transparent',
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  })

const badgeStyles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
  },
  sm: {
    fontSize: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  md: {
    fontSize: 14,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  lg: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  success: {
    color: 'green',
  },
  warning: {
    color: 'yellow',
  },
  error: {
    color: 'red',
  },
  info: {
    color: 'black',
  },
})

const boarderRadius = StyleSheet.create({
  xs: {
    borderRadius: 3,
  },
  sm: {
    borderRadius: 6,
  },
  md: {
    borderRadius: 10,
  },
  lg: {
    borderRadius: 15,
  },
})

const badgeTextStyles = StyleSheet.create({
  badge: {
    fontWeight: 'bold',
  },
  sm: {
    fontSize: 12,
  },
  md: {
    fontSize: 14,
  },
  lg: {
    fontSize: 16,
  },
  success: {
    color: 'green',
  },
  warning: {
    color: 'yellow',
  },
  error: {
    color: 'red',
  },
  info: {
    color: 'black',
  },
})

export { ABadge, ABadgeProps, ABadgeText }
