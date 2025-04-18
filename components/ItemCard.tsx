import React from "react";
import {
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	Alert,
	TextInput,
} from "react-native";

import { useTasks } from "@/context/TaskContext";
import type { Task } from "@/context/TaskContext";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

const ItemCard = ({ id, title, description, priority, date }: Task) => {
	const { deleteTask } = useTasks();
	const formattedDate = new Date(date).toLocaleDateString("en-GB", {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	const priorityColor =
		priority === "high"
			? "text-red-500"
			: priority === "medium"
			? "text-yellow-500"
			: "text-green-500";

	const handleDelete = () => {
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		Alert.alert("Task Completed", "Are you sure you completed this task?", [
			{
				text: "Cancel",
				style: "destructive",
			},
			{
				text: "Confirm",
				onPress: async () => {
					await deleteTask(id);
					// Show toast message
					Alert.alert("Success", "Task deleted successfully");
				},
				style: "default",
			},
		]);
	};

	return (
		<View className="flex-row w-full items-start bg-white rounded-xl shadow-sm border border-zinc-200 p-4 mb-2">
			<TouchableOpacity
				onPress={handleDelete}
				className="p-2 rounded-full bg-zinc-100 mt-3"
			>
				<Ionicons name="ellipse-outline" size={24} color="green" />
			</TouchableOpacity>

			<View className="ml-3 flex-1">
				<Text className="text-lg font-semibold">{title}</Text>
				<Text className="text-sm text-zinc-600">{description}</Text>

				<View className="flex-row justify-between items-center mt-2">
					<Text className={`text-xs font-bold ${priorityColor}`}>
						{priority.toUpperCase()}
					</Text>
					<Text className="text-xs text-zinc-500">{formattedDate}</Text>
				</View>
			</View>
		</View>
	);
};

export default ItemCard;