import { Injectable } from '@angular/core';
import { MapBattlefield, MapCanvas, MapGrid, MapTokens } from '@bm/map/services';
import { Creature } from '@bm/models';
import { AppState } from '@bm/store/state';
import * as CreatureStore from '@bm/toolbox/store/creature';
import { Tool } from '@bm/toolbox/tools/tool';
import { relativeMouse } from '@bm/utils';
import { Store } from '@ngrx/store';

@Injectable()
export class CreatureTool implements Tool {
  id = 1;
  title = 'Creature';
  icon = 'fa-chess-knight';

  private activeToken: number;

  public readonly activeToken$ = this.store.select(CreatureStore.activeToken);
  public readonly tokens$ = this.tokens.tokens$;

  private onCanvasClick = this.canvasClick.bind(this);

  constructor(
    private store: Store<AppState>,
    private canvas: MapCanvas,
    private grid: MapGrid,
    private battlefield: MapBattlefield,
    private tokens: MapTokens,
  ) {
    this.activeToken$.subscribe(t => this.activeToken = t);
  }

  setActiveToken(tokenId: number) {
    this.store.dispatch(new CreatureStore.SetActiveToken(tokenId));
  }

  canvasClick(e: MouseEvent) {
    const point = relativeMouse(e, this.canvas.element);
    const location = this.grid.cellAt(point);
    const creature: Creature = { tokenId: this.activeToken, location };
    this.battlefield.addCreature(creature);
  }

  activate() {
    this.canvas.element.addEventListener('click', this.onCanvasClick);
  }

  deactivate() {
    this.canvas.element.removeEventListener('click', this.onCanvasClick);
  }
}
