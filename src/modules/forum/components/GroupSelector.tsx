import { SORTED_CONDITIONS } from "../../../data/conditions";

interface GroupSelectorProps {
  selectedGroup: string | null;
  onSelect: (group: string) => void;
}

export default function GroupSelector({
  selectedGroup,
  onSelect,
}: GroupSelectorProps) {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-medium text-gray-700 mb-2">
        Selecciona tu condición
      </h2>
      <div className="flex flex-wrap gap-2">
        {SORTED_CONDITIONS.map((group) => (
          <button
            key={group}
            onClick={() => onSelect(group)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedGroup === group
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {group}
          </button>
        ))}
      </div>
    </div>
  );
}
