import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

interface Props {
  children: ReactNode;
}

interface InitialData {
  width: number;
  target: string;
  setContextDate: Dispatch<
    SetStateAction<{
      width: number;
      target: string;
    }>
  >;
}

export const ContextData = createContext<InitialData>(
  {} as InitialData,
);

const BaseProvider: React.FC<Props> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [ctxData, setContextDate] = useState({
    width: windowWidth,
    target: '',
  });

  useEffect(() => {
    const onResize = () => {
      setContextDate((prevState) => ({
        ...prevState,
        width: window.innerWidth,
      }));
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    setContextDate((prevState) => ({
      ...prevState,
    }));
    setWindowWidth(window.innerWidth);
  }, []);

  return (
    <ContextData.Provider value={{ ...ctxData, setContextDate }}>
      {children}
    </ContextData.Provider>
  );
};

export default BaseProvider;
