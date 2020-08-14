import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { CustomThemeInterface } from '../Interfaces/interface';
import { useTheme } from '@react-navigation/native';
import Onboarding from 'react-native-onboarding-swiper';
import { Button } from 'react-native-elements';
// const Square = ({ isLight, selected }) => {
//   let backgroundColor;
//   if (isLight) {
//     backgroundColor = selected ? "rgba(0, 0, 0, 0.8)" : "rgba(0, 0, 0, 0.3)";
//   } else {
//     backgroundColor = selected ? "#fff" : "rgba(255, 255, 255, 0.5)";
//   }
//   return (
//     <View
//       style={{
//         width: 6,
//         height: 6,
//         marginHorizontal: 3,
//         backgroundColor
//       }}
//     />
//   );
// };

// const backgroundColor = isLight => (isLight ? "blue" : "lightblue");
// const color = isLight => backgroundColor(!isLight);

// const Done = ({ isLight, ...props }) => (
//   <Button
//     title={"Accept"}
//     buttonStyle={{}}
//     containerViewStyle={{
//       marginVertical: 10,
//       width: 70
//     }}
//     textStyle={{ color: "black" }}
//     type="clear"
//     {...props}
//   />
// );

// const Skip = ({ isLight, skipLabel, ...props }) => (
//   <Button
//     title={"Skip"}
//     buttonStyle={{}}
//     containerViewStyle={{
//       marginVertical: 10,
//       width: 70
//     }}
//     textStyle={{ color: "#000" }}
//     type="clear"
//     {...props}
//   >
//     {skipLabel}
//   </Button>
// );

const Skip = ({ skipLabel, ...props }: any) => (
  <Button
    title={"Skip"}
    buttonStyle={{}}
    style={{
      marginVertical: 10,
      width: 70,
    }}
    titleStyle={{
      // color: 'red'
    }}
    type="clear"
    {...props}
  >
    {skipLabel}
  </Button>
);

const Next = (props: JSX.IntrinsicAttributes) => (
  <Button
    title={"Next"}
    buttonStyle={{}}
    style={{
      marginVertical: 10,
      width: 70,
    }}
    titleStyle={{
      color: 'red'
    }}
    type="clear"
    {...props}
  />
);

const Done = (props: JSX.IntrinsicAttributes) => (
  <Button
    title={"Get Started"}
    buttonStyle={{}}
    style={{
      marginVertical: 10,
      width: 70,
    }}
    titleStyle={{
      color: 'red'
    }}
    type="clear"
    {...props}
  />
);


export default function onboarding() {
  const { colors, fonts }: CustomThemeInterface = useTheme();

  return (
    // <View style={{ ...styles.container, backgroundColor: colors.background }}>
    //   <Text style={{
    //     color: colors.text,
    //     fontFamily: fonts?.RubikRegular,
    //     fontSize: 18
    //   }}
    //   >Onboarding</Text>
    // </View>
    <Onboarding
      // DotComponent={Square}
      NextButtonComponent={Next}
      SkipButtonComponent={Skip}
      skipToPage={2}
      DoneButtonComponent={Done}
      onDone={() => console.log('done')}
      titleStyles={{ fontFamily: fonts?.RubikBold }}
      subTitleStyles={{ fontFamily: fonts?.RubikRegular }}
      pages={[
        {
          // <Image source={require('../../assets/user.jpg')} />
          backgroundColor: '#fff',
          image: <View >
            <Text>hello</Text>
          </View>,
          title: 'Onboarding',
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          image: <View />,
          title: 'The Title',
          subtitle: 'This is the subtitle that sumplements the title.',
        },
        {
          backgroundColor: '#fff',
          image: <View />,
          title: 'Triangle',
          subtitle: "Beautiful, isn't it?",
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})