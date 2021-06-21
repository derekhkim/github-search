import axios from "axios";

const githubBaseURL = "https://api.github.com";

export const searchRepositories = (query: string, language?: string) => {
  {
    const queryParam = "q=" + query + " ";
    const languageParam = language ? "language: " + language : "";
    return axios({
      method: "get",
      url: githubBaseURL + "/search/repositories",
      responseType: "json",
      params: new URLSearchParams(queryParam + languageParam),
    });
  }
};
