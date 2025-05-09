import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import color from '@/assets/colors/colors';

export default function AuthLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: color.ACCENT_YELLOW,
      headerStyle: { backgroundColor: color.DARK_GRAY },
      headerShadowVisible: false,
      headerTintColor: color.WHITE,
      tabBarStyle: { backgroundColor: color.DARK_GRAY },
    }}>
      <Tabs.Screen
        name="login"
        options={{
          title: 'Log in',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
