import { Application, Router, RouterContext } from "jsr:@oak/oak@^17.1.3"; // Oak Router: handles URL requests
import { Eta } from "jsr:@eta-dev/eta@^3.5.0";              // Eta: HTML template engine (i.e. <%= data %>, <% javascript code %>) 

const router = new Router();
const eta = new Eta({ views: import.meta.dirname });
const port = 8080;

/**
 * Add a standard GET request router for the specified path 
 * @param routePath - the URL to route requests for
 * @param etaTemplateFile - an `.eta` template file used to render the page
 * @param func - a function that returns an object containing data you want to make available to the template 
 */
function AddSimpleRoute(routePath: string, etaTemplateFile: string, func?: (ctx?: RouterContext<string>) => object) {
  // Handle GET requests
  router.get(routePath, (ctx) => {
    const data = func ? typeof func === 'function' ? func(ctx) : func : {};
    ctx.response.body = eta.render(etaTemplateFile, {...ctx, data});
  });
}

// Instead of writing the code above multiple times
AddSimpleRoute("/", "./template/redirect", () => {
  return { url: "/patient/25" };
});
AddSimpleRoute("/patient/:id*", "./template/patient", (ctx) => {
  // TODO: fetch this data from somewhere
  return {
    id: parseInt(ctx?.params?.id || "0"),
    name: {
      first: "Joe",
      middle: "",
      last: "Schmoe",
      title: "Mx",
      maiden: "Dirt",
    },
    legal: {
      first: "Joseph",
      middle: "Montgomery",
      last: "Schmoe",
    },
    gender: "x",
    age: 24,
    address: {
      street: "15 Cool Rd",
      unit: "",
      city: "Sarnia",
      province: "Ontario",
      code: "M1B 2CJ",
    },
    contact: {
      email: "joe@shmoe.ca",
    }
  };
});
AddSimpleRoute("/prescription/:id*", "./template/prescription");
AddSimpleRoute("/claim/:id*", "./template/claim");
AddSimpleRoute("/insurance/:id*", "./template/insurance");

// serve static files found under `/static/...`
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
