// modules/forum/Forum.tsx

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ForumService } from "../../db/services/forum.service";
import type { IForumEntry } from "../../types/forum";
import { SORTED_CONDITIONS } from "../../data/conditions";
import { FaChevronLeft, FaPlus } from "react-icons/fa";

import DiscussionDetail from "./components/DiscussionDetail";
import CreateDiscussionModal from "./components/CreateDiscussionModal";

export default function Forum() {
  const { user } = useAuth();

  const [allDiscussions, setAllDiscussions] = useState<IForumEntry[]>([]);
  const [filteredDiscussions, setFilteredDiscussions] = useState<IForumEntry[]>(
    []
  );
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<IForumEntry | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Cargar TODAS las discusiones al inicio (solo esta llamada trae owner completo)
  useEffect(() => {
    const loadAll = async () => {
      try {
        const data = await ForumService.getAllDiscussions();
        const discussions = data.filter((d) => !d.relaId); // solo publicaciones
        setAllDiscussions(discussions);
        setFilteredDiscussions(discussions);
      } catch (err) {
        setError("No se pudieron cargar las publicaciones.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  // Filtrar cuando cambia el grupo
  useEffect(() => {
    if (selectedGroup) {
      const filtered = allDiscussions.filter((d) => d.group === selectedGroup);
      setFilteredDiscussions(filtered);
    } else {
      setFilteredDiscussions(allDiscussions);
    }
  }, [selectedGroup, allDiscussions]);

  const handleGroupSelect = (group: string | null) => {
    setSelectedGroup(group);
    if (group === null) {
      setIsModalOpen(false); // cerrar modal si se va a "Todas"
    }
  };

  const handleDiscussionSelect = (discussion: IForumEntry) => {
    setSelectedDiscussion(discussion);
  };

  const handleDiscussionCreated = async () => {
    // Recargar todas las discusiones para tener owner completo
    try {
      const data = await ForumService.getAllDiscussions();
      const discussions = data.filter((d) => !d.relaId);
      setAllDiscussions(discussions);
      if (selectedGroup) {
        const filtered = discussions.filter((d) => d.group === selectedGroup);
        setFilteredDiscussions(filtered);
      } else {
        setFilteredDiscussions(discussions);
      }
    } catch (err) {
      console.error("Error al recargar publicaciones", err);
    }
    setIsModalOpen(false);
  };

  if (!user) return <div>Cargando...</div>;

  // Vista de detalle
  if (selectedDiscussion) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <button
          onClick={() => setSelectedDiscussion(null)}
          className="mb-4 flex items-center text-indigo-600 hover:underline cursor-pointer"
        >
          <FaChevronLeft className="mr-1 " /> Volver al foro
        </button>
        <DiscussionDetail
          discussion={selectedDiscussion}
          onBack={() => setSelectedDiscussion(null)}
          onCommentAdded={handleDiscussionCreated}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Comunidad de Apoyo
          </h1>
          <p className="text-gray-600 mt-1">
            Comparte tu experiencia y conecta con quienes te entienden.
          </p>
        </div>
        {/* Botón solo si hay grupo seleccionado */}
        {selectedGroup && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition self-start"
          >
            <FaPlus /> Nueva publicación
          </button>
        )}
      </div>

      {/* Selector de grupos (scroll horizontal) */}
      <div className="mb-8">
        <h2 className="text-sm font-semibold text-gray-700 mb-3">
          Explorar por condición
        </h2>
        <div className="flex space-x-4 overflow-x-auto pb-2 hide-scrollbar">
          {/* Card "Todas" */}
          <div
            onClick={() => handleGroupSelect(null)}
            className={`flex-shrink-0 w-24 h-24 rounded-lg border flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-all hover:shadow-md ${
              !selectedGroup
                ? "border-indigo-500 bg-indigo-50"
                : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <span className="text-xs font-medium text-gray-700">Todas</span>
          </div>

          {/* Cards de condiciones */}
          {SORTED_CONDITIONS.map((condition) => (
            <div
              key={condition}
              onClick={() => handleGroupSelect(condition)}
              className={`flex-shrink-0 w-24 h-24 rounded-lg border flex flex-col items-center justify-center text-center p-2 cursor-pointer transition-all hover:shadow-md ${
                selectedGroup === condition
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className="text-xs font-medium text-gray-700 line-clamp-3">
                {condition}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Lista de publicaciones */}
      {error && <div className="text-red-500 mb-6">{error}</div>}

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Cargando publicaciones...</p>
        </div>
      ) : filteredDiscussions.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <p className="text-gray-600 text-lg">
            {selectedGroup
              ? `No hay publicaciones en ${selectedGroup} aún.`
              : "Aún no hay publicaciones en la comunidad."}
          </p>
          {selectedGroup && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition"
            >
              Crear la primera publicación
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredDiscussions.map((disc) => (
            <div
              key={disc._id}
              onClick={() => handleDiscussionSelect(disc)}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition cursor-pointer hover:border-indigo-200"
            >
              {/* Etiqueta del grupo */}
              <div className="flex justify-between items-start mb-3">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-700 bg-indigo-100 rounded-full">
                  {disc.group}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(disc.createdAt).toLocaleDateString()}
                </span>
              </div>

              {/* Título */}
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {disc.title}
              </h3>

              {/* Texto de la publicación */}
              <p className="text-gray-600 mb-4 leading-relaxed whitespace-pre-line line-clamp-4">
                {disc.text}
              </p>

              {/* Autor */}
              <div className="flex items-center pt-3 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-indigo-700 font-semibold text-sm">
                    {disc.owner?.name.charAt(0).toUpperCase() || "N"}
                  </span>
                </div>
                <span className="ml-3 text-sm font-medium text-gray-700">
                  {disc.owner?.name || "Usuario"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <CreateDiscussionModal
          group={selectedGroup || SORTED_CONDITIONS[0]}
          onClose={() => setIsModalOpen(false)}
          onDiscussionCreated={handleDiscussionCreated}
        />
      )}

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
