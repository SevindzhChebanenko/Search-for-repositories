export class Search {
  get currentPageNumber() {
    return this.currentPage;
  }

  setCurrentPageValue(pageNumber) {
    this.currentPage = pageNumber;
  }

  constructor(log, api, view) {
    this.log = log;
    this.api = api;
    this.view = view;
    let a = this.searchRepositories.bind(this);
    this.view.searchInput.addEventListener("keydown", function (event) {
      if (event.keyCode === 13) {
        a();
      }
    });
    this.view.loadMore.addEventListener(
      "click",
      this.loadMoreRepositories.bind(this)
    );
    this.currentPage = 1;
  }

  searchRepositories() {
    this.setCurrentPageValue(1);
    if (this.view.searchInput.value) {
      if (this.view.searchInput.value.length < 3) {
        alert("Для поиска необходимо ввести более 3 символов");
      } else {
        this.api
          .loadRepositories(this.view.searchInput.value, this.currentPageNumber)
          .then((response) => {
            this.updateRepositories(response);
          });
      }
    } else {
      this.view.clearRepositories();
      this.view.setRepositoryCounter("");
    }
  }

  loadMoreRepositories() {
    this.setCurrentPageValue(this.currentPage + 1);
    this.api
      .loadRepositories(this.view.searchInput.value, this.currentPageNumber)
      .then((response) => this.updateRepositories(response, true));
  }

  updateRepositories(response, isUpdate = false) {
    let repositories;
    let repositoriesCount;
    if (response.ok) {
      if (!isUpdate) {
        this.view.clearRepositories();
      }
      response.json().then((res) => {
        if (res.items) {
          repositories = res.items;
          repositoriesCount = res.total_count;
          this.view.toggleStateLoadMoreButton(
            repositoriesCount > 10 &&
              repositories.length * this.currentPageNumber !== repositoriesCount
          );
          repositories.forEach((repository) =>
            this.view.createRepository(repository)
          );
        } else {
          this.view.clearRepositories();
        }
        this.view.setRepositoryCounter(
          this.log.counterMessage(repositoriesCount)
        );
      });
    } else {
      console.log("Error 1" + response.status);
    }
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function () {
      const context = this,
        args = arguments;
      const later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }
}
