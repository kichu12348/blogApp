import { View, Text,Image,TouchableOpacity,StyleSheet} from 'react-native'
import React from 'react'

const account = () => {
  return (
    <>
    <View style={{ 
                alignItems: 'center',
                justifyContent: 'space-around',
                flexDirection: 'row',
                width: '100%',
                marginBottom: 30
        }}>
             <Image 
            source={{ uri: 'https://api.multiavatar.com/kichu.png?apikey=CglVv3piOwAuoJ' }} 
            style={{
                width: 100,
                height: 100,
                borderRadius: 50,
            }}
            />   
            <Text style={[styles.fontStyles,{fontWeight:"bold"}]}>YOU</Text>
            </View>
    </>
  )
}

const styles =StyleSheet.create( {
    fontStyles:{
        color: 'white',
        fontSize: 20
    }
})

export default account