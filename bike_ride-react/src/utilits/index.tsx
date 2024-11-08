import { IStation } from "../store/useStationsStore/interface";

export const BASE_URL = "https://api.citybik.es/v2/";

// получаем данные из локального хранилища
export const getLocalStorage = (key: string) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    return localStorage.getItem(key);
  }
};

// сохраняем данные в локальном хранилище браузера
export const setLocalStorage = (key: string, value: IStation[]) => {
  localStorage.setItem(key, JSON.stringify(value));
};
