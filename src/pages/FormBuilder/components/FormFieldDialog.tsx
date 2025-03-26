import { Dialog } from '@components/Dialog';
import { useFormBuilderStore } from '@store/FormBuilderStore';
import { FormFieldPicker } from './FormFieldPicker';

export function FormFieldDialog() {
  const isOpen = useFormBuilderStore((state) => state.isFieldPickerOpen);
  const closeFieldPickerModal = useFormBuilderStore((state) => state.closeFieldPickerModal);
  return (
    <Dialog isOpen={isOpen} onClose={closeFieldPickerModal} title="Basic Fields">
      <FormFieldPicker />
    </Dialog>
  );
}
