import { BattlefieldState } from './battlefield';
import { CanvasState } from './canvas';
import { GridState } from './grid';
import { NavigationState } from './navigation';
import { TokensState } from './tokens';
import { ToolboxState } from '@bm/toolbox/store/state';

export interface AppState {
  battlefield: BattlefieldState;
  canvas: CanvasState;
  grid: GridState;
  navigation: NavigationState;
  tokens: TokensState;
  toolbox: ToolboxState;
}
