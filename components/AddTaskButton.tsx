import React, { useCallback, useRef, useMemo, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet,
	KeyboardAvoidingView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
	BottomSheetModal,
	BottomSheetBackdrop,
	BottomSheetTextInput,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as Haptics from "expo-haptics";
import { useTasks } from "@/context/TaskContext";

type Props = {
	isToday: boolean;
};

const AddTaskButton = ({ isToday }: Props) => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [showDatePicker, setShowDatePicker] = useState(false);

	const { addTask } = useTasks();
	const snapPoints = useMemo(() => ["60%"], []);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.3}
			/>
		),
		[]
	);

	const openBottomSheet = () => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		bottomSheetRef.current?.present();
	};

	const closeBottomSheet = () => {
		bottomSheetRef.current?.dismiss();
	};

	const handleAddTask = async () => {
		if (!title.trim()) return;

		const newTask = {
			title,
			description,
			priority,
			date: isToday ? new Date().toISOString() : selectedDate.toISOString(),
		};

		await addTask(newTask);
		setTitle("");
		setDescription("");
		setPriority("low");
		setSelectedDate(new Date());
		closeBottomSheet();
	};

	return (
		<>
			<TouchableOpacity onPress={openBottomSheet} style={styles.fab}>
				<Ionicons name="add-circle-sharp" size={72} color="#CF9FFF" />
			</TouchableOpacity>

			<BottomSheetModal
				ref={bottomSheetRef}
				index={0}
				snapPoints={snapPoints}
				enablePanDownToClose
				backdropComponent={renderBackdrop}
				keyboardBehavior="interactive"
				keyboardBlurBehavior="restore"
				backgroundStyle={styles.sheetBackground}
				handleIndicatorStyle={styles.handleIndicator}
			>
				<BottomSheetView style={styles.sheetContent}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={{ flex: 1 }}
					>
						<Text style={styles.title}>Add New Task</Text>

						<BottomSheetTextInput
							placeholder="Title"
							value={title}
							onChangeText={setTitle}
							style={styles.input}
							placeholderTextColor="#888"
						/>

						<BottomSheetTextInput
							placeholder="Description"
							value={description}
							onChangeText={setDescription}
							style={styles.input}
							placeholderTextColor="#888"
						/>

						{/* Date Picker */}
						{!isToday && (
							<>
								<TouchableOpacity
									style={styles.input}
									onPress={() => setShowDatePicker(true)}
								>
									<Text style={{ color: "#1A1A1A" }}>
										{selectedDate.toDateString()}
									</Text>
								</TouchableOpacity>

								{showDatePicker && (
									<DateTimePicker
										value={selectedDate}
										mode="date"
										display="default"
										onChange={(event, date) => {
											setShowDatePicker(false);
											if (date) setSelectedDate(date);
										}}
									/>
								)}
							</>
						)}

						<View style={styles.priorityRow}>
							{["low", "medium", "high"].map((level) => (
								<TouchableOpacity
									key={level}
									onPress={() => setPriority(level as any)}
									style={[
										styles.priorityButton,
										priority === level && styles.prioritySelected,
									]}
								>
									<Text
										style={[
											styles.priorityText,
											priority === level && { color: "#fff" },
										]}
									>
										{level}
									</Text>
								</TouchableOpacity>
							))}
						</View>

						<TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
							<Text style={styles.addButtonText}>Add Task</Text>
						</TouchableOpacity>
					</KeyboardAvoidingView>
				</BottomSheetView>
			</BottomSheetModal>
		</>
	);
};

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		bottom: 112,
		right: 16,
		zIndex: 10,
	},
	sheetBackground: {
		backgroundColor: "white",
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
	},
	handleIndicator: {
		backgroundColor: "#ccc",
		width: 40,
		alignSelf: "center",
	},
	sheetContent: {
		flex: 1,
		paddingHorizontal: 16,
		paddingVertical: 16,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#1A1A1A",
		marginBottom: 16,
	},
	input: {
		backgroundColor: "#F3F4F6",
		color: "#1A1A1A",
		borderRadius: 12,
		padding: 12,
		fontSize: 16,
		marginBottom: 12,
		borderWidth: 1,
		borderColor: "#E5E7EB",
	},
	priorityRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
	},
	priorityButton: {
		flex: 1,
		marginHorizontal: 4,
		paddingVertical: 10,
		borderRadius: 12,
		backgroundColor: "#E5E7EB",
		alignItems: "center",
	},
	prioritySelected: {
		backgroundColor: "#A855F7",
	},
	priorityText: {
		color: "#1A1A1A",
		textTransform: "capitalize",
	},
	addButton: {
		backgroundColor: "#A855F7",
		paddingVertical: 14,
		borderRadius: 12,
		marginTop: 8,
	},
	addButtonText: {
		color: "#fff",
		fontSize: 16,
		textAlign: "center",
		fontWeight: "600",
	},
});

export default AddTaskButton;
