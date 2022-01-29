import { TFunction } from '@mrkt/features/i18n';
import { CropInfo } from './types';

// formats bytes and shows their appropriate unit, e.g.: (100 * 1024 * 1024) -> '100MB'
const byteUnitMultiples = ['KB', 'MB', 'GB'];
const formatBytes = (input: number) => {
  let value = input;
  let unit = 'B';
  for (
    let i = 0, j = byteUnitMultiples.length;
    i < j && Math.abs(value) >= 1024;
    i += 1
  ) {
    value /= 1024;
    unit = byteUnitMultiples[i];
  }

  return {
    value,
    unit,
  };
};

const FILE_SIZE = 'FILE_SIZE';
const FILE_TYPE = 'FILE_TYPE';
const IMAGE_DIMENSION = 'IMAGE_DIMENSION';

export const DEFAULT_MAX_FILE_SIZE = 20 * 1024 * 1024;
export const DEFAULT_VIDEO_TYPES = ['video/mp4'];
export const DEFAULT_IMAGE_TYPES = [
  'image/jpeg',
  'image/pjpeg',
  'image/gif',
  'image/png',
  'image/jpg',
];

const fileTooSmall = (type: 'image' | 'video') => (
  minWidth: number | null = 690,
  minHeight: number | null = 500,
  t: TFunction,
) => {
  if (minHeight && minWidth) {
    return type === 'video'
      ? t(
          'MEDIAHELPER_VIDEO_TOO_SMALL',
          'That file is too small. Your video must be at least {minWidth}x{minHeight}px.',
          'The user uploaded a video whose dimensions are too small. It must meet minimum pixel dimensions',
          { minWidth, minHeight },
        )
      : t(
          'MEDIAHELPER_IMAGE_TOO_SMALL',
          'That file is too small. Your image must be at least {minWidth}x{minHeight}px.',
          'The user uploaded an image whose dimensions are too small. It must meet minimum pixel dimensions',
          { minWidth, minHeight },
        );
  } else if (minHeight) {
    return type === 'video'
      ? t(
          'MEDIAHELPER_VIDEO_HEIGHT_TOO_SMALL',
          'That file is too small. Your video must be at least {minHeight}px tall.',
          'The user uploaded a video whose height is too small. It must meet a minimum pixel height.',
          { minHeight },
        )
      : t(
          'MEDIAHELPER_IMAGE_HEIGHT_TOO_SMALL',
          'That file is too small. Your image must be at least {minHeight}px tall.',
          'The user uploaded an image whose height is too small. It must meet a minimum pixel height.',
          { minHeight },
        );
  }
  return type === 'video'
    ? t(
        'MEDIAHELPER_VIDEO_WIDTH_TOO_SMALL',
        `That file is too small. Your video must be at least {minWidth}px wide.`,
        'The user uploaded a file whose width is too small. It must meet a minimum pixel width.',
        { minWidth },
      )
    : t(
        'MEDIAHELPER_IMAGE_WIDTH_TOO_SMALL',
        `That file is too small. Your image must be at least {minWidth}px wide.`,
        'The user uploaded an image whose width is too small. It must meet a minimum pixel width.',
        { minWidth },
      );
};
export const imageTooSmall = fileTooSmall('image');
export const videoTooSmall = fileTooSmall('video');

