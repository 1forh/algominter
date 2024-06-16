import Dexie, { Table } from 'dexie';
import { env } from '../env.mjs';
import { ProjectT } from './types';

export class SubClassedDexie extends Dexie {
  projects!: Table<ProjectT>;

  constructor() {
    super(env.NEXT_PUBLIC_LOCAL_DB_NAME);
    this.version(1).stores({
      // Update the schema to match the structure of ProjectT
      projects: '++id, name, layers',
    });
  }
}

export const db = new SubClassedDexie();
