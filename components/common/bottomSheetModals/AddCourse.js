import { forwardRef, useImperativeHandle, useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { addCourse, updateCourse, addProfessor } from "../../../database";

import styles from "../../../constants/Themes/defaultTheme";

import { COLORS } from "../../../constants";

import {
    BottomSheetModal,
    BottomSheetBackdrop,
    BottomSheetTextInput,
  } from '@gorhom/bottom-sheet';

const AddCourse = forwardRef((props, ref) => {

    const {
        Term,
        Year,
        setDbChange,
        dbChange,
        setModalVisible,
        course,
        closeEditCourse,
        // setEditModalVisible
    } = props;

    // Create a local ref for BottomSheetModal
    const localRef = useRef();

    const renderBackdrop = (props) => (
        <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.4}
            onPress={() => { setModalVisible(false) }}
        //enableTouchThrough={false}
        />
    );

    //Course Inputs
    const [courseCode, onChangeCode] = useState("");
    const [courseName, onChangeName] = useState("");
    const [profName, onChangeProfName] = useState("");
    const [profEmail, onChangeProfEmail] = useState("");

    useEffect(() => {
        //If we are editing a task then
        if (course) {
            onChangeCode(course.CourseCode);
            onChangeName(course.CourseName);
            onChangeProfName(course.ProfName);
            onChangeProfEmail("");
        }
    }, []);


    const snapPoints = ["60%"];


    // Expose the resetStates method to parent component
    useImperativeHandle(ref, () => ({
        ...localRef.current,
        resetStates,
    }));

    const resetStates = () => {
        //set all values back to default on new task
        onChangeCode("");
        onChangeName("");
        onChangeProfName("");
        onChangeProfEmail("");
    };

    const handleSaveCourse = () => {
        let tempCourseCode = (courseCode || "").trim().length > 0 ? courseCode.trim() : null;
        let tempCourseName = (courseName || "").trim().length > 0 ? courseName.trim() : null;
        let tempProfName = (profName || "").trim().length > 0 ? profName.trim() : null;
        let tempProfEmail;

        let colorHex = null;

        if (course) {
            // Editing existing course
            let values = {
                CourseCode: tempCourseCode,
                CourseName: tempCourseName,
                ProfName: tempProfName
            };

            // Update the course
            updateCourse(course, values);
            setDbChange(!dbChange);

            // Add professor if provided
            if (tempProfName && tempProfEmail) {
                addProfessor(tempProfName, tempProfEmail);
            }

            // Close edit modal if it exists
            if (closeEditCourse) {
                closeEditCourse();
            }
        }
        else {
            // Adding new course
            // Generate random color for new course
            const red = Math.floor(Math.random() * 256);
            const green = Math.floor(Math.random() * 256);
            const blue = Math.floor(Math.random() * 256);

            // Convert the decimal values to hexadecimal
            const redHex = red.toString(16).padStart(2, "0");
            const greenHex = green.toString(16).padStart(2, "0");
            const blueHex = blue.toString(16).padStart(2, "0");

            // Concatenate the hex values to form the color code
            colorHex = `#${redHex}${greenHex}${blueHex}`;

            // Add new course
            if (tempCourseCode) {
                addCourse(
                    tempCourseCode,
                    tempCourseName,
                    colorHex,
                    tempProfName,
                    Term,
                    Year
                );
                setDbChange(!dbChange);
            }

            // Add professor if provided
            if (tempProfName) {
                addProfessor(tempProfName, tempProfEmail);
            }
        }

        //closes modal
        setModalVisible(false);
        //Closes BottomSheetModal
        localRef.current.close();
    };

    return (
        <BottomSheetModal
            ref={localRef}
            index={0}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            keyboardBlurBehavior="restore"
            backgroundStyle={styles.bottomSheetBackground}
        >
            <View style={styles.bottomSheetView}>
                <View style={styles.titleSaveView}>
                    <Text style={styles.bottomSheetTitle}>
                        {!course && (`Add Course`)}
                        {course && (`Edit Course`)}
                    </Text>

                    {/* Save Course */}
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={() => handleSaveCourse()}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: "100%", height: "100%" }}>
                    {/* TODO: ADD ICONS BESIDE EACH TEXT INPUT */}
                    <BottomSheetTextInput
                        style={styles.inputStyles}
                        onChangeText={onChangeCode}
                        value={courseCode}
                        placeholder="Add Course Code"
                        placeholderTextColor={COLORS.gray}
                    />
                    <BottomSheetTextInput
                        style={styles.inputStyles}
                        onChangeText={onChangeName}
                        value={courseName}
                        placeholder="Add Course Name (Optional)"
                        placeholderTextColor={COLORS.gray}
                    />

                    <BottomSheetTextInput
                        style={styles.inputStyles}
                        onChangeText={onChangeProfName}
                        value={profName}
                        placeholder="Add Prof. (Optional)"
                        placeholderTextColor={COLORS.gray}
                    />

                    <BottomSheetTextInput
                        style={styles.inputStyles}
                        onChangeText={onChangeProfEmail}
                        value={profEmail}
                        placeholder="Add Prof. Email (Optional)"
                        placeholderTextColor={COLORS.gray}
                    />
                </View>
            </View>
        </BottomSheetModal>
    );
});

export default AddCourse;