export const imageTooLarge = (
  maxSize: number = DEFAULT_MAX_FILE_SIZE,
  t: TFunction,
) => {
  const size = formatBytes(maxSize);
  if (size.unit === 'GB') {
    return t(
      'MEDIAHELPER_IMAGE_TOO_LARGE_GB',
      `That file is too big. Your image can’t be larger than {value}GB`,
      'The user uploaded an image whose size is too large. It cannot exceed a specified limit, in gigabytes.',
      { value: size.value },
    );
  } else if (size.unit === 'MB') {
    return t(
      'MEDIAHELPER_IMAGE_TOO_LARGE_MB',
      `That file is too big. Your image can’t be larger than {value}MB.`,
      'The user uploaded an image whose size is too large. It cannot exceed a specified limit, in megabytes.',
      { value: size.value },
    );
  } else if (size.unit === 'KB') {
    return t(
      'MEDIAHELPER_IMAGE_TOO_LARGE_KB',
      `That file is too big. Your image can’t be larger than {value}KB.`,
      'The user uploaded an image whose size is too large. It cannot exceed a specified limit, in kilobytes.',
      { value: size.value },
    );
  }
  return t(
    'MEDIAHELPER_IMAGE_TOO_LARGE_B',
    `That file is too big. Your image can’t be larger than {value}B.`,
    'The user uploaded an image whose size is too large. It cannot exceed a specified limit, in bytes.',
    { value: size.value },
  );
};
export const videoTooLarge = (
  maxSize: number = DEFAULT_MAX_FILE_SIZE,
  t: TFunction,
) => {
  const size = formatBytes(maxSize);
  if (size.unit === 'GB') {
    return t(
      'MEDIAHELPER_VIDEO_TOO_LARGE_GB',
      `That file is too big. Your video can’t be larger than {value}GB`,
      'The user uploaded a video whose size is too large. It cannot exceed a specified limit, in gigabytes.',
      { value: size.value },
    );
  } else if (size.unit === 'MB') {
    return t(
      'MEDIAHELPER_VIDEO_TOO_LARGE_MB',
      `That file is too big. Your video can’t be larger than {value}MB.`,
      'The user uploaded a video whose size is too large. It cannot exceed a specified limit, in megabytes.',
      { value: size.value },
    );
  } else if (size.unit === 'KB') {
    return t(
      'MEDIAHELPER_VIDEO_TOO_LARGE_KB',
      `That file is too big. Your video can’t be larger than {value}KB.`,
      'The user uploaded a video whose size is too large. It cannot exceed a specified limit, in kilobytes.',
      { value: size.value },
    );
  }
  return t(
    'MEDIAHELPER_VIDEO_TOO_LARGE_B',
    `That file is too big. Your video can’t be larger than {value}B.`,
    'The user uploaded a video whose size is too large. It cannot exceed a specified limit, in bytes.',
    { value: size.value },
  );
};

export const videoBadDuration = (
  minDuration: number,
  maxDuration: number,
  t: TFunction,
) =>
  t(
    'MEDIAHELPER_VIDEO_BAD_DURATION',
    `Your video must be between {minDuration}s and {maxDuration}s.`,
    'The user uploaded a video that has an invalid duration. The duration must be between a min and max, in seconds.',
    { minDuration, maxDuration },
  );

export const imageCannotOpen = (t: TFunction) =>
  t(
    'MEDIAHELPER_IMAGE_NO_OPEN',
    'We couldn‘t open that image. You may need to re-export your file and try again.',
    'The user uploaded a bad image and needs to upload a new one.',
  );

export const videoCannotOpen = (t: TFunction) =>
  t(
    'MEDIAHELPER_VIDEO_NO_OPEN',
    'We couldn‘t open that video. You may need to re-export your file and try again.',
    'The user uploaded a bad video and needs to upload a new one',
  );

export const fileWrongType = (types: string[], t: TFunction) => {
  const typesToText: { [key: string]: string } = {
    'image/jpeg': t('MEDIAHELPER_JPG', 'JPEG', 'The JPEG image file format'),
    'image/gif': t('MEDIAHELPER_GIF', 'GIF', 'The GIF image file format'),
    'image/png': t('MEDIAHELPER_PNG', 'PNG', 'The PNG image file format'),
    'video/mp4': t('MEDIAHELPER_MP4', 'MP4', 'The MP4 video file format'),
  };

  let typeList = '';
  const textMappingKeys = Object.keys(typesToText);
  const filteredTypes = types.filter(type => textMappingKeys.includes(type));

  filteredTypes.forEach(type => {
    typeList = `${typeList} ${typesToText[type]}`;
  });

  const combinedTypeMetadata = filteredTypes.reduce(
    (acum, type) => ({
      hasImage: acum.hasImage || type.indexOf('image/') === 0,
      hasVideo: acum.hasVideo || type.indexOf('video/') === 0,
    }),
    { hasImage: false, hasVideo: false },
  );

  if (combinedTypeMetadata.hasImage !== combinedTypeMetadata.hasVideo) {
    if (combinedTypeMetadata.hasImage) {
      return t(
        'MEDIAHELPER_BAD_IMAGE_TYPE',
        'That file format is unsupported. Your image must be one of the following formats:{typeList}',
        'The user uploaded an invalid file type. They must upload a one of the specified file formats.',
        { typeList },
      );
    }
    if (combinedTypeMetadata.hasVideo) {
      return t(
        'MEDIAHELPER_BAD_VIDEO_TYPE',
        'That file format is unsupported. Your video must be a MP4 file.',
        'The user uploaded an invalid file type. They must upload a one of the specified file formats.',
      );
    }
  }

  return t(
    'MEDIAHELPER_BAD_FILE_TYPE',
    'That file format is unsupported. Your file must be one of the following formats:{typeList}',
    'The user uploaded an invalid file type. They must upload a one of the specified file formats.',
    { typeList },
  );
};

