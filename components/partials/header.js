import { View,StyleSheet,Image} from 'react-native'
import logo from "../images/writeLogo.png"
import React from 'react'

const header = () => {
  return (
    <View style={styles.container}>
        <Image
          style={{
            width: 100,
            height: "100%",
          }}
          source={logo}
        />
       
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '98%',
    height: '10%',
    backgroundColor: 'transparent',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});

export default header