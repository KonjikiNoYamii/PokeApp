import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllPokemonTab from '../screens/AllPokemonTab';
import TypeTabScreen from '../screens/TypeTabsScreen';
import { useTheme } from '../context/ThemeContext';

const TYPES = [
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ghost',
  'dragon',
  'fairy',
];
const Tab = createMaterialTopTabNavigator();

export default function TopTabsScreen() {
  const { isDark } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: true,
        tabBarScrollEnabled: true,
        tabBarStyle: {
          backgroundColor: isDark ? '#1f1f1f' : '#fff',
          elevation: 4,
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#ff3d3d',
          height: 3,
          borderRadius: 20,
        },
        tabBarLabelStyle: {
          fontWeight: 'bold',
          fontSize: 14,
          textTransform: 'capitalize',
          color: isDark ? '#f2f2f2' : '#222',
        },
      }}
    >
      <Tab.Screen name="All" component={AllPokemonTab} />

      {TYPES.map(type => (
        <Tab.Screen
          key={type}
          name={type}
          component={TypeTabScreen}
          initialParams={{ type }}
        />
      ))}
    </Tab.Navigator>
  );
}
