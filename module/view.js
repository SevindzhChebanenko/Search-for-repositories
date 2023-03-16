export class VIEW {
  constructor(api) {
    this.api = api;

    this.app = document.getElementById("app");

    this.title = this.createElement("h1", "title");
    this.title.textContent = "Github Search Repositories";
    this.mainContent = this.createElement("div", "main");
    this.repositoriesListWrapper = this.createElement(
      "div",
      "repositories-wrapper"
    );
    this.repositoriesList = this.createElement("ul", "repositories");
    this.repositoriesListWrapper.append(this.repositoriesList);

    this.searchLine = this.createElement("div", "search-line");
    this.searchInput = this.createElement("input", "search-input");
    this.repositoriesCounter = this.createElement("span", "counter");
    this.searchLine.append(this.searchInput);
    this.searchLine.append(this.repositoriesCounter);

    this.loadMore = this.createElement("button", "btn");
    this.loadMore.textContent = "Загрузить еще";
    this.loadMore.style.display = "none";
    this.repositoriesListWrapper.append(this.loadMore);

    this.app.append(this.title);
    this.app.append(this.searchLine);
    this.mainContent.append(this.repositoriesListWrapper);
    this.app.append(this.mainContent);
  }

  createElement(elementName, className) {
    const element = document.createElement(elementName);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }

  createRepository(repositoryData) {
    const repository = this.createElement("li", "repository-prev");
    repository.addEventListener("click", () =>
      this.showRepository(repositoryData)
    );
    repository.innerHTML = `
                        <div class="repository-prew-image">
                          <img src="${repositoryData.owner.avatar_url}" class="repository-prev-photo">
                        </div>
                        <div class="repository-prew-row">
                          <div class="repository-prev-name"><a href="${repositoryData.owner.html_url}" target="_ blank1">Профиль: ${repositoryData.owner.login}</a></div>
                          <div class="repository-prev-link"><a href="${repositoryData.html_url}" target="_ blank2">Ссылка на репозиторий: ${repositoryData.name}</a></div>
                          <div class="repository-prev-date">Дата создания: ${repositoryData.created_at}</a></div>
                        </div>`;
    this.repositoriesList.append(repository);
    // console.log(repositoryData);
  }

  clearRepositories() {
    this.repositoriesList.innerHTML = "";
  }

  setRepositoryCounter(message) {
    this.repositoriesCounter.textContent = message;
  }

  toggleStateLoadMoreButton(show) {
    this.loadMore.style.display = show ? "block" : "none";
  }
}
