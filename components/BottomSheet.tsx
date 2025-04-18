import React, { useCallback, useRef, useMemo, forwardRef } from "react";
import { View, Text, Button, TouchableOpacity, Dimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
	BottomSheetView,
	BottomSheetBackdrop,
	BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { colors } from "../theme";
import Ionicons from "@expo/vector-icons/Ionicons";

const TodoBottomSheet = () => {
	const bottomSheetRef = useRef<BottomSheetModal>(null);
	const { height: SCREEN_HEIGHT } = Dimensions.get("window");

	const handleSheetChanges = useCallback((index: number) => {
		console.log("Bottom Sheet index:", index);
	}, []);

	const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

	const renderBackdrop = useCallback(
		(props: any) => (
			<BottomSheetBackdrop
				{...props}
				disappearsOnIndex={-1}
				appearsOnIndex={0}
				opacity={0.5}
			/>
		),
		[]
	);

	const openBottomSheet = () => {
		bottomSheetRef.current?.present();
	};

	const closeBottomSheet = () => {
		bottomSheetRef.current?.dismiss();
	};

	return (
		<GestureHandlerRootView className="flex-1 bg-background justify-center">
			<View className="items-center p-5">
				<TouchableOpacity onPress={openBottomSheet} className="bg-blue-500 p-4">
					<Ionicons name="add-circle-sharp" size={90} color="#CF9FFF" />
				</TouchableOpacity>
			</View>

			<BottomSheetModal
				ref={bottomSheetRef}
				index={-1}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				enablePanDownToClose={true}
				backdropComponent={renderBackdrop}
				backgroundStyle={{
					backgroundColor: colors.card,
					borderTopLeftRadius: 24,
					borderTopRightRadius: 24,
				}}
				handleIndicatorStyle={{
					backgroundColor: colors.border,
					width: 40,
				}}
				enableOverDrag={false}
				animateOnMount={true}
			>
				<BottomSheetView className="flex-1 p-6 items-center justify-center">
					<Text className="text-lg mb-5 text-white">
						🎉 Bottom Sheet Content
					</Text>
					<TouchableOpacity
						onPress={closeBottomSheet}
						className="px-5 py-2.5 bg-border rounded-lg"
					>
						<Text className="font-bold text-white">Close</Text>
					</TouchableOpacity>
				</BottomSheetView>
			</BottomSheetModal>
		</GestureHandlerRootView>
	);
};

export default TodoBottomSheet;
