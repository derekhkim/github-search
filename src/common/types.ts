export type RootState = {
  githubSearch: SearchState;
};

export type SearchState = {
  query?: string;
  language?: string;
  repositories?: RepositoryData[];
};

export type RepositoryData = {
  id: number;
  html_url: string;
  name: string;
  description: string;
  owner: {
    avatar_url: string;
  };
};
