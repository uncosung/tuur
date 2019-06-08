import React, { Fragment } from 'react';
import SearchBar from './search-bar';
import SearchResultGuide from './search-result-guide-list';
import SearchPackages from './search-result-package';

export default props => {
  return (
    <Fragment>
      <SearchBar location={props.location} handleSearch={props.search}/>
      <SearchResultGuide />
      <SearchPackages />
    </Fragment>
  );
};
