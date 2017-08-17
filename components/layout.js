import propTypes from 'prop-types';
import React from 'react';

const Layout = ({children}) => (
	<div>
		{children}
		<style jsx global>
			{`
				* {
					box-sizing: border-box;
				}

				body {
					margin: 0;

				}

				img {
					max-width: 100%;
				}
			`}
		</style>
		<style jsx>
			{`
				div {
					align-items: center;
					background-color: #ecf0f1;
					display: flex;
					height: 100vh;
					justify-content: center;
				}
			`}
		</style>
	</div>
);

Layout.propTypes = {
	children: propTypes.any
};

export default Layout;
