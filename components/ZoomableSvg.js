import React, {Component} from 'react';
import {View, PanResponder} from 'react-native';
import SvgMap from './svg/SvgMap';

function calcDistance(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy);
}

function middle(p1, p2) {
  return (p1 + p2) / 2;
}

function calcCenter(x1, y1, x2, y2) {
  return {
    x: middle(x1, x2),
    y: middle(y1, y2),
  };
}

export default class ZoomableSvg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 1,
      left: Math.floor((props.width - 350) / 2),
      top: Math.floor((props.height - 443) / 2),
    };
  }

  processPinch(x1, y1, x2, y2) {
    const distance = calcDistance(x1, y1, x2, y2);
    const {x, y} = calcCenter(x1, y1, x2, y2);

    if (!this.state.isZooming) {
      const {top, left, zoom} = this.state;
      this.setState({
        isZooming: true,
        initialX: x,
        initialY: y,
        initialTop: top,
        initialLeft: left,
        initialZoom: zoom,
        initialDistance: distance,
      });
    } else {
      const {
        initialX,
        initialY,
        initialTop,
        initialLeft,
        initialZoom,
        initialDistance,
      } = this.state;

      const touchZoom = distance / initialDistance;
      const dx = x - initialX;
      const dy = y - initialY;

      const left = (initialLeft + dx - x) * touchZoom + x;
      const top = (initialTop + dy - y) * touchZoom + y;
      const zoom = initialZoom * touchZoom;

      if (this.props.minZoom <= zoom && zoom <= this.props.maxZoom) {
        this.setState({
          zoom,
          left,
          top,
        });
      }
      console.log(this.state.zoom);
    }
  }

  processTouch(x, y) {
    if (!this.state.isMoving || this.state.isZooming) {
      const {top, left} = this.state;
      this.setState({
        isMoving: true,
        isZooming: false,
        initialLeft: left,
        initialTop: top,
        initialX: x,
        initialY: y,
      });
    } else {
      const {initialX, initialY, initialLeft, initialTop} = this.state;
      const dx = x - initialX;
      const dy = y - initialY;
      this.setState({
        left: initialLeft + dx,
        top: initialTop + dy,
      });
    }
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onPanResponderGrant: () => {},
      onPanResponderTerminate: () => {},
      onMoveShouldSetPanResponder: () => true,
      onStartShouldSetPanResponder: () => true,
      onShouldBlockNativeResponder: () => true,
      onPanResponderTerminationRequest: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onPanResponderMove: evt => {
        const touches = evt.nativeEvent.touches;
        const length = touches.length;
        if (length === 1) {
          const [{locationX, locationY}] = touches;
          this.processTouch(locationX, locationY);
        } else if (length === 2) {
          const [touch1, touch2] = touches;
          this.processPinch(
            touch1.locationX,
            touch1.locationY,
            touch2.locationX,
            touch2.locationY,
          );
        }
      },
      onPanResponderRelease: () => {
        this.setState({
          isZooming: false,
          isMoving: false,
        });
      },
    });
  }

  render() {
    const viewBoxSize = 443;
    const {height, width, ribList} = this.props;
    const {left, top, zoom} = this.state;
    const resolution = viewBoxSize / Math.min(height, width);
    return (
      <View {...this._panResponder.panHandlers}>
        <SvgMap
          left={left}
          top={top}
          zoom={zoom}
          resolution={resolution}
          width={width}
          height={height}
          ribList={ribList}
        />
      </View>
    );
  }
}
