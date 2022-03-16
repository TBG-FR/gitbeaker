import { BaseResource } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper } from '../infrastructure';
import type { BaseRequestOptions, GitlabAPIResponse } from '../infrastructure';

export interface SidekiqQueueStatus {
  completed: boolean;
  deleted_jobs: number;
  queue_size: number;
}

export class SidekiqQueues<C extends boolean = false> extends BaseResource<C> {
  remove<E extends boolean = false>(
    queueName: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<SidekiqQueueStatus, C, E, void>> {
    return RequestHelper.get<SidekiqQueueStatus>()(
      this,
      endpoint`admin/sidekiq/queues/${queueName}`,
      options,
    );
  }
}
