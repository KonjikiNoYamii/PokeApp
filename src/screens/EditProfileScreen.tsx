import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { launchImageLibrary } from 'react-native-image-picker';
import { requestGalleryPermission } from '../services/requestGalleryPermission';
import { useTheme } from '../context/ThemeContext';

export default function EditProfileScreen({ navigation }: any) {
  const { user, avatar, updateAvatar, updateUsername } = useAuth();
  const { isDark } = useTheme();
  const [newUsername, setNewUsername] = useState(user || '');
  const [newAvatar, setNewAvatar] = useState<string | null>(avatar);

  const handlePickImage = async () => {
    const hasPermission = await requestGalleryPermission();
    if (!hasPermission) {
      Alert.alert('Izin Ditolak', 'Tidak bisa membuka galeri tanpa izin!');
      return;
    }

    const options: any = { mediaType: 'photo', selectionLimit: 1, quality: 0.8 };
    const result = await launchImageLibrary(options);

    if (result.didCancel) return;
    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'Gagal memilih foto');
      return;
    }
    if (result.assets && result.assets.length > 0) {
      setNewAvatar(result.assets[0].uri || null);
    }
  };

  const handleSave = async () => {
    if (!newUsername.trim()) {
      Alert.alert('Error', 'Username tidak boleh kosong!');
      return;
    }

    await updateUsername(newUsername);

    if (newAvatar) {
      await updateAvatar(newAvatar);
    }

    Alert.alert('Sukses', 'Profile berhasil diupdate!');
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDark ? '#121212' : '#fff' },
      ]}
    >
      <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>
        Edit Profile
      </Text>

      <Pressable onPress={handlePickImage} style={styles.avatarWrapper}>
        <Image
          source={
            newAvatar
              ? { uri: newAvatar }
              : {
                  uri: 'https://i.pinimg.com/1200x/ed/ca/fc/edcafc4e69d0bd31d12a09a857951d13.jpg',
                }
          }
          style={styles.avatar}
        />
        <Text style={[styles.changePhoto, { color: '#007bff' }]}>
          Ganti Foto
        </Text>
      </Pressable>

      <TextInput
        placeholder="Username"
        placeholderTextColor={isDark ? '#aaa' : '#555'}
        style={[
          styles.input,
          {
            backgroundColor: isDark ? '#2a2a2a' : '#fff',
            color: isDark ? '#fff' : '#000',
            borderColor: isDark ? '#555' : '#ccc',
          },
        ]}
        value={newUsername}
        onChangeText={setNewUsername}
      />

      <Pressable
        style={[styles.button, { backgroundColor: '#007bff' }]}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>Simpan</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: '#6c757d' }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Batal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  avatarWrapper: { alignItems: 'center', marginBottom: 20 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
  },
  changePhoto: { textAlign: 'center', marginTop: 5 },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  button: { padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
