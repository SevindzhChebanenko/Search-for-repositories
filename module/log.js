export class LOG {
  constructor() {}

  counterMessage(repositoriesCount) {
    return repositoriesCount > 0
      ? `Найдено ${repositoriesCount} репозиториев`
      : "По вашему запросу репозиториев не найдено";
  }
}
