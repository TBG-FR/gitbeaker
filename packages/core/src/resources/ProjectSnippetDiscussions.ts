import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceDiscussions } from '../templates';
import type { DiscussionSchema, DiscussionNoteSchema } from '../templates/types';
import type {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  ShowExpanded,
  GitlabAPIResponse,
} from '../infrastructure';

export interface ProjectSnippetDiscussions<C extends boolean = false>
  extends ResourceDiscussions<C> {
  addNote<E extends boolean = false>(
    projectId: string | number,
    snippetId: string | number,
    discussionId: string,
    noteId: number,
    body: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<DiscussionNoteSchema, C, E, void>>;

  all<E extends boolean = false, P extends 'keyset' | 'offset' = 'offset'>(
    projectId: string | number,
    issueId: string | number,
    options?: PaginatedRequestOptions<E, P>,
  ): Promise<GitlabAPIResponse<DiscussionSchema[], C, E, P>>;

  create<E extends boolean = false>(
    projectId: string | number,
    snippetId: string | number,
    body: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>>;

  editNote<E extends boolean = false>(
    projectId: string | number,
    snippetId: string | number,
    discussionId: string,
    noteId: number,
    options: BaseRequestOptions<E> & { body: string },
  ): Promise<GitlabAPIResponse<DiscussionNoteSchema, C, E, void>>;

  removeNote<E extends boolean = false>(
    projectId: string | number,
    snippetId: string | number,
    discussionId: string,
    noteId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    snippetId: string | number,
    discussionId: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>>;
}

export class ProjectSnippetDiscussions<C extends boolean = false> extends ResourceDiscussions<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'snippets', options);
  }
}
