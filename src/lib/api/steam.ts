import type { Game, GameWithBothPlaytimes } from '$lib/types';

const getUserGames = async (steamid: string): Promise<Game[]> => {
	const res = await fetch(`/api/compare?steamid=${steamid}`);
	const data = await res.json();
	return data.response.games;
};

export const getCommonGames = async (id1: string, id2: string): Promise<GameWithBothPlaytimes[]> => {
	const [user1Games, user2Games] = await Promise.all([
		getUserGames(id1),
		getUserGames(id2)
	]);

	const user2Map = new Map(user2Games.map((g) => [g.appid, g]));

	return user1Games
		.filter((g) => user2Map.has(g.appid))
		.map((g) => ({
			...g,
			user1Playtime: g.playtime_forever,
			user2Playtime: user2Map.get(g.appid)!.playtime_forever
		}));
};


