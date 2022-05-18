import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
  ReactElement,
  useEffect,
} from 'react';

type SetState<T> = Dispatch<SetStateAction<T>>;

interface AppContextProps {
  fireworks: boolean;
  setFireworks: SetState<boolean>;
  isMounted: boolean;
}

const AppContext = createContext<AppContextProps>({
  fireworks: false,
  setFireworks: () => {},
  isMounted: false,
});

export const useFireworks = (): [boolean, SetState<boolean>] => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { fireworks, setFireworks } = useContext(AppContext);
  return [fireworks, setFireworks];
};

export const useIsMounted = (): boolean => {
  const { isMounted } = useContext(AppContext);
  return isMounted;
};

export const AppProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [fireworks, setFireworks] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  });
  const value = useMemo(
    () => ({
      fireworks,
      setFireworks,
      isMounted,
    }),
    [fireworks, isMounted]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
