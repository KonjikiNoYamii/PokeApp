import Sound from 'react-native-sound';
import { useEffect } from 'react';
import { Button } from 'react-native';

export default function PokemonSound({ cryUrl }: { cryUrl: string }) {
  const playSound = () => {
    const sound = new Sound(cryUrl, undefined, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      sound.play(() => {
        sound.release();
      });
    });
  };

  return <Button title="🎵 Dengarkan Suara Pokémon" onPress={playSound} />;
}
