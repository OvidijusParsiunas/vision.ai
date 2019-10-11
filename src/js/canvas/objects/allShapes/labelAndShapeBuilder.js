import fabric from 'fabric';
import { addLabelRef, setPolygonLabelOffsetProps } from '../label/label';
import labelProperties from '../label/properties';
import { addNewLabelToListFromPopUp, addExistingLabelToList } from '../../../tools/labelList/labelList';
import { addToLabelOptions, getLabelColor } from '../../../tools/labelList/labelOptions';
import { getLabelsVisibilityState, getMovableObjectsState } from '../../../tools/toolkit/buttonEvents/facadeWorkersUtils/stateManager';
import { addShape, addExistingShape } from './allShapes';

let currentId = 0;
let canvas = null;

function findInitialLabelLocation(shape) {
  const locationObj = {};
  if (shape.shapeName === 'bndBox') {
    locationObj.left = shape.left + labelProperties.boundingBoxOffsetProperties().left;
    locationObj.top = shape.top;
  } else if (shape.shapeName === 'polygon') {
    const left = shape.points[0].x - labelProperties.pointOffsetProperties().left;
    const top = shape.points[0].y - labelProperties.pointOffsetProperties().top;
    locationObj.left = left;
    locationObj.top = top;
    setPolygonLabelOffsetProps(shape, shape.points[0]);
  }
  return locationObj;
}

function generateLabel(label) {
  label.visible = getLabelsVisibilityState();
  canvas.add(label);
  canvas.bringToFront(label);
}

function generateLabelShapeGroup(shape, text) {
  shape.set('id', currentId);
  shape.set('shapeLabelText', text);
  const initialLocation = findInitialLabelLocation(shape);
  const textShape = new fabric.Text(text,
    labelProperties.getLabelProps(initialLocation, shape.shapeName));
  generateLabel(textShape);
  addToLabelOptions(textShape.text);
  const shapeColor = getLabelColor(textShape.text);
  addShape(shape, shapeColor, currentId);
  addLabelRef(textShape, currentId);
  addNewLabelToListFromPopUp(textShape.text, currentId, shapeColor.label);
  currentId += 1;
}

function repopulateLabelShapeGroup(shapeObj, label, id) {
  canvas.add(shapeObj.shapeRef);
  generateLabel(label);
  addExistingShape(shapeObj, id);
  addLabelRef(label, id);
  const shapeColor = getLabelColor(shapeObj.shapeRef.shapeLabelText);
  addExistingLabelToList(shapeObj.shapeRef.shapeLabelText, id,
    shapeColor.label, shapeObj.visibility);
}

function repopulateLabelAndShapeObjects(existingShapes, existingLabels) {
  Object.keys(existingShapes).forEach((key) => {
    repopulateLabelShapeGroup(existingShapes[key], existingLabels[key], key);
  });
  canvas.renderAll();
}

function shapeMovablePropertiesOnImageSelect(existingShapes) {
  if (getMovableObjectsState()) {
    Object.keys(existingShapes).forEach((key) => {
      const shape = existingShapes[key].shapeRef;
      shape.lockMovementX = false;
      shape.lockMovementY = false;
      shape.hoverCursor = 'move';
    });
  } else {
    Object.keys(existingShapes).forEach((key) => {
      const shape = existingShapes[key].shapeRef;
      shape.lockMovementX = true;
      shape.lockMovementY = true;
      shape.hoverCursor = 'default';
    });
  }
}

function assignCanvasForLabelAndShapeBuilder(canvasObj) {
  canvas = canvasObj;
}

export {
  assignCanvasForLabelAndShapeBuilder, repopulateLabelAndShapeObjects,
  findInitialLabelLocation, generateLabelShapeGroup, shapeMovablePropertiesOnImageSelect,
};