import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar relative">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div className="relative">
            <h3 className="font-medium">{selectedUser.fullName}</h3>

            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id)
                ? "Online" && (
                    <span
                      className="absolute bottom-[-9px]  left-[-22px] size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                    />
                  )
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
