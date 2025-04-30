import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';
import color from '@/assets/colors/colors';


export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: color.ACCENT_YELLOW,
        headerStyle: { backgroundColor: color.DARK_GRAY,},
        headerShadowVisible: false,
        headerTintColor: color.WHITE,
        tabBarStyle: {  backgroundColor: color.DARK_GRAY,  },
    }}
    >

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'My Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
        }}
      />
    </Tabs>
  );
}
