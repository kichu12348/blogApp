import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from "react-native";
import closeBtn from "../../images/closeBtn.png";
import readingIMG from "../../images/readingIMG.jpg";

const Blogs = ({ blog, onClose }) => {
  return (
    <View style={styles.container}>
      <View style={{ width: "100%" }}>
        <View  style={{
          width:"100%",
          alignItems: "flex-end",
          padding: 20,
        }}>
          <TouchableOpacity onPress={onClose} style={{
            width: 35,
            height: 35,
          }}>
            <Image source={closeBtn} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      </View>
      <Image source={readingIMG} resizeMode="cover" style={{ width: "100%", height: "100%", position: "absolute", zIndex: -1 }} />
      <View
        style={{
          width: "100%",
          height: "90%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,0,0)",
          position: "absolute",
          zIndex: 1,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <ScrollView style={styles.scrollView}>
          <Text style={[styles.fontStyles, { fontWeight: "bold", fontSize: 30 }]}>{blog.title}</Text>
          <Text style={styles.fontStyles}>{blog.body}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  fontStyles: {
    color: "white",
    fontSize: 20,
    marginTop: 20,
  },
  scrollView: {
    backgroundColor: "transparent",
    marginHorizontal: 15,
    width: "95%",
  },
});

export default Blogs;