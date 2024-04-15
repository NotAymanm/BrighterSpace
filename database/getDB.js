import { db } from './schoolDB';

//GETTING FROM DB

//Gets all the years
export const getYears = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM Year ORDER BY StudyYear', [], (_, result) => {
                const years = result.rows._array.map(row => row.StudyYear);
                resolve(years);
            }, (_, error) => reject(error));
        });
    });
}

//USAGE
/* getYears()
    .then(years => {
        console.log('Years in the database: ', years);
    })
    .catch(error => {
        console.error('Error fetching years: ', error);
    }); */


export const getCourses = (year, term) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT *
                    FROM Course
                    WHERE StudyYear = ? AND TermType = ?`,
                [year, term],
                (_, { rows: { _array } }) => {
                    if (_array.length > 0) {
                        resolve(_array);
                    } else {
                        console.log('No courses found');
                        resolve([]);
                    }
                },
                (_, error) => {
                    console.log('Error: ', error);
                    reject(error);
                }
            );
        });
    });
};

export const getAllCourses = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM Course`,
                [],
                (_, { rows: { _array } }) => {
                    if (_array.length > 0) {
                        resolve(_array);
                    } else {
                        console.log('No courses found');
                        resolve([]);
                    }
                },
                (_, error) => {
                    console.log('Error: ', error);
                    reject(error);
                }
            );
        });
    });
};

//USAGE
/* getCourses('2023-2024', 'Fall')
    .then(courses => {
        if (courses.length > 0) {
            console.log('The courses are: ', courses);
        } else {
            console.log('No courses found');
        }
    })
    .catch(error => console.log('Error: ', error)); */


export const getTaskType = (taskType, courseCode, termType, studyYear) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM TaskTypes WHERE TaskType = ? AND CourseCode = ? AND TermType = ? AND StudyYear = ?;`,
                [taskType, courseCode, termType, studyYear],
                (_, result) => resolve(result.rows._array),
                (_, error) => reject(error)
            );
        });
    });
}

export const getTask = (DueDate) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM Task WHERE DueDate = ? ORDER BY DueDate`,
                [DueDate],
                (_, { rows: { _array } }) => {
                    if (_array.length > 0) {
                        resolve(_array);
                    } else {
                        console.log('No Task found');
                        resolve([]);
                    }
                },
                (_, error) => {
                    console.log('Transaction ERROR: ' + error.message);
                    reject(error);
                }
            );
        });
    });
}


export const getTasks = (CourseCode, TermType, StudyYear) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM Task WHERE CourseCode = ? AND TermType = ? AND StudyYear = ? ORDER BY DueDate`,
                [CourseCode, TermType, StudyYear],
                (_, { rows: { _array } }) => {
                    if (_array.length > 0) {
                        resolve(_array);
                    } else {
                        console.log('No Task found');
                        resolve([]);
                    }

                    //resolve(rows._array);
                },
                (_, error) => {
                    console.log('Transaction ERROR: ' + error.message);
                    reject(error);
                }
            );
        });
    });
}

export const getTasksFromToday = () => {

    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed, so we add 1
    const day = today.getDate().toString().padStart(2, '0');
    const formattedToday = `${year}-${month}-${day}`;

    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM Task WHERE DueDate >= ? ORDER BY DueDate`,
                [formattedToday],
                (_, { rows: { _array } }) => {
                    if (_array.length > 0) {
                        resolve(_array);
                    } else {
                        console.log('No Tasks found');
                        resolve([]);
                    }
                },
                (_, error) => {
                    console.log('Transaction ERROR: ' + error.message);
                    reject(error);
                }
            );
        });
    });
}

export const getAllTasks = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM Task ORDER BY DueDate`,
                [],
                (_, { rows: { _array } }) => {
                    if (_array.length > 0) {
                        resolve(_array);
                    } else {
                        console.log('No Tasks found');
                        resolve([]);
                    }

                    //resolve(rows._array);
                },
                (_, error) => {
                    console.log('Transaction ERROR: ' + error.message);
                    reject(error);
                }
            );
        });
    });
}

export const getCourseColor = (courseCode, termType, studyYear) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT ColorCode FROM Course WHERE CourseCode = ? AND TermType = ? AND StudyYear = ?`,
                [courseCode, termType, studyYear],
                (_, { rows }) => {
                    if (rows.length > 0) {
                        //console.log(rows._array[0].ColorCode);
                        resolve(rows._array[0].ColorCode);
                    } else {
                        reject('No course found for the given task');
                    }
                },
                (_, error) => {
                    reject('Transaction ERROR: ' + error.message);
                }
            );
        });
    });
}

export const getNumTask = (DueDate) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT COUNT(*) as numTasks FROM Task WHERE DueDate = ?`,
                [DueDate],
                (_, { rows }) => {
                    resolve(rows._array[0].numTasks);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    });
}

export const getNotificationID = (taskName, dueDate, courseCode, termType, studyYear) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT NotificationID FROM Notifications WHERE TaskName = ? AND DueDate = ? AND CourseCode = ? AND TermType = ? AND StudyYear = ?`,
                [taskName, dueDate, courseCode, termType, studyYear],
                (_, { rows }) => {
                    console.log("FROM getNotificationID:");
                    console.log(rows._array);
                    resolve(rows._array);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    });
}

export const getSumWeight = (courseCode, termType, studyYear) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT SUM(Weight) as TotalWeight FROM Task WHERE CourseCode = ? AND TermType = ? AND StudyYear = ?`,
                [courseCode, termType, studyYear],
                (_, { rows }) => {
                    resolve(rows._array[0].TotalWeight);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    });
}