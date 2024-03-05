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
  /**
   * solid | outline | ghost
   * @default solid
   * */
  fill?: 'solid' | 'outline' | 'ghost'
  /***
   * sm | md | lg
   * @default sm
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * xs | sm | md | lg | number
   * @default sm
   * @description If a number is passed, it will be used as the borderRadius
   **/
  borderRadius?: 'xs' | 'sm' | 'md' | 'lg' | number
  variant?: 'success' | 'warning' | 'error' | 'info'
  /**
   *   Space between the badge and its children
   *  @default 4
   * **/
  gap?: number
}

const BadgeContext: React.Context<ABadgeProps> =
  React.createContext<ABadgeProps>({})

/**
    *   A badge component that is used to display a small amount of information
    *  @example 
    * <ABadge
            borderRadius='lg'
            // size='lg'
            variant='error'
            fill='solid'
            // gap={10}
        >
            <Star size={14} color="white" />
            <ABadgeText>Axole Maranjana</ABadgeText>
        </ABadge>   
    * @param {ABadgeProps} props
    * @param {React.ReactNode} children
    * @param {StyleProp<ViewStyle>} style
    * @returns {React.JSX.Element}
        **/
const ABadge: React.FC<
  ABadgeProps & {
    children: React.ReactNode
    style: StyleProp<ViewStyle>
  }
> = ({
  children,
  style,
  ...props
}: ABadgeProps & {
  children: React.ReactNode
  style: StyleProp<ViewStyle>
}): React.JSX.Element => {
  return (
    <BadgeContext.Provider value={{ ...props }}>
      <View
        accessibilityLabel="badge"
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

/**
 *  A badge text component that is used to display a small amount of information
 * @example
 * <ABadgeText>Axole Maranjana</ABadgeText>
 * @param {TextProps} props
 * @returns {React.JSX.Element}
 * **/
const ABadgeText: React.FC<TextProps> = ({
  ...props
}: TextProps): React.JSX.Element => {
  const badgeProps = React.useContext(BadgeContext)
  return (
    <Text
      accessibilityLabel="badge-text"
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

const fillStyles = (
  variant: ABadgeProps['variant']
): { [key: string]: { [key: string]: string | number } } =>
  StyleSheet.create({
    solid: {
      backgroundColor:
        variant === 'success'
          ? 'green'
          : variant === 'warning'
          ? 'yellow'
          : variant === 'error'
          ? 'red'
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

ABadge.displayName = 'ABadge'
ABadgeText.displayName = 'ABadgeText'

export { ABadge, ABadgeProps, ABadgeText }
