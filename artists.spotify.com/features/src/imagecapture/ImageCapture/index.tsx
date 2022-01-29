// ignore-string-externalization
/* eslint-disable jsx-a11y/no-static-element-interactions */
/**
 * includes
 * panning
 * zooming
 * capture function
 */

import React from 'react';
import { Slider } from '../Slider';
import styles from './index.module.scss';

type ImageProp = {
  height: number;
  source: string;
  width: number;
};

type Position = {
  x: number;
  y: number;
};

export type ParentImageParams = {
  position: Position;
  url: string;
  zoom: number;
};

type Props = {
  desiredAspectRatio: number;
  editable: boolean;
  height: number;
  image: ImageProp;
  name: string;
  renderChildren: () => void;
  sendImageToParent: (params: ParentImageParams) => void;
  width: number;
  zoom?: number;
};

type State = {
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  panning: boolean;
  zoom: number;
  imageHTML?: HTMLImageElement;
};

const getScaledImageData = (
  width: number,
  height: number,
  image: ImageProp,
  zoom: number,
) => {
  const scaleRatio = Math.max(width / image.width, height / image.height);
  const scaledHeight = image.height * scaleRatio * zoom;
  const scaledWidth = image.width * scaleRatio * zoom;

  return {
    width: scaledWidth,
    height: scaledHeight,
  };
};

export class ImageCapture extends React.Component<Props, State> {
  static defaultProps = {
    desiredAspectRatio: 1,
    editable: true,
    height: 0,
    name: 'image-capture',
    sendImageToParent: () => {},
    renderChildren: () => {},
    width: 0,
    image: {
      source: '',
      width: 0,
      height: 0,
    },
  };

  state: State = {
    x: 0,
    y: 0,
    lastX: 0,
    lastY: 0,
    panning: false,
    zoom: 1,
  };

  constructor(props: Props) {
    super(props);
    this.zoom = this.zoom.bind(this);
  }

  canvasRef = React.createRef<HTMLCanvasElement>();

  componentDidMount() {
    const { width, height, image } = this.props;

    document.addEventListener('mouseup', this.endPan);
    document.addEventListener('mouseleave', this.endPan);
    document.addEventListener('mousemove', this.onPan);

    if (width && height && image && image.source) {
      this.updateImage(this.updateParent);
      this.centerImage();
    }
  }

  shouldComponentUpdate(props: Props, state: State) {
    const { image, width } = this.props;
    const { panning, x, y, zoom } = this.state;

    return (
      props.image.source !== image.source ||
      state.panning !== panning ||
      state.x !== x ||
      state.y !== y ||
      props.zoom !== zoom ||
      props.width !== width
    );
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { x, y, zoom, imageHTML } = this.state;
    const { image, width } = this.props;

    if (prevProps.width !== width) {
      this.updatePosition(x, y);
    }
    if (image.source !== prevProps.image.source || !imageHTML) {
      this.updateImage(this.updateParent);
      this.centerImage();
    } else {
      this.drawCanvas();
    }

    if (x !== prevState.x || y !== prevState.y || zoom !== prevState.zoom) {
      this.updateParent();
    }

    if (imageHTML && imageHTML !== prevState.imageHTML) {
      this.updateParent();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.endPan);
    document.removeEventListener('mouseleave', this.endPan);
    document.removeEventListener('mousemove', this.onPan);
  }

  onPan = (event: MouseEvent) => {
    const { panning, lastX, lastY } = this.state;

    if (!panning) {
      return;
    }

    const dx = event.screenX - lastX;
    const dy = event.screenY - lastY;
    this.setState(this.getUpdatedPosition(dx, dy));
    this.drawCanvas();
  };

  getUpdatedPosition = (dx: number, dy: number, newZoom?: number) => {
    const { width, height, image, desiredAspectRatio } = this.props;
    const { x, y, zoom } = this.state;

    const scaledData = getScaledImageData(
      width,
      height,
      image,
      newZoom || zoom,
    );

    const scaledHeight = scaledData.height;
    const scaledWidth = scaledData.width;

    const desiredWidth = width;
    const desiredHeight = desiredWidth / desiredAspectRatio;

    const pos = { x, y };
    const newPos = { ...pos };

    // For both the x and y axis, we need to determine if we're still in the
    // bounds of our image. We should NOT allow the user to move/pan if:
    //   - The difference (dx or dy) is positive, or
    //   - The gap is larger than what is allotted from the scaled image.

    const gutterSizeY =
      desiredHeight - height > 0 ? (height - desiredHeight) / 2 : 0;
    const gutterSizeX =
      desiredWidth - width > 0 ? (width - desiredWidth) / 2 : 0;

    if (dx < 1 && dx < gutterSizeX) {
      newPos.x = Math.max(dx, desiredWidth - scaledWidth + gutterSizeX);
    }

    if (dy < 1 && dy < gutterSizeY) {
      newPos.y = Math.max(dy, desiredHeight - scaledHeight + gutterSizeY);
    }

    // Finally, update our state for the current component.
    return { ...newPos };
  };

