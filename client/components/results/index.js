import React, { Fragment } from 'react';
import SearchBar from './search-bar';
import SearchResultGuide from './search-result-guide-list';
import SearchPackages from './search-result-package';

export default props => {
  console.log('props yo', props)
  return (
    <Fragment>
      <SearchBar tags={props.tags} location={props.location} handleSearch={props.search}/>
      <SearchResultGuide location={props.location} handleSearch={props.search}/>
      <SearchPackages tags={props.tags} location={props.location} handleSearch={props.search}/>
    </Fragment>
  );
};
