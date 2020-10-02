import * as React from 'react';
import { StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { FAB } from 'react-native-paper';
import { Icon } from 'react-native-elements';

export default function Fab(props: FabProps) {
  return (
    <FAB
      style={{
        ...styles.fab,
        backgroundColor: props.backgroundColor,
      }}
      icon={({ size, color }) => (
        <Icon name={props.iconName} type="font-awesome-5" size={props.size} color={props.color} />
      )}
      onPress={props.onPress}
      loading={props.loading}
      label={props.label}
      color={props.color}
    />
  )
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})

interface FabProps {
  type?: "small" | undefined;
  onPress?: any;
  backgroundColor?: string;
  loading?: boolean;
  label?: string | undefined;
  iconName?: any;
  color?: any;
  size?: number;

}