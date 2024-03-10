import React, { useState } from 'react'
import { View, Switch, type ViewStyle, type SwitchProps } from 'react-native'

interface ASwitchProps extends SwitchProps {
  value: boolean
  _switch?: ASwitchPropsSwitch
  _containerStyle?: ViewStyle
  labelComponent?: React.JSX.Element
  size?: 'sx' | 'sm' | 'md' | 'lg' | 'xl'
  justifyContent?: 'center' | 'flex-start' | 'flex-end'
  align?: 'center' | 'flex-start' | 'flex-end'
  direction?: 'row' | 'column'
  gap?: number
}

interface ASwitchPropsSwitch {
  thumbColor?: string
  trackColorFalse?: string
  trackColorTrue?: string
}

const ASwitch: React.FC<ASwitchProps> = (props) => {
  const {
    value,
    _switch,
    _containerStyle,
    labelComponent,
    size,
    direction,
    align,
    justifyContent,
    gap = 0,
    ...otherProps
  } = props
  const [selectedValue, setSelectedValue] = useState(value)

  const handleOnChange = async (value_: boolean): Promise<void> => {
    setSelectedValue(value_)
    await otherProps.onValueChange?.(value_)
  }

  return (
    <View
      style={[
        {
          flexDirection: direction ?? 'row',
          alignItems: align ?? 'center',
          justifyContent: justifyContent ?? 'flex-start',
          gap
        },
        _containerStyle
      ]}>
      <Switch
        accessibilityHint="Switch"
        aria-label="Switch"
        {...otherProps}
        style={{
          transform: [
            { scaleX: sizes[size ?? 'md'] },
            { scaleY: sizes[size ?? 'md'] }
          ],
          opacity: otherProps.disabled ? 0.5 : 1
        }}
        value={selectedValue}
        onValueChange={handleOnChange}
        thumbColor={_switch?.thumbColor ?? '#09090B'}
        trackColor={{
          false: _switch?.trackColorFalse ?? '#D1D1D6',
          true: _switch?.trackColorTrue ?? '#D1D1D6'
        }}
      />
      {labelComponent}
    </View>
  )
}

const sizes = {
  sx: 0.8,
  sm: 0.9,
  md: 1.0,
  lg: 1.1,
  xl: 1.2
}

ASwitch.displayName = 'ASwitch'

const ASwitchMemo = React.memo(ASwitch)

export { type ASwitchProps, ASwitchMemo as ASwitch }
