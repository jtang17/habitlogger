const rankings = {
  apprentice: 0,
  yeoman: 500,
  guide: 1500,
  guru: 5000,
  master: 10000,
}

const updateRanking = (totalPoints, ranking) => {
  if (ranking === undefined) {
    ranking = 'apprentice';
  } else {
    for (let key in rankings) {
      if (totalPoints > rankings[key]) {
        ranking = key;
      }
    }
  }

  return ranking;
}

const updatePoints = (timeframe, limit, occurrence, totalPoints) => {

  if (timeframe === 'Day') {
    for (let i = 0; i < occurrence.length; i++) {
      if (occurrence[i].value >= limit)
        totalPoints += 10;
    }
  } else if (timeframe === 'Week') {
    let interval = 7 * 24 * 3600 * 1000;
    let dayOne = Date.parse(occurrence[0].timestamp);
    let goalTotal = 0;
    let goalMet = false;

    for (let i = 0; i < occurrence.length; i++) {
      let tsInMillisec = Date.parse(occurrence[i].timestamp);
      if (dayOne + interval > tsInMillisec) {
        goalTotal += occurrence[i].value;
        if (goalTotal >= limit && !goalMet) {
          totalPoints += 175;
          goalMet = true;
        }
      } else {
        goalMet = false;
        goalTotal = 0;
        dayOne += interval;
        i--;
      }
    }
  } else if (timeframe === 'Month') {

    let day = Number(JSON.stringify(occurrence[0].timestamp).slice(8, 10));
    let month = Number(JSON.stringify(occurrence[0].timestamp).slice(5, 7));
    goalTotal = 0
    let goalMet = false;

    for (let i = 0; i < occurrence.length; i++) {
      let currentMonth = Number(JSON.stringify(occurrence[i].timestamp).slice(5, 7));
      let currentDay = Number(JSON.stringify(occurrence[i].timestamp).slice(8, 10));

      // ( currentMonth = month ) OR ( ( currentMonth = month+1  OR (currentMonth = 1 AND month = 12 ) ) AND currentDay < day)
      console.log('day, month, currentDay, currentMonth', `${day} , ${month}, ${currentDay}, ${currentMonth}`)
      console.log('day ', occurrence[0].timestamp.slice(8,10))
      console.log('day ', occurrence[0].timestamp.slice(8,10))
      console.log('month ', occurrence[0].timestamp.slice(5,7))

      if (currentMonth === month || ((currentMonth === month + 1 ||(currentMonth === 1 && month === 12)) && currentDay < day)) {
        goalTotal += occurrence[i].value;
        if (goalTotal >= limit && !goalMet) {
          totalPoints += 800;
          console.log('Bonus being added', totalPoints)
          goalMet = true;
        }
      } else {
        if (month === 12) {
          month = 1;
        } else {
          month++
        }
        goalTotal = 0;
        goalMet = false
        i--;
      }
    }
  }

  totalPoints += occurrence.length * 50 + 10;
  return totalPoints
}

module.exports.updateRanking = updateRanking;
module.exports.updatePoints = updatePoints;


// UPDATE TITLE
// if title is empty
  // set title to apprentice
// else
  // for each key in titles
    // if points is greater than titles[key]
      // set title to key



// UPDATE POINTS
// check what timeframe we are given

  // if day
    // check quantity against goal
    // if goal is met and bonus boolean is false
      // add bonus to total points

  // else if week
    // set interval to 7 * 24 * 3600 * 1000
    // set day 0 to first timestamp in occurrence array
    // set goal counter
    // set bonus boolean to false
    // loop through occurrence array (use for loop with i)
      // for each log convert timestamp to milliseconds
      // if day 0 + interval > timestamp
        // add quantity to goal counter
        // check goal counter against goal
        // if goal is met and bonus boolean is false
          // add bonus to total points
          // set bonus boolean to true
      // else
        // set bonus boolean to false
        // set goal counter to 0
        // day 0 += interval
        // i--

  // else if month
    // store first day of first log in occurrence
    // store first month of first log in occurrence
    // set boolean to false
    // loop through occurrence array (for loop)
      // for each log
      // if current month is equal to stored month OR
      // ((if current month is 1 greater than stored month OR
      // if current month is 1 and stored month is 12) AND
      // if current day is less than stored day)
        // add quantity to goal counter
        // check goal counter against goal
        // if goal is met and bonus boolean is false
          // add bonus to total points
          // set bonus boolean to true
      // else
        // if month is 12
          // month is set to 1
        // else
          // increment stored month by 1
        // reset goal counter
        // set boolean to false
        // i --

  // total points += 50 * occurrence.length