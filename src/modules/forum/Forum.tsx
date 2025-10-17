import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { ForumService } from "../../db/services/forum.service";
import type { IForumEntry } from "../../types/forum";

import GroupSelector from "./components/GroupSelector";
import DiscussionList from "./components/DiscussionList";
import DiscussionDetail from "./components/DiscussionDetail";
import CreateDiscussionForm from "./components/CreateDiscussionForm";

export default function Forum() {
  const { user } = useAuth();

  const [groups, setGroups] = useState<string[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [discussions, setDiscussions] = useState<IForumEntry[]>([]);
  const [selectedDiscussion, setSelectedDiscussion] =
    useState<IForumEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar todos los grupos únicos al montar
  useEffect(() => {
    const loadGroups = async () => {
      try {
        const all = await ForumService.getAllDiscussions();
        const uniqueGroups = Array.from(new Set(all.map((d) => d.group)));
        setGroups(uniqueGroups);
        if (uniqueGroups.length > 0 && !selectedGroup) {
          setSelectedGroup(uniqueGroups[0]);
        }
      } catch (err) {
        setError("No se pudieron cargar los grupos.");
        console.error(err);
      }
    };
    loadGroups();
  }, []);

  // Cargar discusiones cuando cambia el grupo
  useEffect(() => {
    if (!selectedGroup) return;
    const loadDiscussions = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await ForumService.getDiscussionsByGroup(selectedGroup);
        // Filtrar solo discusiones (sin relaId)
        const filtered = data.filter((d) => !d.relaId);
        setDiscussions(filtered);
        setSelectedDiscussion(null); // resetear vista de detalle
      } catch (err) {
        setError("No se pudieron cargar las discusiones.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDiscussions();
  }, [selectedGroup]);

  const handleDiscussionSelect = (discussion: IForumEntry) => {
    setSelectedDiscussion(discussion);
  };

  const handleDiscussionCreated = async () => {
    // Recargar discusiones del grupo actual
    if (selectedGroup) {
      const data = await ForumService.getDiscussionsByGroup(selectedGroup);
      const filtered = data.filter((d) => !d.relaId);
      setDiscussions(filtered);
    }
  };

  if (!user) return <div>Cargando...</div>; // aunque ProtectedRoute ya lo evita

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Comunidad de Apoyo
      </h1>

      {/* Selector de grupo */}
      <GroupSelector
        groups={groups}
        selectedGroup={selectedGroup}
        onSelect={setSelectedGroup}
      />

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Panel izquierdo: lista de discusiones + formulario */}
        <div className="lg:w-2/3">
          {selectedDiscussion ? (
            <DiscussionDetail
              discussion={selectedDiscussion}
              onBack={() => setSelectedDiscussion(null)}
              onCommentAdded={handleDiscussionCreated} // recarga comentarios
            />
          ) : (
            <>
              <CreateDiscussionForm
                group={selectedGroup!}
                onDiscussionCreated={handleDiscussionCreated}
              />
              {loading ? (
                <p className="mt-4 text-gray-500">Cargando discusiones...</p>
              ) : (
                <DiscussionList
                  discussions={discussions}
                  onSelect={handleDiscussionSelect}
                />
              )}
            </>
          )}
        </div>

        {/* Panel derecho: info del grupo (opcional, puedes mejorar después) */}
        <div className="lg:w-1/3 bg-blue-50 p-4 rounded-lg">
          <h2 className="font-semibold text-lg text-blue-800">
            {selectedGroup || "Selecciona un grupo"}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Conecta con otras personas que viven con{" "}
            {selectedGroup?.toLowerCase() || "una condición similar"}. Comparte,
            escucha y apóyate mutuamente.
          </p>
        </div>
      </div>
    </div>
  );
}
