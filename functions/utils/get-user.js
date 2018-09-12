export const getUser = context => {
  if (process.env.NODE_ENV === 'development') {
    return {email: 'test@test.no'};
  } else if (context.clientContext) {
    return context.clientContext.user;
  }
};

export default getUser;
