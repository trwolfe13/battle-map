import * as Actions from './actions';
import { initialMapState } from './initial';
import { MapState } from './state';

export function mapReducer(state: MapState = initialMapState, action: Actions.MapActions): MapState {
  switch (action.type) {
    case Actions.SetActiveTool.TYPE: {
      return { ...state, activeTool: action.toolId };
    }
    case Actions.SetBackground.TYPE: {
      return { ...state, background: action.background };
    }
    case Actions.SetCanvas.TYPE: {
      return { ...state, canvas: action.canvas, context: action.canvas.getContext('2d') };
    }
    default: return state;
  }
}
