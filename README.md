# *Tweets

All the *Tweets sites:

- [ChachiTweets](http://www.chachitweets.com)
- [FonzieTweets](http://www.fonzietweets.com)
- [RichieTweets](http://www.richietweets.com)

## Build

`grunt build --target=dev --character=Chachi`

target can equal dev, stage or prod.

character can equal Chachi, Fonzie or Richie.

`./dist/get_tweets.php` will need to be modified after build to set the correct `$screen_name` and `$user_id` vars for each site.