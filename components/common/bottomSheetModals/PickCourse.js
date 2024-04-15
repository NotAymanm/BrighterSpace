import { View, Text, TouchableOpacity } from 'react-native';
import { forwardRef, } from 'react';

import styles from '../../../constants/Themes/defaultTheme';

import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';

const PickCourse = forwardRef((props, ref) => {

  const { Courses, setModalVisible, setChosenCourse } = props;

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.6}
      onPress={() => {setModalVisible(false)}}
    />
  );

  const snapPoints = ["80%"];

  const handleChosenCourse = (option) => {
    setChosenCourse(option);

    //Closes BottomSheetModal
    ref.current.close();
    setModalVisible(false);
  }


  return (

    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      keyboardBlurBehavior='restore'
      backgroundStyle={styles.bottomSheetBackground}
    >

      <View style={styles.bottomSheetView}>

        <View style={styles.titleSaveView}>

          <Text style={styles.bottomSheetTitle}>Pick a Course</Text>

        </View>

        <BottomSheetScrollView showsVerticalScrollIndicator={false} style={{ width: "100%", height: "100%" }}>
            <View style={{ width: "100%", height: "100%" }}>
              {Courses.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.buttonStyles(true)}
                  onPress={() => handleChosenCourse(option)}
                 >
                  <Text style={styles.buttonText}>
                    {option.CourseCode}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

          </BottomSheetScrollView>

        </View>
      </BottomSheetModal>
  )
});

export default PickCourse;