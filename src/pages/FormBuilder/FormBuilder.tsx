import { Page } from '@components/Page';
import { FormRenderer } from './components/FormRenderer';
import { Box, SxProps } from '@mui/material';
import { FormFieldEditor } from './components/FormFieldEditor';
import { NewFormTitleDialog } from './components/NewFormTitleDialog';

const container: SxProps = { display: 'flex', width: '100%', height: 'auto' };

export function FormBuilder() {
  return (
    <Page title="Form Builder" size="sm">
      <Box sx={container}>
        <FormRenderer />
        <FormFieldEditor />
        <NewFormTitleDialog />
      </Box>
    </Page>
  );
}
