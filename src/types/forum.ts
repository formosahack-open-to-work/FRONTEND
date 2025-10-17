// Define un tipo para el owner tal como viene en la API
export interface ForumOwner {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  condition: string;
  createdAt: string;
  updatedAt: string;
}

export interface IForumEntry {
  _id: string;
  group: string; // la condicion o grupo
  owner: ForumOwner;
  relaId: string | null; // ID del padre, null si es Discusión
  title?: string; // Solo para Discusiones
  text: string;
  file?: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

//  para crear una discusion
export interface CreateDiscussionDTO {
  group: string;
  title: string;
  text: string;
  file?: string;
}

//  para crear un comentario en una discusion w
export interface CreateCommentDTO {
  group: string;
  relaId: string; // id de la discusion a la que pertenece
  text: string;
  title: string;
}
