import React from 'react';
import * as CSS from 'csstype';

interface IButtonProps {
  name?: string,
  handleClick?: React.MouseEventHandler<HTMLButtonElement>,
  isSubmit?: boolean,
  bgColor: string,
  disabled?: boolean,
}

const Button = ({ name, isSubmit, handleClick, bgColor, disabled }: IButtonProps): JSX.Element => {
  const buttonStyle: CSS.Properties = {
    display: 'inline-block',
    border: '1px solid white',
    borderRadius: '30px',
    padding: '5px 10px',
    fontSize: '12px',
    backgroundColor: `${bgColor}`,
    color: '#ffffff',
    cursor: 'pointer',
  };


  return (
    <button onClick={handleClick} type={`${isSubmit ? 'submit' : 'button'}`} style={buttonStyle} disabled={disabled}>
      {name}
    </button>
  ) 
}

export default React.memo(Button);
