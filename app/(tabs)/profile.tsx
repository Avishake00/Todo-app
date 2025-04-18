import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();

  // Mock user data (replace with real data from context or auth)
  const user = {
    name: 'Avishake Bardhan',
    email: 'sbardhan683@gmail.com',
    image: 'https://i.pravatar.cc/150?img=3', // Example avatar
  };

  const handleLogout = () => {
    // Clear auth state or token here if needed
    setTimeout(() => {
       router.replace('/auth'); // Navigate to auth screen
    }, 1000);
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: user.image }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>

        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
    width: '90%',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
  },
  email: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 20,
  },
  logoutButton: {
    marginTop: 16,
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
