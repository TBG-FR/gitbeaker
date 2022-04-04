import { BaseResource } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper } from '../infrastructure';
import type { EitherOrNone, BaseRequestOptions, GitlabAPIResponse } from '../infrastructure';
import type { ProjectSchema } from './Projects';
import type { IssueSchema } from './Issues';
import type { MergeRequestSchema } from './MergeRequests';
import type { MilestoneSchema } from '../templates/ResourceMilestones';
import type { SimpleSnippetSchema } from './Snippets';
import type { CommitSchema } from './Commits';
import type { NoteSchema } from '../templates/ResourceNotes';
import type { UserSchema } from './Users';

export interface BlobSchema extends Record<string, unknown> {
  id: number;
  basename: string;
  data: string;
  path: string;
  filename: string;
  ref: string;
  startline: number;
  project_id: number;
}

export type SearchScopes =
  | 'projects'
  | 'issues'
  | 'merge_requests'
  | 'milestones'
  | 'snippet_titles'
  | 'wiki_blobs'
  | 'commits'
  | 'blobs'
  | 'notes'
  | 'users';

export class Search<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    scope: 'users',
    search: string,
    options?: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<UserSchema[], C, E, void>>;

  all<E extends boolean = false>(
    scope: 'notes',
    search: string,
    options?: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<NoteSchema[], C, E, void>>;

  all<E extends boolean = false>(
    scope: 'blobs',
    search: string,
    options?: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<BlobSchema[], C, E, void>>;

  all<E extends boolean = false>(
    scope: 'commits',
    search: string,
    options?: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<CommitSchema[], C, E, void>>;

  all<E extends boolean = false>(
    scope: 'wiki_blobs',
    search: string,
    options?: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<BlobSchema[], C, E, void>>;

  all<E extends boolean = false>(
    scope: 'snippet_titles',
    search: string,
    options?: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<SimpleSnippetSchema[], C, E, void>>;

  all<E extends boolean = false>(
    scope: 'milestones',
    search: string,
    options?: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<MilestoneSchema[], C, E, void>>;

  all<E extends boolean = false>(
    scope: 'merge_requests',
    search: string,
    options?: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<MergeRequestSchema[], C, E, void>>;

  all<E extends boolean = false>(
    scope: 'issues',
    search: string,
    options?: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<IssueSchema[], C, E, void>>;

  all<E extends boolean = false>(
    scope: 'projects',
    search: string,
    options?: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProjectSchema[], C, E, void>>;

  all<E extends boolean = false>(
    scope: SearchScopes,
    search: string,
    {
      projectId,
      groupId,
      ...options
    }: EitherOrNone<{ projectId: string | number }, { groupId: string | number }> &
      BaseRequestOptions<E> = {},
  ): any {
    let url: string;

    if (projectId) url = endpoint`projects/${projectId}/`;
    else if (groupId) url = endpoint`groups/${groupId}/`;
    else url = '';

    return RequestHelper.get()(this, `${url}search`, {
      scope,
      search,
      ...options,
    });
  }
}
