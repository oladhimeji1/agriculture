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
        name="checklist"
        options={{
          title: 'Checklist',
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
  let iconText = '●';
  if (name === 'home') iconText = '🏠';
  else if (name === 'checklist') iconText = '✓';
  else if (name === 'insights') iconText = '📊';
  else if (name === 'settings') iconText = '⚙️';
  
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size * 0.6, color }}>{iconText}</Text>
    </View>
  );
}

import { Text } from 'react-native';
