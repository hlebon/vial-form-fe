import { Page } from '@components/Page';
import { Box, SxProps } from '@mui/material';
import { useParams } from 'react-router';
import { useGetForm } from '../../api/useGetForm';
import { useEffect } from 'react';
import { useFormBuilderStore } from '@store/FormBuilderStore';
import { FormRenderer } from '@pages/FormBuilder/components/FormRenderer';
import { FormFieldEditor } from '@pages/FormBuilder/components/FormFieldEditor';

const container: SxProps = { display: 'flex', width: '100%', height: 'auto' };

export function EditForm() {
  const { id } = useParams();

  const { data, isSuccess, isLoading } = useGetForm(id);

  const initFormSchema = useFormBuilderStore((state) => state.initFormSchema);

  useEffect(() => {
    if (isSuccess) {
      initFormSchema(data.data.fields);
    }
  }, [isSuccess, id]);

  return (
    <Page title="Edit Form" size="md" isLoading={Boolean(id && isLoading)}>
      <Box sx={container}>
        <FormRenderer />
        <FormFieldEditor />
      </Box>
    </Page>
  );
}
