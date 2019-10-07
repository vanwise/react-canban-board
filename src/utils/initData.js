import DEFAULT_DATA from './defaultData';

function initData (title) {
  const incomingData = JSON.parse(`${localStorage.getItem(title)}`);
  let data;

  if (incomingData) {
    data = incomingData;
  } else {
    localStorage.setItem(title, JSON.stringify(DEFAULT_DATA[title] || []));
    data = DEFAULT_DATA[title] || [];
  }

  return data;
}

export default initData;