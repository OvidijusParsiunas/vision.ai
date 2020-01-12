import { setChangingMLGeneratedLabelNamesState } from '../../../toolkit/buttonClickEvents/facadeWorkersUtils/stateManager';
import {
  changeEditedLabelText, displayViewElements,
  canChangeRowToStopEdit, stopEditingActiveTextElement,
} from './style';

let activeLabelInitialText = '';
let activeLabelElement = null;
let generatedObjects = null;
let objectNames = null;

function getGeneratedMachineLearningData() {
  return generatedObjects;
}

function updateGeneratedObjectsNames() {
  Object.keys(generatedObjects).forEach((key) => {
    generatedObjects[key].forEach((object) => {
      object.class = objectNames[object.class].pendingName;
    });
  });
}

function submitNewLabelNames() {
  updateGeneratedObjectsNames();
  setChangingMLGeneratedLabelNamesState(false);
}

function setNewLabelName() {
  if (activeLabelElement.innerHTML !== activeLabelInitialText) {
    Object.keys(objectNames).forEach((key) => {
      if (objectNames[key].pendingName === activeLabelInitialText) {
        objectNames[key].pendingName = activeLabelElement.innerHTML;
      }
    });
  }
}

function displayInitialTextIfEmpty() {
  if (activeLabelElement.innerHTML === '') {
    changeEditedLabelText(activeLabelInitialText);
  }
}

function saveLabelName() {
  displayInitialTextIfEmpty();
  setNewLabelName();
}

function stopEditingMLGeneratedLabelName() {
  saveLabelName();
  stopEditingActiveTextElement();
}

function stopEditingMLGeneratedLabelNameBtnClick(element) {
  if (canChangeRowToStopEdit(element)) {
    stopEditingMLGeneratedLabelName();
  }
}

function setActiveLabelProperties(element) {
  activeLabelElement = element.childNodes[9];
  const text = activeLabelElement.innerHTML;
  activeLabelInitialText = text;
}

function createObjectNamesObject() {
  const currentNameToPending = {};
  Object.keys(generatedObjects).forEach((key) => {
    const predictions = generatedObjects[key];
    for (let i = 0; i < predictions.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(currentNameToPending, predictions[i].class)) {
        currentNameToPending[predictions[i].class] = { pendingName: predictions[i].class };
      }
    }
  });
  return currentNameToPending;
}

function displayGeneratedLabelsView(generatedObjectsArg) {
  generatedObjects = generatedObjectsArg;
  objectNames = createObjectNamesObject();
  displayViewElements(objectNames);
  setChangingMLGeneratedLabelNamesState(true);
}

export {
  displayGeneratedLabelsView, setActiveLabelProperties,
  stopEditingMLGeneratedLabelNameBtnClick, submitNewLabelNames,
  stopEditingMLGeneratedLabelName, getGeneratedMachineLearningData,
};
