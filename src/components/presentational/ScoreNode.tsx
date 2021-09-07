import React from 'react';
import Score from './Score';
import * as CSS from 'csstype';
import { Handle, Position } from 'react-flow-renderer';

interface IScoreNodeProps {
  data: {
    winner: string,
  },
  isConnectable: boolean
}

const ScoreNode = ({ data, isConnectable }: IScoreNodeProps): JSX.Element => {
  const wrapperStyle: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '10px 20px',
    boxShadow: 'rgb(139 0 226 / 38%) 3px 3px',
    borderRadius: '3px',
    width: '200px',
    height: '100px',
    backgroundColor: '#ff13e71a',
  };

  return (
    <div style={wrapperStyle}>
      <Handle
        type='target'
        position= {Position.Top}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <Score title="WINNER" scoreValue={data.winner} titleColor='red' titleSize='20px'/>
    </div>
  ) 
}

export default React.memo(ScoreNode);
