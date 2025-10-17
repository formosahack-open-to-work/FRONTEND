import { useState } from "react";

interface CreateCommentFormProps {
  onAddComment: (text: string) => void;
}

export default function CreateCommentForm({
  onAddComment,
}: CreateCommentFormProps) {
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    setSubmitting(true);
    onAddComment(text);
    setText("");
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe un comentario de apoyo..."
        rows={2}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <button
        type="submit"
        disabled={!text.trim() || submitting}
        className="mt-2 px-4 py-1.5 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 disabled:opacity-50"
      >
        Comentar
      </button>
    </form>
  );
}
