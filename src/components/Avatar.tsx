import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { StyleSheet, View, Alert, Image, Pressable, ActivityIndicator, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

interface Props {
  size: number;
  url: string | null;
  onUpload: (filePath: string) => void;
  showUpload?: boolean;
}

const Avatar = ({ url, size = 150, onUpload, showUpload = false }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from("avatars").download(path);
      if (error) throw error;

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
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setUploading(true);

        const file = await fetch(result.uri);
        const blob = await file.blob();
        const filePath = `avatars/${Date.now()}-${result.uri.split("/").pop()}`;

        const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, blob);

        if (uploadError) throw uploadError;

        onUpload(filePath);
        setAvatarUrl(result.uri);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log("Error uploading avatar: ", error.message);
        Alert.alert("Upload Failed", "Could not upload the avatar. Please try again.");
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <View style={[styles.avatarContainer, avatarSize]}>
      {avatarUrl ? (
        <Image 
        source={{ uri: avatarUrl }} 
        style={[avatarSize, styles.image]} 
        accessibilityLabel="Avatar" />
      ) : (
        <View 
          className="justify-center items-center" 
          style={[styles.avatar, avatarSize, styles.image]}>
          <ActivityIndicator color="white" />
        </View>
      )}
      {showUpload && (
        <Pressable style={styles.uploadButton} onPress={uploadAvatar} disabled={uploading}>
          {uploading ? (
            <ActivityIndicator color="black" />
          ) : (
            <MaterialIcons name="cloud-upload" size={24} color="black" />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatarContainer: {
    position: "relative",
    borderRadius: 75, // Circular avatars
    overflow: "hidden",
  },
  image: {
    resizeMode: "cover",
  },
  placeholder: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 75,
  },
  uploadButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
  },
});
