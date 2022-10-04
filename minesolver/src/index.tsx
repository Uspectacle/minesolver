import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { CellType } from './type/cellType';
import { App } from './component/App';
import { AppInit } from './component/AppInit';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const sizeGrid = 2;
const mineNum = 1;
const useAI = false;

const renderGrid = (grid: CellType[]) => {
  root.render(
    <React.StrictMode>
      <App 
        useAI={useAI} 
        grid={grid} 
        sizeGrid={sizeGrid} 
        mineNum={mineNum} 
        renderGrid={renderGrid} 
      />
    </React.StrictMode>
  )
};

root.render(
  <React.StrictMode>
    <AppInit renderGrid={renderGrid}/>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
