import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type SortOption = "newest" | "oldest" | "priority";
export type FilterOption = "all" | "high" | "medium" | "low";

type TaskFiltersProps = {
	isToday: Boolean;
	dueItems: number;
	onSortChange: (sort: SortOption) => void;
	onFilterChange: (filter: FilterOption) => void;
	currentSort: SortOption;
	currentFilter: FilterOption;
};

const TaskFilters = ({
	isToday,
	dueItems,
	onSortChange,
	onFilterChange,
	currentSort,
	currentFilter,
}: TaskFiltersProps) => {
	const date = new Date();
	const [showFilters, setShowFilters] = useState(false);

	const toggleFilters = () => {
		setShowFilters(!showFilters);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>
					{isToday ? (
						<>
							{date.toLocaleString("en-IN", {
								weekday: "short",
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
							{dueItems > 0 ? ` (due - ${dueItems})` : ""}
						</>
					) : (
						`Future Tasks- ${dueItems}`
            
					)}
				</Text>

				<TouchableOpacity onPress={toggleFilters} style={styles.iconButton}>
					<Ionicons
						name={showFilters ? "options" : "options-outline"}
						size={22}
						color="#666"
					/>
				</TouchableOpacity>
			</View>

			{showFilters && (
				<View style={styles.filtersContainer}>
					<Text style={styles.label}>Sort by:</Text>
					<View style={styles.row}>
						{["newest", "oldest", "priority"].map((option) => (
							<TouchableOpacity
								key={option}
								onPress={() => onSortChange(option as SortOption)}
								style={[
									styles.filterChip,
									currentSort === option && styles.activeChip,
								]}
							>
								<Text
									style={[
										styles.chipText,
										currentSort === option && styles.activeChipText,
									]}
								>
									{option.charAt(0).toUpperCase() + option.slice(1)}
								</Text>
							</TouchableOpacity>
						))}
					</View>

					<Text style={styles.label}>Filter by:</Text>
					<View style={styles.row}>
						{(["all", "high", "medium", "low"] as FilterOption[]).map(
							(option) => {
								const colorStyle =
									currentFilter === option
										? option === "high"
											? styles.redChip
											: option === "medium"
											? styles.yellowChip
											: option === "low"
											? styles.greenChip
											: styles.activeChip
										: styles.filterChip;

								const textStyle =
									currentFilter === option
										? styles.activeChipText
										: styles.chipText;

								return (
									<TouchableOpacity
										key={option}
										onPress={() => onFilterChange(option)}
										style={[styles.filterChip, colorStyle]}
									>
										<Text style={textStyle}>
											{option.charAt(0).toUpperCase() + option.slice(1)}
										</Text>
									</TouchableOpacity>
								);
							}
						)}
					</View>
				</View>
			)}
		</View>
	);
};

export default TaskFilters;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		padding: 12,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		color: "#18181b",
	},
	iconButton: {
		padding: 8,
		borderRadius: 999,
		backgroundColor: "#f4f4f5",
	},
	filtersContainer: {
		marginTop: 12,
	},
	label: {
		fontSize: 13,
		fontWeight: "500",
		color: "#52525b",
		marginBottom: 8,
	},
	row: {
		flexDirection: "row",
		marginBottom: 12,
		flexWrap: "wrap",
	},
	filterChip: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 999,
		backgroundColor: "#f4f4f5",
		marginRight: 8,
		marginBottom: 6,
	},
	activeChip: {
		backgroundColor: "#8b5cf6",
	},
	redChip: {
		backgroundColor: "#ef4444",
	},
	yellowChip: {
		backgroundColor: "#facc15",
	},
	greenChip: {
		backgroundColor: "#22c55e",
	},
	chipText: {
		fontSize: 12,
		color: "#3f3f46",
	},
	activeChipText: {
		color: "#fff",
	},
});
