import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
  ReactElement,
} from 'react';

type SetState<T> = Dispatch<SetStateAction<T>>;

interface AppContextProps {
  fireworks: boolean;
  setFireworks: SetState<boolean>;
}

const AppContext = createContext<AppContextProps>({
  fireworks: false,
  setFireworks: () => {},
});

export const useFireworks = (): [boolean, SetState<boolean>] => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { fireworks, setFireworks } = useContext(AppContext);
  return [fireworks, setFireworks];
};

export const AppProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [fireworks, setFireworks] = useState(false);
  const value = useMemo(
    () => ({
      fireworks,
      setFireworks,
    }),
    [fireworks]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
