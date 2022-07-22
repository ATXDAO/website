# atxdao website

## contributing

#### install dependencies

1. `yarn install`

#### editor setup

1. download + open atxdao website with [vscode](https://code.visualstudio.com/)
2. go to the extensions view with `(ctrl|cmd)+shift+x`
3. search for @recommended and install the workspace recommended eslint and prettier extensions

#### .env

1. Copy `.env.example` to `.env`
2. Change any variables necessary for your environment (see [services](#services) below)

#### developing on the site

1. run `yarn dev` to launch the site at `localhost:3000` and it will automatically reload any changes you make
1. when you are happy with a set of changes, run `yarn lint && yarn build` and fix any errors.
1. open up a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request)
1. get a review by @clifton or @jongregis
1. your changes will be merged and automatically deployed

#### resources

1. we use [chakra-ui](https://chakra-ui.com/docs/getting-started) as our design framework. check out the [docs](https://chakra-ui.com/docs/getting-started)!
1. we use [nextjs](https://nextjs.org/docs) to statically build the site
1. and deploy to [github pages](https://pages.github.com/)

#### services

##### EventBrite

1. You'll need to set up an API Key on the EventBrite site under 
   [API Keys](https://www.eventbrite.com/account-settings/apps)
2. Use the Private Token for `NEXT_PRIVATE_EVENTBRITE_KEY` in `.env`
3. Create at least one event (it may need to be paid)
4. Get your organization ID by listing organizations using the 
   [API Docs](https://www.eventbrite.com/platform/api#/reference/organization/list-your-organizations/list-your-organizations?console=1)
5. Put your organization ID into `NEXT_PRIVATE_EVENTBRITE_ORGID` in `.env`
