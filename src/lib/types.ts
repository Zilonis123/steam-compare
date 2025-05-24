export type Game = {
	appid: number;
	name: string;
	playtime_forever: number;
	img_icon_url: string;
	has_community_visible_stats: boolean;
	playtime_windows_forever: number;
	playtime_mac_forever: number;
	playtime_linux_forever: number;
	playtime_deck_forever: number;
	rtime_last_played: number;
	playtime_disconnected: number;
};

export type GameWithBothPlaytimes = Game & {
	user1Playtime: number;
	user2Playtime: number;
};