import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="loading" />
      <Stack.Screen name="title" />
      <Stack.Screen name="character-creation" />
      <Stack.Screen name="load-game" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="credits" />
      <Stack.Screen name="index" />
    </Stack>
  );
}