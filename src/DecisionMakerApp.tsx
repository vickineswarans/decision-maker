import React, { useState } from 'react';
import * as CSS from 'csstype';
import FlowNodesContainer from '../src/components/container/FlowNodesContainer';
import Header from '../src/components/presentational/Header';

export interface IStateApp {
  attributes: {
    id: string,
    position: {
      x: number,
      y: number,
    }
  }[],

  options: {
    id: string,
    position: {
      x: number,
      y: number,
    }
  }[],

  headerBtnState: boolean,
}

const DecisionMakerApp = (): JSX.Element => {  
  const [attributes, setAttributes] = useState<IStateApp['attributes']>([]);
  const [options, setOptions] = useState<IStateApp['options']>([]);
  const [btnState, setBtnState] = useState<IStateApp['headerBtnState']>(false);

  const wrapper: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 60'%3E%3Crect fill='%23cc5577' width='100' height='60'/%3E%3Cg fill-opacity='1'%3E%3Crect fill='%23cc5577' width='11' height='11'/%3E%3Crect fill='%23cf5675' x='10' width='11' height='11'/%3E%3Crect fill='%23d15872' y='10' width='11' height='11'/%3E%3Crect fill='%23d35970' x='20' width='11' height='11'/%3E%3Crect fill='%23d55b6d' x='10' y='10' width='11' height='11'/%3E%3Crect fill='%23d75c6b' y='20' width='11' height='11'/%3E%3Crect fill='%23d95e68' x='30' width='11' height='11'/%3E%3Crect fill='%23da6066' x='20' y='10' width='11' height='11'/%3E%3Crect fill='%23dc6263' x='10' y='20' width='11' height='11'/%3E%3Crect fill='%23dd6461' y='30' width='11' height='11'/%3E%3Crect fill='%23de665e' x='40' width='11' height='11'/%3E%3Crect fill='%23df695c' x='30' y='10' width='11' height='11'/%3E%3Crect fill='%23e06b59' x='20' y='20' width='11' height='11'/%3E%3Crect fill='%23e06e57' x='10' y='30' width='11' height='11'/%3E%3Crect fill='%23e17054' y='40' width='11' height='11'/%3E%3Crect fill='%23e17352' x='50' width='11' height='11'/%3E%3Crect fill='%23e17650' x='40' y='10' width='11' height='11'/%3E%3Crect fill='%23e1784d' x='30' y='20' width='11' height='11'/%3E%3Crect fill='%23e17b4b' x='20' y='30' width='11' height='11'/%3E%3Crect fill='%23e17e49' x='10' y='40' width='11' height='11'/%3E%3Crect fill='%23e08147' y='50' width='11' height='11'/%3E%3Crect fill='%23e08445' x='60' width='11' height='11'/%3E%3Crect fill='%23df8743' x='50' y='10' width='11' height='11'/%3E%3Crect fill='%23de8a41' x='40' y='20' width='11' height='11'/%3E%3Crect fill='%23dd8d3f' x='30' y='30' width='11' height='11'/%3E%3Crect fill='%23dc903d' x='20' y='40' width='11' height='11'/%3E%3Crect fill='%23da933c' x='10' y='50' width='11' height='11'/%3E%3Crect fill='%23d9963a' x='70' width='11' height='11'/%3E%3Crect fill='%23d79939' x='60' y='10' width='11' height='11'/%3E%3Crect fill='%23d59c38' x='50' y='20' width='11' height='11'/%3E%3Crect fill='%23d49f38' x='40' y='30' width='11' height='11'/%3E%3Crect fill='%23d2a237' x='30' y='40' width='11' height='11'/%3E%3Crect fill='%23cfa537' x='20' y='50' width='11' height='11'/%3E%3Crect fill='%23cda837' x='80' width='11' height='11'/%3E%3Crect fill='%23cbab37' x='70' y='10' width='11' height='11'/%3E%3Crect fill='%23c8ae38' x='60' y='20' width='11' height='11'/%3E%3Crect fill='%23c5b139' x='50' y='30' width='11' height='11'/%3E%3Crect fill='%23c3b43a' x='40' y='40' width='11' height='11'/%3E%3Crect fill='%23c0b73c' x='30' y='50' width='11' height='11'/%3E%3Crect fill='%23bcba3d' x='90' width='11' height='11'/%3E%3Crect fill='%23b9bd40' x='80' y='10' width='11' height='11'/%3E%3Crect fill='%23b6c042' x='70' y='20' width='11' height='11'/%3E%3Crect fill='%23b2c245' x='60' y='30' width='11' height='11'/%3E%3Crect fill='%23afc548' x='50' y='40' width='11' height='11'/%3E%3Crect fill='%23abc84b' x='40' y='50' width='11' height='11'/%3E%3Crect fill='%23a7cb4f' x='90' y='10' width='11' height='11'/%3E%3Crect fill='%23a3ce52' x='80' y='20' width='11' height='11'/%3E%3Crect fill='%239ed056' x='70' y='30' width='11' height='11'/%3E%3Crect fill='%239ad35b' x='60' y='40' width='11' height='11'/%3E%3Crect fill='%2395d55f' x='50' y='50' width='11' height='11'/%3E%3Crect fill='%2390d864' x='90' y='20' width='11' height='11'/%3E%3Crect fill='%238bdb69' x='80' y='30' width='11' height='11'/%3E%3Crect fill='%2385dd6e' x='70' y='40' width='11' height='11'/%3E%3Crect fill='%237fe073' x='60' y='50' width='11' height='11'/%3E%3Crect fill='%2379e278' x='90' y='30' width='11' height='11'/%3E%3Crect fill='%2372e57e' x='80' y='40' width='11' height='11'/%3E%3Crect fill='%236ae784' x='70' y='50' width='11' height='11'/%3E%3Crect fill='%2362e98a' x='90' y='40' width='11' height='11'/%3E%3Crect fill='%2359ec90' x='80' y='50' width='11' height='11'/%3E%3Crect fill='%234EEE96' x='90' y='50' width='11' height='11'/%3E%3C/g%3E%3C/svg%3E")`
  };

  const secionStyle: CSS.Properties = {
    display: 'flex',
    alignItems: 'stretch',
    backgroundColor: '#ffffffd6',
    margin: '25px 50px',
    height: 'calc(100vh - 200px)',
  };

  return (
    <div style={wrapper}>
      <main>
        <Header btnState={btnState} setBtnState={setBtnState} setAttributes={setAttributes} attributes={attributes} setOptions={setOptions} options={options}/>
        <section style={secionStyle}>
          <FlowNodesContainer btnState={btnState} setBtnState={setBtnState} setAttributes={setAttributes} attributes={attributes} setOptions={setOptions} options={options} />
        </section>
      </main>
    </div>
  );
}

export default DecisionMakerApp;
