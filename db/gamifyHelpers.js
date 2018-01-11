const rankings = {
  Apprentice: 0,
  Yeoman: 500,
  Guide: 1500,
  Guru: 5000,
  Master: 10000,
};

const updateRanking = (totalPoints, ranking) => {
  if (ranking === undefined) {
    ranking = 'Apprentice';
  } else {
    for (const key in rankings) {
      if (totalPoints > rankings[key]) {
        ranking = key;
      }
    }
  }

  return ranking;
};

const updatePoints = (timeframe, limit, occurrence, totalPoints) => {
  if (timeframe === 'Day') {
    for (let i = 0; i < occurrence.length; i++) {
      if (occurrence[i].value >= limit) { totalPoints += 10; }
    }
  } else if (timeframe === 'Week') {
    const interval = 7 * 24 * 3600 * 1000;
    let dayOne = Date.parse(occurrence[0].timestamp);
    let goalTotal = 0;
    let goalMet = false;

    for (let i = 0; i < occurrence.length; i++) {
      const tsInMillisec = Date.parse(occurrence[i].timestamp);
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
    const day = Number(JSON.stringify(occurrence[0].timestamp).slice(9, 11));
    let month = Number(JSON.stringify(occurrence[0].timestamp).slice(6, 8));
    goalTotal = 0;
    let goalMet = false;

    for (let i = 0; i < occurrence.length; i++) {
      const currentMonth = Number(JSON.stringify(occurrence[i].timestamp).slice(6, 8));
      const currentDay = Number(JSON.stringify(occurrence[i].timestamp).slice(9, 11));

      if (currentMonth === month || ((currentMonth === month + 1 || (currentMonth === 1 && month === 12)) && currentDay < day)) {
        goalTotal += occurrence[i].value;
        if (goalTotal >= limit && !goalMet) {
          totalPoints += 800;
          console.log('Bonus being added', totalPoints);
          goalMet = true;
        }
      } else {
        if (month === 12) {
          month = 1;
        } else {
          month++;
        }
        goalTotal = 0;
        goalMet = false;
        i--;
      }
    }
  }

  totalPoints += occurrence.length * 50 + 10;
  return totalPoints;
};

module.exports.rankings = rankings;
module.exports.updateRanking = updateRanking;
module.exports.updatePoints = updatePoints;
