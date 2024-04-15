import { View, Text, ScrollView } from 'react-native'
import React from 'react'

import styles from '../../constants/Themes/defaultTheme';

const Profile = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.defaultBackground}>
      <Text>Profile</Text>
      
    </ScrollView>
  )
}

export default Profile;