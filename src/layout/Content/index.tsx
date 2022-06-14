import React from 'react';

const Content: React.FC = ({ children }) => {
	return (
		<div className="content">
			<div className="content-body">{children}</div>
		</div>
	);
};

export default Content;
