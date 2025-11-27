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
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { requestGalleryPermission } from '../services/requestGalleryPermission';

export default function EditProfileScreen({ navigation }: any) {
  const { user, avatar, updateAvatar, updateUsername } = useAuth();
  const [newUsername, setNewUsername] = useState(user || '');
  const [newAvatar, setNewAvatar] = useState<string | null>(avatar);

const handlePickImage = async () => {
  // Minta izin dulu (Android)
  const hasPermission = await requestGalleryPermission();
  if (!hasPermission) {
    Alert.alert('Izin Ditolak', 'Tidak bisa membuka galeri tanpa izin!');
    return;
  }

  const options : any = { mediaType: 'photo', selectionLimit: 1, quality: 0.8 };
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
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

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
        <Text style={styles.changePhoto}>Ganti Foto</Text>
      </Pressable>

      <TextInput
        placeholder="Username"
        style={styles.input}
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
  container: { flex: 1, padding: 20, backgroundColor: '#fff', gap: 20 },
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
  changePhoto: { textAlign: 'center', color: '#007bff', marginTop: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: { padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
