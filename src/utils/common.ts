export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href;
};
//随机数
export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
