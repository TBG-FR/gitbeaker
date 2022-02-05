import { BaseResource } from '@gitbeaker/requester-utils';
import { endpoint, RequestHelper } from '../infrastructure';
import type { BaseRequestOptions, Sudo, ShowExpanded, GitlabAPIResponse } from '../infrastructure';

export interface ProtectedBranchAccessLevel {
  access_level: 0 | 30 | 40 | 60;
  access_level_description: string;
  user_id?: number;
  group_id?: number;
}

export interface ProtectedBranchSchema extends Record<string, unknown> {
  id: number;
  name: string;
  push_access_levels?: ProtectedBranchAccessLevel[];
  merge_access_levels?: ProtectedBranchAccessLevel[];
  unprotect_access_levels?: ProtectedBranchAccessLevel[];
  allow_force_push: boolean;
  code_owner_approval_required: boolean;
}

export class ProtectedBranches<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    projectId: string | number,
    options: { search?: string } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema[], C, E, void>> {
    return RequestHelper.get<ProtectedBranchSchema[]>()(
      this,
      endpoint`projects/${projectId}/protected_branches`,
      options,
    );
  }

  edit<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: { codeOwnerApprovalRequired?: boolean } & Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    return RequestHelper.patch<ProtectedBranchSchema>()(
      this,
      endpoint`projects/${projectId}/protected_branches/${branchName}`,
      options,
    );
  }

  protect<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: BaseRequestOptions<E>,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    const { sudo, showExpanded, ...opts } = options || {};

    return RequestHelper.post<ProtectedBranchSchema>()(
      this,
      endpoint`projects/${projectId}/protected_branches`,
      {
        query: {
          name: branchName,
          ...opts,
        },
        sudo,
        showExpanded,
      },
    );
  }

  show<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<ProtectedBranchSchema, C, E, void>> {
    return RequestHelper.get<ProtectedBranchSchema>()(
      this,
      endpoint`projects/${projectId}/protected_branches/${branchName}`,
      options,
    );
  }

  unprotect<E extends boolean = false>(
    projectId: string | number,
    branchName: string,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(
      this,
      endpoint`projects/${projectId}/protected_branches/${branchName}`,
      options,
    );
  }
}
