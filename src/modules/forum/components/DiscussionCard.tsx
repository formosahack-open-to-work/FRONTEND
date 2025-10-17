import type { IForumEntry } from "../../../types/forum";
// import { useAuth } from "../../../context/AuthContext";

interface DiscussionCardProps {
  discussion: IForumEntry;
  onClick: (d: IForumEntry) => void;
}

export default function DiscussionCard({
  discussion,
  onClick,
}: DiscussionCardProps) {
  // const { user } = useAuth();

  // const getDisplayName = (ownerId: string): string => {
  //   if (!user) return "Miembro de la comunidad";
  //   return ownerId === user.data._id
  //     ? user.data.name
  //     : "Miembro de la comunidad";
  // };

  return (
    <div
      onClick={() => onClick(discussion)}
      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition"
    >
      <h3 className="font-bold text-gray-800 line-clamp-1">
        {discussion.title}
      </h3>
      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
        {discussion.text}
      </p>
      <div className="mt-3 flex justify-between items-center text-xs text-gray-500">
        <span>Por {"Anonymous"}</span>
        <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
