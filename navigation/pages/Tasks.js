import { View, Text, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import { useState, useEffect, useRef, useCallback } from 'react';

import { Header } from '../../components/common/header';

import {useFocusEffect } from '@react-navigation/native';

import {  getAllTasks, getTasksFromToday, getCourseColor } from '../../database';

import styles from '../../constants/Themes/defaultTheme';
import { COLORS } from '../../constants';

import { CalendarUpcomingIcon, CourseIcon } from '../../icons';


import {EditTask, AddTask} from '../../components/common/bottomSheetModals';

const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [dbChange, setDbChange] = useState(false); // State to trigger re-render

  const [colors, setColors] = useState([]);

  useEffect(() => {
    Promise.all(tasks.map(task => getCourseColor(task.CourseCode, task.TermType, task.StudyYear)))
      .then(setColors)
      .catch(console.error);
  }, [tasks]);

  useFocusEffect(
    useCallback(() => {
      getTasksFromToday()
        .then(taskList => {
            setTasks(taskList);
        })
        .catch(error => console.log('Error: ', error));

      return () => {
      };
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
      else if (editModalVisible) {
        bottomSheetModalEditRef.current.close();
        setTaskSelectionVisible(false);
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
  }, [modalVisible, editModalVisible]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.defaultBackground}
    >
      <Header
        page={"Tasks"}
        handleNew={() => handleNewTask()}
      />

      <View style={styles.taskView}>
        {/* shows added Tasks */}
        {tasks.map((task, index) => {

          //CONVERTS DATE STRING TO NUMBERS THEN CONVERTS NUMBERS TO DATE.
          let dateComponents = task.DueDate.split("-").map(Number);
          let date = new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
          let dueDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
          let grade;
          //grade from decimal to whole number
          if (task.Grade != null) {
            grade = task.Grade * 100;
          }

          return (
            <TouchableOpacity
              key={index}
              style={styles.allTaskButton(colors[index])}
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
                    <View style={{paddingRight: 10}}>
                      <CalendarUpcomingIcon color={COLORS.white}/>
                    </View>
                    <Text style={styles.taskDueDate}>
                      {dueDate}
                    </Text>
                  </View>
                  )}
                  {task.CourseCode !== null && (
                    <View style={styles.dueDateView}>
                    <View style={{paddingRight: 10}}>
                    <CourseIcon color={COLORS.white} hasStroke={false} size={16}/>
                    </View>
                    <Text style={styles.taskDueDate}>
                      {task.CourseCode}
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

export default Tasks;