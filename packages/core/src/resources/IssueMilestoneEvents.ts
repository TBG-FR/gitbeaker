import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceMilestoneEvents } from '../templates';
import type { MilestoneEventSchema } from '../templates/types';
import type { Sudo, ShowExpanded, GitlabAPIResponse } from '../infrastructure';

export interface IssueMilestoneEvents<C extends boolean = false> {
  all<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneEventSchema[], C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    milestoneEventId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<MilestoneEventSchema, C, E, void>>;
}

export class IssueMilestonEvents<C extends boolean = false> extends ResourceMilestoneEvents<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
