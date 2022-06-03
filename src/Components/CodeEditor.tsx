import Editor, { Monaco } from '@monaco-editor/react';
import { FC, useState } from 'react';
import * as monaco from 'monaco-editor';
import { ButtonGroup, Stack, Button, Divider, Chip } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CurrentBufferName, LoadCurrentBuffer, OpenedBuffers } from '@/states/buffer';

interface BufferTabItemProps {
  bufferName: string;
}

export const CodeEditor: FC = () => {
  const [options, setOptions] =
    useState<monaco.editor.IStandaloneEditorConstructionOptions>({
      'semanticHighlighting.enabled': true,
      fontFamily: 'FiraCode Nerd Font',
      fontSize: 18,
      showDeprecated: true,
      lineNumbers: 'relative',
      codeLens: true,
    });
  const currentBufName = useRecoilValue(CurrentBufferName);
  const setCurrentBufName = useSetRecoilState(CurrentBufferName);

  const openedBuffers = useRecoilValue(OpenedBuffers);

  function BufferTabItem(props: BufferTabItemProps) {
    return (
      <Button
        disabled={currentBufName === props.bufferName}
        key={props.bufferName}
        onClick={() => {
          setCurrentBufName(props.bufferName);
          console.log('set file name to: ' + props.bufferName);
        }}
      >
        {props.bufferName}
      </Button>
    );
  }

  function BufferEditor() {
    try {
      const buffer = useRecoilValue(LoadCurrentBuffer);
      console.log('ModalEditor: buffer: ' + JSON.stringify(buffer));
      return (
        // <React.Suspense fallback={<div>加载中……</div>}>
        <Editor
          height="100vh"
          defaultLanguage={buffer.language}
          defaultValue={buffer.content}
          path={currentBufName}
          options={options}
          theme="vs-dark"
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          beforeMount={handleEditorWillMount}
          onValidate={handleEditorValidation}
        />
        // </React.Suspense>
      );
    } catch (e) {
      console.log('ModalEditor: error: ' + JSON.stringify(e));
      return <Chip label={`Load ${currentBufName} failed`}></Chip>;
    }
  }

  function handleEditorChange(
    value: string | undefined,
    event: monaco.editor.IModelContentChangedEvent,
  ) {
    // here is the current value
  }

  function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    console.log(editor.getValue());
    // editorRef.current = editor;
    // console.log('onMount: the editor instance:', editor);
    // console.log('onMount: the monaco instance:', monaco);
  }

  function handleEditorWillMount(monaco: Monaco) {
    // console.log('beforeMount: the monaco instance:', monaco);
  }

  function handleEditorValidation(markers: monaco.editor.IMarker[]) {
    // model markers
    // markers.forEach(marker => console.log('onValidate:', marker.message));
  }

  return (
    <Stack>
      {openedBuffers.size == 0 ? (
        <div></div>
      ) : (
        <div>
          <div>
            <ButtonGroup variant="text" aria-label="text button group">
              {Array.from(openedBuffers).map((buffer) => (
                <BufferTabItem key={buffer} bufferName={buffer} />
              ))}
            </ButtonGroup>
          </div>
          <Divider />
          <BufferEditor />
        </div>
      )}
    </Stack>
  );
};
