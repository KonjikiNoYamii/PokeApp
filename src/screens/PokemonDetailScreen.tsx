import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { PokemonService } from '../api/pokemonServices';
import { useTheme } from '../context/ThemeContext';
import Sound from 'react-native-sound';

export default function PokemonDetailScreen() {
  const { isDark } = useTheme();
  const { name } = useRoute<any>().params;
  const [data, setData] = useState<any>(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    (async () => {
      const detail = await PokemonService.getPokemonDetail(name);
      setData(detail);
    })();

    // cleanup sound saat unmount
    return () => {
      if (sound) sound.release();
    };
  }, [name]);

  const playCry = () => {
    if (!data?.cries?.latest) return;

    if (sound) {
      sound.stop(() => setPlaying(false));
      setSound(null);
    }

    const newSound = new Sound(data.cries.latest, undefined, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      setPlaying(true);
      newSound.play(() => {
        setPlaying(false);
        newSound.release();
      });
    });
    setSound(newSound);
  };

  if (!data)
    return (
      <View style={[styles.loader, { backgroundColor: isDark ? '#121212' : '#F8F9FA' }]}>
        <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />
      </View>
    );

  const bgColor = isDark ? '#1F1F1F' : '#fff';
  const containerColor = isDark ? '#121212' : '#F8F9FA';
  const textPrimary = isDark ? '#fff' : '#111';
  const textSecondary = isDark ? '#D1D5DB' : '#4B5563';
  const badgeBg = isDark ? '#374151' : '#E9ECEF';
  const barBg = isDark ? '#374151' : '#DDE2E5';
  const barFillColor = '#4CCB5A';

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: containerColor }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Tombol play cry */}
<Pressable
  onPress={playCry}
  style={({ pressed }) => [
    {
      backgroundColor: isDark ? "#007bff":'#ff3d3d',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 24,
      shadowColor: '#000',
      shadowOpacity: pressed ? 0.2 : 0.15,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 4,
      transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
      alignSelf: 'center',
      marginBottom: 10,
    },
  ]}
>
  <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>
    {playing ? 'Playing… 🔊' : 'Play Cry 🔊'}
  </Text>
</Pressable>


      <View style={styles.imageWrapper}>
        <Image
          source={{
            uri: data.sprites.other?.home?.front_default || data.sprites.front_default,
          }}
          style={styles.image}
        />
      </View>

      <Text style={[styles.title, { color: textPrimary }]}>{name}</Text>

      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Text style={[styles.sectionTitle, { color: textPrimary }]}>Types</Text>
        <View style={styles.row}>
          {data.types.map((t: any) => (
            <Text key={t.type.name} style={[styles.badge, { backgroundColor: badgeBg, color: textPrimary }]}>
              {t.type.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Text style={[styles.sectionTitle, { color: textPrimary }]}>Abilities</Text>
        <View style={styles.row}>
          {data.abilities.map((ab: any) => (
            <Text key={ab.ability.name} style={[styles.badge, { backgroundColor: badgeBg, color: textPrimary }]}>
              {ab.ability.name}
            </Text>
          ))}
        </View>
      </View>

      <View style={[styles.card, { backgroundColor: bgColor }]}>
        <Text style={[styles.sectionTitle, { color: textPrimary }]}>Stats</Text>
        {data.stats.map((s: any) => {
          const percentage = Math.min(s.base_stat / 150, 1);
          return (
            <View key={s.stat.name} style={styles.statRow}>
              <Text style={[styles.statText, { color: textPrimary }]}>{s.stat.name}</Text>
              <View style={[styles.barContainer, { backgroundColor: barBg }]}>
                <View style={[styles.barFill, { width: `${percentage * 100}%`, backgroundColor: barFillColor }]} />
              </View>
              <Text style={[styles.statValue, { color: textPrimary }]}>{s.base_stat}</Text>
            </View>
          );
        })}
      </View>

      <View style={[styles.card, { backgroundColor: bgColor, paddingVertical: 22 }]}>
        <Text style={[styles.sectionTitle, { color: textPrimary }]}>Body Info</Text>
        <View style={styles.infoBox}>
          <Text style={[styles.infoLabel, { color: textSecondary }]}>Height</Text>
          <Text style={[styles.infoValue, { color: textPrimary }]}>{(data.height / 10).toFixed(1)} m</Text>
        </View>
        <View style={styles.infoDivider} />
        <View style={styles.infoBox}>
          <Text style={[styles.infoLabel, { color: textSecondary }]}>Weight</Text>
          <Text style={[styles.infoValue, { color: textPrimary }]}>{(data.weight / 10).toFixed(1)} kg</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageWrapper: { alignItems: 'center', marginTop: 20, marginBottom: 8 },
  image: { width: 220, height: 220, borderRadius: 14 },
  title: { textAlign: 'center', fontSize: 32, fontWeight: '800', textTransform: 'capitalize', marginBottom: 26 },
  card: { padding: 18, borderRadius: 14, marginBottom: 16, elevation: 2, shadowOpacity: 0.08, shadowRadius: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '700', marginBottom: 10 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 6 },
  badge: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 12, fontSize: 14, fontWeight: '500', textTransform: 'capitalize' },
  statRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  statText: { width: 120, fontSize: 15, fontWeight: '700', textTransform: 'capitalize' },
  barContainer: { flex: 1, height: 12, borderRadius: 10, overflow: 'hidden' },
  barFill: { height: '100%' },
  statValue: { width: 40, textAlign: 'right', fontSize: 15, fontWeight: '700' },
  infoBox: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 4 },
  infoDivider: { height: 1, marginVertical: 8, borderRadius: 4, backgroundColor: '#E5E7EB' },
  infoLabel: { fontSize: 16, fontWeight: '600' },
  infoValue: { fontSize: 17, fontWeight: '800' },
});
