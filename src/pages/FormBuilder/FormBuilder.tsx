import { useEffect, useRef } from 'react';
import { Page } from '@components/Page';
import { FormRenderer } from './components/FormRenderer';
import { Box, SxProps } from '@mui/material';
import { FormFieldEditor } from './components/FormFieldEditor';
import { useFormBuilderStore } from '@store/FormBuilderStore';
import { NewFormTitleDialog } from './components/NewFormTitleDialog';

const container: SxProps = { display: 'flex', width: '100%', height: 'auto' };

export function FormBuilder() {
  const initFormSchema = useFormBuilderStore((state) => state.initFormSchema);
  const initFormSchemaRef = useRef(initFormSchema)


  useEffect(() => {
    initFormSchemaRef.current();
  }, []);

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
