export const LOADING_BEGIN    = 'LOADING_BEGIN';
export const LOADING_FAILED   = 'LOADING_FAILED';
export const LOADING_FINISHED = 'LOADING_FINISHED';

export const setLoadingBegin = () => ({
  type: LOADING_BEGIN
});

export const setLoadingFailed = (error: any) => ({
  type: LOADING_FAILED,
  payload: { error }
});

export const setLoadingFinished = () => ({
  type: LOADING_FINISHED
});
