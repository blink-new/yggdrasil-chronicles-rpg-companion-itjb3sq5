import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="title" />
      <Stack.Screen name="character-creation" />
    </Stack>
  );
}
