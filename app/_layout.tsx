import { Stack } from "expo-router";
import '../global.css'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TaskProvider } from '../context/TaskContext';
import { StatusBar } from "react-native";
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // TODO: Implement proper authentication state management
  useEffect(() => {
    // Check if user is authenticated
    // For now, we'll just show the auth screen
    setIsAuthenticated(false);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TaskProvider>
        <BottomSheetModalProvider>
          <Stack screenOptions={{ headerShown: false }}>
            {!isAuthenticated ? (
              <Stack.Screen name="auth" />
            ) : (
              <Stack.Screen name="(tabs)" />
            )}
          </Stack>
        </BottomSheetModalProvider>
      </TaskProvider>
    </GestureHandlerRootView>
  );
}
