import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from "react-native";
import { useState, useEffect, useRef } from "react";

import { Header } from "../../../components/common/header";

import { useNavigation } from "@react-navigation/native";

import {
  getCourses,
} from "../../../database";

import styles from "../../../constants/Themes/defaultTheme";

import { EditCourse } from "../../../components/common/bottomSheetModals";
import { AddCourse } from "../../../components/common/bottomSheetModals";

const Terms = ({ route }) => {
  const terms = ["Fall", "Winter", "Summer"];

  const { Year, Term } = route.params;

  const [courses, setCourses] = useState([]);
  const [dbChange, setDbChange] = useState(false); // State to trigger re-render

  useEffect(() => {
    getCourses(Year, Term)
      .then((coursesList) => {
        setCourses(coursesList);
      })
      .catch((error) => console.log("Error: ", error));
  }, [dbChange]);

  const navigation = useNavigation();
  const handleTermPress = (option) => {
    setModalVisible(false);
    navigation.navigate(option, { Year: Year, Term: option });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);


  const handleNewCourse = (setModalVisible) => {
    //set values back to default
    // onChangeCode("");
    // onChangeName("");
    // onChangeProfName("");
    // onChangeProfEmail("");

    setModalVisible(true);
    bottomSheetModalRef.current?.resetStates();
    bottomSheetModalRef.current?.present();
  };

  const handleCoursePress = (option) => {
    setModalVisible(false);
    navigation.navigate("Course", { Course: option });
  };

  //EDIT COURSE BOTTOMSHEET
  const [editModalVisible, setEditModalVisible] = useState(false);
  const bottomSheetModalEditRef = useRef(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const handleHoldCourse = (courseIndex) => {
    setSelectedCourse(courses[courseIndex]);

    setEditModalVisible(true);
    bottomSheetModalEditRef.current?.present();
  };

  //closes bottom sheet modal on back
  useEffect(() => {
    function backButtonHandler() {
      if (modalVisible) {
        bottomSheetModalRef.current.close();
        setModalVisible(false);
        return true;
      }
      else {
        return false;
      }
    }
    BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
    };
  }, [modalVisible, editModalVisible]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.defaultBackground}
    >
      <Header
        page="Courses"
        handleNew={() => handleNewCourse(setModalVisible)}
      />

      <View style={styles.termView}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {terms.map((option, index) => (
            <TouchableOpacity
              key={option}
              style={styles.termButtons(option, Term)}
              onPress={() => handleTermPress(option)}
            >
              <Text style={styles.termButtonsText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Courses buttons */}
        <View>
          {courses.map((course, index) => {
            return (
              <TouchableOpacity
                key={course.CourseCode} //temp make it curCourseCode
                style={styles.courseButton(course.ColorCode)}
                onPress={() => handleCoursePress(course)}
                onLongPress={() => handleHoldCourse(index)}
              >
                {course.CourseCode !== null && (
                  <Text style={styles.courseCode}>{course.CourseCode}</Text>
                )}
                {course.CourseName !== null && (
                  <Text style={styles.courseName}>{course.CourseName}</Text>
                )}
                {course.ProfName !== null && (
                  <Text style={styles.courseProf}>by {course.ProfName}</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {editModalVisible && (
        <EditCourse
          ref={bottomSheetModalEditRef}
          course={selectedCourse}
          setDbChange={setDbChange}
          dbChange={dbChange}
          setEditModalVisible={setEditModalVisible}
        />
      )}

      <AddCourse
        ref={bottomSheetModalRef}
        setDbChange={setDbChange}
        dbChange={dbChange}
        setModalVisible={setModalVisible}
        Term={Term}
        Year={Year}
      />

      <View
        style={{
          marginTop: 90,
        }}
      />
    </ScrollView>
  );
};

export default Terms;
