import { createContext, useContext, useState, useMemo, PropsWithChildren } from 'react';
import { Snackbar } from '@spotify-internal/encore-web';

export type SnackbarContext = {
  messages: string[];
  setMessages(msgs: string[]): void;
};

export type SnackbarApi = {
  messages: string[];
  showMessage(msg: string): void;
};

const snackbarContext = createContext<SnackbarContext>({
  messages: [],
  setMessages(_) {},
});

export function useSnackbar(): SnackbarApi {
  const { messages, setMessages } = useContext(snackbarContext);
  return useMemo(
    () => ({
      messages,
      showMessage(msg) {
        setMessages([...messages, msg]);
      },
    }),
    [messages, setMessages],
  );
}

export function SnackbarContainer() {
  const { messages } = useSnackbar();
  return (
    <>
      {messages.map((msg) => (
        <Snackbar aria-label={msg} key={msg}>
          {msg}
        </Snackbar>
      ))}
    </>
  );
}

export function SnackbarProvider(props: PropsWithChildren<{}>) {
  const [messages, setMessages] = useState<string[]>([]);
  const value = useMemo(
    () => ({
      messages,
      setMessages,
    }),
    [messages],
  );

  return <snackbarContext.Provider value={value}>{props.children}</snackbarContext.Provider>;
}
