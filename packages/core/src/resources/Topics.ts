import * as Mime from 'mime/lite';
import { BaseResource } from '@gitbeaker/requester-utils';
import { RequestHelper } from '../infrastructure';
import type {
  PaginatedRequestOptions,
  Sudo,
  ShowExpanded,
  GitlabAPIResponse,
} from '../infrastructure';

export interface TopicSchema extends Record<string, unknown> {
  id: number;
  name: string;
  description: string;
  total_projects_count: number;
  avatar_url: string;
}

export class Todos<C extends boolean = false> extends BaseResource<C> {
  all<E extends boolean = false>(
    options?: { search?: string } & PaginatedRequestOptions<E, 'offset'>,
  ): Promise<GitlabAPIResponse<TopicSchema[], C, E, 'offset'>> {
    return RequestHelper.get<TopicSchema[]>()(this, 'topics', options);
  }

  create<E extends boolean = false>(
    name: string,
    {
      avatar,
      ...options
    }: { avatar?: { content: string; filename: string }; description?: string } & Sudo &
      ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    const opts: Record<string, unknown> = {
      name,
      ...options,
    };

    if (avatar) {
      const meta = {
        filename: avatar.filename,
        contentType: Mime.getType(avatar.filename),
      };

      opts.isForm = true;
      opts.file = [avatar.content, meta];
    }

    return RequestHelper.post<TopicSchema>()(this, 'topics', opts);
  }

  edit<E extends boolean = false>(
    topicId: number,
    {
      avatar,
      ...options
    }: {
      name?: string;
      avatar?: { content: string; filename: string };
      description?: string;
    } & Sudo &
      ShowExpanded<E> = {},
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    const opts: Record<string, unknown> = { ...options };

    if (avatar) {
      const meta = {
        filename: avatar.filename,
        contentType: Mime.getType(avatar.filename),
      };

      opts.isForm = true;
      opts.file = [avatar.content, meta];
    }

    return RequestHelper.put<TopicSchema>()(this, `topics/${topicId}`, opts);
  }

  remove<E extends boolean = false>(
    topicId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<void, C, E, void>> {
    return RequestHelper.del()(this, `topics/${topicId}`, options);
  }

  show<E extends boolean = false>(
    topicId: number,
    options?: Sudo & ShowExpanded<E>,
  ): Promise<GitlabAPIResponse<TopicSchema, C, E, void>> {
    return RequestHelper.get<TopicSchema>()(this, `topics/${topicId}`, options);
  }
}
