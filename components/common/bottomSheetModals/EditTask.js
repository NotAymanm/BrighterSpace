import { View, Text, TouchableOpacity, BackHandler, } from 'react-native';
import { useState, useEffect, useRef, useMemo, forwardRef } from 'react';

import styles from '../../../constants/Themes/defaultTheme';
import { COLORS } from '../../../constants';

import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';

import { BinIcon, EditIcon } from '../../../icons';

import { deleteTask } from '../../../database';

import { cancelNotification } from '../../../app/notify';

import AddTask from './AddTask';

const EditTask = forwardRef((props, ref) => {

  const {
    task,
    setDbChange,
    dbChange,
    setEditModalVisible
  } = props;

  const [grade, changeGrade] = useState('');

  const snapPoint = useMemo(() => ["42%"], []);

  const renderBackdrop = (props) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
      opacity={0.6}
      onPress={() => { setEditModalVisible(false) }}
    />
  );

  const closeEditTask = () => {
    ref.current?.close();
    setEditModalVisible(false);
  };

  const handleDeleteTask = () => {
    cancelNotification(task.TaskName, task.DueDate, task.CourseCode, task.TermType, task.StudyYear);
    deleteTask(task.TaskName, task.DueDate, task.CourseCode, task.TermType, task.StudyYear);

    setDbChange(!dbChange);

    closeEditTask();
  }

  const [modalVisible, setModalVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);

  const handleEditTask = () => {

    setModalVisible(true);
    bottomSheetModalRef.current?.present();
  }

  const handleSaveGrade = () => {

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

          <Text style={styles.bottomSheetTitle}>Edit Task</Text>

          {/* Edit Task */}
          <TouchableOpacity
            style={{ paddingRight: 10 }}
            onPress={() => handleDeleteTask()}
          >
            <BinIcon color={COLORS.red} />
          </TouchableOpacity>

        </View>

        <View style={{ width: "100%", height: "100%", }}>


          {/* Edit */}
          <TouchableOpacity
            style={styles.iconButtons}
            onPress={() => handleEditTask()}
          >
            <Text
              style={styles.buttonText}>
              Edit
            </Text>
            <EditIcon color={COLORS.white} />
          </TouchableOpacity>

          <AddTask
            ref={bottomSheetModalRef}
            setDbChange={setDbChange}
            dbChange={dbChange}
            setModalVisible={setModalVisible}
            task={task}
            closeEditTask={closeEditTask}
            setEditModalVisible={setEditModalVisible}
          />

          {/* Change Grade */}
          <BottomSheetTextInput
            style={styles.inputStyles}
            onChangeText={changeGrade}
            value={grade}
            placeholder='Add Grade'
            placeholderTextColor={COLORS.gray}
            keyboardType='number-pad'

          />

          <View style={{ width: "100%", alignItems: 'flex-end', marginTop: 5 }}>
            {/* Save Grade */}
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => handleSaveGrade()}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

        </View>

      </View>
    </BottomSheetModal>

  )
});

export default EditTask;