import { http } from "../../db/http";
import type {
  IForumEntry,
  CreateDiscussionDTO,
  CreateCommentDTO,
} from "../../types/forum";

export const ForumService = {
  //  todas las discusiones
  async getAllDiscussions(): Promise<IForumEntry[]> {
    const { data } = await http.get<{ data: IForumEntry[] }>(`/comments`);
    return data.data;
  },

  //  Discusiones filtradas por grupo
  async getDiscussionsByGroup(group: string): Promise<IForumEntry[]> {
    const { data } = await http.get<{ data: IForumEntry[] }>(
      `/comments/filter`,
      {
        params: { grupo: group },
      }
    );
    return data.data;
  },

  //  Crea una nueva Discusión
  // payload Datos de la nueva discusión (group, title, text, file opcional).

  async createDiscussion(payload: CreateDiscussionDTO): Promise<IForumEntry> {
    const { data } = await http.post<{ data: IForumEntry }>(
      `/comments/add`,
      payload
    );
    return data.data;
  },

  // Crea un nuevo Comentario en una Discusión existente.
  // payload Datos del nuevo comentario (group, relaId, text).

  async createComment(payload: CreateCommentDTO): Promise<IForumEntry> {
    const fullPayload = {
      ...payload,
      title: payload.title ?? ".", // en caso de undefined, usa ""
    };
    const { data } = await http.post<{ data: IForumEntry }>(
      `/comments/add`,
      fullPayload
    );
    return data.data;
  },
};
