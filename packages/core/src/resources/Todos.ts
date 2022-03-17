import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type { BaseRequestOptions, Sudo, ShowExpanded, GitlabAPIResponse } from '../infrastructure';
import type { UserSchema } from './Users';
import type { SimpleProjectSchema } from './Projects';

export interface TodoSchema extends Record<string, unknown> {
  id: number;
  author: Omit<UserSchema, 'created_at'>;
  project: Pick<
    SimpleProjectSchema,
    'id' | 'name' | 'name_with_namespace' | 'path' | 'path_with_namespace'
  >;
  action_name: string;
  target_type: string;
  target: Record<string, unknown>;
  target_url: string;
  body: string;
  state: string;
  created_at: string;
  updated_at: string;
}

export class Todos<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(options?: BaseRequestOptions<E>) {
    return RequestHelper.get<TodoSchema[]>()(this, 'todos', options);
  }

  done<E extends boolean = false>(
    options: { todoId: number } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TodoSchema, C, E, void>>;

  done<E extends boolean = false>(
    options: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  done<E extends boolean = false>({
    todoId,
    ...options
  }: { todoId?: number } & Sudo & ShowExpanded<E> = {}): Promise<
    GitlabAPIResponse<void | TodoSchema, C, E, void>
  > {
    let prefix = 'todos';

    if (todoId) prefix += `/${todoId}`;

    return RequestHelper.post<void | TodoSchema>()(
      this,
      `${prefix}/mark_as_done`,
      options as Sudo & ShowExpanded<E>,
    );
  }
}
