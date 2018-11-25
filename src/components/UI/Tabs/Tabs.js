import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './Tabs.css';

const CustomTabs = (props) => {
  const tabWidth = `calc(${100 / props.tabs.length}% + 18px)`;
  const tabs = props.tabs.map((tab) => {
    return <Tab key={tab} style={{ width: tabWidth }}>{tab}</Tab>;
  });

  const panels = props.children.map((panel, index) => {
    return <TabPanel key={'panel' + props.tabs[index]}>{panel}</TabPanel>;
  });

  return (
    <Tabs className='Tabs'>
      <TabList>
        {tabs}
      </TabList>
      {panels}
    </Tabs>
  )
};

export default CustomTabs;