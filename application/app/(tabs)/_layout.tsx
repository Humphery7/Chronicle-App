import { Tabs } from 'expo-router';

// This file sets up the bottom tab bar.
// expo-router needs this file to exist — don't delete it.
// Add a new <Tabs.Screen> here when you want a new tab.

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
      {/* <Tabs.Screen name='aiReflection' options={{title: 'Reflection'}}/> */}
    </Tabs>
  );
}
