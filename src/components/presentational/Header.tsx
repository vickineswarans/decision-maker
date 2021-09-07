import React from 'react';
import * as CSS from 'csstype';
import Button from './Button';
import { IStateApp as Props } from '../../DecisionMakerApp';

export interface IHeaderProps {
  attributes: Props['attributes'],
  options: Props['options'],
  btnState: Props['headerBtnState'],
  setAttributes: React.Dispatch<React.SetStateAction<Props['attributes']>>
  setOptions: React.Dispatch<React.SetStateAction<Props['options']>>,
  setBtnState: React.Dispatch<React.SetStateAction<Props['headerBtnState']>>,
}

const Header = ({ attributes, setAttributes, setOptions, options, setBtnState, btnState }: IHeaderProps): JSX.Element => {
  const h1Style: CSS.Properties = {
    color: '#ffffff',
    fontSize: '20px',
    alignSelf: 'center',
  };

  const buttonWrapperStyle: CSS.Properties = {
    display: 'flex',
    width: '190px',
    justifyContent: 'space-between',
    margin: '0px auto',
  };

  const headerStyle: CSS.Properties = {
    display: 'flex',
    height: '100px',
    backgroundColor: '#3a121275',
    flexDirection: 'column',
  };

  const handleHeaderBtnClick = (obj: Props['attributes'] | Props['options'], setObj: React.Dispatch<React.SetStateAction<Props['attributes']>> | React.Dispatch<React.SetStateAction<Props['options']>>, nodeYPos: number, idPrefix: string): void => {
    const newId = `${idPrefix}${obj.length.toString()}`;
    let newXPos = 220 * obj.length;

    setObj([...obj, {
      id: newId,
      position: { x: newXPos, y: nodeYPos},
    }])

    setBtnState(true);
  }

  return (
    <header style={headerStyle}>
      <h1 style={h1Style}>Decision Maker</h1>
      <div style={buttonWrapperStyle}>
        <Button disabled={btnState} bgColor='transparent' handleClick={() => handleHeaderBtnClick(attributes, setAttributes, 25, 'attr')} name="Add Attribute"/>
        <Button disabled={btnState} bgColor='transparent' handleClick={() => handleHeaderBtnClick(options, setOptions, 300, 'opt')} name="Add Option"/>
      </div>
    </header>
  ) 
}

export default React.memo(Header);
