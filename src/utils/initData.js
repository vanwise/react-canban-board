import DEFAULT_DATA from './defaultData';

function initData (title) {
  const incomingData = JSON.parse(`${localStorage.getItem(title)}`);
  let data;

  if (incomingData) {
    data = incomingData;
  } else {
    const value = DEFAULT_DATA[title] || {};

    localStorage.setItem(title, JSON.stringify(value));
    data = value;
  }

  return data;
}

export default initData;