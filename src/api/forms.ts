import { api } from './config';

type Forms = { id: string; name: string; fields: Record<string, string> }[];

export const formsApi = {
  createForm(data: { title: string; schema: object }) {
    return api.post('/form', data);
  },

  getForms() {
    return api.get<{ data: Forms }>('/form');
  },

  getFormById<T>(id: string) {
    if (!id) {
      throw new Error('No id provided');
    }
    return api.get<T>(`/form/${id}`);
  },
};
