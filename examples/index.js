var Fender = require('fender/client'),
    mach = require('mach'),
    registry = Fender.Protob.registry,
    scope = registry.scope('dropbox.core.v1'),
    inspect = function(obj) { return require('util').inspect(obj, { depth: null }); },
    AccountService, FileDataService;

// Create constructors in the registry for messages and services as found in your proto bundle
registry.register(require('../proto-bundle'));

// Use fender to automatically wire up http methods on services
Fender.prepareClientServiceHandlers(scope.services());

// Fetch the account service constructor
AccountService = scope.lookup('services.AccountService');
FileDataService = scope.lookup('services.FileDataService');

token = require('./creds').token;

// Here we're creating a custom mach handler to apply authentication to every request
dropboxAuth = function(app) {
  return function(conn) {
    conn.request.headers.Authorization = "Bearer " + token;
    console.log("MAKING A REQUEST");
    return conn.call(app);
  };
};
console.error("HERE");

try {
// Get the info for an account
new AccountService({headers: { Authorization: "Bearer " + token }}).Info()
.then(function(account){
  console.log("WOT");
  console.log("The account is:", inspect(account.asJSON()));

  // return new FileDataService({stack: dropboxAuth}).Metadata({path: "/", list: "true"})
  // .then(function(response) {
  //   console.log("THE FILE RESULT:", inspect(response.asJSON()));
  // });

}).catch(function(e) {
  console.error("WOT");
  console.error(e);
});

} catch(err) {
  console.error("ERROR:", err);
}
