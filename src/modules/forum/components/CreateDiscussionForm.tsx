// modules/forum/components/CreateDiscussionForm.tsx

import { useState } from "react";
import { ForumService } from "../../../db/services/forum.service";
import type { CreateDiscussionDTO } from "../../../types/forum";

interface CreateDiscussionFormProps {
  group: string;
  onDiscussionCreated: () => void;
}

export default function CreateDiscussionForm({
  group,
  onDiscussionCreated,
}: CreateDiscussionFormProps) {
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
      setTitle("");
      setText("");
      onDiscussionCreated();
    } catch (err) {
      setError("No se pudo crear la discusión. Intenta de nuevo.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg border mb-6">
      <h3 className="font-medium text-gray-800 mb-3">
        Iniciar una nueva discusión
      </h3>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título de la discusión"
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe tu experiencia, pregunta o mensaje de apoyo..."
          rows={4}
          className="w-full p-2 border border-gray-300 rounded mb-3"
        />
        <button
          type="submit"
          disabled={submitting}
          className={`px-4 py-2 rounded text-white ${
            submitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {submitting ? "Enviando..." : "Publicar discusión"}
        </button>
      </form>
    </div>
  );
}
