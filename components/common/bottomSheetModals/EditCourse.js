import { View, Text, TouchableOpacity, BackHandler, } from 'react-native';
import { useState, useEffect, useRef, useMemo, forwardRef } from 'react';

import styles from '../../../constants/Themes/defaultTheme';
import { COLORS } from '../../../constants';

import {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';

import { BinIcon, EditIcon } from '../../../icons';

import { deleteCourse } from '../../../database';

import AddCourse from './AddCourse';

const EditCourse = forwardRef((props, ref) => {

  const {
    course,
    setDbChange,
    dbChange,
    setEditModalVisible
  } = props;

  const snapPoint = useMemo(() => ["27%"], []);

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.6}
      onPress={() => { setEditModalVisible(false) }}
    />
  );

  const closeEditCourse = () => {
    ref.current?.close();
    setEditModalVisible(false);
  };

  const handleDeleteCourse = () => {
    deleteCourse(course.CourseCode, course.TermType, course.StudyYear);

    setDbChange(!dbChange);

    closeEditCourse();
  }

  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);

  const handleEditCourse = () => {

    setModalVisible(true);
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
      else {
        return false;
      }
    }
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
    };
  }, [modalVisible]);

  return (

    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoint}
      backdropComponent={renderBackdrop}
      keyboardBehavior='interactive'
      keyboardBlurBehavior='restore'
      backgroundStyle={styles.bottomSheetBackground}
    //android_keyboardInputMode='adjustPan'
    >

      <View style={styles.bottomSheetView}>

        <View style={styles.titleSaveView}>

          <Text style={styles.bottomSheetTitle}>Edit Course</Text>

          {/* Delete Course Button */}
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => handleDeleteCourse()}
          >
            <BinIcon color={COLORS.red} />
          </TouchableOpacity>

        </View>

        <View style={{ width: "100%", height: "100%", }}>


          {/* Edit */}
          <TouchableOpacity
            style={styles.iconButtons}
            onPress={() => handleEditCourse()}
          >
            <Text
              style={styles.buttonText}>
              Edit
            </Text>
            <EditIcon color={COLORS.white} />
          </TouchableOpacity>

          <AddCourse
            ref={bottomSheetModalRef}
            setDbChange={setDbChange}
            dbChange={dbChange}
            setModalVisible={setModalVisible}
            course={course}
            closeEditCourse={closeEditCourse}
            setEditModalVisible={setEditModalVisible}
          />

        </View>

      </View>
    </BottomSheetModal>

  )
});

export default EditCourse;