export const getLocalStorage = (key: string) => { // извлекаем (получаем) данные из локального хранилища
    try {
        // получаем строку, проеобразовываем ее в объект с помощью JSON.parse и возвращаетм его
        return JSON.parse(localStorage.getItem(key));
    } catch (error) {
        return localStorage.getItem(key); // возвращаем исходную строку, соответствующей указанному ключу
    }
};

export const setLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value); // сохраняем данные в локальном хранилище браузера
};

export const removeFromLocalStorage = (key: string) => {
    localStorage.removeItem(key); // удаляет элемент из локального хранилища, соответствующий указанному ключу
};
