export const getUser = context => {
  const user = context.clientContext ? context.clientContext.user : {email: 'test@test.no'};

  return user;
};

export default getUser;
