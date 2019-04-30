import { Injectable } from '@angular/core';
import { Point } from '@bm/models';
import * as MapStore from '@bm/store/map';
import { AppState } from '@bm/store/state';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { MapNavigator } from './navigator.service';

@Injectable()
export class Map {
  private readonly canvas$ = new BehaviorSubject<HTMLCanvasElement>(undefined);
  public readonly canvas = this.canvas$.asObservable();

  private readonly context$ = new BehaviorSubject<CanvasRenderingContext2D>(undefined);
  public readonly context = this.context$.asObservable();

  private readonly background$ = new BehaviorSubject<ImageBitmap>(undefined);
  public readonly background = this.background$.asObservable();

  private readonly grid$ = new BehaviorSubject<MapStore.Grid>(undefined);
  public readonly grid = this.grid$.asObservable();

  constructor(private store: Store<AppState>, private navigator: MapNavigator) {
    this.store.pipe(select(MapStore.canvas)).subscribe(c => this.canvas$.next(c));
    this.store.pipe(select(MapStore.context)).subscribe(c => this.context$.next(c));
    this.store.pipe(select(MapStore.background)).subscribe(i => this.background$.next(i));
    this.store.pipe(select(MapStore.grid)).subscribe(g => this.grid$.next(g));
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.store.dispatch(new MapStore.SetCanvas(canvas));
  }

  setBackground(image: ImageBitmap) {
    this.store.dispatch(new MapStore.SetBackground(image));
    this.navigator.fitToScreen();
  }

  setGridSize(size: number) {
    this.store.dispatch(new MapStore.SetGridSize(size));
  }

  setGridOffset(offset: Point) {
    this.store.dispatch(new MapStore.SetGridOffset(offset));
  }
}
