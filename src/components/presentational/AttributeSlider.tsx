import React from 'react';
import * as CSS from 'csstype';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { IStateflowElements } from '../container/FlowNodesContainer';

type AttributeSliderProps = {
  id: string,
  attrName: string,
  value: object[],
  maxValue: number,
  nodeType: string,
  handleAttributeRange: React.Dispatch<React.SetStateAction<IStateflowElements['flowElement']>>,
  handleAfterSliderChange: React.Dispatch<React.SetStateAction<boolean>>,
}

const AttributeSlider = ({ attrName, value, handleAttributeRange, id, handleAfterSliderChange, maxValue, nodeType }: AttributeSliderProps): JSX.Element => {
  const style = {margin: 0, width: '100%', minWidth: '150px'};

  const wrapperStyle: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const h3Style: CSS.Properties = {
    margin: '0px',
    padding: '0px',
    fontSize: '11px',
    fontWeight: 'bold'
  };

  const sliderStyle: CSS.Properties = {
    marginBottom: '25px',
  };

  const spanStyle: CSS.Properties = {
    fontWeight: 'bold',
    fontSize: '12px',
    color: '#d00909',
  };

  const onSliderChange = (val: number, nodeId: string): void => {
    handleAttributeRange((els) => 
      els.map((el) => {
        const updatedValue = value.map((attribute: any) =>
          attribute.nodeId === nodeId ? { ...attribute, selectedValue: val } : attribute
        );

        if (el.id === id) {
          el.data = {
            ...el.data,
            value: updatedValue,
          };
        }
        return el;
      })
    );
  }

  const onSliderAfterChange = (): void => {
    handleAfterSliderChange(true);
  }

  return (
    <div style={wrapperStyle}>
      {value.map((attribute: any, id: number) => (
        <div key={id} style={sliderStyle}>
          <h3 style={h3Style}>{attribute.attrLabel}: <span style={spanStyle}>{nodeType === 'attribute' ? parseFloat((attribute.selectedValue / 100).toFixed(1)) : attribute.selectedValue}</span></h3>
          <Slider 
            style={style} 
            max={maxValue}
            trackStyle={{ backgroundColor: '#10a7ff', margin: '10px 0px'}}
            railStyle={{ backgroundColor: '#ccc3c3',margin: '10px 0px' }}
            defaultValue={attribute.selectedValue}
            handleStyle={{
              borderColor: '#10a7ff',
              height: 25,
              width: 25,
              marginLeft: 0,
              marginTop: 0,
              cursor: 'move',
              backgroundColor: 'white',
            }}
            onChange={(val) => onSliderChange(val, attribute.nodeId)}
            onAfterChange={onSliderAfterChange}
          />
        </div>
      ))}
    </div>
  ) 
}

export default React.memo(AttributeSlider);
