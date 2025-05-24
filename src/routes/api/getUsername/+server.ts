import { STEAM_API_KEY } from '$env/static/private';
import { json, type RequestHandler } from '@sveltejs/kit';


export const GET: RequestHandler = async ({ url }) => {
    const steamid = url.searchParams.get('steamid');
    if (!steamid) {
        return json({ error: 'Missing steamid' }, { status: 400 });
    }

    try {
        const res = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${STEAM_API_KEY}&steamids=${steamid}`);
        if (!res) throw new Error('Failed to fetch Steam user');

        const data = await res.json();
        const player = data.response.players?.[0];

        return json(data)
    } catch (err) {
        return json({ error: "An error occurred!"}, { status: 400 })
    }
    
}