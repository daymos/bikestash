var db = new PouchDB('todos');
var remoteCouch = 'https://daymos.cloudant.com/landing';

function saveEmail(newEmail) {
  var contact = {
      _id:new Date().toISOString(),
      email: String(newEmail),
      contacted: false
    };
  console.log(JSON.parse(JSON.stringify(contact)))
  db.put(JSON.parse(JSON.stringify(contact)), function callback(err, result) {
      if (!err) {
            console.log('Successfully saved a new contact! ', result);
            sync()
          }
      else{console.log('db.put failed',err)}
    });
}
function sync() {
  syncDom.setAttribute('data-sync-state', 'syncing');
  var opts = {live: true};
  db.replicate.to(remoteCouch, opts, syncError);
  db.replicate.from(remoteCouch, opts, syncError);
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
        console.log(doc.rows);
      });
}

document.getElementById('submit').addEventListener('click', () => {
      saveEmail(document.getElementById('email').value)
})

function syncError(err){console.log('syncError:', err)}
