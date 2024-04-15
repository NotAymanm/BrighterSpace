import { View, Text, TouchableOpacity } from 'react-native';
import { forwardRef } from 'react';

import styles from '../../../constants/Themes/defaultTheme';

import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';


const CourseTasks = forwardRef((props, ref) => {

  const { setChosenTask, setTaskSelectionVisible } = props;

  const taskTypes = [
    "Assignment", "Quiz", "Midterm", "Homework",
    "Test", "Essay", "Project",
    "Tutorial", "Lab", "Presentation",
    "Workshop", "Final",
  ]

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.6}
      onPress={() => {setTaskSelectionVisible(false)}}
    />
  );

  const snapPoint = ["80%"];


  const handleChosenTask = (option) => {
    setChosenTask(option);

    //Closes BottomSheetModal
    ref.current.close();
    setTaskSelectionVisible(false);
  }


  return (

      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoint}
        backdropComponent={renderBackdrop}
        keyboardBlurBehavior='restore'
        backgroundStyle={styles.bottomSheetBackground}
      >

        <View style={styles.bottomSheetView}>

          <View style={styles.titleSaveView}>
            <Text style={styles.bottomSheetTitle}>Choose Task</Text>
          </View>

          <BottomSheetScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%" }}>
            <View style={{ width: "100%", height: "100%" }}>
              {taskTypes.map((option, index) => (
                <TouchableOpacity
                  key={option}
                  style={styles.buttonStyles(true)}
                  onPress={() => handleChosenTask(option)}
                 >
                  <Text 
                    style={styles.buttonText}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

          </BottomSheetScrollView>

        </View>
      </BottomSheetModal>

  )
});

export default CourseTasks;