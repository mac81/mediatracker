const getUserCollection = (db, user) => {
  console.log('=> query database');

  return db
    .collection('users')
    .findOne({userId: user.exp})
    .then(user => {
      return {statusCode: 200, body: JSON.stringify({series: user.series})};
    })
    .catch(err => {
      console.log('=> an error occurred: ', err);
      return {statusCode: 500, body: 'error'};
    });
};

export default getUserCollection;
