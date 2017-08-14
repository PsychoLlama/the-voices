# The Voices
Play sounds remotely through a rest API.

## Why
Home automation is fun, and my morning alarm hasn't been automated yet. So like why not.

## How
The magic of `ffmpeg` and a few `child_process.spawn` calls tied to an express server.

Use it by doing `yarn start` in the project and making sure you have a few `.mp3` files in the `audio-files/` directory. When ready, try this:

```js
fetch('localhost:8080/player/play', {
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
  body: JSON.stringify({
    name: 'siren',
  }),
})
```

Assuming there's a file called `siren.mp3` in your `audio-files/` directory, you should hear that sweet sound of panic. Great for starting off any morning.

There's also the associated `/pause`, `/resume`, and `/stop` endpoints which do exactly what you'd guess.

## Project Stability
Ha!
