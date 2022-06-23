// array에서 index를 이용해 queue 구현
import * as fs from "fs";
const inputList = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
const [str1, ...str2] = inputList;
const [m, n, h] = str1.trim().split(" ").map(Number);

const delta = [
  [-1, 0, 0],
  [1, 0, 0],
  [0, -1, 0],
  [0, 1, 0],
  [0, 0, -1],
  [0, 0, 1],
];
const tray: number[][][] = [];
const q: number[][] = [...Array(m * n * h)];
let zeroCnt = 0;

let answer = 0;
let qIdx = 0;
const inpHandler = (str: string[]) => {
  let index = 0;
  for (let i = 0; i < h; i++) {
    tray[i] = str
      .slice(index, (index += n))
      .map((el) => el.trim().split(" ").map(Number));
  }
  for (let i = 0; i < h; i++)
    for (let j = 0; j < n; j++)
      for (let k = 0; k < m; k++) {
        if (!tray[i][j][k]) zeroCnt++;
        else if (tray[i][j][k] === 1) q[qIdx++] = [i, j, k, 0];
      }
};

const rangeCheck = (x, y, z) => {
  return 0 <= x && x < h && 0 <= y && y < n && 0 <= z && z < m;
};

const bfs = () => {
  let pointer = 0;
  while (1) {
    const cur = q[pointer++];
    if (!cur) break;
    else {
      answer = cur[3];
      delta.forEach((el) => {
        const nX = cur[0] + el[0];
        const nY = cur[1] + el[1];
        const nZ = cur[2] + el[2];
        if (rangeCheck(nX, nY, nZ) && !tray[nX][nY][nZ]) {
          tray[nX][nY][nZ] = 1;
          zeroCnt--;
          q[qIdx++] = [nX, nY, nZ, answer + 1];
        }
      });
    }
  }
};

inpHandler(str2);
bfs();
console.log(zeroCnt ? -1 : answer);
