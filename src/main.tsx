import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import Code from './Code';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Code />
    </RecoilRoot>
  </React.StrictMode>,
);
