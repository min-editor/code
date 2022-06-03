import {
  Container,
  createTheme,
  Divider,
  Stack,
  ThemeProvider,
} from '@mui/material';
import { FileExplorer } from './Components/FileExplorer';
import { CodeEditor } from './Components/CodeEditor';

export default () => {
  return (
    <ThemeProvider
      theme={createTheme({
        palette: { mode: 'dark' },
      })}
    >
      <Container
        maxWidth={false}
        style={{
          padding: '0px',
          margin: '0px',
        }}
      >
        <Stack direction={'row'}>
          <Stack sx={{ width: '20%', height: 1 }}>
            <FileExplorer />
          </Stack>
          <Divider
            orientation="vertical"
            flexItem
            style={{ width: '1%', color: 'red' }}
            variant="fullWidth"
          />
          <Stack sx={{ width: '80%' }}>
            <CodeEditor />
          </Stack>
        </Stack>
      </Container>
    </ThemeProvider>
  );
};
