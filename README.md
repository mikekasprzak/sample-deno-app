![](/docs/screenshot1.png)

A reference web application written to teach [Deno](https://deno.land).

The goal is to showcase what an HTML web server application *SHOULD* look like without much fat.

It uses:

* Oak <https://oakserver.org> - For routing HTTP requests
* Eta <https://eta.js.org> - For rendering HTML template


## Where do I start?
While this isn't being written or maintained as a tutorial, you may find these files helpful.

* </main.ts> - The source code... yes, that's essentially it (though some snippets can be found in the templates)
* </template/patient.eta> - The most-complete page template. Written to be easy to read and follow, though it does include a examples of how you might align things or make them optional.
* </static/style.css> - CSS styles, paired with the templates. Includes a brief CSS crash-course at the top.
* </deno.js> - The Deno configuration file. I wanted to show how little you actually need, so this file is bare.

## How do I run this?
Install deno, checkout the code, browse to the directory, and run the following:

```bash
deno task run
```

The first time Deno should download a few packages, then start the server. Open <http://localhost:8080> in your web browser to view the application.
