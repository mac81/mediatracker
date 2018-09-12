const getUserSeries = (db, user) => {
  console.log('=> query database');

  return db
    .collection('users')
    .findOne({userId: user.email})
    .then(user => {
      const series = user.series || [];
      return {statusCode: 200, body: JSON.stringify({series})};
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return {statusCode: 500, body: 'error'};
    });
};

export default getUserSeries;
