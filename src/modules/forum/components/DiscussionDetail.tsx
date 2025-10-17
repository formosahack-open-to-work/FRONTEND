
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import { ForumService } from "../../../db/services/forum.service";
import type { IForumEntry, CreateCommentDTO } from "../../../types/forum";
import CreateCommentForm from "./CreateCommentForm";

interface DiscussionDetailProps {
  discussion: IForumEntry;
  onBack: () => void;
  onCommentAdded: () => void;
}

export default function DiscussionDetail({
  discussion,
  //onBack,
  onCommentAdded,
}: DiscussionDetailProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<IForumEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const all = await ForumService.getDiscussionsByGroup(discussion.group);
        const discussionComments = all.filter(
          (c) => c.relaId === discussion._id
        );
        setComments(discussionComments);
      } catch (err) {
        console.error("Error al cargar comentarios", err);
      } finally {
        setLoading(false);
      }
    };
    loadComments();
  }, [discussion._id, discussion.group]);

  const handleAddComment = async (text: string) => {
    const payload: CreateCommentDTO = {
      group: discussion.group,
      relaId: discussion._id,
      text,
      title: ".",
    };
    await ForumService.createComment(payload);
    onCommentAdded(); // Esto recargará la discusión y sus comentarios
  };

  return (
    <div className="bg-white rounded-lg border p-4">
      {/* <button
        onClick={onBack}
        className="text-indigo-600 hover:underline mb-4 flex items-center"
      >
        ← Volver a las discusiones
      </button> */}

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">{discussion.title}</h2>
        <p className="text-gray-700 mt-2 whitespace-pre-line">
          {discussion.text}
        </p>
        <p className="text-xs text-gray-500 mt-3">
          Publicado el {new Date(discussion.createdAt).toLocaleDateString()}
        </p>
      </div>

      <h3 className="font-medium text-gray-700 mb-3">
        Comentarios ({comments.length})
      </h3>

      {loading ? (
        <p className="text-gray-500">Cargando comentarios...</p>
      ) : (
        <div className="space-y-4 mb-6">
          {comments.length === 0 ? (
            <p className="text-gray-500">Aún no hay comentarios.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="p-3 bg-gray-50 rounded">
                <p className="text-gray-700">{comment.text}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {user && <CreateCommentForm onAddComment={handleAddComment} />}
    </div>
  );
}
