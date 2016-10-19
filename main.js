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
    return Promise.all(albums.map(album => fetch(album.images[0].url)));
  }).then(responses => {
    return Promise.all(responses.map(response => response.blob()));
  }).then(blobs => {
    return blobs.map(blob => URL.createObjectURL(blob));
  }).then(urls => {
    return Promise.all(
      urls.map(url => {
        return new Promise(resolve => {
          const image = new Image();
          image.addEventListener('load', () => {
            resolve(image);
          });
          image.src = url;
        });
      })
    );
  }).then(images => {
    images.forEach(image => {
      document.body.appendChild(image);
    });
  });