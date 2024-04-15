import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabase('school.db');

export const createTables = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Year (
                    StudyYear TEXT PRIMARY KEY
                );`
            );
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Term (
                    TermType TEXT NOT NULL CHECK(TermType IN ('Fall', 'Winter', 'Summer')),
                    StudyYear TEXT NOT NULL,
                    PRIMARY KEY (TermType, StudyYear),
                    FOREIGN KEY (StudyYear) REFERENCES Year (StudyYear)
                );`
            );
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Professor (
                    ProfName TEXT PRIMARY KEY,
                    ProfEmail TEXT
                );`
            );
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Course (
                    CourseCode TEXT NOT NULL,
                    CourseName TEXT,
                    ColorCode TEXT NOT NULL UNIQUE,
                    ProfName TEXT,
                    TermType TEXT NOT NULL,
                    StudyYear TEXT NOT NULL,
                    PRIMARY KEY (CourseCode, TermType, StudyYear),
                    FOREIGN KEY (TermType, StudyYear) REFERENCES Term (TermType, StudyYear),
                    FOREIGN KEY (ProfName) REFERENCES Professor (ProfName)
                );`
            );
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS TaskTypes (
                    TaskType TEXT NOT NULL,
                    Weight REAL,
                    CourseCode TEXT NOT NULL,
                    TermType TEXT NOT NULL,
                    StudyYear TEXT NOT NULL,
                    PRIMARY KEY (TaskType, CourseCode, TermType, StudyYear),
                    FOREIGN KEY (CourseCode, TermType, StudyYear) REFERENCES Course (CourseCode, TermType, StudyYear)
                );`
            );
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Task (
                    TaskName TEXT NOT NULL,
                    TaskType TEXT NOT NULL,
                    Weight REAL,
                    DueDate TEXT NOT NULL,
                    Grade REAL,
                    CourseCode TEXT NOT NULL,
                    TermType TEXT NOT NULL,
                    StudyYear TEXT NOT NULL,
                    PRIMARY KEY (TaskName, DueDate, CourseCode, TermType, StudyYear),
                    FOREIGN KEY (CourseCode, TermType, StudyYear) REFERENCES Course (CourseCode, TermType, StudyYear)
                );`
            );
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS Notifications (
                    NotificationID TEXT NOT NULL,
                    TaskName TEXT NOT NULL,
                    DueDate TEXT NOT NULL,
                    CourseCode TEXT NOT NULL,
                    TermType TEXT NOT NULL,
                    StudyYear TEXT NOT NULL,
                    PRIMARY KEY (NotificationID, TaskName, DueDate, CourseCode, TermType, StudyYear),
                    FOREIGN KEY (TaskName, DueDate, CourseCode, TermType, StudyYear) REFERENCES Task (TaskName, DueDate, CourseCode, TermType, StudyYear)
                );`
            );
        }, (error) => {
            //console.log('Transaction ERROR: ' + error.message);
            reject(error);
        }, () => {
            //console.log('Tables created');
            resolve();
        });
    });
}

//debugging function or clear space function (WILL DELETE EVERYTHING)
export const dropTables = () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('DROP TABLE IF EXISTS Notifications;');
            tx.executeSql('DROP TABLE IF EXISTS Task;');
            tx.executeSql('DROP TABLE IF EXISTS Course;');
            tx.executeSql('DROP TABLE IF EXISTS TaskTypes;');
            tx.executeSql('DROP TABLE IF EXISTS Professor;');
            tx.executeSql('DROP TABLE IF EXISTS Term;');
            tx.executeSql('DROP TABLE IF EXISTS Year;');
        }, (error) => {
            //console.log('Transaction ERROR: ' + error.message);
            reject(error);
        }, () => {
            //console.log('Tables dropped');
            resolve();
        });
    });
}