import React, { createContext, useContext } from 'react';

const Context = createContext(false);

export const RtlProvider = Context.Provider;

export function useRtl() {
  return useContext(Context);
}

export type InjectedRtlProps = {
  rtl: boolean;
};

export function withRtl<
  C extends React.ComponentType<React.ComponentProps<C> & InjectedRtlProps>,
  ResolvedProps = JSX.LibraryManagedAttributes<
    C,
    Omit<React.ComponentProps<C>, keyof InjectedRtlProps>
  >,
>(ClassComponent: C) {
  return function WithRtl(props: ResolvedProps) {
    const rtl = useRtl();
    return (
      <ClassComponent
        {...(props as JSX.LibraryManagedAttributes<C, React.ComponentProps<C>>)}
        rtl={rtl}
      />
    );
  };
}
