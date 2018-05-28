import test from "ava";
import evtAsync from ".";
import EE from "events";
import * as http from "http";

test("promise", async t => {
  t.plan(1);
  const evt = new EE();
  setImmediate(() => evt.emit("msg"));
  await evtAsync.promise(evt, "msg");
  t.pass();
});

test("for await of http server and get", async t => {
  t.plan(4);
  const PATH = "/the-path";
  const server = http.createServer().listen(3000);
  setImmediate(async () => {
    const request = http.get("http://localhost:3000" + PATH);
    const [res] = await evtAsync.promise(request, "response");
    t.truthy(res instanceof http.IncomingMessage);
    let result = "";
    for await (const [chunk] of evtAsync.asyncIterator(res, "data", {
      doneEvent: "end",
      doneTest: () => true
    })) {
      result += chunk;
    }
    t.is(result, PATH);
  });
  for await (const [req, res] of evtAsync.asyncIterator(server, "request", {
    count: 1
  })) {
    t.is(req.url, PATH);
    res.end(req.url);
  }
  t.pass();
});
