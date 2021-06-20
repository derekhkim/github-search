import axios from "axios";

const githubBaseURL = "https://api.github.com";

export const searchRepositories = (query: string) =>
  axios({
    method: "get",
    url: githubBaseURL + "/search/repositories",
    responseType: "json",
    params: new URLSearchParams("q=" + query),
  });
