import { IStateflowElements } from '../container/FlowNodesContainer';
import { IStateApp } from '../../DecisionMakerApp';

export const addNewNode = (flowElements: IStateflowElements['flowElement'], attributes: IStateApp['attributes'], inputVal: string, handleCreateAttribute: any, handleAttributeName: any, labelName: string, inputName: string, elementType: string) => {
  const updatedAttributes = [...flowElements, {
    id: attributes[attributes.length - 1].id,
    type: 'addNode',
    data: { inputValue: inputVal, value: [{nodeId: '', selectedValue: 0, maxValue: 0, attrLabel: ''}], labelName: labelName, inputName: inputName, handleSubmit: ((event: React.FormEvent<HTMLInputElement>) =>handleCreateAttribute(event, elementType)), handleChange: handleAttributeName},
    position: { x: attributes[attributes.length - 1].position.x, y: attributes[attributes.length - 1].position.y},
    isHidden: false,
  }];

  return updatedAttributes;
}

export const createAttributeSetForOption = (flowElements: IStateflowElements['flowElement']) => {
  const attributeELements = flowElements.reduce(function(filtered: any, option: any) {
    if (option.data.elementType === 'attribute') {
        const attribute = { nodeId: option.id, selectedValue: 0, attrLabel: option.data.name, maxValue: 100}
        filtered.push(attribute);
    }
    return [...filtered];
  }, []);

  return attributeELements;
}