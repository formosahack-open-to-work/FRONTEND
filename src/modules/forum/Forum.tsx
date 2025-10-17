import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ForumService } from "../../db/services/forum.service";
import type { IForumEntry } from "../../types/forum";
import { SORTED_CONDITIONS } from "../../data/conditions";

import DiscussionDetail from "./components/DiscussionDetail";
import CreateDiscussionModal from "./components/CreateDiscussionModal";
import DiscussionCard from "./components/DiscussionCard";

export default function Forum() {
  const { user } = useAuth();
  console.log(user);

  const [view, setView] = useState<"home" | "group">("home");
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [discussions, setDiscussions] = useState<IForumEntry[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<IForumEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar discusiones cuando se selecciona un grupo
  useEffect(() => {
    if (view === "group" && selectedGroup) {
      loadDiscussions(selectedGroup);
    }
  }, [view, selectedGroup]);

  const loadDiscussions = async (group: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ForumService.getDiscussionsByGroup(group);
      const filtered = data.filter((d) => !d.relaId);
      setDiscussions(filtered);
    } catch (err) {
      setError("No se pudieron cargar las discusiones.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGroupSelect = (group: string) => {
    setSelectedGroup(group);
    setView("group");
    setSelectedDiscussion(null);
  };

  const handleDiscussionSelect = (discussion: IForumEntry) => {
    setSelectedDiscussion(discussion);
  };

  const handleDiscussionCreated = () => {
    if (selectedGroup) {
      loadDiscussions(selectedGroup);
    }
    setIsModalOpen(false);
  };

  const goBackToGroups = () => {
    setView("home");
    setSelectedDiscussion(null);
  };

  if (!user) return <div>Cargando...</div>;

  // Vista de detalle de una discusión
  if (selectedDiscussion) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <button
          onClick={() => setSelectedDiscussion(null)}
          className="mb-4 flex items-center text-indigo-600 hover:underline"
        >
          ← Volver a las discusiones
        </button>
        <DiscussionDetail
          discussion={selectedDiscussion}
          onBack={() => setSelectedDiscussion(null)}
          onCommentAdded={handleDiscussionCreated}
        />
      </div>
    );
  }

  // Vista de un grupo (discusiones)
  if (view === "group" && selectedGroup) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex items-center mb-6">
          <button
            onClick={goBackToGroups}
            className="mr-4 p-2 rounded-full hover:bg-gray-200"
            aria-label="Volver"
          >
            ←
          </button>
          <h1 className="text-2xl font-bold text-gray-800">{selectedGroup}</h1>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            Publicaciones recientes
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            + Nueva publicación
          </button>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {loading ? (
          <p className="text-gray-500">Cargando publicaciones...</p>
        ) : discussions.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              Aún no hay publicaciones en este grupo.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-3 text-indigo-600 font-medium hover:underline"
            >
              Sé el primero en publicar
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {discussions.map((disc) => (
              <DiscussionCard
                key={disc._id}
                discussion={disc}
                onClick={handleDiscussionSelect}
              />
            ))}
          </div>
        )}

        {/* Modal para crear publicación */}
        {isModalOpen && (
          <CreateDiscussionModal
            group={selectedGroup}
            onClose={() => setIsModalOpen(false)}
            onDiscussionCreated={handleDiscussionCreated}
          />
        )}
      </div>
    );
  }

  // Vista principal: lista de grupos como cards
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Comunidad de Apoyo
      </h1>
      <p className="text-gray-600 mb-8">
        Un lugar seguro para compartir tu historia y conectar con quienes te
        entienden.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {SORTED_CONDITIONS.map((condition) => (
          <div
            key={condition}
            onClick={() => handleGroupSelect(condition)}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer hover:border-indigo-300"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <span className="text-indigo-600 font-bold text-lg">+</span>
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">{condition}</h3>
            <p className="text-gray-500 text-sm mt-2">
              Comparte, escucha y apóyate.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
