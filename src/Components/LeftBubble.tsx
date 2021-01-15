import React from 'react';
import { View, StyleSheet } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import { Text } from 'native-base';
import Svg, { Path } from 'react-native-svg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { Bubbles } from '../Interfaces/interface';

export default function LeftBubble(props: Bubbles) {
  return (
    <View style={[styles.item, styles.itemIn]}>
      <View style={styles.balloon}>
        <Text style={styles.text}>{props.text}</Text>

        <View style={styles.footNote}>
          <Text style={styles.timestamp}>{props.timestamp}</Text>
          {props.status && (
            <Feather style={styles.status} name={'check'} size={13} />
          )}
          {/* {status === 'read' && (
            <Ionicons style={styles.status} name={'ios-done-all'} size={18} />
          )} */}
        </View>
        <View style={[styles.arrowContainer, styles.arrowLeftContainer]}>
          <Svg
            style={styles.arrowLeft}
            width={moderateScale(15.5, 0.6)}
            height={moderateScale(17.5, 0.6)}
            viewBox="32.484 17.5 15.515 17.5"
            enable-background="new 32.485 17.5 15.515 17.5">
            <Path
              d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
              fill="grey"
              x="0"
              y="0"
            />
          </Svg>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: 'row',
  },
  itemIn: {
    marginLeft: 20,
  },
  itemOut: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  balloon: {
    maxWidth: moderateScale(250, 2),
    paddingHorizontal: moderateScale(10, 2),
    paddingTop: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 20,
    backgroundColor: 'grey',
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1,
  },
  arrowLeftContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },

  arrowRightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  arrowLeft: {
    left: moderateScale(-6, 0.5),
  },

  arrowRight: {
    right: moderateScale(-6, 0.5),
  },
  text: {
    paddingTop: 5,
    color: 'white',
  },

  timestamp: {
    color: 'lightgray',
    fontSize: 12,
    textAlign: 'left',
  },
  status: {
    color: 'lightgray',
    textAlign: 'left',
    marginLeft: 4,
  },
  footNote: {
    // flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
