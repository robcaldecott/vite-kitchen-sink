import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from ".";

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("get", async () => {
  server.use(
    rest.get("/api/test", (req, res, ctx) =>
      res(ctx.json({ data: "hello, world!" }))
    )
  );
  expect(await http.get("/api/test")).toEqual({ data: "hello, world!" });
});

test("delete", async () => {
  server.use(
    rest.delete("/api/test", (req, res, ctx) =>
      res(ctx.json({ data: "hello, world!" }))
    )
  );
  expect(await http.delete("/api/test")).toEqual({ data: "hello, world!" });
});

test("post", (done) => {
  const body = { name: "Jane Doe", email: "jane@company.com" };
  const mock = vi.fn((req, res, ctx) => {
    try {
      expect(req.headers.get("Content-Type")).toEqual("application/json");
      expect(req.body).toEqual(body);
      done();
    } catch (e) {
      done(e);
    }
    return res(ctx.json({}));
  });
  server.use(rest.post("/api/test", mock));
  http.post("/api/test", { json: body });
});

test("searchParams", (done) => {
  const mock = vi.fn((req, res, ctx) => {
    try {
      expect(req.url.searchParams.get("param1")).toEqual("hello");
      expect(req.url.searchParams.get("param2")).toEqual("true");
      done();
    } catch (e) {
      done(e);
    }
    return res(ctx.json({}));
  });
  server.use(rest.get("/api/test", mock));
  http.get("/api/test", { searchParams: { param1: "hello", param2: true } });
});

test("headers", (done) => {
  const mock = vi.fn((req, res, ctx) => {
    try {
      expect(req.headers.get("Authorization")).toEqual("Bearer TOKEN");
      done();
    } catch (e) {
      done(e);
    }
    return res(ctx.json({}));
  });
  server.use(rest.get("/api/test", mock));
  http.get("/api/test", { headers: { Authorization: "Bearer TOKEN" } });
});
