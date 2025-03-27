// // this file is created to fix the 'circular dependency error', it helps in creating a copy of the 'store' , whichh i needed to import inside the axiosConfig.js file

// let storeInstance = null;

// export const setStore = (store) => {
//   storeInstance = store;
// };

// export const getStore = () => storeInstance;



// storeUtils.js
let store;

export const setStore = (newStore) => {
  store = newStore;
};

export const getStore = () => {
  if (!store) {
    throw new Error('Store has not been set. Make sure to call setStore first.');
  }
  return store;
};