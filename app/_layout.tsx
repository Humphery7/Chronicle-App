import { Stack } from 'expo-router';

// This is the root of the app.
// expo-router needs this file to exist — don't delete it.
// Every screen file in the app/ folder is listed here.

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* The (tabs) folder = the splash/home tab screen */}
      <Stack.Screen name="(tabs)" />

      {/* The dashboard = the main app screen after GET STARTED */}
      <Stack.Screen name="dashboard" />
    </Stack>
  );
}
