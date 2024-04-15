import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

import { Header } from '../../../components/common/header';

import { addYear, addTerm, deleteYear, deleteTerm, getYears, checkYearExists } from '../../../database';

import styles from '../../../constants/Themes/defaultTheme';

const Year = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);
  const [dbChange, setDbChange] = useState(false); // State to trigger re-render

  useEffect(() => {
    getYears()
      .then(years => {
        //console.log('Years in the database: ', years);
        setSelectedYears(years);
      })
      .catch(error => {
        console.error('Error fetching years: ', error);
      });
  }, [dbChange]);

  const handleAddYear = (option) => {

    checkYearExists(option)
      .then(yearExists => {
        if (yearExists) {
          //remove year
          deleteYear(option);
          deleteTerm("Fall", option);
          deleteTerm("Winter", option);
          deleteTerm("Summer", option);
        } else {
          //add year
          addYear(option);
          addTerm("Fall", option);
          addTerm("Winter", option);
          addTerm("Summer", option);
        }
        setDbChange(!dbChange); // Toggle dbChange state to trigger re-render
      })
      .catch(error => console.log('Error: ', error));
  };

  const navigation = useNavigation();
  const handleYearPress = (option) => {
    navigation.navigate('TermNavigator', { Year: option });
  }

  const handleNewYear = (setModalVisible) => {
    let year = new Date().getFullYear();
    year--;

    if (options.length == 0) {
      for (let i = 0; i < 4; i++) {
        setOptions(options => [...options, year + "-" + ++year]);
      }
    }
    setModalVisible(true);
  }

  return (


    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.defaultBackground}
    >

      <Header
        page="Years"
        handleNew={() => handleNewYear(setModalVisible)}
      />

      <View
        style={styles.yearView}
      >
        {/* Selected Option Button */}
        {selectedYears.map((option, index) => (
          <TouchableOpacity
            key={option}
            style={styles.selectedYears}
            onPress={() => handleYearPress(option)}
          >
            <Text style={styles.selectedYearsText}>{option}</Text>
          </TouchableOpacity>
        ))}

      </View>


      {/* Popup View with list of available years to add */}
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.addYearView}>

          <View style={styles.addYearTitleView}>
            <Text style={styles.addYearTitleText}>Add Year</Text>
            
            <TouchableOpacity style={styles.closeAddYear} onPress={() => setModalVisible(false)}>
              <Text style={styles.addYearText}>X</Text>
            </TouchableOpacity>

          </View>

          {options.map((option, index) => (
            <View key={index} style={styles.inlineYearView}>

              {/* Displays Available Options */}
              <Text style={styles.addYearText}>{option}</Text>

              {/* '+' Button to add a Year */}
              <TouchableOpacity
                style={styles.addYearButton(selectedYears, option)}
                onPress={() => handleAddYear(option)}
              >
                <Text>{selectedYears.includes(option) ? '-' : '+'}</Text>
              </TouchableOpacity>
            </View>
          )
          )}

        </View>
      </Modal>

      <View style={{
        marginTop: 90,
      }} />

    </ScrollView>
  )
}

export default Year;