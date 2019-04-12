import {
  createNewBndBoxBtnClick, createNewPolygonBtnClick,
  removeActiveShapeBtnClick, resetCanvasEventsToDefault,
  removePolygonPointBtnClick, downloadXMLBtnClick,
  uploadImageBtnClick,
} from './buttonEvents/facade';
import {
  interruptCanvasEventsBeforeFunc, interruptCanvasEventsBeforeFuncWParams,
  doNothingIfLabellingInProgress,
} from './buttonMiddleware/buttonMiddleware';

function assignToolkitButtonEvents() {
  window.createNewBndBox = interruptCanvasEventsBeforeFunc.bind(this, createNewBndBoxBtnClick);
  window.createNewPolygon = interruptCanvasEventsBeforeFunc.bind(this, createNewPolygonBtnClick);
  window.removePoint = doNothingIfLabellingInProgress.bind(this, removePolygonPointBtnClick);
  window.removeShape = interruptCanvasEventsBeforeFunc.bind(this, removeActiveShapeBtnClick);
  window.downloadXML = interruptCanvasEventsBeforeFunc.bind(this, downloadXMLBtnClick);
  window.cancel = interruptCanvasEventsBeforeFunc.bind(this, resetCanvasEventsToDefault);
  window.uploadImage = interruptCanvasEventsBeforeFuncWParams.bind(this, this, uploadImageBtnClick);
}

export { assignToolkitButtonEvents as default };