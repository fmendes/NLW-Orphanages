import React from 'react';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
//import { StatusBar } from 'expo-status-bar';

import Routes from './src/routes';

export default function App() {
  let [ fontsLoaded ] = useFonts({
    Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold
  });

  if( ! fontsLoaded ) {
    return <AppLoading />;
  }

  return (
    <Routes />
  );
}

// export default function App() {
//   return (
//     <View style={styles.container} >
//       <Text style={styles.mainText} >Hello world!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }
//   , mainText: {
//     color: 'white'
//     , fontSize: 48
//     , fontWeight: 'bold'
//   }
// });
