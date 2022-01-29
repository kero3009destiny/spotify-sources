import { useMemo } from 'react';
import { useImpressionUBILogger, createUbiEventLogger } from '@mrkt/features/ubi';
import { createWebProfileMerchEventFactory } from '@spotify-internal/ubi-sdk-s4a-web-profile-merch';
import { PageId } from '../../../../PlatformEvents';
import { useCurrentArtistIdOrNull } from '../../../../artists';

function useMerchTabUbiSpec() {
  var identifier = PageId.ArtistProfileMerch;
  return useMemo(function () {
    return createWebProfileMerchEventFactory({
      data: {
        identifier: identifier,
        uri: window.location.href
      }
    });
  }, [identifier]);
}

export function useMerchTabImpression() {
  var artistId = useCurrentArtistIdOrNull();
  var spec = useMerchTabUbiSpec();
  return useImpressionUBILogger(spec, artistId);
}
export function useLinkShopModalImpression() {
  var artistId = useCurrentArtistIdOrNull();
  var spec = useMerchTabUbiSpec();
  return useImpressionUBILogger(spec.popupModalFactory(), artistId);
}
export function useShopifyShopImpression() {
  var artistId = useCurrentArtistIdOrNull();
  var spec = useMerchTabUbiSpec();
  return useImpressionUBILogger(spec.spotifyShopFactory(), artistId);
}
export function useShopifyProductsImpression() {
  var artistId = useCurrentArtistIdOrNull();
  var spec = useMerchTabUbiSpec();
  return useImpressionUBILogger(spec.shopifyProductsFactory(), artistId);
}
export function useMerchLogger() {
  var artistId = useCurrentArtistIdOrNull();
  var merchFactory = useMerchTabUbiSpec();
  var UBIEventLogger = createUbiEventLogger(artistId);
  var logger = useMemo(function () {
    var commonTrackingParams = {
      uri: window.location.href,
      identifier: PageId.ArtistProfileMerch
    };
    return {
      logLinkShopButtonClick: function logLinkShopButtonClick() {
        UBIEventLogger.logInteraction(merchFactory.linkShopButtonFactory(commonTrackingParams).hitUiReveal());
      },
      logLinkShopConfirm: function logLinkShopConfirm(destination) {
        UBIEventLogger.logInteraction(merchFactory.popupModalFactory().continueButtonFactory(commonTrackingParams).hitNavigateToExternalUri({
          destination: destination
        }));
      },
      logLinkShopCancel: function logLinkShopCancel() {
        UBIEventLogger.logInteraction(merchFactory.popupModalFactory().cancelButtonFactory().hitUiHide());
      },
      logShopItemRemove: function logShopItemRemove(productId) {
        UBIEventLogger.logInteraction(merchFactory.spotifyShopFactory().offeringFactory().removeButtonFactory(commonTrackingParams).hitRemoveProductFromShop({
          productId: productId
        }));
      },
      logShopItemAdd: function logShopItemAdd(productId) {
        UBIEventLogger.logInteraction(merchFactory.shopifyProductsFactory().offeringFactory(commonTrackingParams).addButtonFactory(commonTrackingParams).hitAddProductToShop({
          productId: productId
        }));
      },
      logManageShopify: function logManageShopify(destination) {
        UBIEventLogger.logInteraction(merchFactory.manageButtonFactory().hitNavigateToExternalUri({
          destination: destination
        }));
      }
    };
  }, [artistId, merchFactory]);
  return logger;
}