/*
 * calculates the offset object when the viewport ratio is the same as the desired crop ratio.
 * @param {Object} cropInformation - information about how the image should be cropped.
 * @param {Object} cropInformation.position - the x and y coordinates of the repositioned image,
 *                                            taken from the top left of the viewport.
 * @param {number} cropInformation.zoom - how much the image has been zoomed in.
 * @param {Object} cropInformation.viewport - the width and height of the viewport the image has been cropped to.
 * @param {Object} cropInformation.sourceImage - the original width and height of the source image.
 * @returns {Object} offset - the top, right, bottom, and left offset to crop to. All values will be positive.
 */
type Position = {
  x: number;
  y: number;
};

type AbstractDimensions = {
  height: number;
  width: number;
};

type Viewport = {
  ratio: number;
  height: number;
  width: number;
};

type Crop = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type OffsetProps = {
  position: Position;
  sourceImage: AbstractDimensions;
  viewport: Viewport;
  zoom: number;
};

export type OffsetPropsWithRatio = {
  position: Position;
  ratio: AbstractDimensions;
  sourceImage: AbstractDimensions;
  viewport: Viewport;
  zoom: number;
};

export const calculateFixedViewportOffset = ({
  position,
  zoom,
  viewport,
  sourceImage,
}: OffsetProps | OffsetPropsWithRatio): Crop => {
  const ratio = sourceImage.width / sourceImage.height;
  const viewportToImageRatio =
    ratio > 1
      ? sourceImage.height / viewport.height
      : sourceImage.width / viewport.width;
  const desiredCropHeight =
    ratio > 1
      ? sourceImage.height / zoom
      : ((viewport.height / viewport.width) * sourceImage.width) / zoom;
  const desiredCropWidth =
    desiredCropHeight * (viewport.width / viewport.height);

  const top = Math.abs(position.y) * (viewportToImageRatio / zoom);
  const left = Math.abs(position.x) * (viewportToImageRatio / zoom);
  const right = sourceImage.width - (left + desiredCropWidth);
  const bottom = sourceImage.height - (top + desiredCropHeight);

  return { top, right, bottom, left };
};

export const calculateHeaderOffset = ({
  ratio,
  position,
  zoom,
  viewport,
  sourceImage,
}: OffsetPropsWithRatio): Crop => {
  const sourceImageAspectRatio = sourceImage.width / sourceImage.height;

  const transformedSourceImage = {
    width: viewport.width * zoom,
    height: (viewport.width * zoom) / sourceImageAspectRatio,
  };

  const viewportAspectRatio = viewport.width / viewport.height;
  const transformToOriginalScale = {
    width: transformedSourceImage.width / sourceImage.width,
    height: transformedSourceImage.height / sourceImage.height,
  };

  const calculateCrop = (): Crop => {
    let crop;
    if (viewportAspectRatio < ratio.width / ratio.height) {
      crop = {
        width: viewport.height * (ratio.width / ratio.height),
        height: viewport.height,
      };
    } else {
      crop = {
        width: viewport.width,
        height: viewport.width * (ratio.height / ratio.width),
      };
    }

    const top = -position.y + viewport.height / 2 - crop.height / 2;
    const left = -position.x + viewport.width / 2 - crop.width / 2;
    const right = transformedSourceImage.width - left - crop.width;
    const bottom = transformedSourceImage.height - top - crop.height;

    return { top, left, right, bottom };
  };

  let crop = calculateCrop();

  /* eslint-disable */
  if (crop.top < 0) position.y += crop.top;
  if (crop.left < 0) position.x += crop.left;
  if (crop.right < 0) position.x -= crop.right;
  if (crop.bottom < 0) position.y -= crop.bottom;
  /* eslint-enable */

  crop = calculateCrop();

  const originalImageCrop: Crop = {
    top: crop.top / transformToOriginalScale.height,
    left: crop.left / transformToOriginalScale.width,
    right: crop.right / transformToOriginalScale.width,
    bottom: crop.bottom / transformToOriginalScale.height,
  };

  return originalImageCrop;
};
