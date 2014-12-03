var Fender = require('fender/client'),
    mach = require('mach'),
    registry = Fender.Protob.registry,
    scope = registry.scope('dropbox.core.v1'),
    AccountService;

// Create constructors in the registry for messages and services as found in your proto bundle
registry.register(require('../proto-bundle'));

// Use fender to automatically wire up http methods on services
Fender.prepareClientServiceHandlers(scope.services());

// Fetch the account service constructor
AccountService = scope.lookup('services.AccountService');

token = require('./creds').token;

dropboxAuth = function(app) {
  return function(conn) {
    // This line works
    conn.request.headers.Authorization = "Bearer " + token;

    // This line does not
    // conn.request.auth = 'Bearer ' + token;
    return conn.call(app);
  };
};

// Get the info for an account
new AccountService({ headers: { Authorization: "Bearer " + token }}).Info()
.then(function(account){
  console.log("The account is:", require('util').inspect(account.asJSON(), { depth: null} ));

  // Using a custom stack
  new AccountService({stack: dropboxAuth}).Info()
  .then(function(secondAccount) {
    console.log("\n\nUSING A CUSTOM STACK:", require('util').inspect(secondAccount.asJSON(), { depth: null }));
  });


}).catch(function(e) {
  console.error(e);
});


