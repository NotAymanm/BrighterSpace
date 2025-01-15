import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { useState, useRef, forwardRef, useEffect, useImperativeHandle } from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { addNotification, addTask, updateTask } from '../../../database';

import styles from '../../../constants/Themes/defaultTheme';
import { COLORS } from '../../../constants';

import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';


import { scheduleNotification } from '../../../app/notify';

import SelectTask from './SelectTask';
import PickCourse from './PickCourse';

import { getAllCourses } from '../../../database';

import {dateToFormattedDate, dateToString} from '../../../components/common/useFunctions';

const AddTask = forwardRef((props, ref) => {

  const {
    Course,
    setDbChange,
    dbChange,
    setModalVisible, 
    task,
    closeEditTask
  } = props;

  // Create a local ref for BottomSheetModal
  const localRef = useRef();

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.6}
      onPress={() => { setModalVisible(false) }}
    />
  );

  //Task selection and weight states
  const [taskName, setTaskName] = useState('');
  const [taskWeight, setTaskWeight] = useState('');
  const [chosenDate, setChosenDate] = useState("");
  const [chosenTask, setChosenTask] = useState("Task Type:");
  const [chosenCourse, setChosenCourse] = useState("Course:");
  const [chosenFormattedDate, setFormattedDate] = useState('Add Due Date:');

  useEffect(() => {
    //If we are editing a task then
    if (task) {
      setChosenTask(task.TaskType);
      setTaskName(task.TaskName);
      if(task.Weight > 0) setTaskWeight((task.Weight).toString());

      let dueDate = dateToFormattedDate(task.DueDate);
      setFormattedDate(dueDate);
      setChosenDate(task.DueDate);
    }
  }, []);

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    getAllCourses()
      .then(coursesList => {
        setCourses(coursesList);
      })
      .catch(error => console.log('Error: ', error));
  }, []);

  const snapPoint = Course || task ? "60%" : "70%";

  const snapPoints = [snapPoint];

  const resetStates = () => {
    //set all values back to default on new task
    setTaskName('');
    setTaskWeight('');
    setChosenDate("");
    setChosenTask("Task Type:");
    setChosenCourse("Course:");
    setFormattedDate('Add Due Date:');
  }

  // Expose the resetStates method to parent component
  useImperativeHandle(ref, () => ({
    ...localRef.current,
    resetStates,
  }));

  //TASK COURSE MODAL
  const [courseSelectionVisible, setCourseSelectionVisible] = useState(false);
  const bottomSheetModalCourseRef = useRef(null);
  const handlePickCourse = () => {
    //Opens BottomSheetModal
    setCourseSelectionVisible(true);
    bottomSheetModalCourseRef.current.present();
  }

  //TASK TYPE BOTTOMSHEET MODAL
  const [taskSelectionVisible, setTaskSelectionVisible] = useState(false);
  const bottomSheetModalTaskRef = useRef(null);
  const handlePickTask = () => {
    //Opens BottomSheetModal
    setTaskSelectionVisible(true);
    bottomSheetModalTaskRef.current.present();
  }


  //DATE STATES
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (selectedDate) => {
    let tempDate = new Date(selectedDate);

    let fDate = dateToString(tempDate);

    //Formatted Date
    let formattedDate = tempDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    setChosenDate(fDate);
    setFormattedDate(formattedDate);

    hideDatePicker();

  };

  //SAVE BUTTON
  const handleSaveTask = () => {
    if (chosenTask != "Task Type:" && chosenDate.length > 0) {

      let checkCourse = Course;
      if (!checkCourse && !task) {
        checkCourse = chosenCourse;
      }
      else if(task){
        checkCourse = {
          CourseCode: task.CourseCode,
          TermType: task.TermType,
          StudyYear: task.StudyYear,
        }
      }


      let tempTaskName = taskName.trim().length > 0 ? taskName.trim() : chosenTask;

      //check if sum of tasks weight + taskWeight > 100, if it does, taskWeight = 0 else goes through
      //MAKE WEIGHT ONLY NUMBER INPUTS FROM 0 TO 100
      //CHECK IF WEIGHT IS NUMBER
      //CONVERT WEIGHT TO DECIMAL VALUE: 90 => 0.9
      //let tempTaskWeight = taskWeight.length > 0 ? taskWeight : 0;

      //CONVERTS DATE STRING TO NUMBERS THEN CONVERTS NUMBERS TO DATE.
      let dateComponents = chosenDate.split("-").map(Number);
      let notificationDate = new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
      //console.log(notificationDate.toLocaleDateString());
      // Set the time to 4pm (16)
      notificationDate.setHours(16, 0, 0);

      //DEBUGING
      // let now = new Date();
      // now.setMinutes(now.getMinutes() + 1);
      // now.setSeconds(0);
      // now.setMilliseconds(0);
      // notificationDate = now;

      for (let i = 0; i < 2; i++) {
        let title = i == 0 ?
          `${tempTaskName} for ${checkCourse.CourseCode} is Due Today` :
          `${tempTaskName} for ${checkCourse.CourseCode} is Due in 2 Days`;

        let notificationID = scheduleNotification(title, chosenTask, notificationDate);
        //CHANGE today BACK TO chosenDate AFTER TEST
        addNotification(notificationID, tempTaskName, chosenDate, checkCourse.CourseCode, checkCourse.TermType, checkCourse.StudyYear);

        //set notification date 2 days prior
        notificationDate.setDate(notificationDate.getDate() - 2);
        // Set the time to 6pm (18)
        notificationDate.setHours(18, 0, 0);
      }

      let values = {
        TaskName: tempTaskName,
        TaskType: chosenTask,
        Weight: 0,
        DueDate: chosenDate,
        Grade: null,
        CourseCode: checkCourse.CourseCode,
        TermType: checkCourse.TermType,
        StudyYear: checkCourse.StudyYear,
      }

      if(task){
        updateTask(task, values);
      }
      else{
        addTask(values);
      }

      setDbChange(!dbChange);
    }

    //Closes BottomSheetModal
    setModalVisible(false);
    ref.current?.close();

    if(closeEditTask) closeEditTask();

  }

  //closes bottom sheet modal on back
  useEffect(() => {
    function backButtonHandler() {
      if (courseSelectionVisible) {
        bottomSheetModalCourseRef.current.close();
        setCourseSelectionVisible(false);
      }
      if (taskSelectionVisible) {
        bottomSheetModalTaskRef.current.close();
        setTaskSelectionVisible(false);
      }
      if (courseSelectionVisible || taskSelectionVisible) {
        return true;
      }

      return false;
    }
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [taskSelectionVisible, courseSelectionVisible]);

  return (

    <BottomSheetModal
      ref={localRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      keyboardBlurBehavior='restore'
      backgroundStyle={styles.bottomSheetBackground}
    >

      <View style={styles.bottomSheetView}>

        <View style={styles.titleSaveView}>

          <Text style={styles.bottomSheetTitle}>
            {!task && (`Add Task`)}
            {task && (`Edit Task`)}
          </Text>

          {/* Save Task */}
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => handleSaveTask()}
          >
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>

        </View>

        <View style={{ width: "100%", height: "100%" }}>
          {/* Task Type List of options to choose */}

          {!Course && !task && (
            <>
              <PickCourse
                ref={bottomSheetModalCourseRef}
                Courses={courses}
                setModalVisible={setCourseSelectionVisible}
                setChosenCourse={setChosenCourse}
              >
              </PickCourse>

              <TouchableOpacity
                style={styles.buttonStyles(false)}
                onPress={() => handlePickCourse()}
              >
                <Text
                  style={styles.buttonText}>
                  {!chosenCourse.CourseCode && chosenCourse}
                  {chosenCourse.CourseCode}
                </Text>
              </TouchableOpacity>
            </>
          )}


          <TouchableOpacity
            style={styles.buttonStyles(false)}
            onPress={() => handlePickTask()}
          >
            <Text
              style={styles.buttonText}>
              {chosenTask}
            </Text>
          </TouchableOpacity>

          <SelectTask ref={bottomSheetModalTaskRef} setChosenTask={setChosenTask} setTaskSelectionVisible={setTaskSelectionVisible} />

          {/* Due Date */}
          <TouchableOpacity
            style={styles.buttonStyles(false)}
            onPress={showDatePicker}
          >
            <Text
              style={styles.buttonText}
            >
              {chosenFormattedDate}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />

          <BottomSheetTextInput
            style={styles.inputStyles}
            onChangeText={setTaskName}
            value={taskName}
            placeholder='Task Name (Optional)'
            placeholderTextColor={COLORS.gray}
          />

          <BottomSheetTextInput
            style={styles.inputStyles}
            onChangeText={setTaskWeight}
            value={taskWeight}
            placeholder='Weight (Optional)'
            placeholderTextColor={COLORS.gray}
            keyboardType='number-pad'
          />

          {/*  */}

        </View>

      </View>
    </BottomSheetModal>
  )
});

export default AddTask;