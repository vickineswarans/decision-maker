import React from 'react';
import * as CSS from 'csstype';

interface IScoreProps {
  title: string,
  scoreValue: string | number,
  titleColor: string,
  titleSize: string,
}

const Score = ({title, scoreValue, titleColor, titleSize}: IScoreProps): JSX.Element => {
  const scoreStyle: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '50px',
    backgroundColor: '#ffffff',
  };

  const h4Style: CSS.Properties = {
    fontSize: `${titleSize}`,
    color: `${titleColor}`,
    margin: '0px',
    padding: '0px',
  };
  
  const scoreValueStyle: CSS.Properties = {
    fontSize: '25px',
    fontWeight: 'bold',
    color: '#002c8e',
    margin: '0px',
    padding: '0px',
  };

  return (
    <div style={scoreStyle}>
      <h4 style={h4Style}>{title}</h4>
      <div style={scoreValueStyle}>{scoreValue}</div>
    </div>
  ) 
}

export default React.memo(Score);
