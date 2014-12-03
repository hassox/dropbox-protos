var Fender = require('fender/client'),
    registry = Fender.Protob.registry,
    scope = registry.scope('dropbox.core.v1'),
    AccountService;

registry.register(require('../proto-bundle'));

Fender.prepareClientServiceHandlers(scope.services());

AccountService = scope.lookup('services.AccountService');

token = require('./creds').token;

new AccountService({ headers: { Authorization: "Bearer " + token }}).Info()
.then(function(account){
  console.log("The account is:", require('util').inspect(account.asJSON(), { depth: null} ));
}).catch(function(e) {
  console.error(e);
});


