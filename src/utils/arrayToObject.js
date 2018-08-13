export default (array, fieldName = 'id') =>
  array.reduce((object, element) => {
    object[element[fieldName]] = element;
    return object;
  }, {});
