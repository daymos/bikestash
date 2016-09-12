var db = new PouchDB('users');
var hostsDb = new PouchDB('hosts');

var remoteCouchCyclists = 'https://daymos:Mattia1988@daymos.cloudant.com/users';
var remoteCouchHosts = 'https://daymos:Mattia1988@daymos.cloudant.com/hosts';

function saveUsers(newEmail, location) {
  var contact = {
    _id:new Date().toISOString(),
    email: String(newEmail),
    location:String(location),
    accepted:true,
    contacted: false
  };
  console.log(JSON.parse(JSON.stringify(contact)))

  db.put(JSON.parse(JSON.stringify(contact)), function callback(err, result) {
    if (!err) {
      console.log('Successfully saved a new contact! ', result);
      alert('Success! We added your email')
      sync(db,remoteCouchCyclists)
    } else {
      console.log('db.put failed',err)
      alert('something went wrong')
    }
  });
}
function saveHost(newEmail, location, openingTime, capacity) {
  var contact = {
      _id:new Date().toISOString(),
      email: String(newEmail),
      location:String(location),
      openingTime: String(openingTime),
      capacity:String(capacity),
      accepted:true,
      contacted: false
    };
  console.log(JSON.parse(JSON.stringify(contact)))

  hostsDb.put(JSON.parse(JSON.stringify(contact)), function callback(err, result) {
      if (!err) {
            console.log('Successfully saved a new contact! ', result);
            alert('Success! We added your email')
            sync(hostsDb,remoteCouchHosts)
          } else {
                console.log('db.put failed',err)
                alert('something went wrong')
              }
    });
}
function sync(local,dbUnit) {
  var opts = {live: true};
  local.replicate.to(dbUnit, opts, syncError);
  local.replicate.from(dbUnit, opts, syncError);
  local.allDocs({include_docs: true, descending: true}, function(err, doc) {
    console.log(doc.rows);
  });
}

document.getElementById('newCiclyst').addEventListener('click', function(e){
  e.preventDefault() 
  saveUsers(document.getElementById('email').value, document.getElementById('location').value)
})

document.getElementById('newHost').addEventListener('click', function(e){
  e.preventDefault() 
  saveHost(document.getElementById('hostEmail').value, document.getElementById('hostLocation').value,document.getElementById('hostTimes').value, document.getElementById('capacity'))
})
function syncError(err){console.log('syncError:', err)}var db = new PouchDB('users');

function submitSuggestion() {
  $('#suggest-text').css('display', 'none')
  $('#suggestion-tick').css('display', 'inline')
}

function resetSuggestionModal() {
  $('#suggest-text').css('display', 'inline')
  $('#suggestion-tick').css('display', 'none')
}
