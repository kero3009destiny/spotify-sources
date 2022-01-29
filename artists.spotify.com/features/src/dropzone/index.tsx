// ignore-string-externalization
import React, { Component } from 'react';
import createDebug from 'debug';

import {
  createImageObject,
  createVideoObject,
  DEFAULT_IMAGE_TYPES,
  DEFAULT_MAX_FILE_SIZE,
  DEFAULT_VIDEO_TYPES,
  fileWrongType,
  imageCannotOpen,
  imageTooLarge,
  imageTooSmall,
  loadFile,
  videoBadDuration,
  videoCannotOpen,
  videoTooLarge,
  videoTooSmall,
} from '@mrkt/features/mediahelpers';
import { InjectedTProps, withT } from '@mrkt/features/i18n';
import { DropzoneFileMetadata, DropzoneFileData } from './types';
import { parseBuffer } from './vendor/codem-isoboxer';

import { DropzoneSection, DropzoneInput } from './index.styles';

export * from './types';

const debug = createDebug('components:Dropzone');
const DEFAULT_MIN_FILE_WIDTH = 690;
const DEFAULT_MIN_FILE_HEIGHT = 500;

type DropzoneProps = InjectedTProps & {
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
  maxFileSize?: number;
  minFileWidth?: number;
  minFileHeight?: number;
  maxVideoDuration?: number;
  minVideoDuration?: number;
  isHovering?: (hovering: boolean) => void;
  onFileSelection?: (files: DropzoneFileData[]) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (event: React.MouseEvent) => void;
  onDragEnter?: (event: React.DragEvent) => void;
  onDragOver?: (event: React.DragEvent) => void;
  onDragLeave?: (event: React.DragEvent) => void;
  onDrop?: (event: React.DragEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  acceptsValidOnly?: boolean;
  acceptsVideo?: boolean;
  acceptsMultiple?: boolean;
  imageTypes?: string[];
  videoTypes?: string[];
};

type DropzoneState = {
  isFileDialogActive?: boolean;
};

export class DropzoneComponent extends Component<DropzoneProps, DropzoneState> {
  static defaultProps: Partial<DropzoneProps> = {
    ariaLabel: 'Dropzone',
    minFileWidth: DEFAULT_MIN_FILE_WIDTH,
    minFileHeight: DEFAULT_MIN_FILE_HEIGHT,
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    isHovering() {},
    onFileSelection() {},
    acceptsValidOnly: true,
    acceptsVideo: false,
    imageTypes: DEFAULT_IMAGE_TYPES,
    videoTypes: DEFAULT_VIDEO_TYPES,
  };

  input = React.createRef<HTMLInputElement>();

  onClick = (event?: React.MouseEvent) => {
    if (!this.input.current) {
      return;
    }

    this.input.current.click();
    this.setState({ isFileDialogActive: true });

    if (this.props.onClick && event) {
      this.props.onClick.call(this, event);
    }
  };

  onKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && this.input.current) {
      this.onClick();
    }
  };

  onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] =
      event.target.files === null ? [] : Array.from(event.target.files);
    const fileData = await this.getFileData(files);

    this.setState({ isFileDialogActive: false });
    this.sendFileSelection(fileData);

    if (this.input.current) {
      this.input.current.value = '';
    }

    if (this.props.onChange) {
      this.props.onChange.call(this, event);
    }
  };

  onDragEnter = (event: React.DragEvent) => {
    event.preventDefault();

    if (this.props.isHovering) {
      this.props.isHovering(true);
    }

    if (this.props.onDragEnter) {
      this.props.onDragEnter.call(this, event);
    }
  };

  onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      // The file dialog on Chrome allows users to drag files from the dialog onto
      // the dropzone, causing the browser the crash when the file dialog is closed.
      // A drop effect of 'none' prevents the file from being dropped
      event.dataTransfer.dropEffect = this.state.isFileDialogActive
        ? 'none'
        : 'copy';
    } catch (error) {
      // continue regardless of error
    }

    if (this.props.onDragOver) {
      this.props.onDragOver.call(this, event);
    }
  };

  onDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    let files: File[] = [];

    // JSDOM does not support dataTransfer :(
    if (event.dataTransfer) {
      if (event.dataTransfer.items) {
        files = Array.from(event.dataTransfer.items)
          .map(item => item.getAsFile())
          .filter((file): file is File => Boolean(file));
      } else {
        files = Array.from(event.dataTransfer.files);
      }
    }

    const fileData = await this.getFileData(files);

    this.sendFileSelection(fileData);

    if (this.input.current) {
      this.input.current.value = '';
    }

    if (this.props.onDrop) {
      this.props.onDrop.call(this, event);
    }
  };

  onDragLeave = (event: React.DragEvent) => {
    event.preventDefault();

    if (this.props.isHovering) {
      this.props.isHovering(false);
    }

    if (this.props.onDragLeave) {
      this.props.onDragLeave.call(this, event);
    }
  };

  onMouseLeave = (event: React.MouseEvent) => {
    if (this.props.isHovering) {
      this.props.isHovering(false);
    }

    if (this.props.onMouseLeave) {
      this.props.onMouseLeave.call(this, event);
    }
  };

  getFileData = async (files: File[]) => {
    const { maxFileSize = DEFAULT_MAX_FILE_SIZE } = this.props;
    const getFilePath = await Promise.all(
      files.map(async (file: File) => ({
        file,
        // the browser might crash when parsing very large files (> 1GB), so skip that if it exceeds the allowed size anyway
        binary: file.size <= maxFileSize ? await loadFile(file) : null,
      })),
    );

    const newFileList: DropzoneFileData[] = await Promise.all(
      getFilePath.map(
        async ({
          file,
          binary,
        }: {
          file: File;
          binary: ArrayBuffer | null;
        }) => {
          const errors = [];
          const metadata: DropzoneFileMetadata = {
            height: undefined,
            width: undefined,
          };

          const fileUrl = window.URL.createObjectURL(file);

          if (file.type.indexOf('video/') === 0) {
            try {
              const {
                videoWidth,
                videoHeight,
                duration,
              } = await createVideoObject(fileUrl);
              metadata.width = videoWidth;
              metadata.height = videoHeight;
              metadata.duration = duration; // field is only available for video elements
            } catch (error) {
              debug('could not create video object:', error);
              errors.push(videoCannotOpen(this.props.t));
            }

            if (binary instanceof ArrayBuffer) {
              // HTMLVideoElement's `videoHeight`/`videoWidth` attribute is not always accurate
              // (and sometimes empty), instead we parse the actual metadata and set it on the element
              const parsedFile = parseBuffer(binary);

              const trackHeaders = parsedFile.fetchAll('tkhd');
              debug('all available video trackheader metadata:', trackHeaders);

              // make sure we pick the `tkhd` element with the largest width since there can be multiple
              const trackHeader = trackHeaders.reduce(
                (acum: any, tkhd: any) => {
                  if (!acum || !acum.width || !acum.height) {
                    return tkhd;
                  }

                  if (
                    (tkhd.width && tkhd.width > acum.width) ||
                    (tkhd.height && tkhd.height > acum.height)
                  ) {
                    return tkhd;
                  }

                  return acum;
                },
              );
              debug('selected video trackheader metadata:', trackHeader);

              const { width, height, matrix } = trackHeader;

              // I think "65535" is the equivalent to "-1" since the first 7 values in the matrix are 16 bit integers
              const MATRIX_VALUE_MINUS_ONE = 65535;

              /**
               * we only need to inspect the values `a, b, c, d` in the following 3x3 matrix to get
               * the rotation angle and we only care if we are at a 90 or 270 (or -90) degree angle so we
               * can flip the height/width values
               * @see: https://developer.apple.com/library/archive/documentation/QuickTime/QTFF/QTFFChap4/qtff4.html#//apple_ref/doc/uid/TP40000939-CH206-18737
               *
               * [ a,    b,    u,
               *   c,    d,    v,
               *   t(x), t(y), w ]
               *
               * 90 deg equals to `[0, MATRIX_VALUE_MINUS_ONE, 0, 1, 0, 0, 0, 0, 16384]`
               * 270 deg equals to `[0, 1, 0, MATRIX_VALUE_MINUS_ONE, 0, 0, 0, 0, 16384]`
               */
              const is90degRotation =
                matrix &&
                matrix[0] === 0 &&
                matrix[1] === MATRIX_VALUE_MINUS_ONE &&
                matrix[3] === 1 &&
                matrix[4] === 0;
              const is270degRotation =
                matrix &&
                matrix[0] === 0 &&
                matrix[1] === 1 &&
                matrix[3] === MATRIX_VALUE_MINUS_ONE &&
                matrix[4] === 0;

              if (is90degRotation || is270degRotation) {
                debug(
                  `video is rotated by ${
                    is90degRotation ? 90 : 270
                  } degrees, swapping width and height`,
                );
                metadata.width = height;
                metadata.height = width;
              } else {
                debug('video is not rotated, using width and height as is');
                metadata.width = width;
                metadata.height = height;
              }
            }
          } else if (file.type.indexOf('image/') === 0) {
            try {
              const { width, height } = await createImageObject(fileUrl);
              metadata.width = width;
              metadata.height = height;
            } catch (error) {
              debug('could not create image object:', error);
              errors.push(imageCannotOpen(this.props.t));
            }
          }

          return {
            source: fileUrl,
            binary,
            metadata,
            file,
            errors,
          };
        },
      ),
    );

    return newFileList;
  };

  getFileErrors = (fileData: DropzoneFileData) => {
    const { file, metadata, errors } = fileData;

    if (errors.length) {
      return errors;
    }

    if (this.props.acceptsVideo && file.type.indexOf('video/') === 0) {
      return this.isVideoAccepted(file, metadata);
    }
    if (file.type.indexOf('image/') === 0) {
      return this.isImageAccepted(file, metadata);
    }

    const { imageTypes = [], videoTypes = [] } = this.props;
    let acceptedFiles = [...imageTypes];
    if (this.props.acceptsVideo) {
      acceptedFiles = acceptedFiles.concat(videoTypes);
    }

    // default error
    return [fileWrongType(acceptedFiles, this.props.t)];
  };

  isImageAccepted = (file: File, metadata: DropzoneFileMetadata) => {
    const {
      maxFileSize = DEFAULT_MAX_FILE_SIZE,
      minFileWidth = DEFAULT_MIN_FILE_WIDTH,
      minFileHeight = DEFAULT_MIN_FILE_HEIGHT,
      imageTypes = [],
    } = this.props;
    const errors = [];

    const isAcceptedType = imageTypes.some(type => file.type.includes(type));
    if (!isAcceptedType) {
      errors.push(fileWrongType(imageTypes, this.props.t));

      // no further error checking possible
      return errors;
    }

    const isAcceptedSize = file.size <= maxFileSize;
    if (!isAcceptedSize) {
      errors.push(imageTooLarge(maxFileSize, this.props.t));

      // no further error checking possible
      return errors;
    }

    const isAcceptedDimension =
      metadata.width &&
      metadata.width >= minFileWidth &&
      metadata.height &&
      metadata.height >= minFileHeight;
    if (!isAcceptedDimension) {
      errors.push(imageTooSmall(minFileWidth, minFileHeight, this.props.t));
    }

    return errors;
  };

  isVideoAccepted = (file: File, metadata: DropzoneFileMetadata) => {
    const {
      maxFileSize = DEFAULT_MAX_FILE_SIZE,
      minFileWidth = DEFAULT_MIN_FILE_WIDTH,
      minFileHeight = DEFAULT_MIN_FILE_HEIGHT,
      minVideoDuration,
      maxVideoDuration,
      videoTypes = [],
    } = this.props;
    const errors = [];

    const isAcceptedType = videoTypes.some(type => file.type.includes(type));
    if (!isAcceptedType) {
      errors.push(fileWrongType(videoTypes, this.props.t));

      // no further error checking possible
      return errors;
    }

    const isAcceptedSize = file.size <= maxFileSize;
    if (!isAcceptedSize) {
      errors.push(videoTooLarge(maxFileSize, this.props.t));

      // no further error checking possible
      return errors;
    }

    if (minVideoDuration && maxVideoDuration) {
      const isAcceptedDuration =
        metadata.duration &&
        metadata.duration <= maxVideoDuration &&
        metadata.duration >= minVideoDuration;
      if (!isAcceptedDuration) {
        errors.push(
          videoBadDuration(minVideoDuration, maxVideoDuration, this.props.t),
        );
      }
    }

    const isAcceptedDimension =
      metadata.width &&
      metadata.width >= minFileWidth &&
      metadata.height &&
      metadata.height >= minFileHeight;
    if (!isAcceptedDimension) {
      errors.push(videoTooSmall(minFileWidth, minFileHeight, this.props.t));
    }

    return errors;
  };

  sendFileSelection = (files: DropzoneFileData[]) => {
    const fileData = files.map(file => {
      const errors = this.getFileErrors(file);
      if (errors && errors.length) {
        file.errors = errors;
      }

      return file;
    });

    if (this.props.onFileSelection) {
      this.props.onFileSelection(
        this.props.acceptsMultiple ? fileData : fileData.slice(0, 1),
      );
    }
  };

  render() {
    const {
      ariaLabel,
      className,
      children,
      acceptsValidOnly,
      acceptsMultiple,
      acceptsVideo,
      imageTypes = [],
      videoTypes = [],
    } = this.props;

    const acceptedFiles = acceptsVideo
      ? imageTypes.concat(videoTypes).join(',')
      : imageTypes.join(',');

    return (
      <DropzoneSection
        aria-label={ariaLabel}
        tabIndex={0}
        className={className}
        role="region"
        onClick={this.onClick}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onKeyPress={this.onKeyPress}
        onMouseLeave={this.onMouseLeave}
      >
        <DropzoneInput
          ref={this.input}
          type="file"
          multiple={acceptsMultiple}
          accept={acceptsValidOnly ? acceptedFiles : undefined}
          onChange={this.onChange}
          data-testid="dropzone--input"
          data-slo-id="file-upload"
        />
        {children}
      </DropzoneSection>
    );
  }
}

export const Dropzone = withT(DropzoneComponent);
