import { db } from './schoolDB';

export const checkYearExists = (studyYear) => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT 1
                FROM Year
                WHERE StudyYear = ?`,
                [studyYear],
                (_, { rows: { _array } }) => {
                    if (_array.length > 0) {
                        //console.log('Year exists in the database');
                        resolve(true);
                    } else {
                        //console.log('Year does not exist in the database');
                        resolve(false);
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