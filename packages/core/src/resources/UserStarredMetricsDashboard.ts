import { BaseResource } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper } from '../infrastructure';
import type { BaseRequestOptions, Sudo, ShowExpanded, GitlabAPIResponse } from '../infrastructure';

export interface StarredDashboardSchema extends Record<string, unknown> {
  id: number;
  dashboard_path: string;
  user_id: number;
  project_id: number;
}

export class ApplicationSettings<C extends boolean = false> extends BaseResource<C> {
  create<E extends boolean = false>(
    projectId: string | number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<StarredDashboardSchema, C, E, void>> {
    return RequestHelper.get<StarredDashboardSchema>()(
      this,
      endpoint`projects/${projectId}/metrics/user_starred_dashboards`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    options?: { dashboard_path?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<StarredDashboardSchema, C, E, void>> {
    return RequestHelper.del<StarredDashboardSchema>()(
      this,
      endpoint`projects/${projectId}/metrics/user_starred_dashboards`,
      options,
    );
  }
}
