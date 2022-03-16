import { BaseResource } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper } from '../infrastructure';
import type { Sudo, ShowExpanded, BaseRequestOptions, GitlabAPIResponse } from '../infrastructure';
import type { SnippetSchema, ExpandedSnippetSchema, UserAgentDetailSchema } from './Snippets';

export class ProjectSnippets<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SnippetSchema[], C, E, void>> {
    return RequestHelper.get<SnippetSchema[]>()(
      this,
      endpoint`projects/${projectId}/snippets`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    title: string,
    options?: BaseRequestOptions<E>,
  ) {
    return RequestHelper.post<ExpandedSnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets`,
      {
        title,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: BaseRequestOptions<E>,
  ) {
    return RequestHelper.put<ExpandedSnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      options,
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<SnippetSchema, C, E, void>> {
    return RequestHelper.get<SnippetSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}`,
      options,
    );
  }

  showContent<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}/raw`,
      options,
    );
  }

  showRepositoryFileContent<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    ref: string,
    filePath: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<string, C, E, void>> {
    return RequestHelper.get<string>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}/files/${ref}/${filePath}/raw`,
      options,
    );
  }

  userAgentDetails<E extends boolean = false>(
    projectId: string | number,
    snippetId: number,
    options?: Sudo & ShowExpanded<E>,
  ) {
    return RequestHelper.get<UserAgentDetailSchema>()(
      this,
      endpoint`projects/${projectId}/snippets/${snippetId}/user_agent_detail`,
      options,
    );
  }
}
