import { useState } from "react";
import { ForumService } from "../../../db/services/forum.service";
import type { CreateDiscussionDTO } from "../../../types/forum";

interface CreateDiscussionModalProps {
  group: string;
  onClose: () => void;
  onDiscussionCreated: () => void;
}

export default function CreateDiscussionModal({
  group,
  onClose,
  onDiscussionCreated,
}: CreateDiscussionModalProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !text.trim()) {
      setError("Título y mensaje son obligatorios.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const payload: CreateDiscussionDTO = { group, title, text };
      await ForumService.createDiscussion(payload);
      onDiscussionCreated();
    } catch (err) {
      setError("No se pudo crear la publicación. Intenta de nuevo.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Nueva publicación en {group}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Cerrar"
            >
              &times;
            </button>
          </div>

          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Ej: ¿Alguien más tiene este síntoma?"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mensaje
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="Comparte tu experiencia, pregunta o mensaje de apoyo..."
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-60"
              >
                {submitting ? "Publicando..." : "Publicar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
