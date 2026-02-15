import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.iconInactive,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.borderLight,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          ...typography.captionSmall,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} name="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} name="checklist" />
          ),
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} name="insights" />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} name="settings" />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ color, size, name }: { color: string; size: number; name: string }) {
  let iconText: string | React.ReactNode = '●';
  if (name === 'home') iconText = <Ionicons name="home-outline" size={size} color={color} />;
  else if (name === 'checklist') iconText = <Ionicons name="checkbox-outline" size={size} color={color} />;
  else if (name === 'insights') iconText = <Ionicons name="bar-chart" size={size} color={color} />;
  else if (name === 'settings') iconText = <Ionicons name="settings-outline" size={size} color={color} />;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.6, color }}>{iconText}</Text>
    </View>
  );
}

import { Ionicons } from '@expo/vector-icons';
import { Text } from 'react-native';

