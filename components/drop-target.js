import {DropTarget as dndDropTarget} from 'react-dnd';
import React from 'react';
import propTypes from 'prop-types';

const DropTarget = ({connectDropTarget}) => connectDropTarget(
	<div>
		<img src='/static/icon.png'/>
		<style jsx>
			{`
				div {
					max-width: 50%;
					width: 250px;
				}
			`}
		</style>
	</div>
);

DropTarget.PropTypes = {
	connectDropTarget: propTypes.func.isRequired
};

const target = {
	drop: ({onDrop, ...props}, monitor) => {
		if (onDrop) {
			onDrop(props, monitor);
		}
	}
};

export default dndDropTarget(
	props => props.accepts,
	target,
	connect => ({
		connectDropTarget: connect.dropTarget()
	})
)(DropTarget);
