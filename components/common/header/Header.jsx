import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react'

import { useNavigation } from '@react-navigation/native';

import styles from '../../../constants/Themes/defaultTheme';

const Header = ({ page, handleNew }) => {


  const navigation = useNavigation();
  const handleBackButton = () => {
    navigation.goBack();
  }

  return (
    <View
      style={styles.headerView}
    >

      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => handleBackButton()}
      >
        <Text style={styles.headerText}>{`<-`}</Text>
      </TouchableOpacity>

      <Text style={styles.headerText}>{page}</Text>

      {/* add Year Button '+' */}
      <TouchableOpacity
        style={styles.headerButton}
        onPress={handleNew}
      >
        <Text style={styles.headerText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Header;