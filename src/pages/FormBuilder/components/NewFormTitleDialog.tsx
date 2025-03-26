import { Dialog } from '@components/Dialog';
import { useFormBuilderStore } from '@store/FormBuilderStore';
import { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useNavigate } from 'react-router';

export function NewFormTitleDialog() {

  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const setFormTitle = useFormBuilderStore((state) => state.editFormTitle);
  const navigate = useNavigate()

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleSubmit = () => {
    if (!value.trim()) {
      setError(true);
      return;
    }
    setFormTitle(value);
    closeDialog();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(false);
    setValue(e.target.value);
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        if (!value.trim()) {
          closeDialog();
          navigate(-1)
        }
      }}
      onClickSave={handleSubmit}
      title="Create Form Title"
      fullWidth
    >
      <Box display="flex" flexDirection="column">
        <TextField
          label="Form Title"
          value={value}
          error={error}
          helperText={error ? "Title cannot be empty" : ""}
          onChange={handleChange}
        />
      </Box>
    </Dialog>
  );
}
