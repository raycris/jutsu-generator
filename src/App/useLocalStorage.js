import { useEffect, useReducer } from "react";

function useLocalStorage(itemName, initialValue) {
  const [state, dispatch] = useReducer(reducer, initialState({ initialValue }));
  const { item, error, loading, sincronizedItem } = state;

  // ACTION CREATORS
  const onSave = (item) => dispatch({ type: actionTypes.save, payload: item });

  const onError = (error) =>
    dispatch({ type: actionTypes.error, payload: error });

  const onSuccess = (parsedItem) =>
    dispatch({ type: actionTypes.success, payload: parsedItem });

  const onSincronize = () => dispatch({ type: actionTypes.sincronize });

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName);
        let parsedItem;

        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue));
          parsedItem = initialValue;
        } else {
          parsedItem = JSON.parse(localStorageItem);
        }

        onSuccess(parsedItem);
      } catch (error) {
        onError(error);
      }
    }, 2000);
  }, [sincronizedItem]);

  const saveItem = (newItem) => {
    try {
      const stringfiedItem = JSON.stringify(newItem);
      localStorage.setItem(itemName, stringfiedItem);
      onSave(newItem);
    } catch (error) {
      onError(error);
    }
  };

  const sincronizeItem = () => {
    onSincronize();
  };

  return { item, error, loading, saveItem, sincronizeItem };
}

const initialState = ({ initialValue }) => ({
  item: initialValue,
  error: false,
  loading: true,
  sincronizedItem: true,
});
const actionTypes = {
  save: "SAVE",
  error: "ERROR",
  success: "SUCCESS",
  sincronize: "SINCRONIZE",
};

const reducerObject = (state, payload) => ({
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.error]: {
    ...state,
    error: true,
  },
  [actionTypes.success]: {
    ...state,
    item: payload,
    error: false,
    loading: false,
    sincronizedItem: true,
  },
  [actionTypes.sincronize]: {
    ...state,
    loading: true,
    sincronizedItem: false,
  },
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };
