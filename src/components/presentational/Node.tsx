import React from 'react';
import { Handle, Position } from 'react-flow-renderer';
import * as CSS from 'csstype';
import { IStateflowElements } from '../container/FlowNodesContainer';
import AttributeSlider from './AttributeSlider';
import Score from './Score';

interface INodeProps {
  data: {
    id: string,
    value: object[],
    name: string,
    elementType: string,
    score: string,
    maxValue: number,
    handleAttributeRange: React.Dispatch<React.SetStateAction<IStateflowElements['flowElement']>>,
    handleAfterSliderChange: React.Dispatch<React.SetStateAction<boolean>>,
  },
  isConnectable: boolean
}

const Node = ({ data, isConnectable }: INodeProps): JSX.Element => {
  const wrapperStyle: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    border: '1px solid #cccccc',
    padding: '20px 20px 5px 20px',
    boxShadow: '3px 3px #c5c4d2',
    borderRadius: '3px',
  };

  const h3Style: CSS.Properties = {
    margin: '0px',
    padding: '0px',
    fontSize: '13px',
    fontWeight: 'bold'
  };

  const hrStyle: CSS.Properties = {
    borderTop: '1px solid #d62e2e36',
  }

  return (
    <div style={wrapperStyle}>
      <Handle
        type='source'
        position= {Position.Bottom}
        style={{ background: '#555' }}
        isConnectable={isConnectable}
      />
      <h3 style={h3Style}>{data.name}</h3>
      <div><hr style={hrStyle}/></div>
      <AttributeSlider attrName='Weighting' nodeType={data.elementType} maxValue={data.maxValue} value={data.value} id={data.id} handleAttributeRange={data.handleAttributeRange} handleAfterSliderChange={data.handleAfterSliderChange}/>

      {
        data.elementType === 'option' && (
          <>
            <Score title="Score" scoreValue={data.score} titleColor='black' titleSize='18px'/>
            <Handle
              type='target'
              position= {Position.Top}
              style={{ background: '#555' }}
              isConnectable={isConnectable}
            />
          </>
        )
      }
    </div>
  ) 
}

export default React.memo(Node);
