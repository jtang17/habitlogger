const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./schemas.js');
const DB_URI = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/stoneandsand` : 'mongodb://localhost/stoneandsand';
mongoose.Promise = require('bluebird');
mongoose.connect(DB_URI);

// Monitor the db connection.
const database = mongoose.connection;
database.on('error', console.error.bind(console, 'Connection error: '));
database.once('open', () => {
  console.log('Successfully connected to database.');
});

// HELPERS
const sortByDate = (a, b) => {
  // Refer to docs for Array.prototype.sort.
  return a.timestamp - b.timestamp;
};

// METHODS
const signup = (user, cb) => {
  User.findOne({username: user.username}, (err, userEntry) => {
    if (err) {
      console.error(err);
    } else if (!userEntry) { // The user does not exist in the database.
      bcrypt.hash(user.password, saltRounds, (err, hash) => {
        let newUser = new User({
          username: user.username,
          password: hash,
        });
        newUser.save((err, newUserEntry) => {
          if (err) {
            console.error(`Error saving user to database: ${err}`);
            cb(false);
          } else {
            cb(newUserEntry.username);
          }
        });
      });
    } else { // The user already exists in the database.
      cb(false);
    }
  });
};

const verifyLogin = (user, cb) => {
  // Only return true if both the username and hash match.
  if (user.username && user.password) {
    // ^TODO: Move JSON property checking to router-side.
    User.findOne({
      username: user.username
    }, (err, userEntry) => {
      if (err) {
        console.error(err);
      } else {
        if (userEntry && userEntry.password) {
          bcrypt.compare(user.password, userEntry.password, function(err, hashMatches) {
            if (hashMatches) {
              cb(true);
            } else { // Hashes don't match.
              cb(false);
            }
          });
        } else { // No userEntry or password exists.
          cb(false);
        }
      }
    });
  } else { // Client did not submit a username or password.
    cb(false);
  }
};

const getUserHabits = (user, cb) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}'s habits.`);
    } else if (!userEntry) {
      cb([]); // If no user habits found, return empty array, to prevent errors on client.
    } else {
      cb(userEntry.habitList);
    }
  });
};

const getHabitData = (user, habit, cb) => {
  User.findOne({username: user}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}'s habits.`);
    }
    // Iterate over the user's habits and return the target habit.
    let targetHabit = userEntry.habits.filter(habitEntry => habitEntry.habit === habit).pop();
    targetHabit.occurrences.sort(sortByDate); // The client expects sorted occurrences.

    if (targetHabit) {
      cb(targetHabit);
    } else {
      cb(null);
    }
  });
};

const createHabit = (habitData, cb) => {
  User.findOne({username: habitData.username}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${habitData.username}.`);
    }  else {
      userEntry.habitList.push(habitData.habit);
      userEntry.habits.push({
        habit: habitData.habit,
        limit: habitData.limit,
        unit: habitData.unit,
        timeframe: habitData.timeframe,
      });
      userEntry.save((err, updatedUserEntry) => {
        if (err) {
          console.error(`Error getting ${habitData.username}'s habits.`);
          cb([]); // In case of an error, send to prevent client from crashing.
        } else {
          cb(updatedUserEntry.habitList);
        }
      });
    }
  });
};

const logOccurrence = (logData, cb) => {
  User.findOne({username: logData.username}, (err, userEntry) => {
    if (err) {
      console.error(`Error getting ${user}.`);
    }  else {
      // habits is an array of habits, not an object reference.
      // We have to iterate over each habit in this array to find the target habit.
      // Once found, we log the occurrence to that habit.
      userEntry.habits.forEach(habitEntry => {
        if (logData.habit === habitEntry.habit) {
          habitEntry.occurrences.push(logData.occurrence);
          // update the points of the user
          updatePoints(habitEntry.timeframe, habitEntry.limit, habitEntry.occurrences, habitEntry.totalPoints)
          // update the ranking of the user
          updateRanking(habitEntry.totalPoints, habitEntry.ranking)
          userEntry.save((err, updatedUserEntry) => {
            if (err) {
              console.error(`Error getting ${user}.`);
              cb(null);
            } else {
            // Return the inputted occurence.
            // It is now the last item in its habit's occurrences array.
              cb(logData.occurrence);
            }
          });
        }
      });
    }
  });
};

