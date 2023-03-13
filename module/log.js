export class LOG {
  constructor() {}

  // Сообщение с числом репозиториев
  counterMessage(repositoriesCount) {
    return repositoriesCount > 0
      ? `Найдено ${repositoriesCount} репозиториев`
      : "По вашему запросу репозиториев не найдено";
  }
}
