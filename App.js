
import { StyleSheet, SafeAreaView } from "react-native";
import Home from "./components/home";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
        
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
