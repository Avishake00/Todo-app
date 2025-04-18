import { StyleSheet, Platform } from "react-native"; // added Platform
import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: "#CF9FFF",
				tabBarInactiveTintColor: "#aaa",
				tabBarStyle: {
					position: "absolute",
					bottom: 0,
					backgroundColor: "#fff",
					borderRadius: 0,
					height: 75,
					paddingBottom: 10,
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 4,
					},
					shadowOpacity: 0.2,
					shadowRadius: 10,
					elevation: 10,
				},
				tabBarLabelStyle: {
					fontSize: 12,
					fontWeight: "600",
					paddingBottom: 5,
				},
				headerShown: true,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Today",
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome name="home" size={focused ? 28 : 24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="upcoming"
				options={{
					title: "Upcoming",
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome name="calendar" size={focused ? 28 : 24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
                    headerShown:false,
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome name="search" size={focused ? 28 : 24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
                    headerShown:false,
					tabBarIcon: ({ color, focused }) => (
						<FontAwesome name="user" size={focused ? 28 : 24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
};

export default TabLayout;
