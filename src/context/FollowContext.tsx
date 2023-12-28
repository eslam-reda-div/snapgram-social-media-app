import { createContext, useContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";

import { getCurrentUser } from "@/lib/appwrite/api";

interface FollowContextProps {
  follow: string[];
  followUser: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
}

const FollowContext = createContext<FollowContextProps>({
  follow: [],
  followUser: () => {},
  isLoading: false,
});

export function FollowProvider({ children }: { children: ReactNode }) {
  const [follow, followUser] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentAccount = await getCurrentUser();
      if (currentAccount) {
        followUser(currentAccount.follow || []);
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthUser();
  }, []);

  const value = {
    follow,
    followUser,
    isLoading,
  };

  return <FollowContext.Provider value={value}>{children}</FollowContext.Provider>;
}

export const useFollowContext = () => useContext(FollowContext);
