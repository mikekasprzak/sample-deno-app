import { Application, Router } from "@oak/oak";   // Router: handles URL requests
import { Eta } from "@eta-dev/eta";               // Eta: HTML template engine (i.e. <%= data %>, <% javascript code %>) 

const router = new Router();
const eta = new Eta({ views: import.meta.dirname });
const port = 8080;

function AddRoute(routePath: string, etaTemplateFile: string) {
  // Handle GET requests
  router.get(routePath, (ctx) => {
    ctx.response.body = eta.render(etaTemplateFile, ctx);
  });
}

// Instead of writing the code above multiple times
AddRoute("/", "./layout/root"); // NOTE: The page is setup to do a JS redirect
AddRoute("/patient/:id*", "./layout/patient");
AddRoute("/prescription/:id*", "./layout/prescription");
AddRoute("/claim/:id*", "./layout/claim");
AddRoute("/insurance/:id*", "./layout/insurance");

// serve static files
router.get("/static/:path+", async (ctx) => {
  await ctx.send({
    "root": Deno.cwd()  // root is the "current working directory" that Deno was executed in
  });
});

// Setup and start the server
const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Server listening on http://localhost:${port}`);
app.listen({ port: port });
