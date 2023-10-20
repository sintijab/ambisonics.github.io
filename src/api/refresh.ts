import type { APIRoute } from 'astro';

var client_id = '';
var client_secret = '';

export const GET: APIRoute = async ({ cookies, redirect, url, params }): Promise<any> => {
    try {
        const queries = new URLSearchParams(url.search);
        const refresh_token = queries.get('refresh_token');
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };
        const params = new URLSearchParams();
        params.append("grant_type", authOptions.form.grant_type);
        params.append("refresh_token", authOptions.form.refresh_token as string);

        const response = await fetch(authOptions.url, {
            method: "POST",
            body: params,
            headers: authOptions.headers,

        }).catch(err => console.error(err));
        const body = await response?.json();
        return new Response(JSON.stringify({
            'access_token': body.access_token
        }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error: unknown) {
        console.error(`Error in player api route: ${error as string}`);
    }
};