import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceIterationEvents } from '../templates';
import type { IterationEventSchema } from '../templates/types';
import type { Sudo, ShowExpanded, GitlabAPIResponse } from '../infrastructure';

export interface IssueIterationEvents<C extends boolean = false> {
  all<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IterationEventSchema[], C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    iterationEventId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<IterationEventSchema, C, E, void>>;
}

export class IssueIterationEvents<C extends boolean = false> extends ResourceIterationEvents<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
