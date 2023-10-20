import type { APIRoute } from 'astro';
import querystring from 'querystring';

var client_id = '';
var redirect_uri = 'http://localhost:4321/api/callback';
var stateKey = 'spotify_auth_state';
var scope = 'user-read-private user-read-email';

var generateRandomString = function (length: number) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

export const GET: APIRoute = ({ cookies, redirect }): any => {
    try {
        var state = generateRandomString(16);
        cookies.set(stateKey, state);
        return redirect('https://accounts.spotify.com/authorize?' +
            querystring.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    } catch (error: unknown) {
        console.error(`Error in player api route: ${error as string}`);
    }
};