import qs from "qs";

export const createAction = (type, payload) => ({ type, payload });

const parseJson = (response) =>
  response.json().then((data) => {
    if (!data) {
      return null;
    }

    return data;
  });

export const createRequest = (url) => (query = {}) => {
  const _query = { ...query, json: true };
  const queryString = qs.stringify(_query);

  const urlWithQuery = queryString ? `${url}?${queryString}` : url;

  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  return fetch(urlWithQuery, headers).then(parseJson);
};

export const writeToLocalStorige = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const readFromLocalStorige = (key) => {
  return JSON.parse(window.localStorage.getItem(key)) || null;
};

export const dateToRequestString = (date) => {
  let _dateArr = date.split("-");

  return `${_dateArr[0]}${_dateArr[1]}${_dateArr[2]}`;
};

const checkZero = (str) => {
  if (+str < 10) {
    return `0${str}`;
  }

  return str;
};

export const getСurrentDate = () => {
  const dateNow = new Date();

  return `${dateNow.getFullYear()}-${checkZero(
    +dateNow.getMonth() + 1
  )}-${checkZero(dateNow.getDate())}`;
};

export const genereteDefaultArr = (start, end) => {
  let arr = [];

  for (let i = start; i <= end; i++) {
    if (i < 10) {
      i = `0${i}`;
    }

    arr.push({ valcode: "EUR", date: `2020${i}01` });
  }

  return arr;
};

export const toggleElementFromList = (list, item) => {
  if (!list || list.length < 0) {
    return [item];
  }

  const isItemExistOnList = list.find((currentItem) => currentItem === item);

  if (isItemExistOnList) {
    return list.filter((currentItem) => currentItem !== item);
  }

  return [...list, item];
};
