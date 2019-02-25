const polygonProperties = {};

function generateNewCircle(id, options, canvas) {
  return {
    radius: 5,
    fill: '#ffffff',
    stroke: '#333333',
    strokeWidth: 0.5,
    left: (options.e.layerX / canvas.getZoom()),
    top: (options.e.layerY / canvas.getZoom()),
    selectable: false,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center',
    id,
    objectCaching: false,
  };
}

(function setProperties() {
  polygonProperties.newPolygon = {
    stroke: '#333333',
    strokeWidth: 0.5,
    fill: 'red',
    opacity: 1,
    perPixelTargetFind: true,
    hasBorders: false,
    hasControls: false,
  };
  polygonProperties.newTempPolygon = {
    stroke: '#333333',
    strokeWidth: 1,
    fill: '#cccccc',
    opacity: 0.3,
    selectable: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    objectCaching: false,
  };
  polygonProperties.newLine = {
    strokeWidth: 2,
    fill: '#999999',
    stroke: '#999999',
    class: 'line',
    originX: 'center',
    originY: 'center',
    selectable: false,
    hasBorders: false,
    hasControls: false,
    evented: false,
    objectCaching: false,
  };
  polygonProperties.firstCircle = {
    fill: 'red',
  };
  polygonProperties.newCircle = generateNewCircle;
}());


export { polygonProperties as default };
