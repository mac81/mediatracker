export const getUser = context => {
  const user = context.clientContext ? context.clientContext.user : {exp: 1};
  return user;
};

export default getUser;
