import { create } from 'zustand';
import { generateId } from '../helpers/generateId';

export const testingFormSchema = {
  title: '',
  type: 'object',
  properties: {},
  required: [],
};

// For a global state management, I decided for a simpler and faster solution.
// I like this approach because it requires minimal boilerplate and allows me to stay building without sacrificing clarity or complexity

type FormBuilderStoreProps = {
  isFieldPickerOpen: boolean;
  openFieldPickerModal: () => void;
  closeFieldPickerModal: () => void;
  formSchema: any;
  addAPropertyToSchema: (name: string, property: any) => void;
  deletePropertyFromSchema: (id: string) => void;
  isFieldEditorOpen: boolean;
  openFieldEditorModal: (key: string) => void;
  closeFieldEditorModal: () => void;
  getFieldByKey: (key: string) => any;
  fieldToEdit: string | null;
  updateField: (fields: Record<string, any>) => void;
  editFormTitle: (title: string) => void;
  getIfFieldIsrequired: (key: string) => boolean;
  setFieldRequired: (isRequired: boolean) => void;
  initFormSchema: (formSchema?: any) => void;
};

export const useFormBuilderStore = create<FormBuilderStoreProps>((set) => ({
  isFieldPickerOpen: false,
  isFieldEditorOpen: false,
  fieldToEdit: null,
  openFieldPickerModal: () => set({ isFieldPickerOpen: true }),
  closeFieldPickerModal: () => set({ isFieldPickerOpen: false }),
  openFieldEditorModal: (key) => set({ isFieldEditorOpen: true, fieldToEdit: key }),
  closeFieldEditorModal: () => set({ isFieldEditorOpen: false, fieldToEdit: null }),
  formSchema: testingFormSchema,
  addAPropertyToSchema: (name: string, property: any) => {
    set((state) => {
      const newSchema = { ...state.formSchema };
      const nameId = `${name}-${generateId()}`;
      newSchema.properties[nameId] = property;
      return { formSchema: newSchema };
    });
  },
  deletePropertyFromSchema: (name: string) => {
    set((state) => {
      const newSchema = { ...state.formSchema };
      delete newSchema.properties[name];
      return { formSchema: newSchema };
    });
  },
  getFieldByKey(key) {
    return this.formSchema.properties[key];
  },
  updateField: (newFields = {}) => {
    set((state) => {
      if (state.fieldToEdit === null) return state;

      const newSchema = { ...state.formSchema };
      newSchema.properties[state.fieldToEdit] = {
        ...newSchema.properties[state.fieldToEdit],
        ...newFields,
      };
      return { formSchema: newSchema };
    });
  },
  editFormTitle: (title) => {
    set((state) => {
      const newSchema = { ...state.formSchema };
      newSchema.title = title;
      return { formSchema: newSchema };
    });
  },
  getIfFieldIsrequired(key: string) {
    return this.formSchema.required.includes(key);
  },
  setFieldRequired(isRequired) {
    set((state) => {
      const key = state.fieldToEdit;
      const newSchema = { ...state.formSchema };
      if (isRequired) {
        newSchema.required.push(key);
      } else {
        newSchema.required = newSchema.required.filter((k: string) => k !== key);
      }
      return { formSchema: newSchema };
    });
  },
  initFormSchema: (formSchema?: any) => {
    set({ formSchema: formSchema || testingFormSchema });
  },
}));
