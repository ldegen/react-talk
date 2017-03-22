# react-talk
Example code for my talk (Bonn Agile Meetup 2017-03-21)

To run it, clone the repository and 

```
npm install
npm run http-server
```

Then point your browser to http://localhost:8080/gol.html.

If you want to play around in the code, try `npm run watchify`.

(p.s. `watchify` uses `chokidar` which in turn seems to have some issues on linux. For me, it works fine when I replace `chokidar` 
with node's built-in `fs` module. See this pull-request by another user: https://github.com/substack/watchify/pull/317)
