// ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNetwork } from '../hooks/useNetwork';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import PokemonCard from '../components/PokemonCard';
import { useNavigation } from '@react-navigation/native';
import { useFavorite } from '../context/FavoritesContext';

export default function ProfileScreen() {
  const { user, avatar, isAuthenticated, logout } = useAuth();
  const { isOnline, connectionType } = useNetwork();
  const { isDark } = useTheme();
  const navigation = useNavigation<any>();
  const { favorites } = useFavorite(); // ambil data favorite

  const handleLogout = async () => {
    await logout();
    Alert.alert('Info', 'Anda telah logout.');
  };

  const colors = {
    background: isDark ? '#121212' : '#f2f5f8',
    card: isDark ? '#1e1e1e' : '#fff',
    textPrimary: isDark ? '#f2f2f2' : '#222',
    textSecondary: isDark ? '#aaa' : '#555',
    statusOnline: '#28a745',
    statusOffline: '#dc3545',
    buttonBg: '#007bff',
    logoutBg: '#dc3545',
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      {isAuthenticated ? (
        <>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <Image
              source={
                avatar
                  ? { uri: avatar }
                  : {
                      uri: 'https://i.pinimg.com/1200x/ed/ca/fc/edcafc4e69d0bd31d12a09a857951d13.jpg',
                    }
              }
              style={styles.avatar}
            />
          </View>

          {/* Info Card */}
          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Username
            </Text>
            <Text style={[styles.value, { color: colors.textPrimary }]}>{user}</Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Status Jaringan
            </Text>
            <View style={styles.statusRow}>
              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor: isOnline
                      ? colors.statusOnline
                      : colors.statusOffline,
                  },
                ]}
              />
              <Text style={[styles.statusText, { color: colors.textPrimary }]}>
                {isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>

          <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Tipe Koneksi
            </Text>
            <Text style={[styles.value, { color: colors.textPrimary }]}>
              {connectionType.toUpperCase()}
            </Text>
          </View>

          {/* FAVORITE POKÉMON SECTION */}
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
            Pokémon Favorit
          </Text>
          {favorites.length === 0 ? (
            <Text style={{ color: colors.textSecondary, marginBottom: 15 }}>
              Belum ada Pokémon favorit desuwah!
            </Text>
          ) : (
            <FlatList
              data={favorites}
              keyExtractor={item => item.name}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 10 }}
              renderItem={({ item }) => (
                <PokemonCard
                  name={item.name}
                  url={`https://pokeapi.co/api/v2/pokemon/${item.name}`}
                  onPress={() =>
                    navigation.navigate('Detail', { name: item.name })
                  }
                  isDark={isDark}
                  small={true}
                  style={{ marginRight: 12 }} // jarak antar card
                />
              )}
            />
          )}

          {/* Tombol */}
          <Pressable
            style={[styles.button, { backgroundColor: colors.buttonBg }]}
            onPress={() => navigation.navigate('EditProfile')}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: colors.logoutBg }]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>
        </>
      ) : (
        <View style={styles.notLoggedInWrapper}>
          <Text style={styles.notLoggedIn}>Belum login desuwah!</Text>
          <Text style={[styles.prompt, { color: colors.textSecondary }]}>
            Silahkan login untuk melanjutkan
          </Text>
          <Pressable
            style={[styles.button, { backgroundColor: colors.buttonBg }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#007bff',
    backgroundColor: '#e0e0e0',
  },
  infoCard: {
    padding: 18,
    borderRadius: 15,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  label: {
    fontSize: 13,
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
  button: {
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  notLoggedInWrapper: {
    marginTop: 50,
    alignItems: 'center',
  },
  notLoggedIn: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc3545',
    marginBottom: 6,
  },
  prompt: {
    fontSize: 14,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
  },
});
