function sync(callback) {
  setTimeout(function() {
    const res = deferred();
    callback(res);
  }, 1000);
}

function deferred() {
  return 'deferred';
}

sync(function(result) {
  console.log(result);
});