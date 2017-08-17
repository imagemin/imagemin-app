import {ipcRenderer as ipc} from 'electron';
import {DragDropContext as dragDropContext, DragDropContextProvider} from 'react-dnd';
import HTML5Backend, {NativeTypes} from 'react-dnd-html5-backend';
import React from 'react';
import {DropTarget, Layout} from '../components';

const handleDrop = (item, monitor) => {
	if (monitor) {
		ipc.send('drop-file', monitor.getItem().files.map(({path}) => path));
	}
};

const Index = () => (
	<Layout>
		<DragDropContextProvider backend={HTML5Backend}>
			<DropTarget
				accepts={NativeTypes.FILE}
				onDrop={handleDrop}
			/>
		</DragDropContextProvider>
	</Layout>
);

export default dragDropContext(HTML5Backend)(Index);
