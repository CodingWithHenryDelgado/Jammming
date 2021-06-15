const clientId = 'c20d1ff841e742c49afbf157c3ae2bc4'
//I don't want to leave this here but I need it for the deploy site!
const redirectURI = 'https://naughty-ritchie-344fba.netlify.app/callback/';
let userAccessToken;

const Spotify = {

    // Retrieves an access token from Spotify API to authenticate requests and retrieve data
    getAccessToken: function() {
      if (userAccessToken) {
        return userAccessToken;
      }
  
        const accessTokenValue = window.location.href.match(/access_token=([^&]*)/);
        const expireTimeValue = window.location.href.match(/expires_in=([^&]*)/);
  
          if (accessTokenValue && expireTimeValue) {
            userAccessToken = accessTokenValue[1];
            const expiresIn = Number(expireTimeValue[1]);
            window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
          } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
          }
    },
  
    search: async function(term) {
      const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        console.log(jsonResponse.tracks);
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            image: track.album.images[2].url,
            preview: track.preview_url,
            uri: track.uri
        }));
     },
  
     savePlaylist: async function(listName, trackUris) {
       if ( !listName || !trackUris.length ) {
          return;
         }
  
         const accessToken = Spotify.getAccessToken();
         const headers = { Authorization: `Bearer ${accessToken}`}
         let userID;
  
         const response = await fetch('https://api.spotify.com/v1/me', { headers: headers }
         );
         const jsonResponse = await response.json();
         userID = jsonResponse.id;
         const response_1 = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
             method: 'POST',
             headers: headers,
             body: JSON.stringify({ name: listName })
         });
         const jsonResponse_1 = await response_1.json();
         const playlistID = jsonResponse_1.id;
         return await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
             method: 'POST',
             headers: headers,
             body: JSON.stringify({ uris: trackUris })
         });
     } // end of savePlaylist method
} // end of Spotify object

export default Spotify;