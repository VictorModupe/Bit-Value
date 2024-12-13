import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { StyleSheet, View, Alert, Image, Pressable, ActivityIndicator } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
  showUpload?: boolean;
}

const Avatar = ({ url, size = 150, onUpload, showUpload = true }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage
      .from("avatars")
      .download(path);

      if (error) {
        throw error
        console.log(error)
      };

      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = () => {
        setAvatarUrl(reader.result as string);
      };
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error downloading image: ", error.message);
      }
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection:false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0 ) {
        console.log("User cancelled Image Picker");
        return;
      }

      const image = result.assets[0];
      console.log("Got Image", image);

        if(!image.uri){
          throw new Error("No image uri!");
        }
        const arraybuffer = await fetch(image.uri).then((res) => 
          res.arrayBuffer()
      )
        const fileExt = image.uri?.split(".").pop()?.toLowerCase() ?? "jpeg";
        const path = `${Date.now()}.${fileExt}`;
        const {data, error: uploadError} = await supabase.storage
          .from("avatars")
          .upload(path, arraybuffer, {
            contentType: image.mimeType ?? "image/jpeg",
          });
        if (uploadError) throw uploadError;

        onUpload(data.path);
    } catch (error) {
      if (error instanceof Error) {
        // console.log("Error uploading avatar: ", error.message);
        Alert.alert(error.message);
      } else {
        throw error;
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <View>
  {avatarUrl ? (
    <View className="relative">
    <Image
      source={{ uri: avatarUrl }}
      style={[avatarSize, styles.image, styles.avatar]}
      accessibilityLabel="Avatar"
    />
    </View>
  ) : (
    <View
      style={[styles.avatar, avatarSize, styles.image]}
      className="justify-center items-center">
      <ActivityIndicator color="purple" />
    </View>
  )}
  {showUpload && (
    <View className="absolute right-0 bottom-0">      
      {!uploading ? (
        <Pressable>
          <MaterialIcons name="cloud-upload" size={24} color="black" />
          </Pressable>
        ) : (
        <ActivityIndicator color="purple" size={40}/>
      )}
    </View>
    )}
    </View>
  );
};
export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 999,
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
    backgroundColor: "#ccc",
  },
  uploadButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 50,
    padding: 8,
  },
});

