import type { APIRoute } from 'astro';
import querystring from 'querystring';
import request from 'request';


var redirect_uri = 'http://localhost:4321/api/callback';
var client_id = '';
var client_secret = '';

export const GET: APIRoute = async ({ cookies, redirect, url, params }): Promise<any> => {
    try {
        const queries = new URLSearchParams(url.search);
        const code = queries.get('code');
        const state = queries.get('state');
        var stateKey = 'spotify_auth_state';

        var storedState = cookies ? cookies?.get(stateKey)?.value : null;

        if (state === null || state !== storedState) {
            return redirect('/#' +
                querystring.stringify({
                    error: 'state_mismatch'
                }))
        } else {
            cookies.delete(stateKey);
            var authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                form: {
                    code: code,
                    redirect_uri: redirect_uri,
                    grant_type: 'authorization_code'
                },
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
                },
            };
            const params = new URLSearchParams();
            params.append("grant_type", authOptions.form.grant_type);
            params.append("code", authOptions.form.code as string);
            params.append("redirect_uri", authOptions.form.redirect_uri);
            const response = await fetch(authOptions.url, {
                method: "POST",
                body: params,
                headers: authOptions.headers,

            }).catch(err => console.error(err));
            const body = await response?.json();
            const access_token = await body.access_token;
            // const album = await fetch("https://api.spotify.com/v1/search?q=Lime%20Green%20Skies%20%28feat.%20Oscar%20Jerome%29%20Energy%20Exchange%20Ensemble&type=track", {
            //     method: "GET",
            //     headers: { 'Authorization': 'Bearer ' + access_token },

            // }).catch(err => console.error(err));
            // const search = await album?.text();
            // console.log(search.albums.items[0].id)

            // const features = await fetch(`https://api.spotify.com/v1/audio-features/${search.albums.items[0].id}`, {
            //     method: "GET",
            //     headers: { 'Authorization': 'Bearer ' + access_token },

            // }).catch(err => console.error(err));
            // const info = await features.json();
            // console.log(info);

            return redirect('/#' +
                querystring.stringify({
                    access_token: body.access_token,
                    refresh_token: body.refresh_token
                }));


            // Lime%20Green%20Skies%20%28feat.%20Oscar%20Jerome%29%20Energy%20Exchange%20Ensemble

            // request.post(authOptions, function (error, response, body) {
            //     if (!error && response.statusCode === 200) {
            //         var access_token = body.access_token,
            //             refresh_token = body.refresh_token;

            //         var options = {
            //             url: 'https://api.spotify.com/v1/me',
            //             headers: { 'Authorization': 'Bearer ' + access_token },
            //             json: true
            //         };

            //         // use the access token to access the Spotify Web API
            //         request.get(options, function (error, response, body) {
            //             console.log(body);
            //         });

            //         // we can also pass the token to the browser to make requests from there
            //         return redirect('/#' +
            //             querystring.stringify({
            //                 access_token: access_token,
            //                 refresh_token: refresh_token
            //             }));
            //     } else {
            //         return redirect('/#' +
            //             querystring.stringify({
            //                 error: 'invalid_token'
            //             }));
            //     }
            // });
        }
    } catch (error: unknown) {
        console.error(`Error in player api route: ${error as string}`);
    }
};