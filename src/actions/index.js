import { username, password } from './secrets';

export const RECEIVE_MEMES = 'RECEIVE_MEMES';
export const NEW_MEME = 'NEW_MEME';


function receiveMemes(json) {
  const { memes } = json.data;

  return {
    type: RECEIVE_MEMES,
    memes
  }
}

//fetching nmemes asynchronously
export function fetchMemes() {
  // Thunk middleware knows how to handle functions.
  // It passes the dispatch method as an argument to the function,
  // thus making it able to dispatch actions itself.

  return function(dispatch) {

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

    return fetch('https://api.imgflip.com/get_memes')
      .then(
        response => response.json(),
        error => console.log('An  error occured', error)
        )
      .then(json =>
        // We can dispatch many times!
        // Here, we update the app state with the results of the API call
        dispatch(receiveMemes(json)))
  }
}

export function newMeme(meme) {
  return {
    type: NEW_MEME,
    meme
  }
}

function postMemeJson(params) {
  params["username"] = username;
  params["password"] = password;

  const bodyParams = Object.keys(params).map(key => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&');

  return fetch('https://api.imgflip.com/caption_image', {
    method: "Post",
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: bodyParams
  }).then(response => response.json());
}

export function createMeme(new_meme_object) {
  return function(dispatch) {
    return postMemeJson(new_meme_object)
      .then(new_meme => dispatch(newMeme(new_meme)))
  }
}
