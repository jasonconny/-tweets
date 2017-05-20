# *Tweets

All the *Tweets sites:

- [Chachi Tweets](http://www.chachitweets.com)
- [Fonzie Tweets](http://www.fonzietweets.com)

## Build

`grunt build --target=dev --character=Chachi`

target can equal dev, stage or prod.

character can equal Chachi or Fonzie.

`./dist/get_tweets.php` will need to be modified after build to set the correct `$screen_name` and `$user_id` vars for each site.