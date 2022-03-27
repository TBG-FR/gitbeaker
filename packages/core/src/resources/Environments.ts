import { BaseResource } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper } from '../infrastructure';
import type {
  BaseRequestOptions,
  PaginatedRequestOptions,
  Sudo,
  ShowExpanded,
  GitlabAPIResponse,
} from '../infrastructure';
import type { DeploymentSchema, DeployableSchema } from './Deployments';

export interface EnvironmentSchema extends Record<string, unknown> {
  id: number;
  name: string;
  slug: string;
  external_url: string;
  state: string;
  created_at: string;
  updated_at: string;
  last_deployment: DeploymentSchema;
  deployable: DeployableSchema;
}

export type CondensedEnvironmentSchema = Omit<EnvironmentSchema, 'last_deployment' | 'deployable'>;

export type ReviewAppSchema = Omit<CondensedEnvironmentSchema, 'state'>;

export class Environments<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false, P extends 'keyset' | 'offset' = 'offset'>(
    projectId: string | number,
    options?: PaginatedRequestOptions<E, P>,
  ): Promise<GitlabAPIResponse<CondensedEnvironmentSchema[], C, E, P>> {
    return RequestHelper.get<CondensedEnvironmentSchema[]>()(
      this,
      endpoint`projects/${projectId}/environments`,
      options,
    );
  }

  create<E extends boolean = false>(
    projectId: string | number,
    name: string,
    options?: { externalUrl?: string } & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<CondensedEnvironmentSchema, C, E, void>> {
    return RequestHelper.post<CondensedEnvironmentSchema>()(
      this,
      endpoint`projects/${projectId}/environments`,
      {
        name,
        ...options,
      },
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    environmentId: number,
    options?: { externalUrl?: string } & BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<CondensedEnvironmentSchema, C, E, void>> {
    return RequestHelper.put<CondensedEnvironmentSchema>()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}`,
      options,
    );
  }

  remove<E extends boolean = false>(
    projectId: string | number,
    environmentId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}`,
      options,
    );
  }

  removeReviewApps<E extends boolean = false>(
    projectId: string | number,
    options?: { before?: string; limit?: number; dryRun?: boolean } & BaseRequestOptions<E>,
  ): Promise<
    GitlabAPIResponse<
      { scheduled_entries: ReviewAppSchema[]; unprocessable_entries: ReviewAppSchema[] },
      C,
      E,
      void
    >
  > {
    return RequestHelper.del<{
      scheduled_entries: ReviewAppSchema[];
      unprocessable_entries: ReviewAppSchema[];
    }>()(this, endpoint`projects/${projectId}/environments/review_apps`, options);
  }

  show<E extends boolean = false>(
    projectId: string | number,
    environmentId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedEnvironmentSchema, C, E, void>> {
    return RequestHelper.get<CondensedEnvironmentSchema>()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}`,
      options,
    );
  }

  stop<E extends boolean = false>(
    projectId: string | number,
    environmentId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<CondensedEnvironmentSchema, C, E, void>> {
    return RequestHelper.post<CondensedEnvironmentSchema>()(
      this,
      endpoint`projects/${projectId}/environments/${environmentId}/stop`,
      options,
    );
  }
}
