import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

class FormInput extends React.Component {
  changeHandler = ( e ) => {
    this.props.onInputValue( {
      key: this.props.inputName,
      value: e.target.value,
    } );
  }

  render () {
    return (
      <div className="m_formInput">
        <label className="formInput__inner">
          <span className="formInput__text">{this.props.labelText}</span>
          <input
            className="formInput__input"
            type="text"
            name={ this.props.inputName }
            value={ this.props.InputValue }
            onChange={ this.changeHandler }
          />
        </label>
      </div>
    )
  }
}

class FormComp extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      name: '',
      age: '',
    }
  }

  submitHandler = ( e ) => {
    e.preventDefault();

    console.log( e );
    console.log( this );
  }

  inputValueHandler = ( emitObj ) => {
    console.log( emitObj );

    this.setState( {
      [ emitObj.key ]: emitObj.value,
    } );
  }

  render () {
    return (
      <form onSubmit={ this.submitHandler }>
        <FormInput
          labelText="名前"
          inputName="name"
          InputValue={ this.state.name }
          onInputValue={ this.inputValueHandler }
        />

        <FormInput
          labelText="年齢"
          inputName="age"
          InputValue={ this.state.age }
          onInputValue={ this.inputValueHandler }
        />

        <button type="submit">送信</button>
      </form>
    );
  }
}

class BoxComp extends React.Component {
  render () {
    return (
      <div className="m_box">
        { this.props.children }
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <FormComp />
    <BoxComp>
      <p>lorem</p>
    </BoxComp>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
