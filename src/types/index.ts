export interface RootState {
  version: string;
}
export interface UserState {
  user: {
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
  };
}

export interface Post {
  [key: string]: string;
}

export interface PostState {
  posts: Array<Post>;
}
