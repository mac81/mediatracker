export const getUser = context => {
  const user = context.clientContext ? context.clientContext.user : {exp: 1};

  console.log('Context: ', context);
  console.log('ClientContext: ', context.clientContext);
  console.log('User: ', context.clientContext.user);

  return user;
};

export default getUser;
