import { View, Text, TouchableOpacity, ScrollView, BackHandler, } from 'react-native';
import { useState, useEffect, useRef, useCallback} from 'react';

import { Header } from '../../../components/common/header';

import {useFocusEffect } from '@react-navigation/native';

import { getTasks } from '../../../database';

import styles from '../../../constants/Themes/defaultTheme';
import { COLORS } from '../../../constants';

import { CalendarUpcomingIcon } from '../../../icons';

import {EditTask, AddTask} from '../../../components/common/bottomSheetModals';

import {dateToFormattedDate} from '../../../components/common/useFunctions';

const Course = ({ route }) => {

  const { Course } = route.params;

  const [tasks, setTasks] = useState([]);
  const [dbChange, setDbChange] = useState(false); // State to trigger re-render

  useFocusEffect(
    useCallback(() => {
      getTasks(Course.CourseCode, Course.TermType, Course.StudyYear)
      .then(taskList => {
        setTasks(taskList);
      })
      .catch(error => console.log('Error: ', error));
    }, [dbChange])
  );

  //EDIT TASK BOTTOMSHEET
  const [editModalVisible, setEditModalVisible] = useState(false);
  const bottomSheetModalEditRef = useRef(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const handleHoldTask = (taskIndex) => {
    setSelectedTask(tasks[taskIndex]);

    setEditModalVisible(true);
    bottomSheetModalEditRef.current?.present();
  }

  //NEW TASK STATE
  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);


  const handleNewTask = () => {
    setModalVisible(true);
    bottomSheetModalRef.current?.resetStates();
    bottomSheetModalRef.current?.present();
  }

  //closes bottom sheet modal on back
  useEffect(() => {
    function backButtonHandler() {
      if (modalVisible) {
        bottomSheetModalRef.current.close();
        setModalVisible(false);
        return true;
      }
      if (editModalVisible) {
        bottomSheetModalEditRef.current.close();
        setEditModalVisible(false);
        return true;
      }

      return false;

    }
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [modalVisible, editModalVisible]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.defaultBackground}
    >
      <Header
        page={Course.CourseCode}
        handleNew={() => handleNewTask()}
      />

      <View style={styles.taskView}>
        {/* shows added Tasks */}
        {tasks.map((task, index) => {

          //CONVERTS DATE STRING TO NUMBERS THEN CONVERTS NUMBERS TO DATE.
          let dueDate = dateToFormattedDate(task.DueDate);

          //grade from decimal to whole number
          let grade;
          if (task.Grade != null) {
            grade = task.Grade * 100;
          }

          return (
            <TouchableOpacity
              key={index}
              style={styles.taskButton}
              //onPress={() => handleTaskPress(task)}
              onLongPress={() => handleHoldTask(index)}
            >
              <View style={styles.taskButtonView}>
                <View>
                  {task.TaskName !== null && (
                    <Text style={styles.taskName}>
                      {task.TaskName}
                    </Text>
                  )}
                  {task.TaskType !== null && (
                    <Text style={styles.taskType}>
                      {task.TaskType}
                    </Text>
                  )}
                  {task.DueDate !== null && (
                    <View style={styles.dueDateView}>
                      <View style={{ paddingRight: 10 }}>
                        <CalendarUpcomingIcon color={COLORS.white} />
                      </View>
                      <Text style={styles.taskDueDate}>
                        {dueDate}
                      </Text>
                    </View>

                  )}
                </View>

                {task.Grade !== null && (
                  <View style={styles.taskGradeView}>
                    <Text style={styles.taskGrade}>
                      {grade}
                    </Text>
                  </View>
                )}

              </View>

            </TouchableOpacity>
          )
        })}
      </View>

      {editModalVisible && (
        <EditTask
          ref={bottomSheetModalEditRef}
          task={selectedTask}
          setDbChange={setDbChange}
          dbChange={dbChange}
          setEditModalVisible={setEditModalVisible}
        />
      )}

      <AddTask
        ref={bottomSheetModalRef}
        Course={Course}
        setDbChange={setDbChange}
        dbChange={dbChange}
        setModalVisible={setModalVisible}
      />

      <View style={{
        marginTop: 90,
      }} />


    </ScrollView>
  )
}

export default Course;