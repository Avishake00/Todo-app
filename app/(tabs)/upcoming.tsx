import React, { useState, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import AddTaskButton from "@/components/AddTaskButton";
import TaskFilters, {
	SortOption,
	FilterOption,
} from "@/components/TaskFilters";
import { useTasks } from "@/context/TaskContext";
import ItemCard from "@/components/ItemCard";

const Upcoming = () => {
	const { tasks } = useTasks();

	const [currentSort, setCurrentSort] = useState<SortOption>("newest");
	const [currentFilter, setCurrentFilter] = useState<FilterOption>("all");

	const filteredTasks = useMemo(() => {
		let fTasks = tasks.filter(task => {
			// Exclude today's tasks
			const taskDate = new Date(task.date).toISOString().split("T")[0];
			const today = new Date().toISOString().split("T")[0];
			return taskDate !== today;
		});

		if (currentFilter !== "all") {
			fTasks = fTasks.filter((task) => task.priority === currentFilter);
		}

		return [...fTasks].sort((a, b) => {
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
	}, [tasks, currentSort, currentFilter]);

	return (
		<View className="flex-1 bg-white">
			<TaskFilters
				currentSort={currentSort}
				currentFilter={currentFilter}
				onSortChange={setCurrentSort}
				onFilterChange={setCurrentFilter}
				dueItems={filteredTasks.length}
        isToday={false}
			/>

			<ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
				{filteredTasks.length > 0 ? (
					<View className="flex flex-col gap-0 mt-2 py-2 px-4">
						{filteredTasks.map((task) => (
							<ItemCard key={task.id} {...task} />
						))}
					</View>
				) : (
					<Text className="text-center text-zinc-500 mt-10">
						No upcoming tasks 🎉
					</Text>
				)}
			</ScrollView>

			<AddTaskButton isToday={false} />
		</View>
	);
};

export default Upcoming;
