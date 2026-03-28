import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { HeroUINativeProvider } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import 'react-native-reanimated';
import "../global.css"

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <HeroUINativeProvider>
          <Stack screenOptions={{ headerShown : false }}>
            <Stack.Screen name="(drawer)" />
            <Stack.Screen name="(auth)" />  
          </Stack>
          <StatusBar style="auto" /> 
        </HeroUINativeProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
} 
