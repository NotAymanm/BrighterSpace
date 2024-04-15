import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import { useState, useEffect, useCallback, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { getNumTask, getTask, getCourseColor } from '../../database';

import styles from '../../constants/Themes/defaultTheme';

import { CalendarUpcomingIcon, CourseIcon } from '../../icons'

import { COLORS } from '../../constants';

const Home = () => {

  const [tasks, setTasks] = useState([]);
  const [buttonChange, setButtonChange] = useState(false);

  const [isScrollViewRendered, setIsScrollViewRendered] = useState(false);

  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const gifs = {
    dog: require('../../assets/gifs/dog-pitbull.gif'),
    monkey: require('../../assets/gifs/regretting-monkey.gif'),
    kurt: require('../../assets/gifs/kurt-angle-stare.gif'),
    ggs: require('../../assets/gifs/ggs.gif'),
    catGoBoom: require('../../assets/gifs/cat-bomb.gif'),
    sadCat: require('../../assets/gifs/sad-cat.gif'),
    insaneCat: require('../../assets/gifs/insane-cat.gif'),
  };

  const scrollViewRef = useRef();
  const [scrollViewWidth, setScrollViewWidth] = useState(0);

  // Get the current date
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get the previous Sunday
  const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));

  // Generate an array of the next 14 dates
  const dates = [...Array(14)].map((_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const [numTasks, setNumTasks] = useState(Array(14).fill(0));
  useFocusEffect(
    useCallback(() => {
      dates.forEach((date, index) => {
        let testDate = date.toISOString().split('T')[0];
        getNumTask(testDate).then(tasks => {
          setNumTasks(prevNumTasks => {
            let newNumTasks = [...prevNumTasks];
            newNumTasks[index] = tasks;
            return newNumTasks;
          });
        }).catch(error => {
          console.error(`Error getting number of tasks: ${error.message}`);
        });
      });

      setButtonChange(!buttonChange);

    }, [])
  );

  useEffect(() => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    let index = dates.findIndex(date => date.getTime() === today.getTime());

    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        //(touchableOpacity + magin size) + 
        x: (index * (60 + 5)) + 10,
        animated: true,
      });
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      let checkDate = selectedDate.getFullYear()
        + '-'
        + (selectedDate.getMonth() + 1).toString().padStart(2, '0')
        + '-'
        + selectedDate.getDate().toString().padStart(2, '0');

      getTask(checkDate)
        .then(taskList => {
            setTasks(taskList);
        })
        .catch(error => console.log('Error: ', error));

    }, [buttonChange])
  );

  const [colors, setColors] = useState([]);
  useEffect(() => {
    if (tasks.length > 0) {
      Promise.all(tasks.map(task => getCourseColor(task.CourseCode, task.TermType, task.StudyYear)))
        .then(setColors)
        .catch(console.error);
    }
  }, [tasks]);

  const handleDayPressed = (date) => {
    setSelectedDate(new Date(date));
    setButtonChange(!buttonChange);
  }

  const handleTaskPress = (task) => {

  }

  const gifPicker = (index) => {

    const returnGif = (gifKey) => {
      return <View style={styles.taskDue}>
        <Image source={gifs[gifKey]} fadeDuration={0} style={{ width: "100%", height: "100%" }} />
      </View>;
    }

    switch (numTasks[index]) {
      case 1: return returnGif('dog');
      case 2: return returnGif('monkey');
      case 3: return returnGif('kurt');
      default:
        if (numTasks[index] >= 4 && numTasks[index] < 7) return returnGif('ggs');
        if (numTasks[index] >= 7) return returnGif('insaneCat');
        return;
    }
  }

  return (
    <View style={[styles.defaultBackground, { width: "100%", height: "100%" }]}>
      <View style={styles.scheduleBackground}>
        <View style={styles.scheduleTitleView}>
          <Text style={styles.scheduleTitleText}>My Schedule</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 15,
            paddingRight: 10,
          }}
          onLayout={(event) => {
            var { width } = event.nativeEvent.layout;
            setScrollViewWidth(width);
            setIsScrollViewRendered(true);
          }}
        >
          <View style={styles.weekView}>
            {dates.map((date, index) => {
              let stringDate = date.getDate();
              let weekday = daysOfTheWeek[date.getDay()];

              // Get today's date
              let today = new Date();
              // Remove the time part of today's date
              today.setHours(0, 0, 0, 0);

              let beforeToday = date < today;

              let isSelected = date.getDate() === selectedDate.getDate()
                && (date.getMonth() + 1) === (selectedDate.getMonth() + 1)
                && date.getFullYear() === selectedDate.getFullYear();

              return (
                <TouchableOpacity
                  style={styles.weekButton(beforeToday, isSelected)}
                  key={index}
                  title={stringDate}
                  onPress={() => {
                    handleDayPressed(date);
                    scrollViewRef.current.scrollTo({
                      x: (index * (60 + 5) - (scrollViewWidth / 2) + (60 / 2) + 14),
                      animated: true,
                    });
                  }}
                >
                  <View style={styles.weekDayView}>
                    <Text style={styles.weekButtonText}>{weekday}</Text>
                    <Text style={styles.dayButtonText}>{stringDate}</Text>
                  </View>
                  {gifPicker(index)}
                </TouchableOpacity>
              )
            })}
          </View>
        </ScrollView>
      </View>

      {isScrollViewRendered && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.defaultBackground}
        >
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
                  onPress={() => handleTaskPress(task)}
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
                      {task.CourseCode !== null && (
                        <View style={styles.dueDateView}>
                          <View style={{ paddingRight: 10 }}>
                            <CourseIcon color={COLORS.white} hasStroke={false} size={16} />
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

          <View style={{
            marginTop: 90,
          }} />

        </ScrollView>
      )}
    </View>
  )
}

export default Home;