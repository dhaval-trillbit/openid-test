const openid = require('openid-client');

const generators = openid.generators;

/*
(async () => {
    const issuer = await Issuer.discover('https://api.dev.soundauth.io/oauth2/clients/m3go7qfno38du6o64i7a4epv2/.well-known/openid-configuration');
    const { Client } = issuer;

    console.log(JSON.stringify(Client.metadata))
})();
*/

async function main() {
/*    const issuer = new openid.Issuer({
        authorization_endpoint: "https://auth.dev.soundauth.io/oauth2/authorize",
        token_endpoint: "https://auth.dev.soundauth.io/oauth2/token",
    });
    */

    const issuer = await openid.Issuer.discover("https://api.dev.soundauth.io/oauth2/clients/m3go7qfno38du6o64i7a4epv2/.well-known/openid-configuration");
    console.log('Discovered issuer %s %O', issuer, issuer.metadata);

    const client = new issuer.Client({
        client_id: "m3go7qfno38du6o64i7a4epv2",
        client_secret: "TQV5U29k1gHibH5bx1layBo0OSAvAbRT3UYW3EWrSYBB5swxjVfWUa1BS8lqzxG",
        redirect_uris: ["http://localhost/"],// ["https://oauth.pstmn.io/v1/callback"],
        response_types: ['code'],
    });

    const codeVerifier = generators.codeVerifier();
    const codeChallenge = generators.codeChallenge(codeVerifier);

    const url = client.authorizationUrl({
        scope: 'openid email',
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
        state: '11231123112311231123112311231123112311231123',

    });

    console.log(url)

}

main();
