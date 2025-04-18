import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Profile = () => {
  return (
    <SafeAreaView>
      <Link href={'/auth'} className='p-6'>auth</Link>
    </SafeAreaView>
  )
}

export default Profile

const styles = StyleSheet.create({})