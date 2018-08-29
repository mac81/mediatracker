export const getUser = context => {
  //console.log(context.clientContext);
  //const {user} = context && context.clientContext;
  return (
    (context && context.clientContext) || {
      exp: 1,
    }
  );
};
