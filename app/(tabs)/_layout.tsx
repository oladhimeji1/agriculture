import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function TabsLayout() {

  const registerForPush = async () => {
    const { status } = await Notifications.requestPermissionsAsync();

    if (status !== 'granted') {
      console.log('Permission not granted');
      return;
    }

    // Recommended way – try both common locations Expo uses
    const projectId = 'd3c4498d-a871-47ae-bd0b-2c1e300b0af1'

    if (!projectId) {
      console.log('Project ID not found. Make sure your app is configured with EAS.');
      // You can hard-code it temporarily for debugging:
      // const projectId = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx';
      return;
    }

    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId,
      });

      console.log('Push token:', token.data);

      // Send token.data to your backend here
    } catch (error) {
      console.error('Failed to get push token:', error);
    }
  };

  registerForPush();

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Vaccination Reminder',
        body: 'Check flock health today',
      },
      trigger: null,
    });
  }

  scheduleNotification();
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
          paddingBottom: 10,
          height: 68,
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
        name="finances"
        options={{
          title: 'Finances',
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} name="finance" />
          ),
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          title: 'Health',
          tabBarIcon: ({ color, size }) => (
            <TabIcon color={color} size={size} name="health" />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ color, size, name }: { color: string; size: number; name: string }) {
  let icon: React.ReactNode;

  if (name === 'home') {
    icon = <Ionicons name="home-outline" size={size} color={color} />;
  } else if (name === 'checklist') {
    icon = <Ionicons name="checkbox-outline" size={size} color={color} />;
  } else if (name === 'finance') {
    icon = <Ionicons name="cash-outline" size={size} color={color} />;
  } else if (name === 'health') {
    icon = <Ionicons name="medkit-outline" size={size} color={color} />;
  } else {
    icon = <Text style={{ color, fontSize: size * 0.8 }}>●</Text>;
  }

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {icon}
    </View>
  );
}
