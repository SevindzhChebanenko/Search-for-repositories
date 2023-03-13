export class Search {
  // Получаем текущую страницу поиска
  get currentPageNumber() {
    return this.currentPage;
  }

  // Устанавливаем текущую страницу поиска
  setCurrentPageValue(pageNumber) {
    this.currentPage = pageNumber;
  }

  constructor(log, api, view) {
    this.log = log;
    this.api = api;
    this.view = view;
    this.view.searchInput.addEventListener(
      "keyup",
      this.debounce(this.searchRepositories.bind(this), 500)
    );
    this.view.loadMore.addEventListener(
      "click",
      this.loadMoreRepositories.bind(this)
    );
    this.currentPage = 1;
  }

  // Выполняем поиск при каждом вводе символа в поисковую строку
  searchRepositories() {
    this.setCurrentPageValue(3);
    if (this.view.searchInput.value) {
      this.api
        .loadRepositories(this.view.searchInput.value, this.currentPageNumber)
        .then((response) => this.updateRepositories(response));
    } else {
      this.view.clearRepositories();
      this.view.setRepositoryCounter("");
    }
  }

  // Подгружаем при нажатии на кнопку "Загрузить еще"
  loadMoreRepositories() {
    this.setCurrentPageValue(this.currentPage + 1);
    this.api
      .loadRepositories(this.view.searchInput.value, this.currentPageNumber)
      .then((response) => this.updateRepositories(response, true));
  }

  // Обновляем текущее состояние
  updateRepositories(response, isUpdate = false) {
    let repositories;
    let repositoriesCount;
    if (response.ok) {
      if (!isUpdate) {
        // Если новый поиск а не подгрузка, то очищаем ранее найденные репозитории
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

  // Задержка ввода данных для отправки запроса
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
