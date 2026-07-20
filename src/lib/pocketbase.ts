import PocketBase from 'pocketbase';

const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';

let pb: PocketBase | null = null;

export function getPocketBase(): PocketBase {
  if (!pb) {
    pb = new PocketBase(POCKETBASE_URL);
  }
  return pb;
}

export interface DalailRecord {
  id: string;
  title: string;
  category: string;
  content_english: string;
  content_urdu: string;
  content_arabic: string;
  created: string;
  updated: string;
}