const findUser = (log, cb) => {
  User.findOne({username: log.username}, (err, userEntry) => {
    if (err) {
      console.log('error finding user: ', err);
      cb(err, null)
    } else {
      // console.log('user is found!!!!!!', userEntry)
      cb(err, userEntry);
    }
  })
}

const findHabit = (userEntry, view, cb) => {
  let habitsOfUser = userEntry.habits
  let habitToUpdate;
  habitsOfUser.forEach((habit) => {
    if(habit.habit === view) {
      habitToUpdate = habit
    }
  })
  if(habitToUpdate) {
    cb(habitToUpdate);
  } else {
    console.log('habit not found');
  }
}

const isSameTime = (dbTime, clientTime) => {
  // string time stamps
  let stringDbTime = JSON.stringify(dbTime);
  let stringClientTime = JSON.stringify(clientTime);
  // find the index of where T begins
  let findDbT = stringDbTime.indexOf('T');
  let findClientT = stringClientTime.indexOf('T');
  // make timestamps comparable
  let dbTimestamp = stringDbTime.slice(1, findDbT);
  let clientTimestamp = stringClientTime.slice(1, findClientT);
  // check if the equal
  if (clientTimestamp === dbTimestamp) {
    return true;
  } else {
    return false;
  }
}

const updateLog = (log, cb) => {
  // search for the user
  findUser(log, (err, userEntry) => {
    // loop through the habits and find the occurance
    findHabit(userEntry, log.viewHabit, (habitToUpdate) => {
      // loop through the occuranes
      habitToUpdate.occurrences.forEach((occurrence) => {
        // check if the timestamp equals our new timestamp
        if (isSameTime(occurrence.timestamp, log.timeframe)) {
          occurrence.value = log.value;
        }
      });
      // update the points
      updatePoints(habitToUpdate.timeframe, habitToUpdate.limit, habitToUpdate.occurences, habitToUpdate.totalPoints);
      // update the ranking
      updateRanking(habitToUpdate.totalPoints, habitToUpdate.ranking);
      // save the userEntry and return the callback
      userEntry.save((err) => {
        if (err) {
          cb(err, null);
        } else {
          cb(err, true);
        }
      });
    });
  });

}

const deleteLog = (log, cb) => {
  // find the user
  findUser(log, (err, userEntry) => {
    findHabit(userEntry, log.viewHabit, (habitToUpdate) => {
      // loop through the occurances
      habitToUpdate.occurrences.forEach((occurrence, i) => {
        // check if the timeframe equals our time frame
        if (isSameTime(occurrence.timestamp, log.timeframe)) {
          // remove that occurance
          habitToUpdate.occurrences.splice(i, 1);
        }
      });
      // update the points
      updatePoints(habitToUpdate.timeframe, habitToUpdate.limit, habitToUpdate.occurences, habitToUpdate.totalPoints);
      // update the ranking
      updateRanking(habitToUpdate.totalPoints, habitToUpdate.ranking);
      // save new updates to the db
      userEntry.save((err) => {
      // return callback of true or false
        if (err) {
          cb(err, null);
        } else {
          cb(err, true);
        }
      });
    });
  });
}

const deleteHabit = (log, cb) => {
  // find the user
  findUser(log, (err, userEntry) => {
    findHabit(userEntry, log.viewHabit, (habitToUpdate) => {
      // if habit is found delete it
      userEntry.habits.forEach((habit, i) => {

        if (habit.habit === habitToUpdate.habit) {
          console.log('if this equals im in!')
          userEntry.habits.splice(i, 1);
          for (var i = 0; i < userEntry.habitList.length; i++) {
            if (userEntry.habitList[i] === habit.habit) {
              userEntry.habitList.splice(i, 1);
            }
          }
        }
      })
      userEntry.save((err) => {
        if(err) {
          cb(err, null)
        } else {
          cb(err, true);
        }
      });
    });
  });
}

// EXPORTS
module.exports.signup = signup;
module.exports.verifyLogin = verifyLogin;
module.exports.getUserHabits = getUserHabits;
module.exports.getHabitData = getHabitData;
module.exports.createHabit = createHabit;
module.exports.logOccurrence = logOccurrence;
module.exports.updateLog = updateLog;
module.exports.deleteLog = deleteLog;
module.exports.deleteHabit = deleteHabit;
