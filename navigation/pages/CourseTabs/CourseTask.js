import { View, Text } from 'react-native'
import React from 'react'

const CourseTask = ({route}) => {

  const { Task } = route.params;

  return (
    <View>
      <Text>{Task}</Text>
    </View>
  )
}

export default CourseTask