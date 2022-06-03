import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import { Stack } from '@mui/material';
import { FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { CurrentBufferName, OpenedBuffers } from '@/states/buffer';
import { FolderOff, FolderOpen } from '@mui/icons-material'

interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}

const data: RenderTree = {
  id: 'root',
  name: 'Root',
  children: [
    { id: '1', name: 'index.ts' },
    { id: '2', name: 'index.html' },
    { id: '3', name: 'index.css' },
  ],
};

export const FileExplorer: FC = () => {
  const setOpenedBuffers = useSetRecoilState(OpenedBuffers);
  const setCurrentBufName = useSetRecoilState(CurrentBufferName);

  const renderTree = (nodes: RenderTree) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={nodes.name}
      // icon={<FolderOpen />}
      onClick={() => {
        setCurrentBufName(nodes.name);
        setOpenedBuffers((old) => {
          const oldArray = Array.from(old);
          const newArray = [...oldArray, nodes.name];
          console.log(
            'FileExplorer: newArray: ' + nodes.id + ': ' + nodes.name,
          );
          return new Set(newArray);
        });
      }}
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <Stack>
      <TreeView
        aria-label="rich object"
        defaultCollapseIcon={<FolderOpen />}
        defaultExpanded={['root']}
        defaultExpandIcon={<FolderOff />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
      >
        {renderTree(data)}
      </TreeView>
    </Stack>
  );
};
