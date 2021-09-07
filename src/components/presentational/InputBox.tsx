import React from 'react';
import * as CSS from 'csstype';

interface IInputBoxProps {
  labelName: string,
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  inputValue: string,
  inputName: string,
}

const InputBox = ({ labelName, handleChange, inputValue, inputName }: IInputBoxProps): JSX.Element => {
  const inputWrapper: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    
    backgroundColor: 'transparent',
    color: '#ffffff',
    cursor: 'pointer',
  };

  const labelStyle: CSS.Properties = {
    display: 'block',
    color: '#000000',
    fontSize: '11px',
    fontWeight: 'bold',
  }

  const inputStyle: CSS.Properties = {
    border: '1px solid #c7c7c7',
    height: '30px',
    lineHeight: '30px',
    margin: '10px 0px',
    paddingLeft: '10px',
    borderRadius: '5px',
  }

  return (
    <div style={inputWrapper}>
      <label style={labelStyle} htmlFor={inputName}>{labelName}</label>
      <input style={inputStyle} type="text" onChange={handleChange} name={inputName} />
    </div>
  ) 
}

export default React.memo(InputBox);
