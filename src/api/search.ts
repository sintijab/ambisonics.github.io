import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }): Promise<any> => {
    try {
        const queries = new URLSearchParams(url.search);
        const access_token = queries.get('access_token');
        const query = queries.get('query');
        const features = await fetch(`https://api.spotify.com/v1/search?q=${query}`, {
            method: "GET",
            headers: { 'Authorization': 'Bearer ' + access_token },
        }).catch(err => console.error(err));
        const body = await features?.json();
        return new Response(JSON.stringify(body), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: unknown) {
        console.error(`Error in player api route: ${error as string}`);
    }
};