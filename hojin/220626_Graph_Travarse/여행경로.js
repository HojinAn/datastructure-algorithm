const solution = (tickets) => {
  let answer = [];
  const obj = {};
  const targetLen = tickets.length;
  tickets.forEach((el) => {
    const [from, to] = el;
    if (!obj[from]) obj[from] = { link: [], visited: [] };
    if (!obj[to]) obj[to] = { link: [], visited: [] };
    obj[from].link.push(to);
    obj[from].visited.push(0);
  });
  const keys = Object.keys(obj);
  keys.forEach((el) => obj[el].link.sort());
  const dfs = (str, n) => {
    const { link, visited } = obj[str];
    if (n === targetLen) return true;
    for (let i = 0; i < link.length; i++) {
      const next = link[i];
      if (!visited[i]) {
        visited[i] = 1;
        if (dfs(next, n + 1)) {
          answer.push(next);
          return true;
        }
        visited[i] = 0;
      }
    }
    return false;
  };
  dfs("ICN", 0);
  answer.push("ICN");
  return answer.reverse();
};
