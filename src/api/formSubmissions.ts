import { api } from './config';

type FormSubmission = {
  formId: string;
  answers: { question: string; answer: string }[];
};
export const formsSubmissionsApi = {
  submit: (data: FormSubmission) => {
    return api.post('/form-submissions', data);
  },
  getRecordsById: (id: string) => {
    return api.get(`/form-submissions/${id}`) as Promise<{
      data: { id: string; answers: { asnwer: string; questions: string }[] }[];
    }>;
  },
};
