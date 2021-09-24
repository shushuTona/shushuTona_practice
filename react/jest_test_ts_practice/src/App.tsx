import {
  VFC,
  memo
} from 'react';
import './css/App.css';

const App: VFC = memo( () => {
  return (
    <div className="App">
      <p>hoge.</p>
    </div>
  )
} );

export default App;
