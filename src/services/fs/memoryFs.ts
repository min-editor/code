import { IFileSystem } from './fs';

export class MemoryFileSystem implements IFileSystem {
  private fs: Map<string, string>;
  constructor() {
    this.fs = new Map();
    const someJSCodeExample = `function x() {
    console.log("Hello World");
  }
      `;
    const someCSSCodeExample = `.main {
    background-color: red;
  }
      `;
    const someHTMLCodeExample = `<div class="main">
  </div>`;
    this.fs.set('index.ts', someJSCodeExample);
    this.fs.set('index.css', someCSSCodeExample);
    this.fs.set('index.html', someHTMLCodeExample);
  }
  readFile(path: string): Promise<string> {
    return this.fs.has(path)
      ? Promise.resolve(this.fs.get(path)!)
      : Promise.reject(new Error('File not found'));
  }
}
