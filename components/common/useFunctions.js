const dateToFormattedDate = (date) => {
    //Formatted Date
    let dateComponents = date.split("-").map(Number);
    let newDate = new Date(dateComponents[0], dateComponents[1] - 1, dateComponents[2]);
    let stringDate = newDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return stringDate;
}


const dateToString = (date) =>{
    return date.getFullYear()
      + '-'
      + (date.getMonth() + 1).toString().padStart(2, '0')
      + '-'
      + date.getDate().toString().padStart(2, '0');
}

export {
    dateToString, 
    dateToFormattedDate
};