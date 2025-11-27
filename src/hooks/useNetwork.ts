import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export function useNetwork() {
  const [isOnline, setIsOnline] = useState(true);
  const [connectionType, setConnectionType] = useState<string>("unknown");

  useEffect(() => {
    const unsub = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected === true);
      setConnectionType(state.type);
    });

    return () => unsub();
  }, []);

  return { isOnline, connectionType };
}
