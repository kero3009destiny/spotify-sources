import { useEffect } from 'react';
import { useAlertDispatch } from '../../shared/store';
import { useT } from '@mrkt/features/i18n';
export var SongErrorBoundaryFallback = function SongErrorBoundaryFallback() {
  var dispatch = useAlertDispatch();
  var t = useT();
  useEffect(function () {
    dispatch({
      title: t('SONG_ERROR_e009fb', 'We can’t find that song.', ''),
      subtitle: t('SONG_ERROR_55954e', 'Check your URL or go to your Songs page.', 'This appears on an error banner in the UI when a user navigates to a bad URL on a Song page. It appears next to the text "Check your URL or...". These strings have to be split up because of the way we have to pass the text to the banner in the code.'),
      error: true
    });
  }, [dispatch]);
  return null;
};