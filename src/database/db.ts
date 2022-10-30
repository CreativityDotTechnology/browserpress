import Dexie, { Table } from 'dexie';
import { Website } from '../interfaces';

export class BrowserPressDexie extends Dexie {
  
  websites!: Table<Website>; 

  constructor() {
    super('db');
    this.version(1).stores({
      websites: '++id' // Primary key and indexed props
    });
  }
}

export const db = new BrowserPressDexie();