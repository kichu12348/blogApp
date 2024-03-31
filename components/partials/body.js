import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import Blogs from "./smallStuff/blogs";
import React, { useState, useEffect, useMemo } from "react";

const BlogList = ({ supabase,isAddBlog,run , setRun}) => {
  const [blogs, setBlogs] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);


  useEffect(() => {
    const checkInternetConnection = async () => {
      try {
        const response = await NetInfo.fetch();
        setIsConnected(response.isConnected);
        if (response.isConnected) {
          fetchBlogs();
        } else {
          retrieveBlogsFromStorage();
        }
      } catch (error) {
        setIsConnected(false);
      }
    };

    const fetchBlogs = async () => {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) {
        console.log(error);
      } else {
        setBlogs(data);
        await AsyncStorage.setItem("blogs", JSON.stringify(data));
      }
    };

    const retrieveBlogsFromStorage = async () => {
      const data = await AsyncStorage.getItem("blogs");
      if (data) {
        setBlogs(JSON.parse(data));
      }
    };

    const interval = setInterval(() => {
      if (isConnected && blogs.length > 0) {
        checkUpdates();
      }
    }, 5000); // Check for updates every 5 seconds

    checkInternetConnection();

    return () => clearInterval(interval);
  }, [supabase, isConnected]);

  const checkUpdates = async () => {
    const { data, error } = await supabase.from("blogs").select("*");
    if (error) {
      console.log(error);
    } else {
      const newBlogs = data.filter((blog) => !blogs.some((b) => b.id === blog.id));
      if (newBlogs.length > 0) {
        setBlogs((prev) => [...prev, ...newBlogs]);
        await AsyncStorage.setItem("blogs", JSON.stringify([...blogs, ...newBlogs]));
      }
    }
  };

  useEffect(() => {
    if(isAddBlog && run){
      checkUpdates()
      setRun(false)
    }
  },[isAddBlog])

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    setIsOpen(true);
  };

  const closeBlog = () => {
    setSelectedBlog(null);
    setIsOpen(false);
  };

  const colors = useMemo(
    () => [
      { color1: "hsla(232, 73%, 65%, 1)", color2: "hsla(279, 33%, 48%, 1)" },
      { color1: "hsla(348, 88%, 66%, 1)", color2: "hsla(36, 89%, 68%, 1)" },
      { color1: "hsla(344, 97%, 63%, 1)", color2: "hsla(232, 90%, 59%, 1)" },
      { color1: "hsla(210, 90%, 80%, 1)", color2: "hsla(212, 93%, 49%, 1)" },
    ],
    []
  );

  const getRandomColor = useMemo(
    () => () => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return { color1: color.color1, color2: color.color2 };
    },
    [colors]
  );

  const renderItem = ({ item }) => {
    const { color1, color2 } = getRandomColor();

    return (
      <TouchableOpacity onPress={() => openBlog(item)} style={styles.cardContainer}>
        <LinearGradient
          colors={[color1, color2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.card}
        >
          <View style={styles.cardContent}>
            <Text style={[styles.fontStyles, { fontWeight: "bold", fontSize: 25 }]}>
              {item.title}
            </Text>
            <Text style={styles.fontStyles}>
              {item.body.length > 75 ? `${item.body.substring(0, 75)}...Read` : `${item.body}...Read`}
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isOpen ? (
        <Blogs blog={selectedBlog} onClose={closeBlog} />
      ) : (
        <FlatList
          data={blogs}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          style={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "80%",
    width: "100%",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  fontStyles: {
    color: "white",
    fontSize: 20,
  },
  cardContainer: {
    width: "95%",
    marginVertical: 5,
  },
  card: {
    height: 200,
    borderRadius: 10,
    padding: 10,
  },
  cardContent: {
    width: "100%",
    height: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  flatList: {
    width: "100%",
  },
});

export default BlogList;