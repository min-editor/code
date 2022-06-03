import { fs } from '@tauri-apps/api';
import { IFileSystem } from './fs';

export class TauriFileSystem implements IFileSystem {
  cache: Map<string, string>;
  constructor() {
    this.cache = new Map();
  }
  async readFile(path: string): Promise<string> {
    if (this.cache.has(path)) {
      return Promise.resolve(this.cache.get(path)!);
    }
    const content = await fs.readTextFile(path);
    this.cache.set(path, content);
    return content;
  }
}
