export interface IFileSystem {
  readFile(path: string): Promise<string>;
}
