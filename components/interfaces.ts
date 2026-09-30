

export interface ResponseConfig {
  message: string;
}

export type DataRes<T> = ResponseConfig & {
  data: T;
};

export type ListRes<T> = ResponseConfig & {
  data: T[];
  totalCount?: number;
};

export interface AuthResponseConfig extends ResponseConfig {
  credentials: User;
  accessToken: string;
  refreshToken: string;
}



export interface User {
  userId: string;
  username: string;
  email: string;
  createdAt: number;
  profile_url: string;
}

export interface Quotes {
  quote: string;
  author: string;
  userId: string;
  quoteId: string
  createdAt: number;
  username: string;
}

export interface QuotesWithProfile extends Quotes {
  profile_url: string;
}

