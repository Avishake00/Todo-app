// theme.js
import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme(); // 'light' or 'dark'

export const colors = {
  background: colorScheme === 'dark' ? '#121212' : '#ffffff',
  text: colorScheme === 'dark' ? '#ffffff' : '#000000',
  card: colorScheme === 'dark' ? '#1e1e1e' : '#f5f5f5',
  border: colorScheme === 'dark' ? '#333' : '#ddd',
  // Add more theme-specific colors here
};
