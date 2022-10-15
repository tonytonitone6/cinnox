import {
  Reducer,
  FC,
  ReactNode,
  createContext,
  useMemo,
  useContext,
  useReducer,
  Dispatch
} from 'react';
import * as R from 'ramda';
import {
  getFilterDataWithCondition,
  getSliceData
} from '@utils/getFilterDataWithCondition';

export enum ActionsType {
  UPDATE_WEATHER_LIST = 'UPDATE_WEATHER_LIST',
  SET_SEARCH_WORDS = 'SET_SEARCH_WORDS'
}

export type TagType = {
  name: string;
};

export type ValueType = {
  date: string;
  value: number;
};

type StatusType = {
  [key: string]: ValueType[];
};

type InitStateType = {
  searchWords: string;
  isLoading: boolean;
  data: StatusType;
};

type IContextType = {
  state: InitStateType;
  dispatch: Dispatch<any>;
};

type IActionType = {
  type: string;
  payload: any | any[];
};

export const reducer: Reducer<InitStateType, IActionType> = (state, action) => {
  switch (action.type) {
    case ActionsType.UPDATE_WEATHER_LIST:
      return {
        ...state,
        data: {
          ...action.payload
        }
      };
    case ActionsType.SET_SEARCH_WORDS:
      return {
        ...state,
        searchWords: action.payload
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext<IContextType>({} as IContextType);

type ContextType = {
  children: ReactNode;
};

const initState: InitStateType = {
  searchWords: '',
  isLoading: false,
  data: {}
};

export const GlobalProvider: FC<ContextType> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

const useStore = () => {
  const context = useContext(GlobalContext);

  if (!context) throw new Error('need provide context!');

  return context;
};

const updateLoadingStatus = (
  dispatch: Dispatch<IActionType>,
  actionsType: string,
  setName: string
) => {
  if (actionsType) {
    dispatch({ type: actionsType, payload: setName });
  }
};

const updateWeatherListByCity = (
  dispatch: Dispatch<IActionType>,
  weathers: any[],
  limit: number
) => {
  // REMARK free version only supported 3 hours 5days data, and it has limitation(4) with requirement
  const filteredWeatherList = R.compose(
    (list) => getSliceData(list, limit),
    getFilterDataWithCondition
  )(weathers, '21:00:00');

  const formattedWeatherList = filteredWeatherList.reduce(
    (acc, weather) => {
      const { dt_txt: fullyDate, main: info } = weather;
      const [date] = fullyDate.split(' ');
      const newAcc = {
        ...acc,
        temp_max: [...acc['temp_max'], { date, value: info.temp_max }],
        temp_min: [...acc['temp_min'], { date, value: info.temp_min }],
        humidity: [...acc['humidity'], { date, value: info.humidity }]
      };
      return newAcc;
    },
    {
      temp_max: [],
      temp_min: [],
      humidity: []
    }
  );

  dispatch({
    type: ActionsType.UPDATE_WEATHER_LIST,
    payload: formattedWeatherList
  });
};

const updateSearchWords = (dispatch: Dispatch<IActionType>, text: string) =>
  dispatch({ type: ActionsType.SET_SEARCH_WORDS, payload: text });

export {
  useStore,
  updateLoadingStatus,
  updateWeatherListByCity,
  updateSearchWords
};
