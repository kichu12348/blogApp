import { View, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Header from "./partials/header";
import Body from "./partials/body";
import Footer from "./partials/footer";
import { createClient } from "@supabase/supabase-js";
import body from "./partials/body";

const home = () => {
  const[isAddBlog,setIsAddBlog] = React.useState(false)
  const[run , setRun] = React.useState(false)
  const SUPABASE_URL = "https://vevcjimdxdaprqrdbptj.supabase.co";
  const SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZldmNqaW1keGRhcHJxcmRicHRqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE4NzMxMTAsImV4cCI6MjAyNzQ0OTExMH0.8p3Ho0QJ0h-3ANpQLa_qX05PCqWu22X2l2YdL4dBss8";

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

  return (
    <View style={styles.container}>
      <Header />
      <Body supabase={supabase} isAddBlog={isAddBlog} run={run} setRun={setRun} />
      <Footer supabase={supabase} setIsAddBlog={setIsAddBlog} setRun={setRun}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  fontStyles: {
    color: "white",
    fontSize: 20,
  },
});

export default home;
