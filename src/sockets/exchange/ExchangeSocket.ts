import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";

import { ExchangeSocketEvents } from "@/enums/socket";

export class ExchangeSocket {
  private static instance: ExchangeSocket;

  public socket: Socket | null | undefined;

  constructor() {
    if (ExchangeSocket.instance) {
      return ExchangeSocket.instance;
    }

    this.socket = null;

    ExchangeSocket.instance = this;
  }

  public CloseConnection = () => {
    this.socket?.disconnect();

    if (!this.socket?.disconnected) {
      this.CloseConnection();
    }

    this.socket?.close();

    this.socket = null;
  };

  public OpenConnection = ({ updateExchangeAction }: GlobalConnectionProps) => {
    if (this.socket?.connected) {
      this.socket = null;
      this.OpenConnection({
        updateExchangeAction,
      });
      return;
    }

    this.socket = io(import.meta.env.VITE_EXCHANGE_SOCKET_API, {
      transports: ["websocket"],
      reconnection: true,
    });

    this.AddListeners({
      updateExchangeAction,
    });
  };

  public AddListeners = ({ updateExchangeAction }: GlobalConnectionProps) => {
    this.socket?.on("connect_error", (error) => {
      console.error(error);
    });

    this.socket?.on(
      ExchangeSocketEvents.EXCHANGE_SUBSCRIPTION,
      (res: ExchangeItem[]) => {
        updateExchangeAction(res);
      }
    );
  };
}

interface GlobalConnectionProps {
  updateExchangeAction: (data: ExchangeItem[]) => void;
}