export const calculateCropInfo = (
  width: number,
  height: number,
  desiredAspectRatio: number = 9 / 16,
) => {
  const aspectRatio = width / height;
  let cropHeight;
  let cropWidth;
  if (aspectRatio > desiredAspectRatio) {
    cropWidth = Math.round((height * 100 * desiredAspectRatio) / 100);
    cropHeight = height;
  } else {
    cropWidth = width;
    cropHeight = Math.round((width * 100) / desiredAspectRatio / 100);
  }

  const cropX = width - cropWidth;
  const cropY = height - cropHeight;
  const cropInfo: CropInfo = {
    width: cropWidth,
    height: cropHeight,
    left: cropX,
    top: cropY,
  };

  return cropInfo;
};

export const normalizeImage = (image: { url: string }[] | { url: string }) => {
  if (!Array.isArray(image)) {
    return image;
  }

  return image.length > 0 && image[image.length - 1]
    ? image[image.length - 1].url
    : '';
};

export const normalizeImageWithMinimumSize = (
  image: { width: number; url: string }[] | { width: number; url: string },
  minimumSize: number = 0,
) => {
  if (!Array.isArray(image)) {
    return image;
  }

  if (image.length === 0) {
    return '';
  }

  let bestFit = image.reduce(
    (accum: { width: number; url: string } | undefined, current) => {
      const widthSoFar = accum ? accum.width : Number.MAX_SAFE_INTEGER;
      if (current.width >= minimumSize && current.width < widthSoFar) {
        return current;
      }
      return accum;
    },
    undefined,
  );

  bestFit = bestFit || image[image.length - 1];
  return bestFit.url;
};

export const loadFile = (file: File): Promise<ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      if (fileReader.result instanceof ArrayBuffer) {
        resolve(fileReader.result);
      } else {
        resolve(null);
      }
    });
    fileReader.addEventListener('error', reject);
    fileReader.readAsArrayBuffer(file);
  });

export const createImageObject = (file: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', reject);
    image.src = file;
  });

export const createVideoObject = (file: string): Promise<HTMLVideoElement> =>
  new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.addEventListener('loadedmetadata', () => resolve(video));
    video.addEventListener('error', (error: ErrorEvent) => {
      if (error.target instanceof HTMLVideoElement && error.target.error) {
        reject(error.target.error);
        return;
      }
      reject(error);
    });
    video.src = file;
  });

export const loadImages = (
  files: File[] | FileList,
  minWidth: number,
  minHeight: number,
  t: TFunction,
  validTypes = DEFAULT_IMAGE_TYPES,
) => {
  const MAX_FILE_SIZE = 20 * 1024 * 1024;

  const fileList = Array.from(files).map(async file => {
    const isValidSize = isValid(FILE_SIZE, file, { maxSize: MAX_FILE_SIZE });
    if (!isValidSize) {
      return {
        error: true,
        title: imageTooLarge(MAX_FILE_SIZE, t),
        file,
      };
    }

    const isValidType = isValid(FILE_TYPE, file, {}, validTypes);
    if (!isValidType) {
      return {
        error: true,
        title: fileWrongType(validTypes, t),
        file,
      };
    }

    const imageFile = await loadFile(file);
    const imageData = await createImageObject(window.URL.createObjectURL(file));

    const isValidDimension = isValid(IMAGE_DIMENSION, imageData, {
      minWidth,
      minHeight,
    });
    if (!isValidDimension) {
      return {
        error: true,
        title: imageTooSmall(minWidth, minHeight, t),
        file,
      };
    }
    return {
      imageBinarySource: imageFile,
      imageSource: imageData.src,
      imageHeight: imageData.height,
      imageWidth: imageData.width,
      hasError: false,
      image: imageData,
    };
  });

  return Promise.all(fileList);
};

const isValid = (
  type: string,
  file: {
    size?: number;
    type?: string;
    height?: number;
    width?: number;
  },
  attr: {
    maxSize?: number;
    minWidth?: number;
    minHeight?: number;
  } = {},
  validTypes = DEFAULT_IMAGE_TYPES,
) => {
  switch (type) {
    case FILE_SIZE: {
      if (typeof file.size === 'number' && typeof attr.maxSize === 'number') {
        return file.size <= attr.maxSize;
      }
      break;
    }

    case FILE_TYPE: {
      if (file.type) {
        return validTypes.includes(file.type);
      }
      break;
    }

    case IMAGE_DIMENSION: {
      if (file.width && file.height && attr.minWidth && attr.minHeight) {
        return file.width >= attr.minWidth && file.height >= attr.minHeight;
      }
      break;
    }

    default:
      break;
  }

  return false;
};
