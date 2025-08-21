
export interface ResponseConfig {
  status: 200 | 300 | 400;
  message: string;
}

export interface AuthResponseConfig extends ResponseConfig {
  credentials: UserDataInterface;
  accessToken:string
}
export interface QuoteInterface {
  quote: string;
  author: string;
  userId: string;
  quoteId: string;
  createdAt: number;
  username: string;
}

export interface UserDataInterface {
  userId: string;
  username: string;
  email: string;
  createdAt: number;
  profile_url: string;
}

export interface QuotesInterfaceWithProfile extends QuoteInterface {
  profile_url: string;
}

export interface PostResponseConfig extends ResponseConfig {
  quotes: QuotesInterfaceWithProfile[]| null;
}

export interface ProfileResponseCofig extends ResponseConfig {
  userData: UserDataInterface | null;
  userPosts: QuoteInterface[] | [];
}
