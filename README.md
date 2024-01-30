# README

This is my demo to get Supabase Auth (for now maybe more features like realtime) setup with RedwoodJS (using Typescript) serverfully deployed to Render to take advantage of React streaming features.

I current am using nvm to change around, but the main things are yarn and node versions
I have this with yarn 4 and node 20 (specially as of Jan 2024 I have yarn 4.0.2 and node 20.10.0)

To recreate this I did:
```
yarn -v //check yarn version and installation
```
Redwood is currently v6.6 so let's create the app:
```
yarn create redwood-app use-you-own-darn-name
```
For now SSR is experimental so ugrade to v7.x (I used 7.0.0-canary.886+12a400a5f as of Jan 2024):
```
yarn rw upgrade -t canary
```
Then setup project for streaming:
```
yarn rw exp setup-streaming-ssr
```


~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

I am using this as a jumping off point for generating user management:
https://supabase.com/docs/guides/getting-started/tutorials/with-redwoodjs

You will need Supabase for this as well:
https://supabase.com/


It's using the Supabase client so Schema and Prisma parts are a little stripped down and I am using the supabase cli for schema updates

supabase -v to check you have it otherwise:
https://supabase.com/docs/guides/cli/getting-started

AND

https://supabase.com/docs/guides/cli/local-development#link-your-project


~this means you just probably shouldn't run yarn rw prisma migrate dev go through the Docs on the supabase client but it'll be:
```
supabase db pull  //as well as
supabase db push
yarn rw prisma db pull
yarn rw prisma db push
```

In your dashboard click on your project, go to the Authentication section, click URL configuration.
Add your web side's URL to Site's URL section

~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

Setup your supabase Auth within Redwood
```
yarn rw setup auth supabase
```
Then I use Redwood to make the make the page:
```
yarn rw g dbAuth
```

I used the Supabase client docs as well as the Redwood Authentication Supabase docs to write the glue code for the pages.

~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

And then I got Tailwind setup to style it up some
```
yarn rw setup ui tailwindcss
```
~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

Now onto DEPLOYMENT

Render deployment with SSR means you are:
~running a Web - Web Service that is NodeJS
~ and running an Api - Web Service that is also NodeJS
Web Service is what Render is calling it but means you are running a server on the web and running a server on the backend for API

I needed to use a bigger memory instance to serve the web side.
The render.yaml is setup with plan:standard because of this
The render.yaml also included the deploy command as for the web side as:
```
yarn rw serve web
```
or
```
yarn rw serve api
```
for the api side


Use that instead of the defaults so do not use yarn rw deploy render

In redwood.toml update the apiUrl to be what your api side url will be in render
At the time of writing it is the {PROJECT_SERVICE_NAME}.onrender.com

The API side and Web side will end up on different servers so CORS will need to be solved.
~App.tsx has our RedwoodApolloProvider that will need it's graphQLClientConfig edited to pass through credentials
~graphql.ts will need updating in api/src/functions as well to add a cors object with two properties a credentials: true as well as origin: 'YOUR_RENDER_WEB_SIDE_URL'

Some Render flags I have maybe needed are specifying node version multiple ways:
in an .nvrmc file included, an environment variable NODE_VERSION

~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

I made use of Render Environment Variable Groups for overlapping env's

Extra Environment variables for web side:
RWJS_EXP_SSR_GRAPHQL_ENDPOINT=true
SKIP_INSTALL_DEPS

Extra Environment variables for api side:
RWJS_EXP_SSR_GRAPHQL_ENDPOINT=true
SKIP_INSTALL_DEPS=true
PRISMA_GENERATE_SKIP_AUTOINSTALL=true
PRISMA_MIGRATE_SKIP_GENERATE=true

I am not fully sure whether I need all of these still

~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~

Otherwise I have added a Toast Provider to make Toast notifications last between page navigations. The hook is in web/src/contexts with a provider wrapper in App.tsx which can be called by importing the context and using useToast with startToast and hideToast