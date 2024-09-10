export interface Transaction {
    id: number;
    senderId: string;
    receiverId: string;
    points: number;
    description: string;
    link: string;
    domainId: string;
  }

export interface User {
    discordUsername: string;
    pointsSent: number;
    pointsReceived: number;
    balance: number;
  }