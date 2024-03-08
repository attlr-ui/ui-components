import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  FlexStyle,
} from 'react-native'
import { Check } from 'lucide-react-native'
import React from 'react'

interface ACheckboxProps extends PressableProps {
  checkedStyle?: StyleProp<ViewStyle>
  checked?: boolean
  labelPosition?: 'left' | 'right'
  label?: React.ReactNode
  _checkStyle?: StyleProp<ViewStyle>
  color?: string
  align: FlexStyle['alignItems']
  gap?: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: number
}

/**
 * ACheckbox is a component that is used to get the user's choice.
 * @example 
 * <ACheckbox
      label={<AText textColor='primary'>This is a label</AText>}
      checked={!checked}
      align='center'
      gap={10}
      onPress={() => setChecked(!checked)}
      size='md'
    />
 **/
const ACheckbox: React.FC<ACheckboxProps> = (props): React.JSX.Element => {
  const {
    checked,
    checkedStyle,
    label,
    _checkStyle,
    color = 'white',
    labelPosition = 'right',
    align = 'flex-start',
    gap,
    style,
    size,
    radius,
    ...otherProps
  } = props
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: align,
        gap,
        opacity: otherProps.disabled ? 0.5 : 1,
      }}>
      {labelPosition === 'left' && label}
      <Pressable
        style={[
          styles.checkboxBase,
          sizeStyles[size || 'md'],
          { borderRadius: radius ?? 6 },
          style as StyleProp<ViewStyle>,
          checked && styles.checkboxChecked,
          checkedStyle,
        ]}
        {...otherProps}>
        {checked && (
          <Check
            size={sizeStyles[size || 'md'].width}
            color={color}
            style={_checkStyle}
          />
        )}
      </Pressable>
      {labelPosition === 'right' && label}
    </View>
  )
}

const styles = StyleSheet.create({
  checkboxBase: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#09090B',
  },
})

const sizeStyles = {
  xs: {
    width: 16,
    height: 16,
  },
  sm: {
    width: 20,
    height: 20,
  },
  md: {
    width: 24,
    height: 24,
  },
  lg: {
    width: 28,
    height: 28,
  },
  xl: {
    width: 32,
    height: 32,
  },
}

ACheckbox.displayName = 'ACheckbox'
const ACheckboxMemo = React.memo(ACheckbox)

export { ACheckboxMemo as ACheckbox, ACheckboxProps }
