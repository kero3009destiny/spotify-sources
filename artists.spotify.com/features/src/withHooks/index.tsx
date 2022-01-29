// ignore-string-externalization
import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

export type WithPropsFromHooksAdded<PropsFromHooks, ResidualProps> = (
  component: React.ComponentType<ResidualProps & PropsFromHooks>,
) => React.ComponentType<ResidualProps>;

/**
 * Usage:
 *
 * const withFooAndBar = withHooks<{
 *   foo: string,
 *   doBar: () => void
 * }, {
 *   bing: string
 * }>(() => {
 *   return {
 *     foo: 'Hello',
 *     doBar: () => alert('To the bar!')
 *   }
 * });
 *
 * const FooBarBingComponent = ({foo, doBar, bing}: {
 *   foo: string,
 *   doBar: () => void,
 *   bing: string
 * }) => <button onClick={doBar}>{foo}, {bing}</button>;
 *
 * const FooBarBing = withFooAndBar(FooBarBingComponent);
 *
 * <FooBarBing bing="World" />
 *
 */
export function withHooks<PropsFromHooks, ResidualProps>(
  mapHooksToProps: (props: ResidualProps) => PropsFromHooks,
  displayName = 'Hooks',
): WithPropsFromHooksAdded<PropsFromHooks, ResidualProps> {
  return (C: React.ComponentType<ResidualProps & PropsFromHooks>) => {
    function Hooks(props: ResidualProps) {
      return (
        <C //
          {...props}
          {...mapHooksToProps(props)}
        />
      );
    }

    Hooks.displayName = `${displayName}(${
      C.displayName || C.name || 'Component'
    })`;

    return hoistNonReactStatics(Hooks, C);
  };
}
