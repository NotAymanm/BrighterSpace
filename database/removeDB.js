import { db } from './schoolDB';

//REMOVING FROM DB
export const deleteYear = (studyYear) => {
    db.transaction(tx => {
        // Delete tasks related to the year
        tx.executeSql(
            `DELETE FROM Task WHERE StudyYear = ?`,
            [studyYear]
        );
        // Delete courses related to the year
        tx.executeSql(
            `DELETE FROM Course WHERE StudyYear = ?`,
            [studyYear]
        );
        // Delete terms related to the year
        tx.executeSql(
            `DELETE FROM Term WHERE StudyYear = ?`,
            [studyYear]
        );
        // Finally, delete the year
        tx.executeSql(
            `DELETE FROM Year WHERE StudyYear = ?`,
            [studyYear]
        );
    });
}

export const deleteTerm = (termType, studyYear) => {
    db.transaction(tx => {
        // Delete tasks related to the term
        tx.executeSql(
            `DELETE FROM Task WHERE TermType = ? AND StudyYear = ?`,
            [termType, studyYear]
        );
        // Delete courses related to the term
        tx.executeSql(
            `DELETE FROM Course WHERE TermType = ? AND StudyYear = ?`,
            [termType, studyYear]
        );
        // Finally, delete the term
        tx.executeSql(
            `DELETE FROM Term WHERE TermType = ? AND StudyYear = ?`,
            [termType, studyYear]
        );
    });
}

export const deleteProfessor = (profName) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM Professor WHERE ProfName = ?`,
            [profName]
        );
    });
}

export const deleteCourse = (courseCode, termType, studyYear) => {
    db.transaction(tx => {
        // Delete tasks related to the course
        tx.executeSql(
            `DELETE FROM Task WHERE CourseCode = ? AND TermType = ? AND StudyYear = ?`,
            [courseCode, termType, studyYear]
        );
        // Finally, delete the course
        tx.executeSql(
            `DELETE FROM Course WHERE CourseCode = ? AND TermType = ? AND StudyYear = ?`,
            [courseCode, termType, studyYear]
        );
    });
}

export const deleteTaskType = (taskType, courseCode, termType, studyYear) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM TaskTypes WHERE TaskType = ? AND CourseCode = ? AND TermType = ? AND StudyYear = ?;`,
            [taskType, courseCode, termType, studyYear],
        );
    });
}

export const deleteTask = (taskName, dueDate, courseCode, termType, studyYear) => {
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM Task WHERE TaskName = ? AND DueDate = ? AND CourseCode = ? AND TermType = ? AND StudyYear = ?`,
            [taskName, dueDate, courseCode, termType, studyYear]
        );
    });
}

export const deleteNotification = (notificationID, taskName, dueDate, courseCode, termType, studyYear) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM Notifications WHERE NotificationID = ? AND TaskName = ? AND DueDate = ? AND CourseCode = ? AND TermType = ? AND StudyYear = ?;`,
                [notificationID, taskName, dueDate, courseCode, termType, studyYear]
            );
        });
    });
}

// Function to remove notifications with a DueDate less than today
export const removePastNotifications = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed, so we add 1
    const day = today.getDate().toString().padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM Notifications WHERE DueDate < ?;`,
            [formattedToday],
            (_, result) => {
                console.log('Past notifications removed: ' + JSON.stringify(result));
            },
            (_, error) => {
                console.log('Error removing past notifications: ' + error.message);
            }
        );
    });
}