import React, {useEffect, useState, useRef } from 'react';
import ReactFlow from 'react-flow-renderer';
import Node from '../presentational/Node';
import AddNode from '../presentational/AddNode';
import ScoreNode from '../presentational/ScoreNode';
import 'rc-slider/assets/index.css';
import { IHeaderProps } from '../presentational/Header';
import { addNewNode, createAttributeSetForOption } from '../utls/utils';

const nodeTypes = {
  nodeElement: Node,
  addNode: AddNode,
  scoreNode: ScoreNode,
}

export interface IStateflowElements {
  flowElement: {
    id: string,
    type: string,
    data: {
      elementType?: string,
      name?: string,
      score?: number,
      handleAttributeRange?: React.Dispatch<React.SetStateAction<IStateflowElements['flowElement']>>,
      handleAfterSliderChange?: React.Dispatch<React.SetStateAction<IStateNodeContainer['isSliderMoved']>>,
      id?: string,
      value: {
        nodeId: string, 
        selectedValue: number, 
        attrLabel: string, 
        maxValue: number
      }[],
      inputValue?: string,
      winner?: string,
    },
    position: {
      x: number,
      y: number
    },
    isHidden: boolean,
  }[]
}

interface IStateNodeContainer {
  isNewAttribute: boolean,
  isSliderMoved: boolean,
  connectElements: {
    id: string,
    source: string,
    target: string,
    animated: boolean,
    style: object
  }[]
}

const FlowNodesContainer = ({ attributes, options, setBtnState}: IHeaderProps): JSX.Element => {

  const [ flowElements, setflowElements ] = useState<IStateflowElements['flowElement']>([
    {
      id: 'score',
      type: 'scoreNode',
      data: {score: 0, value: [{nodeId: '', selectedValue: 0, maxValue: 0, attrLabel: ''}]},
      position: { x:300, y: 800},
      isHidden: true,
    }
  ]);

  const [ connectElements, setConnectElements ] = useState<IStateNodeContainer['connectElements']>([]);
  const [ isNewAttribute, setIsNewAttribute ] = useState<IStateNodeContainer['isNewAttribute']>(false);
  const [ isSliderMoved, setIsSliderMoved ] = useState<IStateNodeContainer['isSliderMoved']>(false);
  const attributeNameRef = useRef('');

  const handleAttributeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    attributeNameRef.current = e.target.value.trim();
  }

  const handleCreateAttribute = (e: React.FormEvent<HTMLInputElement>, elementType: string): void => {
    e.preventDefault();
    if (!attributeNameRef.current) {
      alert("Please enter a value");
      return;
    }
    setBtnState(false);
    setflowElements((els) => 
      els.map((el) => {
        if (el.id === els[els.length - 1].id) {
          const nodeId = el.id;
          el.data = {
            ...el.data,
            handleAttributeRange: setflowElements, handleAfterSliderChange: setIsSliderMoved, value: elementType === 'option' ? createAttributeSetForOption(flowElements) : [{nodeId: nodeId, selectedValue: 100, maxValue: 100, attrLabel: 'Weighting'}], name: attributeNameRef.current, id: el.id, elementType: elementType, score: 0
          };
          el.type = 'nodeElement'
        }
        return el;
      })
    );
    attributeNameRef.current = '';
    if (elementType === 'attribute') {
      setIsNewAttribute(true);
    }
  }

  useEffect(() => {
    if (attributes.length === 0) return;
    const addNewAttribute = addNewNode(flowElements, attributes, attributeNameRef.current, handleCreateAttribute, handleAttributeName, 'Enter New Attribute', 'attrInput', 'attribute');
    setflowElements(addNewAttribute);
  }, [attributes]);

  useEffect(() => {
    if (options.length === 0) return;
    const addNewOption = addNewNode(flowElements, options, attributeNameRef.current, handleCreateAttribute, handleAttributeName, 'Enter New Option', 'optInput', 'option')
    setflowElements(addNewOption);
  }, [options]);


  useEffect(() => {
    if (!isNewAttribute) return;
    setflowElements((els: IStateflowElements['flowElement']) => 
      els.map((el) => {
        if (el.data.elementType === 'option') {
          const newAttribute: any = flowElements.filter((attribute) => attribute.data.id === attributes[attributes.length - 1].id);
          const newAttr = [...el.data.value, {nodeId: attributes[attributes.length - 1].id, selectedValue: 0, maxValue: 100, attrLabel: newAttribute[0].data.name}];
          el.data = {
            ...el.data,
            value: newAttr,
          };
        }
        return el;
      })
    );

    setIsNewAttribute(false);
  }, [isNewAttribute]);

  useEffect(() => {
    if (!isSliderMoved) return;
    const availableAttributes = flowElements.filter((attribute: any) => attribute.data.elementType === 'attribute' && attribute.data.value[0].selectedValue > 0);
    const availableOptions = flowElements.filter((attribute: any) => attribute.data.elementType === 'option');

    const connectedNodes = availableAttributes.flatMap(attribute => availableOptions.map((option) => {
      return {
        id: `e${attribute.id}-${option.id}`,
        source: attribute.id,
        target: option.id,
        animated: true,
        style: {stroke:'#10a7ff'}
      };

    }, [flowElements]));

    const connectedOptionNodes = availableOptions.map((option: any) => ({ 
      id: `e${option.id}-score`,
      source: option.id,
      target: 'score',
      animated: true,
      style: {stroke:'#10a7ff'}
    }));

    const getAttributeScore = (attrId: string) => {
      const newAttribute: any = flowElements.filter((attribute: any) => attribute.data.id === attrId);
      return newAttribute[0].data.value[0].selectedValue;
    }

    setflowElements((els: IStateflowElements['flowElement']) => 
      els.map((el) => {
        if (el.data.elementType === 'option') {
          let totalScore:number = 0;
          el.data.value.forEach((value: any) => {
            totalScore += parseFloat((value.selectedValue * (getAttributeScore(value.nodeId) / 100)).toFixed(2))
          })
          el.data = {
            ...el.data,
            score: totalScore
          };
          el.type = 'nodeElement'
        }

        if (el.id === 'score') {
          el.data = {
            ...el.data,
            score: 0
          };
        }
        return el;
      })
    );


    setIsSliderMoved(false);
    const consolidateConnections = [...connectedOptionNodes, ...connectedNodes]
    setConnectElements(consolidateConnections);
  },[isSliderMoved]);


  const getFinalScore = (els: IStateflowElements['flowElement']) => {
    const maxScore = els.reduce((acc: any, value: any) => acc = acc > value.data.score ? acc : value.data.score, 0);
    return maxScore;
  }

  useEffect(() => {
    if (!isSliderMoved) return;

    const getWinnerOption = (els: IStateflowElements['flowElement']) => {
      const maxScoreOption = flowElements.filter((attribute) => attribute.data.elementType === 'option' && attribute.data.score === getFinalScore(els));
      return maxScoreOption[0].data.name;
    }

    setflowElements((els) => 
      els.map((el) => {
        if (el.id === 'score') {
          el.data = {
            ...el.data,
            winner: getFinalScore(els) > 0 ? getWinnerOption(els) : "Waiting"
          };

          el.isHidden = false
        }
        return el;
      })
    );

    
    setIsSliderMoved(false);
  },[isSliderMoved]);


  return <ReactFlow elementsSelectable={true} nodesDraggable={false} nodeTypes={nodeTypes} elements={[...flowElements, ...connectElements]} />;
}

export default FlowNodesContainer;


