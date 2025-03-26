import { createBrowserRouter } from 'react-router-dom';
import { FormBuilder } from '@pages/FormBuilder';
import { Forms } from '@pages/Forms';
import { FormPreview } from '@pages/FormPreview';
import { EditForm } from '@pages/EditForm/EditForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Forms />,
  },
  {
    path: '/form-builder',
    element: <FormBuilder />,
  },
  {
    path: '/form-builder/:id',
    element: <EditForm />,
  },
  {
    path: '/form-preview/:id',
    element: <FormPreview />,
  },
]);
