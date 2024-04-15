import { db } from './schoolDB';


// ADDING TO DB
export const addYear = (studyYear) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO Year (StudyYear) VALUES (?)`,
            [studyYear]
        );
    });
}

export const addTerm = (termType, studyYear) => {

    if (!['Fall', 'Winter', 'Summer'].includes(termType)) {
        console.error('Invalid TermType');
        return;
    }

    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO Term (TermType, StudyYear) VALUES (?, ?)`,
            [termType, studyYear]
        );
    });
}

export const addProfessor = (profName, profEmail) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO Professor (ProfName, ProfEmail) VALUES (?, ?)`,
            [profName, profEmail]
        );
    });
}

export const addCourse = (courseCode, courseName, colorCode, profName, termType, studyYear) => {
    
    if (!courseCode || !colorCode) {
        console.error('CourseCode, ColorCode, are required');
        return;
    }

    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO Course (CourseCode, CourseName, ColorCode, ProfName, TermType, StudyYear) VALUES (?, ?, ?, ?, ?, ?)`,
            [courseCode, courseName, colorCode, profName, termType, studyYear]
        );
    });
}

export const addTaskType = (taskType, weight, courseCode, termType, studyYear) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO TaskTypes (TaskType, Weight, CourseCode, TermType, StudyYear) VALUES (?, ?, ?, ?, ?);`,
            [taskType, weight, courseCode, termType, studyYear],
        );
    });
}

export const addTask = (values) => {
    
    if (!values.TaskName || !values.TaskType || !values.DueDate || !values.CourseCode || !values.TermType || !values.StudyYear) {
        console.error('ERROR MISSING VALUE!');
        return;
    }
    
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO Task (TaskName, TaskType, Weight, DueDate, Grade, CourseCode, TermType, StudyYear) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [values.TaskName, values.TaskType, values.Weight, values.DueDate, values.Grade, values.CourseCode, values.TermType, values.StudyYear]
        );
    });
}

export const addNotification = (notificationID, taskName, dueDate, courseCode, termType, studyYear) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO Notifications (NotificationID, TaskName, DueDate, CourseCode, TermType, StudyYear) VALUES (?, ?, ?, ?, ?, ?);`,
            [notificationID, taskName, dueDate, courseCode, termType, studyYear]
        );
    });
}