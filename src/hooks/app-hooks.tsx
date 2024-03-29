import { useColorModeValue } from '@chakra-ui/system';
import {
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from '@rainbow-me/rainbowkit';
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
import { chains } from 'utils/clients';

type SetState<T> = Dispatch<SetStateAction<T>>;

interface IUser {
  address: string | undefined;
  nftOwner: boolean | undefined;
}

interface AppContextProps {
  fireworks: boolean;
  setFireworks: SetState<boolean>;
  isMounted: boolean;
  user: IUser | null;
  setUser: SetState<IUser | null>;
}

const AppContext = createContext<AppContextProps>({
  fireworks: false,
  setFireworks: () => {},
  isMounted: false,
  user: null,
  setUser: () => {},
});

export const useFireworks = (): [boolean, SetState<boolean>] => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { fireworks, setFireworks } = useContext(AppContext);
  return [fireworks, setFireworks];
};

export const useUser = (): [IUser | null, SetState<IUser | null>] => {
  const { user, setUser } = useContext(AppContext);
  return [user, setUser];
};

export const useIsMounted = (): boolean => {
  const { isMounted } = useContext(AppContext);
  return isMounted;
};

export const AppProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [fireworks, setFireworks] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  useEffect(() => {
    setIsMounted(true);
  });
  const value = useMemo(
    () => ({
      fireworks,
      setFireworks,
      isMounted,
      user,
      setUser,
    }),
    [fireworks, isMounted, user]
  );
  const theme = useColorModeValue(lightTheme, darkTheme);

  return (
    <AppContext.Provider value={value}>
      <RainbowKitProvider
        coolMode
        chains={chains}
        theme={theme()}
        appInfo={{
          appName: 'ATX DAO',
          learnMoreUrl: 'https://www.atxdao.com/',
        }}
      >
        {children}
      </RainbowKitProvider>
    </AppContext.Provider>
  );
};
