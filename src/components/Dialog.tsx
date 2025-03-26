import React from 'react';
import {
  Dialog as MUDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

type DialogProps = {
  title: string;
  isOpen: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onClickSave?: () => void;
}

export function Dialog({
  title,
  isOpen,
  fullWidth = false,
  children,
  onClose,
  onClickSave,
}: DialogProps) {
  return (
    <React.Fragment>
      <MUDialog fullWidth={fullWidth} open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {onClickSave && (
            <Button variant="contained" type="submit" onClick={onClickSave} endIcon={<NavigateNextOutlinedIcon />}>
              Save
            </Button>
          )}
          {onClose && <Button onClick={onClose}>Close</Button>}
        </DialogActions>
      </MUDialog>
    </React.Fragment>
  );
}
