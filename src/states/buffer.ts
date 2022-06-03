import { atom, selector, selectorFamily } from 'recoil';
import { MemoryFileSystem } from '../services/fs/memoryFs';

export interface Buffer {
  name: string;
  language: string;
  content: string;
}

export const CurrentBufferName = atom({
  key: 'currentBufferName',
  default: '',
});

export const memoryFileSystem = atom({
  key: 'memoryFileSystem',
  default: new MemoryFileSystem(),
});

export const OpenedBuffers = atom<Set<string>>({
  key: 'OpenedBuffers',
  default: new Set(),
});

export const LoadCurrentBuffer = selector({
  key: 'LookupFile',
  get: async ({ get }) => {
    const currentBufName = get(CurrentBufferName);
    const fs = get(memoryFileSystem);

    console.trace('Looking up file', currentBufName);
    const content = await fs.readFile(currentBufName);
    return {
      name: currentBufName,
      language: 'typescript',
      content: content,
    } as Buffer;
  },
});
