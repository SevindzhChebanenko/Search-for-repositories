const REPOSITORY_PER_PAGE = 10;
const URL = "https://api.github.com/";

export class API {
  constructor() {}

  // Загрузка репозиториев
  async loadRepositories(searchValue, page) {
    return await fetch(
      `${URL}search/repositories?q=${searchValue}&per_page=${REPOSITORY_PER_PAGE}&page=${page}`
    );
  }

  //Получаем данные выбранного репозитория
  async loadRepositoryData(repository) {
    const urls = [`${URL}repositories/${repository}/repos`];
    const requests = urls.map((url) => fetch(url));
    return Promise.all(requests).then((responses) =>
      Promise.all(responses.map((r) => r.json()))
    );
  }
}

// https://api.github.com/search/repositories?q=stars%3A%3E0&sort=stars&order=desc&page=
