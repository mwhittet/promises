fetch('https://api.spotify.com/v1/search?q=michael+jackson&type=album')
  .then(response => response.json())
  .then(data => {
    const uris = data.albums.items.map(item => {
      return item.uri;
    }).slice(0, 5);
    
    const tasks = uris.map(uri => fetch('https://api.spotify.com/v1/albums/' + uri.split(':')[2]));
    return Promise.all(tasks);

  }).then(responses => {
    return Promise.all(responses.map(response => response.json()));
  }).then(albums => {
    console.log(albums);
  });