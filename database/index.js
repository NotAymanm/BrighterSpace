import { addYear, addTerm, addProfessor, addCourse, addTaskType, addTask, addNotification } from "./addDB";
import { deleteYear, deleteTerm, deleteProfessor, deleteCourse, deleteTaskType, deleteTask, deleteNotification, removePastNotifications } from "./removeDB";
import { getYears, getCourses, getAllCourses, getTaskType, getTasks, getTasksFromToday, getAllTasks, getCourseColor, getNumTask, getNotificationID, getTask, getSumWeight } from "./getDB";
import { updateTask, updateCourse } from "./updateDB";
import { checkYearExists } from "./extraDB";
import { db, createTables, dropTables } from "./schoolDB";

export {
    addYear, addTerm, addProfessor, addCourse, addTaskType, addTask, addNotification,
    deleteYear, deleteTerm, deleteProfessor, deleteCourse, deleteTaskType, deleteTask, deleteNotification, removePastNotifications,
    getYears, getCourses, getAllCourses, getTaskType, getTasks, getTasksFromToday, getAllTasks, getCourseColor, getNumTask, getNotificationID, getTask, getSumWeight,
    updateTask, updateCourse,
    checkYearExists,
    db, createTables, dropTables
};