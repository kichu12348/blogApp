import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Modal, TouchableWithoutFeedback } from 'react-native';
import addBtn from '../images/addBtn.png';
import Account from './smallStuff/account';
import AddBlog from './smallStuff/addBlog';
import closeBtn from '../images/closeBtn.png';
import songBtn from '../images/songBtn.png';
import SongPlayer from './smallStuff/songPlayer';


const Footer = ({supabase}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleB, setModalVisibleB] = useState(false);
  const [modalVisibleC, setModalVisibleC] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const slideAnimB = useRef(new Animated.Value(0)).current;
    const slideAnimC = useRef(new Animated.Value(0)).current;




  const slideUpA = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDownA = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const slideUpB = () => {
    setModalVisibleB(true);
    Animated.timing(slideAnimB, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const slideDownB = () => {
    Animated.timing(slideAnimB, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisibleB(false));
  };

    const slideUpC = () => {
    setModalVisibleC(true);
    Animated.timing(slideAnimC, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    };

    const slideDownC = () => {
    Animated.timing(slideAnimC, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisibleC(false));
    };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={slideUpC}
      >
        <Image style={{ width: 40, height: 40 }} source={songBtn} />
      </TouchableOpacity>
      <TouchableOpacity onPress={slideUpB}>
        <Image style={{ width: 50, height: 50 }} source={addBtn} />
      </TouchableOpacity>
      <TouchableOpacity onPress={slideUpA}>
        <Image
          style={{ width: 50, height: 50 }}
          source={{ uri: 'https://api.multiavatar.com/kichu.png?apikey=CglVv3piOwAuoJ' }}
        />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="none"
        onRequestClose={slideDownA}
      >
        <TouchableWithoutFeedback onPress={slideDownA}>
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.modal,
                { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [500, 0] }) }] },
              ]}
            >
              <Account />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={modalVisibleB}
        transparent
        animationType="none"
        onRequestClose={slideDownB}
      >
        <View style={styles.modalOverlay}
        >
          <Animated.View
            style={[
              styles.modal,
              { transform: [{ translateY: slideAnimB.interpolate({ inputRange: [0, 1], outputRange: [500, 0] }) }], height: "85%"},
            ]}
          >
            <TouchableOpacity onPress={slideDownB} style={styles.closeButton}>
              <Image style={styles.closeButtonImage} source={closeBtn} />
            </TouchableOpacity>
            <AddBlog supabase={supabase}/>
          </Animated.View>
        </View>
      </Modal>

        
            <Modal
        visible={modalVisibleC}
        transparent
        animationType="none"
        onRequestClose={slideDownC}
        >
        <View style={styles.modalOverlay}
        >
          <Animated.View
            style={[
              styles.modal,
              { transform: [{ translateY: slideAnimC.interpolate({ inputRange: [0, 1], outputRange: [500, 0] }) }], height: "85%"},
            ]}
          >
            <TouchableOpacity onPress={slideDownC} style={styles.closeButton}>
              <Image style={styles.closeButtonImage} source={closeBtn} />
            </TouchableOpacity>
            <SongPlayer />
          </Animated.View>
        </View>
        </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  fontStyles: { color: 'white', fontSize: 20 },
  modal: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    height: 300,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
    closeButton: {
      width: "100%",
      alignItems: "flex-end",
      justifyContent: "center",
    },
    closeButtonImage: {
        width: 30,
        height: 30,
        marginRight: 10,
        marginTop: 10,
    },
});

export default Footer;