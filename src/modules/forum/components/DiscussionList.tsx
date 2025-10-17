import type { IForumEntry } from "../../../types/forum";

interface DiscussionListProps {
  discussions: IForumEntry[];
  onSelect: (d: IForumEntry) => void;
}

export default function DiscussionList({
  discussions,
  onSelect,
}: DiscussionListProps) {
  if (discussions.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg text-gray-500">
        Aún no hay discusiones en este grupo. ¡Sé el primero en iniciar una!
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {discussions.map((disc) => (
        <div
          key={disc._id}
          onClick={() => onSelect(disc)}
          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
        >
          <h3 className="font-semibold text-lg text-gray-800">{disc.title}</h3>
          <p className="text-gray-600 mt-1 line-clamp-2">{disc.text}</p>
          <p className="text-xs text-gray-400 mt-2">
            {new Date(disc.createdAt).toLocaleDateString()} • {disc.group}
          </p>
        </div>
      ))}
    </div>
  );
}
