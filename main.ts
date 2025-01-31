import { Application, Router } from "jsr:@oak/oak@^17.1.3"; // Oak Router: handles URL requests
import { Eta } from "jsr:@eta-dev/eta@^3.5.0";              // Eta: HTML template engine (i.e. <%= data %>, <% javascript code %>) 

const router = new Router();
const eta = new Eta({ views: import.meta.dirname });
const port = 8080;

function AddRoute(routePath: string, etaTemplateFile: string, func?: (ctx?: object) => object) {
  // Handle GET requests
  router.get(routePath, (ctx) => {
    const data =  func ? func(ctx) : {};
    ctx.response.body = eta.render(etaTemplateFile, {...ctx, data});
  });
}

// Instead of writing the code above multiple times
AddRoute("/", "./layout/root"); // NOTE: The page is setup to do a JS redirect
AddRoute("/patient/:id*", "./layout/patient", () => {
  return {
    name: {
      first: "Joe",
      middle: "",
      last: "Schmoe",
      maiden: "Dirt",
    },
    legal: {
      first: "Joseph",
      middle: "Montgomery",
      last: "Schmoe"
    },
    title: "Mx",
    gender: "x",
    age: 24,
    address: {
      street: "15 Cool Rd",
      unit: "",
      city: "Sarnia",
      province: "Ontario",
      code: "M1B 2CJ",
    }
  };
});
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
