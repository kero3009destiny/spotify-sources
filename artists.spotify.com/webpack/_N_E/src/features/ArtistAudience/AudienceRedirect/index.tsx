// ignore-string-externalization
import * as React from 'react';
import { useRouter } from 'next/router';
import { LoadingIndicator } from '../../../shared/components/LoadingIndicator';
import { useCurrentArtist } from '../../artists';
import { jsx as _jsx } from "react/jsx-runtime";
export function AudienceRedirect() {
  var router = useRouter();
  var artist = useCurrentArtist();
  React.useEffect(function () {
    var url = router.pathname.replace('[artistId]', artist.id);
    router.push("".concat(url, "/stats"));
  }, [router, artist.id]);
  return /*#__PURE__*/_jsx(LoadingIndicator, {});
}