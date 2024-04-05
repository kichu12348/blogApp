import {Text,TextInput,TouchableOpacity,StyleSheet,KeyboardAvoidingView, Platform,TouchableWithoutFeedback,Keyboard} from 'react-native'
import {useState} from 'react'

const AddBlog = ({supabase}) => {

  const[title,setTitle] = useState('')
  const[body,setBody] = useState('')

  //add blog to database

  const addBlog = async() => {
    if(title.length>0 && body.length>0){
        const {data,error} = await supabase
        .from('blogs')
        .insert([
            {title: title, body: body}
        ])
        if(error){
            console.log(error)
        }else{
            console.log(data)
            setTitle('')
            setBody('')
        }
    }
  }

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    }

    

  return (
    <TouchableWithoutFeedback style={styles.container}
    onPress={dismissKeyboard}
    >
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 120 : 150}
      >
        <TextInput
        placeholder='Title...'
        style={styles.titleInp}
        placeholderTextColor={"white"}
        onChangeText={(text)=>setTitle(text)}
        value={title}
        />
        <TextInput
        placeholder='Body...'
        style={styles.bodyInp}
        placeholderTextColor={"white"}
        multiline={true}
        numberOfLines={10}
        onChangeText={(text)=>setBody(text)}
        value={body}
        />
        <TouchableOpacity
        onPress={addBlog}
        style={{
            backgroundColor:"white",
            width:"90%",
            padding:10,
            borderRadius:30,
            alignItems:"center"
        }}
        >
            <Text style={[styles.fontStyles,{color:"black",fontWeight:"bold"}]}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles =StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    fontStyles:{
        color: 'white',
        fontSize: 20
    },
    titleInp:{
        width:"90%",
        height:50,
        borderRadius:10,
        padding:10,
        marginBottom:5,
        color:"white",
        backgroundColor: "rgba(0, 0,0, 1)",
        shadowColor: "rgba(255, 255, 255, 0.2)",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16.00,
    },
    bodyInp:{
        width:"90%",
        height:200,
        borderRadius:10,
        padding:10,
        marginBottom:1,
        color:"white",
        backgroundColor: "rgba(0, 0,0, 1)",
        shadowColor: "rgba(255, 255, 255, 0.2)",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16.00,

    }
})

export default AddBlog