import { Dialog } from '@components/Dialog';
import { Box, Button, SxProps } from '@mui/material';
import { useFormBuilderStore } from '@store/FormBuilderStore';
import { Formik, Form, Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-mui';

const formStyles: React.CSSProperties = {
  marginTop: '10px',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

function getExtraFields(type: string, field: Record<string, any>) {
  if (type === 'string') {
    return {
      minLength: field?.minLength || '',
      maxLength: field?.maxLength || '',
    };
  }

  if (type === 'number' || type === 'integer') {
    return {
      minimum: field?.minimum || '',
      maximum: field?.maximum || '',
    };
  }

  return {};
}

const styles: Record<'saveButton' | 'container', SxProps> = {
  saveButton: { mt: '20px', pt: '10px', pb: '10px' },
  container: { width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' },
};

export function FormFieldEditor() {
  const isOpen = useFormBuilderStore((state) => state.isFieldEditorOpen);
  const closeFieldEditorModal = useFormBuilderStore((state) => state.closeFieldEditorModal);
  const field = useFormBuilderStore((state) => {
    if (state.fieldToEdit) {
      return state.getFieldByKey(state?.fieldToEdit);
    }
    return null;
  });

  const isFieldRequired = useFormBuilderStore((state) =>
    state.getIfFieldIsrequired(state?.fieldToEdit || '')
  );

  const setFieldRequired = useFormBuilderStore((state) => state.setFieldRequired);

  const updateField = useFormBuilderStore((state) => state.updateField);

  const initialValues = {
    title: field?.title || '',
    description: field?.description || '',
    required: isFieldRequired,
    ...getExtraFields(field?.type, field),
  };

  return (
    <Dialog fullWidth isOpen={isOpen} onClose={closeFieldEditorModal} title="Form Field Editor">
      <Formik
        initialValues={initialValues}
        validate={(values) => {
          const errors: { title?: string } = {};
          if (!values.title.trim()) {
            errors.title = 'Title is required';
          }
          return errors;
        }}
        onSubmit={({ required, ...rest }) => {
          const formSchema: Record<string, string> = {};

          const uiFormSchema: Record<string, string> = {};

          Object.entries(rest).forEach(([key, value]) => {
            if (!value) {
              return;
            }
            if (key.startsWith('ui:')) {
              uiFormSchema[key] = value;
            } else {
              formSchema[key] = value;
            }
          });

          updateField(formSchema);
          setFieldRequired(required);
          closeFieldEditorModal();
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form style={formStyles}>
              <Box sx={styles.container}>
                <Field name="title" component={TextField} label="Title" />
                <Field
                  component={CheckboxWithLabel}
                  type="checkbox"
                  name="required"
                  Label={{ label: 'Required' }}
                />
                <Field name="description" component={TextField} label="Description" />
                {['integer', 'number'].includes(field?.type) && (
                  <>
                    <Field name="minimum" type="number" component={TextField} label="Minimum" />
                    <Field name="maximum" type="number" component={TextField} label="Maximum" />
                  </>
                )}
                {field?.type === 'string' && (
                  <>
                    <Field
                      name="minLength"
                      type="number"
                      component={TextField}
                      label="Min length"
                    />
                    <Field
                      name="maxLength"
                      type="number"
                      component={TextField}
                      label="Max length"
                    />
                  </>
                )}

                <Button
                  sx={styles.saveButton}
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Save
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Dialog>
  );
}
