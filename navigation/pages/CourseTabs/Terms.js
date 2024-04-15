import { View, Text, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { useState, useEffect, useRef } from 'react';

import { Header } from '../../../components/common/header';

import { useNavigation } from '@react-navigation/native';

import { addCourse, addProfessor, deleteCourse, getCourses } from '../../../database';

import styles from '../../../constants/Themes/defaultTheme';
import { COLORS } from '../../../constants';

import { BottomSheetModal, BottomSheetBackdrop, BottomSheetTextInput } from '@gorhom/bottom-sheet';

const Terms = ({ route }) => {

  const terms = ["Fall", "Winter", "Summer"];

  const { Year, Term } = route.params;

  //Course Inputs
  const [courseCode, onChangeCode] = useState('');
  const [courseName, onChangeName] = useState('');
  const [profName, onChangeProfName] = useState('');
  const [profEmail, onChangeProfEmail] = useState('');
  //Color/Icon

  const [courses, setCourses] = useState([]);
  const [dbChange, setDbChange] = useState(false); // State to trigger re-render

  useEffect(() => {
    getCourses(Year, Term)
      .then(coursesList => {
          setCourses(coursesList);
      })
      .catch(error => console.log('Error: ', error));
  }, [dbChange]);

  const navigation = useNavigation();
  const handleTermPress = (option) => {
    setModalVisible(false);
    navigation.navigate(option, { Year: Year, Term: option });
  }

  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["60%"];

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
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [modalVisible]);

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.4}
    //enableTouchThrough={false}
    />);
  const handleNewCourse = (setModalVisible) => {
    //set values back to default
    onChangeCode('');
    onChangeName('');
    onChangeProfName('');
    onChangeProfEmail('');

    setModalVisible(true);

    bottomSheetModalRef.current?.present();
  }

  const handleSaveCourse = () => {
    let tempCourseCode = courseCode.trim().length > 0 ? courseCode.trim() : null;
    let tempCourseName = courseName.trim().length > 0 ? courseName.trim() : null;
    let tempProfName = profName.trim().length > 0 ? profName.trim() : null;
    let tempProfEmail;

    //TEMP SOLUTION FOR COLOR
    // Generate random values for red, green, and blue components
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    // Convert the decimal values to hexadecimal
    const redHex = red.toString(16).padStart(2, '0');
    const greenHex = green.toString(16).padStart(2, '0');
    const blueHex = blue.toString(16).padStart(2, '0');

    // Concatenate the hex values to form the color code
    const colorHex = `#${redHex}${greenHex}${blueHex}`;


    if (tempCourseCode != null) {
      addCourse(tempCourseCode, tempCourseName, colorHex, tempProfName, Term, Year);
      if (tempProfName != null) {
        tempProfEmail = profEmail.trim().length > 0 ? profEmail.trim() : null;
        //if prof doesnt exist add prof and email
        addProfessor(tempProfName, tempProfEmail);
      }

      setDbChange(!dbChange);
    }

    //closes modal
    setModalVisible(false);
    //Closes BottomSheetModal
    bottomSheetModalRef.current.close();
  }

  const handleCoursePress = (option) => {
    setModalVisible(false);
    navigation.navigate('Course', { Course: option });
  }

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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {terms.map((option, index) => (
            <TouchableOpacity
              key={option}
              style={styles.termButtons(option, Term)}
              onPress={() => handleTermPress(option)}
            >
              <Text style={styles.termButtonsText}>
                {option}
              </Text>
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
              >
                {course.CourseCode !== null && (
                  <Text style={styles.courseCode}>
                    {course.CourseCode}
                  </Text>
                )}
                {course.CourseName !== null && (
                  <Text style={styles.courseName}>
                    {course.CourseName}
                  </Text>
                )}
                {course.ProfName !== null && (
                  <Text style={styles.courseProf}>
                    by {course.ProfName}
                  </Text>
                )}
              </TouchableOpacity>
            )
          })}

        </View>

      </View>



      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        keyboardBlurBehavior='restore'
        backgroundStyle={styles.bottomSheetBackground}
      >

        <View style={styles.bottomSheetView}>

          <View style={styles.titleSaveView}>

            <Text style={styles.bottomSheetTitle}>Add Course</Text>

            {/* Save Course */}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => handleSaveCourse()}
              > 
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
          </View>

          <View style={{ width: "100%", height: "100%"}}>
            {/* TODO: ADD ICONS BESIDE EACH TEXT INPUT */}
            <BottomSheetTextInput
              style={styles.inputStyles}
              onChangeText={onChangeCode}
              value={courseCode}
              placeholder='Add Course Code'
              placeholderTextColor={COLORS.gray}
            />
            <BottomSheetTextInput
              style={styles.inputStyles}
              onChangeText={onChangeName}
              value={courseName}
              placeholder='Add Course Name (Optional)'
              placeholderTextColor={COLORS.gray}
            />

            <BottomSheetTextInput
              style={styles.inputStyles}
              onChangeText={onChangeProfName}
              value={profName}
              placeholder='Add Prof. (Optional)'
              placeholderTextColor={COLORS.gray}
            />

            <BottomSheetTextInput
              style={styles.inputStyles}
              onChangeText={onChangeProfEmail}
              value={profEmail}
              placeholder='Add Prof. Email (Optional)'
              placeholderTextColor={COLORS.gray}
            />

          </View>

        </View>
      </BottomSheetModal>

      <View style={{
        marginTop: 90,
      }} />

    </ScrollView>
  )
}

export default Terms;