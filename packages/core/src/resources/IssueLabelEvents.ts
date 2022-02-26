import type { BaseResourceOptions } from '@gitbeaker/requester-utils';
import { ResourceLabelEvents } from '../templates';
import type { LabelEventSchema } from '../templates/types';
import type { Sudo, ShowExpanded, GitlabAPIResponse } from '../infrastructure';

export interface IssueLabelEvents<C extends boolean = false> {
  all<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelEventSchema[], C, E, void>>;

  show<E extends boolean = false>(
    projectId: string | number,
    issueIId: number,
    labelEventId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<LabelEventSchema, C, E, void>>;
}

export class IssueLabelEvents<C extends boolean = false> extends ResourceLabelEvents<C> {
  constructor(options: BaseResourceOptions<C>) {
    /* istanbul ignore next */
    super('projects', 'issues', options);
  }
}
