import React from 'react';
import { View, Input, Button } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { CustomThemeInterface } from '../Interfaces/interface';

let { width } = Dimensions.get("window");


export default function InputFieldWithIcon({
  iconName,
  iconColor,
  iconSize,
  placeholder,
  placeholderTextColor,
  returnKeyType,
  keyboardType,
  autoFocus,
  onChangeText,
  textContentType,
  secureTextEntry,
  value,
  isPassword,
  onIconPress,
  rightIconName,
  disabled,
  maxLength,
  onSubmitEditing,
  blurOnSubmit,
  autoCapitalize,
  valid
}: InputProps) {
  const { colors, fontSizes, fonts }: CustomThemeInterface = useTheme();

  return (
    <View style={[styles.inputWrapper, { backgroundColor: colors.transparentInput }]}>
      <Octicons
        name={iconName}
        color={iconColor}
        size={iconSize}
        style={styles.inputLeftIcon}
      />
      <Input
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        returnKeyType={returnKeyType}
        keyboardType={keyboardType}
        autoFocus={autoFocus}
        onChangeText={onChangeText}
        textContentType={textContentType}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        value={value}
        // ref={ref}
        autoCapitalize={autoCapitalize}
        disabled={disabled}
        blurOnSubmit={blurOnSubmit}
        onSubmitEditing={onSubmitEditing}
        style={{ color: colors.light, fontFamily: fonts?.FuturaRegular }}
      />
      {isPassword && (
        <Button transparent onPress={onIconPress} style={styles.inputRightIcon}>
          <Octicons name={rightIconName} color={colors.light} size={22} />
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    padding: 2,
    paddingLeft: 50,
    paddingRight: 20,
    borderRadius: 50,
    marginBottom: 25,
    elevation: 5,
    // height: 50,
    width: width - 40,
    // paddingHorizontal: 30,
    alignItems: 'center',
  },
  empty: {},
  inputLeftIcon: {
    position: 'absolute',
    top: 18,
    left: 20,
  },
  inputRightIcon: {
    position: 'absolute',
    top: 7,
    right: 20,
  },
});

interface InputProps {
  iconName?: any;
  iconColor?: any;
  iconSize?: any;
  placeholder?: any;
  placeholderTextColor?: any;
  returnKeyType?: any;
  keyboardType?: any;
  autoFocus?: any;
  onChangeText?: any;
  textContentType?: any;
  secureTextEntry?: any;
  value?: any;
  isPassword?: true | false | undefined;
  onIconPress?: any;
  rightIconName?: any;
  disabled?: any;
  maxLength?: any;
  onSubmitEditing?: any;
  blurOnSubmit?: any;
  autoCapitalize?: any;
  valid?: boolean;
}