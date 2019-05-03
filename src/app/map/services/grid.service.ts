import { Injectable } from '@angular/core';
import * as Grid from '@bm/map/store/grid';
import { Point } from '@bm/models';
import { AppState } from '@bm/store/state';
import { relativeMouse } from '@bm/utils';
import { select, Store } from '@ngrx/store';

import { MapCanvas } from './canvas.service';
import { MapController } from './controller.service';

@Injectable()
export class MapGrid {
  public size: number;
  public offset: Point;

  public readonly size$ = this.store.pipe(select(Grid.size));
  public readonly offset$ = this.store.pipe(select(Grid.offset));

  constructor(private controller: MapController, private canvas: MapCanvas, private store: Store<AppState>) {
    this.size$.subscribe(s => this.size = s);
    this.offset$.subscribe(o => this.offset = o);
  }

  setSize(size: number) { this.store.dispatch(new Grid.SetSize(size)); }
  setOffset(offset: Point) { this.store.dispatch(new Grid.SetOffset(offset)); }

  cellFromMouse(e: MouseEvent): Point {
    const point = relativeMouse(e, this.canvas.element);
    return this.cellFromCanvasPoint(point);
  }

  cellFromCanvasPoint(point: Point): Point {
    const gridSize = this.size * this.controller.scale;
    return {
      x: Math.floor((point.x - this.controller.pan.x - this.offset.x) / gridSize),
      y: Math.floor((point.y - this.controller.pan.y - this.offset.y) / gridSize)
    };
  }

  pointFromCell(cell: Point): Point {
    const gridSize = this.size * this.controller.scale;
    return {
      x: cell.x * gridSize + this.controller.pan.x + this.offset.x * this.controller.scale,
      y: cell.y * gridSize + this.controller.pan.y + this.offset.y * this.controller.scale,
    };
  }
}
