import { BaseResource } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper } from '../infrastructure';
import type { Sudo, ShowExpanded, GitlabAPIResponse } from '../infrastructure';
import type { DiscussionSchema, DiscussionNotePositionSchema } from '../templates/types';

export class VisualReviewDiscussions<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    mergeRequestIId: number,
    body: string,
    options?: { position?: DiscussionNotePositionSchema } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<DiscussionSchema, C, E, void>> {
    return RequestHelper.get<DiscussionSchema>()(
      this,
      endpoint`projects/${projectId}/merge_requests/${mergeRequestIId}/visual_review_discussions`,
      {
        body,
        ...options,
      },
    );
  }
}
