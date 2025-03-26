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
      {/* for this app I decided to use react-jsonschema-form instead of building a custom form renderer.
        I think there are several benefits to use it:

        1. Faster development: This is an existing and well supported solution, that we can use and be productive from day one
        2. flexbility: having used it before, I know it offers a solid API to handle even complex form structures with ease.
        3. The approach I’m using makes it easy to migrate to another tool or even build our own renderer later. .

      */}
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
