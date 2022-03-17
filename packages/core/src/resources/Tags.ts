import { BaseResource } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper } from '../infrastructure';
import type { Sudo, ShowExpanded, GitlabAPIResponse } from '../infrastructure';
import type { CommitSchema } from './Commits';
import type { ReleaseSchema } from './Releases';

export interface TagSchema extends Record<string, unknown> {
  commit: CommitSchema;
  release: Pick<ReleaseSchema, 'tag_name' | 'description'>;
  name: string;
  target: string;
  message?: string;
  protected: boolean;
}

export class Tags<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    projectId: string | number,
    options?: { orderBy?: 'name' | 'updated'; sort?: 'asc' | 'desc'; search?: string } & Sudo &
      ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TagSchema[], C, E, void>> {
    return RequestHelper.get<TagSchema[]>()(
      this,
      endpoint`projects/${projectId}/repository/tags`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    ref: string,
    options?: { message?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TagSchema, C, E, void>> {
    return RequestHelper.post<TagSchema>()(this, endpoint`projects/${projectId}/repository/tags`, {
      query: {
        tagName,
        ref,
      },
      ...options,
    });
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/repository/tags/${tagName}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    tagName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TagSchema, C, E, void>> {
    return RequestHelper.get<TagSchema>()(
      this,
      endpoint`projects/${projectId}/repository/tags/${tagName}`,
      options,
    );
  }
}
