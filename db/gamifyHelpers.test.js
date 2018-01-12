const { updateRanking, updatePoints, rankings } = require('./gamifyHelpers');

test('if ranking is undefined, updateRanking should return \"Apprentice\"', () => {
  expect(updateRanking()).toBe('Apprentice');
});

test('if totalPoints is between 5000-10000, updateRanking should return \"Guru\"', () => {
  expect(updateRanking(7500, 'Guru')).toBe('Guru');
});
