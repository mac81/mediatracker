const getUserCollection = (db, user) => {
  console.log('=> query database');

  return db
    .collection('users')
    .findOne({userId: user.email})
    .then(user => {
      const series = user ? user.series : [];
      const movies = user ? user.movies : [];
      const episodes = user ? user.episodes : [];
      return {statusCode: 200, body: JSON.stringify({series, movies, episodes})};
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return {statusCode: 500, body: 'error'};
    });
};

export default getUserCollection;
