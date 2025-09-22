// utils/gameUtils.ts
export function findGameById(resJson: any, id: number) {
  if (!resJson.vendors) throw new Error("resJson.vendors is undefined");

  const allGames = resJson.vendors.flatMap((v: any) => v.games || []);
  return allGames.find((g: any) => g.id === id);
}
