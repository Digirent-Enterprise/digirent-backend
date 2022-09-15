const fillMonths = (monthYear) => {
    let newMonthYear = {...monthYear};
    const key = Object.keys(newMonthYear)[0]
    const year = key.split('/')[1];
    if (year){
        for (let item = 1; item <= 12; item ++){
            const keyPair = `${item}/${year}`
            if (!newMonthYear.hasOwnProperty(keyPair)){
                newMonthYear[keyPair] = 0
            }
        }
    }
    return newMonthYear;
}

module.exports = {
    fillMonths
}
