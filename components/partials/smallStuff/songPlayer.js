import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import rollsIMG from "../../audio/audioImages/rollsIMG.jpg";
import meowIMG from "../../audio/audioImages/meowIMG.jpg";
import calmIMG from "../../audio/audioImages/calmIMG.jpg";
import rolls from "../../audio/rolls.mp3";
import meow from "../../audio/Meow.mp3";
import calm from "../../audio/calm.mp3";

const songPlayer = () => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackStatus, setPlaybackStatus] = useState(null);
  const [isBuffering, setIsBuffering] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [isRickRolling, setIsRickRolling] = useState(false);
  const [isMeowing, setIsMeowing] = useState(false);
  const [isCalm, setIsCalm] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (!sound) return;

    const onPlaybackStatusUpdate = (status) => {
      setIsBuffering(status.isBuffering);
      setPlaybackStatus(status);
    };

    const statusSubscription = sound.setOnPlaybackStatusUpdate(
      onPlaybackStatusUpdate
    );
    setSubscription(statusSubscription);

    return () => {
      statusSubscription?.remove();
    };
  }, [sound]);

  const loadAndPlaySound = async (songUrl) => {
    try {
      const { sound } = await Audio.Sound.createAsync(songUrl, {
        shouldPlay: true,
      });
      setSound(sound);
      setIsPlaying(true);
      if (songUrl === rolls) {
        setIsRickRolling(true);
        setIsMeowing(false);
        setIsCalm(false);
      }
      if (songUrl === meow) {
        setIsMeowing(true);
        setIsRickRolling(false);
        setIsCalm(false);
      }
      if (songUrl === calm) {
        setIsCalm(true);
        setIsMeowing(false);
        setIsRickRolling(false);
      }
    } catch (error) {
      console.log("Error loading sound:", error);
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.songContainer}
        onPress={() => {
          if (isPlaying && playbackStatus?.isPlaying) {
            pauseSound();
          } else {
            loadAndPlaySound(rolls);
          }
        }}
      >
        <Image source={rollsIMG} style={styles.songIMG} />
        <Text style={styles.fontStyles}>Rolls</Text>
        {isRickRolling && (
          <View
            style={[
              styles.timeStamps,
              {
                width: `${
                  (playbackStatus?.positionMillis /
                    playbackStatus?.durationMillis) *
                  100+4.5
                }%`,
              },
            ]}
          ></View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.songContainer}
        onPress={() => {
          if (isPlaying && playbackStatus?.isPlaying) {
            pauseSound();
          } else {
            loadAndPlaySound(meow);
          }
        }}
      >
        <Image source={meowIMG} style={styles.songIMG} />
        <Text style={styles.fontStyles}>Meow</Text>
        {isMeowing && (
          <View
            style={[
              styles.timeStamps,
              {
                width: `${
                  (playbackStatus?.positionMillis /
                    playbackStatus?.durationMillis) *
                  100+4.5
                }%`,
              },
            ]}
          ></View>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.songContainer}
        onPress={() => {
          if (isPlaying && playbackStatus?.isPlaying) {
            pauseSound();
          } else {
            loadAndPlaySound(calm);
          }
        }}
      >
        <Image source={calmIMG} style={styles.songIMG} />
        <Text style={styles.fontStyles}>Calm</Text>
        {isCalm && (
          <View
            style={[
              styles.timeStamps,
              {
                width: `${
                  (playbackStatus?.positionMillis /
                    playbackStatus?.durationMillis) *
                  100+4.5
                }%`,
              },
            ]}
          ></View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
  },
  fontStyles: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  songContainer: {
    marginTop: 20,
    width: "95%",
    height: 60,
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "relative",
    borderRadius: 10,
    shadowColor: "rgba(255, 255, 255, 0.2)",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 16.0,
    flexDirection: "row",
  },
  songIMG: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  timeStamps: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 3,
    borderRadius: 10,
  },
});

export default songPlayer;
