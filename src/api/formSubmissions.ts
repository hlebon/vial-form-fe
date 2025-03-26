import { api } from './config';

type FormSubmission = {
  formId: string;
  answers: { question: string; answer: string }[];
};
export const formsSubmissionsApi = {
  submit: (data: FormSubmission) => {
    return api.post('/form-submissions', data);
  },
};
