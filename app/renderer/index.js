import React from 'react';
import ReactDOM from 'react-dom';

// import entry component
import Entry from './components/entry';

// render `Entry` component
ReactDOM.render(
	<Entry name='React' />,
	document.getElementById('app'),
);