  getCenterPosition = (zoom: number) => {
    const { width, height, image } = this.props;

    const canvasRatio = width / height;
    const ratio = image.width / image.height;

    let imageCenterX = width / 2;
    let imageCenterY = height / 2;
    if (canvasRatio >= ratio) {
      imageCenterX = -1 * ((width * zoom - width) / 2);
      imageCenterY = -1 * (((width / ratio) * zoom - height) / 2);
    } else if (canvasRatio < ratio) {
      imageCenterY = -1 * ((height * zoom - height) / 2);
      imageCenterX = -1 * ((height * ratio * zoom - width) / 2);
    }

    return {
      x: imageCenterX,
      y: imageCenterY,
    };
  };

  updatePosition(x: number, y: number) {
    this.setState(this.getUpdatedPosition(x, y));
  }

  startPan = (event: MouseEvent | React.MouseEvent) => {
    if (this.props.editable) {
      const { x, y } = this.state;
      const { screenX, screenY } = event;

      return this.setState({
        panning: true,
        lastX: screenX - x,
        lastY: screenY - y,
      });
    }
    return false;
  };

  centerImage = () => {
    this.setState(state => this.getCenterPosition(state.zoom));
  };

  drawCanvas = (onImageDrawn?: () => void) => {
    const { width, height, image } = this.props;
    const { zoom, x, y, imageHTML } = this.state;
    const scaledData = getScaledImageData(width, height, image, zoom);

    const scaledHeight = scaledData.height;
    const scaledWidth = scaledData.width;

    if (!this.canvasRef.current || !imageHTML) {
      return null;
    }

    const ctx = this.canvasRef.current.getContext('2d');
    if (!ctx) return null;

    ctx.imageSmoothingEnabled = true;
    ctx.save();
    ctx.translate(x, y);
    ctx.drawImage(imageHTML, 0, 0, scaledWidth, scaledHeight);

    onImageDrawn?.();

    return ctx.restore();
  };

  updateImage(onImageDrawn?: () => void) {
    const { image } = this.props;
    const imageHTML = new window.Image();
    imageHTML.onload = () => {
      this.drawCanvas(onImageDrawn);
    };
    imageHTML.src = image.source;

    this.setState({ imageHTML });
  }

  updateParent = () => {
    const { imageHTML, x, y, zoom } = this.state;

    if (imageHTML && this.canvasRef.current) {
      this.props.sendImageToParent({
        position: { x, y },
        zoom,
        url: this.canvasRef.current.toDataURL('image/jpeg'),
      });
    }
  };

  endPan = () => {
    this.setState({ panning: false });
  };

  zoom(value: number) {
    const newZoom = 1 + value / 100;
    const oldCenter = this.getCenterPosition(this.state.zoom);
    const newCenter = this.getCenterPosition(newZoom);
    const dx = this.state.x + (newCenter.x - oldCenter.x);
    const dy = this.state.y + (newCenter.y - oldCenter.y);
    const { x, y } = this.getUpdatedPosition(dx, dy, newZoom);

    this.setState({ x, y, zoom: newZoom });
    this.drawCanvas();
  }

  render() {
    const { name, height, width, renderChildren, editable } = this.props;
    const { zoom } = this.state;
    return (
      <div className={styles[name]}>
        <canvas
          data-testid="image-capture-canvas"
          onMouseDown={this.startPan}
          className={styles[`${name}-preview`]}
          height={height}
          width={width}
          ref={this.canvasRef}
        />
        {editable && (
          <div
            className={styles[`${name}-slider`]}
            data-testid="image-capture-slider"
          >
            <Slider name={name} value={(zoom - 1) * 100} onChange={this.zoom} />
          </div>
        )}
        {renderChildren()}
      </div>
    );
  }
}
