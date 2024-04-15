import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { getNumTask } from '../../database';

import styles from '../../constants/Themes/defaultTheme';

const Home = () => {

  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const gifs = {
    dog: require('../../assets/gifs/dog-pitbull.gif'),
    monkey: require('../../assets/gifs/regretting-monkey.gif'),
    kurt: require('../../assets/gifs/kurt-angle-stare.gif'),
    ggs: require('../../assets/gifs/ggs.gif'),
  };

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
    }, [])
  );


  const handleDayPressed = (date) => {
    setSelectedDate(new Date(date));
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
        if (numTasks[index] >= 4) return returnGif('ggs');
        return;
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.defaultBackground}
    >
      <View style={styles.scheduleBackground}>

        <View style={styles.scheduleTitleView}>
          <Text style={styles.scheduleTitleText}>My Schedule</Text>
        </View>

        <View style={styles.weekView}>
          {dates.slice(0, 7).map((date, index) => {
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
                onPress={() => handleDayPressed(date)}
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
        <View style={styles.weekView}>
          {dates.slice(-7).map((date, index) => {
            let stringDate = date.getDate();
            let weekday = daysOfTheWeek[date.getDay()];

            let isSelected = date.getDate() === selectedDate.getDate()
              && (date.getMonth() + 1) === (selectedDate.getMonth() + 1)
              && date.getFullYear() === selectedDate.getFullYear();

            return (
              <TouchableOpacity
                style={styles.weekButton(false, isSelected)}
                key={index}
                title={stringDate}
                onPress={() => handleDayPressed(date)}
              >
                <View style={styles.weekDayView}>
                  <Text style={styles.weekButtonText}>{weekday}</Text>
                  <Text style={styles.dayButtonText}>{stringDate}</Text>
                </View>
                {gifPicker(index + 7)}
              </TouchableOpacity>
            )
          })}
        </View>
      </View>

      <View style={{
        marginTop: 80,
      }} />

    </ScrollView>
  )
}

export default Home;