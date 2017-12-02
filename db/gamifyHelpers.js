// TITLE OBJECT
const titles = {
  apprentice: 0,
  yeoman: 500,
  guide: 1500,
  guru: 5000,
  master: 10000,
}

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