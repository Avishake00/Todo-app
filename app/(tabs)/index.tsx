import React, { useState, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import AddTaskButton from "@/components/AddTaskButton";
import TaskFilters, {
	SortOption,
	FilterOption,
} from "@/components/TaskFilters";
import { useTasks } from "@/context/TaskContext";
import ItemCard from "@/components/ItemCard";


const Today = () => {
	const { getTasksByDate } = useTasks();
	const today = new Date().toISOString().split("T")[0];
	const allTasks = getTasksByDate(today);

	// State for sort and filter options
	const [currentSort, setCurrentSort] = useState<SortOption>("newest");
	const [currentFilter, setCurrentFilter] = useState<FilterOption>("all");

	// Apply filters and sorting
	const tasks = useMemo(() => {
		// First apply filter
		let filteredTasks = allTasks;
		if (currentFilter !== "all") {
			filteredTasks = allTasks.filter(
				(task) => task.priority === currentFilter
			);
		}

		// Then apply sorting
		return [...filteredTasks].sort((a, b) => {
			if (currentSort === "newest") {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			} else if (currentSort === "oldest") {
				return new Date(a.date).getTime() - new Date(b.date).getTime();
			} else if (currentSort === "priority") {
				const priorityOrder = { high: 0, medium: 1, low: 2 };
				return priorityOrder[a.priority] - priorityOrder[b.priority];
			}
			return 0;
		});
	}, [allTasks, currentSort, currentFilter]);

	return (
		<View className="flex-1 bg-white">
			<TaskFilters
				currentSort={currentSort}
				currentFilter={currentFilter}
				onSortChange={setCurrentSort}
				onFilterChange={setCurrentFilter}
				dueItems={tasks.length}
				isToday={true}
			/>

		

			<ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
				{tasks.length > 0 ? (
					<View className="flex flex-col gap-0 mt-2 py-2 px-4">
						{tasks.map((task) => (
							<ItemCard key={task.id} {...task} />
						))}
					</View>
				) : (
					<Text className="text-center text-zinc-500 mt-10">
						No tasks for today 😌
					</Text>
				)}
			</ScrollView>
			<AddTaskButton isToday={true}/>
		</View>
	);
};

export default Today;
