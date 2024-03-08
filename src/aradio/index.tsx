import { useState, createContext, useContext, useMemo, memo } from 'react'
import { View, Pressable, ViewStyle, type ViewProps } from 'react-native'

interface ARadioStyleProps {
  gap?: number
  direction?: 'row' | 'column'
  align?: 'center' | 'flex-start' | 'flex-end'
  justifyContent?: 'center' | 'flex-start' | 'flex-end'
  style?: ViewStyle
  selectedStyle?: ViewStyle
  disabledStyle?: ViewStyle
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

interface RadioProps {
  value: string
  options?: RadioOptionProps[]
  onChange?: (value: string) => void
  gap?: number
  direction?: 'row' | 'column'
  _align?: 'center' | 'flex-start' | 'flex-end'
  _radio: ARadioStyleProps
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  _containerStyle?: ViewStyle
}

const RadioContext = createContext<{
  setValue: (value: string) => void
  styles: ARadioStyleProps
  value?: string
}>(
  {} as {
    setValue: (value: string) => void
    styles: ARadioStyleProps
    value?: string
  }
)

/**
 * ARadioGroup is a component that is used to get the user's choice.
 * 
 * @param RadioProps & ViewProps 
 * 
 * @example
 * <ARadioGroup
          options={[
            { value: '1', labelComponent: <AText textColor='primary'>This is a text </AText> },
            { value: '2', labelComponent: <AText textColor='primary'>This is b text</AText> },
            { value: '3', labelComponent: <AText textColor='primary'>This is c text</AText>, disabled: true },
          ]}
          // value='1' // default value
          onChange={(value) => console.log(value)}
          size='md'
          gap={10}
          direction='column'
          _containerStyle={{}}
          _radio={{
            gap: 5,
            direction: 'row',
            align: 'center',
            justifyContent: 'flex-end',
            size: "md",
          }}
          _align='center'
        />
 * 
 * @returns React.JSX.Element
 * 
 * @link see more: [ARadioGroup](https://docs.attlr.org.za/components/ARadioGroup)
 */
const ARadioGroup = (props: RadioProps & ViewProps): React.JSX.Element => {
  const {
    value,
    options,
    _radio,
    _align,
    _containerStyle,
    onChange,
    gap,
    direction,
    ...otherProps
  } = props
  const [selectedValue, setSelectedValue] = useState(value)

  const handleOnChange = (value: string) => {
    setSelectedValue(value)
    onChange?.(value)
  }

  const contextValue = useMemo(() => {
    return {
      value: selectedValue,
      setValue: handleOnChange,
    }
  }, [selectedValue])

  return (
    <RadioContext.Provider
      value={{
        ...contextValue,
        styles: _radio,
      }}>
      <View
        {...otherProps}
        style={{
          gap,
          flexDirection: direction,
          alignItems: _align,
          ..._containerStyle,
        }}>
        {options?.map((option, index) => {
          const { value, disabled, labelComponent } = option

          return (
            <ARadio key={index} value={value} disabled={disabled}>
              {labelComponent}
            </ARadio>
          )
        })}
      </View>
    </RadioContext.Provider>
  )
}

interface RadioOptionProps {
  value: string
  disabled?: boolean
  labelComponent?: React.JSX.Element
  children?: React.JSX.Element
}
// No export
const ARadio = (props: RadioOptionProps): React.JSX.Element => {
  const { value, children, disabled } = props

  const { setValue, value: _value, styles } = useContext(RadioContext)

  const isSelected = _value === value

  const handlePress = () => {
    setValue(value)
  }

  return (
    <View
      style={{
        flexDirection: styles.direction ?? 'row',
        alignItems: styles.align,
        justifyContent: styles.justifyContent,
        opacity: disabled ? 0.5 : 1,
        gap: styles.gap ?? 10,
      }}>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={[
          {
            ...sizeStyles[styles.size ?? 'md'],
            borderRadius: 100,
            borderWidth: 3,
            borderColor: '#09090B',
            justifyContent: 'center',
            alignItems: 'center',
          },
          styles.style,
          disabled && styles.disabledStyle,
        ]}>
        {isSelected && (
          <View
            style={[
              {
                width: sizeStyles[styles.size ?? 'md'].width / 2,
                height: sizeStyles[styles.size ?? 'md'].height / 2,
                borderRadius: 100,
                backgroundColor: '#09090B',
              },
              styles.selectedStyle,
            ]}
          />
        )}
      </Pressable>
      {children}
    </View>
  )
}

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

ARadioGroup.displayName = 'ARadioGroup'
ARadio.displayName = 'Radio'

const MemoARadioGroup = memo(ARadioGroup)

export {
  MemoARadioGroup as ARadioGroup,
  type RadioProps,
  type RadioOptionProps,
}
