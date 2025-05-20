import { crudFactory } from '@/data/client/curd-factory';
import { CreateTypeInput, QueryOptions, Type, TypePaginator, TypeQueryOptions } from '@/types';
import { API_ENDPOINTS } from '@/data/client/api-endpoints';
import { HttpClient } from '@/data/client/http-client';

export const typeClient = {
  ...crudFactory<Type, QueryOptions, CreateTypeInput>(API_ENDPOINTS.TYPES),
  all: ({ name, ...params }: Partial<TypeQueryOptions>) => {
    return HttpClient.get<TypePaginator>(API_ENDPOINTS.TYPES, {
      searchJoin: 'and',
      ...params,
      search: HttpClient.formatSearchParams({ name }),
    });
  },
};
