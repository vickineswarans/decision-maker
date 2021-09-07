import React from 'react';
import * as CSS from 'csstype';
import Button from './Button';
import InputBox from './InputBox';

interface IAddNodeProps {
  data: {
    inputValue: string,
    labelName: string,
    inputName: string,
    handleSubmit?: React.MouseEventHandler<HTMLButtonElement>,
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  }
}

const AddNode = ({ data }: IAddNodeProps): JSX.Element => {
  const { inputValue, labelName, inputName, handleSubmit, handleChange} = data;
  const wrapperStyle: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    border: '1px solid rgb(0 189 255)',
    padding: '10px 20px',
    boxShadow: 'rgb(128 162 224) 3px 3px',
    borderRadius: '3px',
  };

  return (
    <div style={wrapperStyle}>
      <form autoComplete="off">
        <InputBox labelName={labelName} inputName={inputName} inputValue={inputValue} handleChange={handleChange}/>
        <Button bgColor='#000000' handleClick={handleSubmit} isSubmit={true} name="Create" />
      </form>
    </div>
  ) 
}

export default React.memo(AddNode);
