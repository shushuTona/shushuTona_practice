import {
  VFC,
  memo,
  MouseEventHandler,
  ChangeEventHandler,
  useState,
  useCallback
} from 'react';
import { Btn } from './components/Btn';
import { TextInput } from './components/TextInput';
import './css/App.css';

const useChangeValue = ( inputType: inputType ) => {
  let defaultValue;
  switch ( inputType ) {
    case 'text':
      defaultValue = '';
      break;

    case 'number':
      defaultValue = '0';
      break;
  }

  const [value, setValue] = useState( defaultValue );
  const changeHandler: ChangeEventHandler<HTMLInputElement> = useCallback( ( event ) => {
    setValue( event.target.value );
  }, [] );

  return [value, changeHandler] as const;
}

const App: VFC = memo( () => {
  const [name, setName] = useChangeValue( 'text' );
  const [age, setAge] = useChangeValue( 'number' );
  const btnClickHandler: MouseEventHandler<HTMLButtonElement> = useCallback( ( event ) => {
    console.log( {
      name,
      age
    });
  }, [name, age] );

  return (
    <div className="App">
      <TextInput labelText="Name" inputType="text" inputValue={name} changeHandler={setName} />
      <TextInput labelText="Age" inputType="number" inputValue={age} changeHandler={setAge } />
      <Btn btnText="送信" clickHandler={btnClickHandler} />
    </div>
  )
} );

export default App;
