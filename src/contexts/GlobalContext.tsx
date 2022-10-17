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
import { formatTemperatureUnit } from '@utils/formatTemperatureUnit';

export enum ActionsType {
  UPDATE_WEATHER_LIST = 'UPDATE_WEATHER_LIST',
  SET_SEARCH_WORDS = 'SET_SEARCH_WORDS',
  SET_LOADING_STATUS = 'SET_LOADING_STATUS'
}

export type TagType = {
  name: string;
};

type fieldKeys = 'temp_max' | 'temp_min' | 'humidity';

export type ValueType = {
  date: string;
  value: number;
};

export type StatusType = {
  [key in fieldKeys]: ValueType[];
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
  data: {} as StatusType
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
  status: boolean
) => dispatch({ type: ActionsType.SET_LOADING_STATUS, payload: status });

const updateWeatherListByCity = (
  dispatch: Dispatch<IActionType>,
  weathers: any[]
) => {
  const formattedWeatherList = weathers.reduce(
    (acc, weather) => {
      const { dt_txt: fullyDate, main: info } = weather;
      const [date] = fullyDate.split(' ');
      const newAcc = {
        ...acc,
        temp_max: [
          ...acc['temp_max'],
          { date, value: formatTemperatureUnit(info.temp_max) }
        ],
        temp_min: [
          ...acc['temp_min'],
          { date, value: formatTemperatureUnit(info.temp_min) }
        ],
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
