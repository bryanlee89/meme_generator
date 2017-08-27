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

    return fetch('http://api.imgflip.com/get_memes')
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
