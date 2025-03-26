import { useQuery } from '@tanstack/react-query';
import { formsApi } from './forms';

export const useGetForm = (id: string | undefined) => {
  return useQuery({
    queryKey: ['getForm', id],
    queryFn: () =>
      formsApi.getFormById<{ data: { id: string; name: string; fields: any } }>(id || ''),
  });
};
