import { PermissionsAndroid, Platform, Alert } from 'react-native';

export const requestGalleryPermission = async (): Promise<boolean> => {
  if (Platform.OS !== 'android') return true;

  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Izin Galeri',
        message: 'Aplikasi membutuhkan akses ke galeri untuk mengganti foto profil',
        buttonNeutral: 'Tanya Nanti',
        buttonNegative: 'Batal',
        buttonPositive: 'OK',
      },
    );

    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    Alert.alert('Error', 'Gagal meminta izin akses galeri');
    return false;
  }
};
