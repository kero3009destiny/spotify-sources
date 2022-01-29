import React from 'react';
import { useRouter } from 'next/router';
import { createNextPage } from '../../lib/createNextPage';
import { ArtistHeader } from '../ArtistHeader';
import { PageFooter } from '../page';
import { ArtistContainer } from '../../app/Artist/ArtistContainer';
import { PageRouteNext } from '@apps/artists-spotify-com-c/src/app/routes/PageRoute/PageRouteNext';
import { jsx as _jsx } from "react/jsx-runtime";
export function createArtistPage(_ref) {
  var pageId = _ref.pageId,
      Body = _ref.body;

  function ArtistPageBody() {
    var router = useRouter(); // shim expected RR args as best we can

    var history = {
      push: router.push.bind(router),
      replace: router.replace.bind(router),
      goBack: router.back.bind(router)
    };
    var match = {
      url: router.asPath
    };
    var location = {
      pathname: router.asPath
    };
    return /*#__PURE__*/_jsx(ArtistContainer, {
      children: /*#__PURE__*/_jsx(Body, {
        history: history,
        match: match,
        location: location
      })
    });
  }

  return createNextPage({
    pageId: pageId,
    path: '/artist/:artistId',
    header: ArtistHeader,
    body: ArtistPageBody,
    footer: PageFooter
  }, PageRouteNext);
}