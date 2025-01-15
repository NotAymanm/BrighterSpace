import { db } from './schoolDB';

//UPDATING DB
export const updateTask = (task, newValues) => {

    let taskName = task.TaskName;
    let dueDate = task.DueDate;
    let courseCode = task.CourseCode;
    let termType = task.TermType;
    let studyYear = task.StudyYear;

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            let setString = Object.keys(newValues).map(key => `${key} = ?`).join(', ');

            let values = Object.values(newValues);
            values.push(taskName, dueDate, courseCode, termType, studyYear);
            tx.executeSql(
                `UPDATE Task SET ${setString} WHERE TaskName = ? AND DueDate = ? AND CourseCode = ? AND TermType = ? AND StudyYear = ?`,
                values,
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
}

export const updateCourse = (course, newValues) => {

    let courseCode = course.CourseCode;
    let termType = course.TermType;
    let studyYear = course.StudyYear;

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            let setString = Object.keys(newValues).map(key => `${key} = ?`).join(', ');

            let values = Object.values(newValues);
            values.push(courseCode, termType, studyYear);
            tx.executeSql(
                `UPDATE Course SET ${setString} WHERE CourseCode = ? AND TermType = ? AND StudyYear = ?`,
                values,
                (_, result) => resolve(result),
                (_, error) => reject(error)
            );
        });
    });
}