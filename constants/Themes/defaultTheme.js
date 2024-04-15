import { StyleSheet } from "react-native";

import { COLORS, FONT, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({

    //default background color
    defaultBackground: {
        backgroundColor: COLORS.blacker
    },

    //ICONS
    

    //HEADER
    headerView: {
        flex: 1,
        //backgroundColor: COLORS.primary,
        flexDirection: "row",
        marginTop: 35,
        paddingHorizontal: 15, //remember
        height: 50,
        width: "100%",
        justifyContent: "space-between",
    },
    headerButton: {
        height: 50,
        width: 50,
        //borderRadius: 15,
        //backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
    },
    headerText: {
        fontSize: 30,
        fontFamily: FONT.bold,
        color: COLORS.white,
    },



    //BOTTOM TAB
    activeBackground: {
        position: "absolute",
        //new
        top: -70,
    },
    tabBarContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        //new
        width: "100%",
        position: "absolute",
        top: -70
    },
    component: {
        height: 60,
        width: 60,
        marginTop: -5, //ONLY INTERSTING THING HERE
    },
    componentCircle: {
        flex: 1,
        borderRadius: 20,
        backgroundColor: COLORS.black,
        
        borderWidth: 1,
        borderColor: COLORS.darkGray,
    },
    iconContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center"
    },



    //YEAR
    yearView: {
        marginTop: 20,
        alignItems: 'center',
        paddingHorizontal: 15
    },
    selectedYears: {
        height: 120,
        width: "100%",
        borderRadius: 40,
        borderColor: COLORS.purple,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },
    selectedYearsText: {
        fontSize: 30,
        fontFamily: FONT.semiBold,
        color: COLORS.white
    },
    addYearView: {
        margin: 20,
        marginVertical: 190,
        backgroundColor: COLORS.black,
        //padding: 35,
        alignItems: "center",
        justifyContent: "center",
        //flex: 1,
        borderRadius: 30,

        //new
        borderColor: COLORS.darkGray,
        borderWidth: 1
    },
    addYearTitleView: {
        width: "100%",
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: "35%",
        paddingRight: "5%",
    },
    addYearTitleText: {
        color: COLORS.white,
        fontSize: 25,
        fontFamily: FONT.semiBold
    },
    closeAddYear: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inlineYearView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "transparent",
        borderRadius: 20,
        borderColor: COLORS.white,
        borderWidth: 2,
        width: "90%",
        height: 80,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginBottom: 10
    },
    addYearText: {
        color: COLORS.white,
        fontSize: 20,
        fontFamily: FONT.medium,
    },
    addYearButton: (selectedYears, option) => ({
        height: 40,
        width: 40,
        borderRadius: 10,
        backgroundColor: selectedYears.includes(option) ? COLORS.red : COLORS.green,
        justifyContent: "center",
        alignItems: "center",
    }),




    //TERMS
    termView: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 15
    },
    termButtons: (option, Term) => ({
        height: 40,
        width: 85,
        borderRadius: 20,
        backgroundColor: option === Term ? COLORS.purple : COLORS.black,
        justifyContent: "center",
        alignItems: "center",

        //new
        borderColor: COLORS.darkGray,
        borderWidth: option !== Term ? 1 : 0,
    }),
    termButtonsText: {
        fontSize: 15,
        fontFamily: FONT.semiBold,
        color: COLORS.white
    },
    courseButton: (courseColor) => ({
        height: 150,
        width: "100%",
        borderRadius: 40,
        borderColor: courseColor,
        borderWidth: 3,
        //backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 20,
        marginTop: 20
    }),
    courseCode: {
        fontSize: 25,
        fontFamily: FONT.semiBold,
        // color: COLORS.gray2,
        color: COLORS.white,
    },
    courseName: {
        fontSize: 20,
        fontFamily: FONT.semiBold,
        color: COLORS.white,
        opacity: 0.7
    },
    courseProf: {
        fontSize: 18,
        fontFamily: FONT.regular,
        color: COLORS.white,
        opacity: 0.3
    },


    //BOTTOM SHEET MODAL
    bottomSheetBackground:{
        borderRadius: 30,
        backgroundColor: COLORS.blacker,
    },
    bottomSheetView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    titleSaveView: {
        width: "100%",
        flexDirection: 'row',
        marginVertical: 15,
        justifyContent: 'space-between',
        alignItems: "center",
        paddingLeft: 10
    },
    saveButton: {
        backgroundColor: COLORS.purple,
        height: 40,
        width: 80,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: 14,
        fontFamily: FONT.regular
    },
    bottomSheetTitle: {
        color: COLORS.white,
        fontSize: 30,
        fontFamily: FONT.semiBold,
    },
    inputStyles: {
        height: 80,
        width: "100%",
        color: COLORS.white,
        borderRadius: 25,
        borderColor: COLORS.white,
        borderWidth: 3,
        padding: 20,
        fontSize: 20,
        fontFamily: FONT.regular,
        marginBottom: 10,
    },
    buttonStyles: (isType) => ({
        height: 80,
        width: "100%",
        borderRadius: 25,
        borderColor: COLORS.white,
        borderWidth: 3,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: isType ? "center" : "",
        backgroundColor:"transparent",
    }),
    buttonText: {
        padding: 20,
        fontSize: 20,
        color: COLORS.white,
        fontFamily: FONT.medium,
    },
    iconButtons: {
        height: 80,
        width: "100%",
        borderRadius: 25,
        borderColor: COLORS.white,
        borderWidth: 3,
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:"transparent",
        paddingRight: 20
    },


    //COURSE
    taskView: {
        paddingHorizontal: 15
    },
    taskButton: {
        height: 130,
        width: "100%",
        borderRadius: 40,
        borderColor: COLORS.white,
        borderWidth: 3,
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 20,
        marginTop: 20
    },
    taskButtonView: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10 // MOVES GRADE TO THE LEFT
    },
    taskName: {
        fontSize: 25,
        fontFamily: FONT.semiBold,
        color: COLORS.white,
    },
    taskType: {
        fontSize: 16,
        fontFamily: FONT.regular,
        color: COLORS.white,
        opacity: 0.8
    },
    dueDateView:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskDueDate: {
        fontSize: 16,
        fontFamily: FONT.regular,
        color: COLORS.white,
        opacity: 0.8
    },
    taskGrade: {
        fontSize: 25,
        fontFamily: FONT.black,
        color: COLORS.gray,
    },
    taskGradeView: {
        justifyContent: 'center',
        backgroundColor: "transparent",
        borderRadius: 10,
        borderColor: COLORS.gray,
        borderWidth: 3,
        height: 65,
        width: 65,
        alignItems: 'center'
    },



    //COURSE TASKS



    //TASKS
    allTaskButton: (courseColor) => ({
        height: 130,
        width: "100%",
        borderRadius: 40,
        borderColor: courseColor,
        borderWidth: 3,
        //backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: 20,
        marginTop: 20
    }),



    //HOME
    weekView: {
        width: "100%",
        flexDirection: 'row',
        //justifyContent: 'space-between',
        /* paddingHorizontal: 10, */
        marginBottom: 15,

        //new
        justifyContent: "space-evenly"
    },
    weekButton: (beforeToday, isSelected) => ({
        height: 110, //90
        width: 60, //50
        borderRadius: 30,
        borderColor: isSelected ? COLORS.purple : (beforeToday ? COLORS.darkGray : COLORS.white),
        borderWidth: 2.4, //was 2.2
        alignItems: 'center',
       
        //new
        marginRight: 5,
        justifyContent: "center"
    }),
    weekButtonText: {
        color: COLORS.white,
        fontFamily: FONT.semiBold,
        fontSize: 18, //16
    },
    dayButtonText: {
        color: COLORS.white,
        fontFamily: FONT.medium,
        fontSize: 15, //14
    },
    weekDayView: {
        //backgroundColor: "green",
        width: "100%",
        height: "50%", // was 60%
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskDue: {
        //backgroundColor: "red",
        width: "75%",
        aspectRatio: 1,
        borderRadius: 20,
        overflow: "hidden",
    },
    scheduleBackground: {
        backgroundColor: COLORS.black,
        borderRadius: 35, // 40

        //new
        margin: 15,
        marginTop: 40,
        overflow: "hidden",

        //maybe
        borderColor: COLORS.darkGray,
        borderWidth: 1,
    },
    scheduleTitleView: {
        marginVertical: 10,
        paddingLeft: 20
    },
    scheduleTitleText: {
        fontSize: 35,
        fontFamily: FONT.semiBold,
        color: COLORS.white
    },


});

export default styles;
