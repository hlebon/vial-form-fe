import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useFormBuilderStore } from '@store/FormBuilderStore';

export function FormFieldBuilder() {
  const isFieldPickerOpen = useFormBuilderStore((state) => state.isFieldPickerOpen);
  const openFieldPickerModal = useFormBuilderStore((state) => state.openFieldPickerModal);

  return (
    <Button
      startIcon={<AddIcon />}
      onClick={openFieldPickerModal}
      disabled={isFieldPickerOpen}
      sx={{
        width: '100%',
        bgcolor: '#ffffff',
        padding: '10px',
        border: '2px dashed #b4b4b4',
        textAlign: 'center',
      }}
    >
      Add New Field
    </Button>
  );
}
