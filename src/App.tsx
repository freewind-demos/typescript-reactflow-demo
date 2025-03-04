import { addEdge, Background, BackgroundVariant, Connection, Controls, Edge, MiniMap, Node, ReactFlow, useEdgesState, useNodesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React, { useCallback } from 'react';

type NodeData = {
    label: string;
};

type CustomNode = Node<NodeData>;

const initialNodes: CustomNode[] = [
    {
        id: '1',
        type: 'input',
        data: { label: '输入节点' },
        position: { x: 250, y: 25 },
    },
    {
        id: '2',
        data: { label: '默认节点' },
        position: { x: 100, y: 125 },
    },
    {
        id: '3',
        type: 'output',
        data: { label: '输出节点' },
        position: { x: 250, y: 250 },
    },
];

const initialEdges: Edge[] = [
    { id: 'e1-2', source: '1', target: '2' },
    { id: 'e2-3', source: '2', target: '3' },
];

function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const addNewNode = useCallback(() => {
        const newNode = {
            id: `${nodes.length + 1}`,
            data: { label: `新节点 ${nodes.length + 1}` },
            position: {
                x: Math.random() * 500,
                y: Math.random() * 500
            },
        };
        setNodes((nds) => [...nds, newNode]);
    }, [nodes.length, setNodes]);

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <button
                onClick={addNewNode}
                style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    zIndex: 4,
                    padding: '8px 16px',
                    backgroundColor: '#fff',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                添加新节点
            </button>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Controls />
                <MiniMap />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
            </ReactFlow>
        </div>
    );
}

export default App; 