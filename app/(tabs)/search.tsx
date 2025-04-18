import React, { useState } from "react";
import {
	SafeAreaView,
	TextInput,
	ScrollView,
	View,
	Text,
	StyleSheet,
} from "react-native";
import { useTasks } from "@/context/TaskContext";
import ItemCard from "@/components/ItemCard";

const Search = () => {
	const { tasks } = useTasks();
	const [query, setQuery] = useState("");

	// Filter tasks by title or description
	const filteredTasks = tasks.filter(
		(task) =>
			task.title.toLowerCase().includes(query.toLowerCase()) ||
			task.description.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="p-4 mt-4">
				<Text className="" style={styles.searchText}>
					Search
				</Text>
				<TextInput
					style={styles.input}
					value={query}
					onChangeText={setQuery}
					placeholder="Search tasks..."
					placeholderTextColor="#999"
					className=" px-4 py-3 border border-zinc-300 text-base text-zinc-800 mt-2"
				/>
			</View>

			<ScrollView className="px-4 bg-white mt-1">
				{filteredTasks.length > 0 ? (
					filteredTasks.map((task) => <ItemCard key={task.id} {...task} />)
				) : (
					<Text className="text-center text-zinc-500 mt-10">
						No tasks found.
					</Text>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	searchText: {
		fontSize: 36,
    fontWeight:"700", // Changed from "xl" to a numeric value
    color:"#CF9FFF"
	},
	input: {
    backgroundColor:"#f5f5f5",
		height: 40,
		borderWidth: 0.4,
    borderRadius:10
	},
});

export default Search;
