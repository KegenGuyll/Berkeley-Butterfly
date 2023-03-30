const createUrl = (url: string, query?: any) => {
  const myURLwithParams = new URL(url);

  if (query) {
    Object.keys(query).forEach((key) => {
      myURLwithParams.searchParams.append(key, query[key]);
    });
  }

  return myURLwithParams.href;
};

export default createUrl;
