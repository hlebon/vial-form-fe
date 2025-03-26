import { Box, Button } from '@mui/material';
import validator from '@rjsf/validator-ajv8';
import { withTheme } from '@rjsf/core';
import { useParams } from 'react-router-dom';
import { Theme } from '@rjsf/mui';
import { Page } from '@components/Page';
import { useGetForm } from '../../api/useGetForm';
import { useMutation } from '@tanstack/react-query';
import { formsSubmissionsApi } from '@api/formSubmissions';

const Form = withTheme(Theme);



export function FormPreview() {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetForm(id);

  const { mutateAsync } = useMutation({
    mutationFn: formsSubmissionsApi.submit
  });

  return (
    <Page title="Form Playground" isLoading={isLoading} isError={isError} size="md">
      <Form
        key={JSON.stringify(data?.data.fields)}
        schema={data?.data.fields}
        validator={validator}
        onSubmit={async (data) => {
          const { formData } = data;
          const formResponses = Object.entries(formData).map(([key, value]) => {
            const details = {
              question: data.schema.properties[key].title,
              answer: String(value),
            };
            return details;
          });
          await mutateAsync({ formId: id || '', answers: formResponses });

        }}
      >
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button type="submit" variant="contained" color="primary">
            Save Form
          </Button>
        </Box>
      </Form>
    </Page>
  );
}
