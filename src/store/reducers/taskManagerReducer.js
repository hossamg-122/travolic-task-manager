// this a higher order function above redux i use it to make a global reducer for the application it makes my work easy 
// and i don't have to make types and reducers


const initialState = {
    openPopup:false,
    notify:{
        isOpen: false,
        message: "",
        type: "",
      },
     
  };
  
  /**
   * Clone data.
   *
   * @param mixed data
   * @returns mixed
   */
  export const clone = (data) => {
    if ([Array, Object].includes(data?.constructor)) {
      data = Object.entries(data).reduce(
        (cloned, [key, value]) =>
          cloned.constructor === Array
            ? [...cloned, clone(value)]
            : {
                ...cloned,
                [key]: clone(value),
              },
        data.constructor === Array ? [] : {}
      );
    }
  
    return data;
  };
  
  /**
   * Update object nested key.
   *
   * @param mixed data
   * @param string strKey
   * @param mixed value
   * @returns mixed
   */
  export const objectUpdateNestedKey = (data, strKey, value) => {
    const keys = strKey.split(".");
    const currentKey = keys[0];
    const nextKey = keys[1];
  
    let clonedData = data;
    if (clonedData && [Array, Object].includes(clonedData.constructor)) {
      clonedData = clone(data);
      if (!nextKey) {
        clonedData[currentKey] = value;
      } else if (currentKey) {
        let currentDataValue = clonedData[currentKey];
        if ([undefined, null].includes(clonedData[currentKey])) {
          currentDataValue = !isNaN(nextKey) ? [] : {};
        }
  
        clonedData[currentKey] = objectUpdateNestedKey(
          currentDataValue,
          keys.slice(1).join("."),
          value
        );
      }
    }
  
    return clonedData;
  };
  
  const taskManagerReducer = (state = initialState, action) => {
    return objectUpdateNestedKey(state, action.type, action.payload);
  };
  
  export default taskManagerReducer;
  