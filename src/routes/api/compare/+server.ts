
import { STEAM_API_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const steamid = url.searchParams.get('steamid');
	if (!steamid) {
		return json({ error: 'Missing steamid' }, { status: 400 });
	}

    try {
        var link = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamid}&format=json&include_appinfo=1`

        const res = await fetch(link);
        const data = await res.json()

        return json(data);
    } catch (error) {
        // guessing that the error is that "res" isn't JSON
        return json({ error: "Invalid steamid"}, { status: 400 })
    }
};
