import { Box, Button } from '@mui/material';
import validator from '@rjsf/validator-ajv8';
import { withTheme } from '@rjsf/core';
import { Theme } from '@rjsf/mui';
import { FormFieldBuilder } from './FormFieldBuilder';
import { FormFieldDialog } from './FormFieldDialog';
import { useFormBuilderStore } from '@store/FormBuilderStore';
import { ObjectFieldTemplate } from './CustomFieldTemplate';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { formsApi } from '@api/forms';

const Form = withTheme(Theme);


export function FormRenderer() {
  const navigate = useNavigate();

  const form = useFormBuilderStore((state) => state.formSchema);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: formsApi.createForm,
    onSuccess: () => {
      navigate(`/`);
    },
  });

  return (
    <Box width="100%">
      <Form
        key={JSON.stringify(form)}
        schema={form}
        validator={validator}
        templates={{ ObjectFieldTemplate: ObjectFieldTemplate }}
        disabled={isPending}
      >
        <Box sx={{ marginTop: "20px" }}>
          <FormFieldBuilder />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2, justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => {
              e.preventDefault();
              mutateAsync({ title: form.title, schema: form });
            }}
          >
            Save Form Schema
          </Button>
        </Box>
      </Form>

      <FormFieldDialog />
    </Box>
  );
}
