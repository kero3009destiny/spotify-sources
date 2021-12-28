export const FORCE_RELOAD = 'FORCE_RELOAD'

export function forceReload() {
  return (dispatch: any) => {
    dispatch({ type: FORCE_RELOAD })
  }
}
