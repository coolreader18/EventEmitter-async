import test from "ava";
import evtAsync from ".";
import EE from "events";

test("promise", async t => {
  t.plan(1);
  const evt = new EE();
  const sym = Symbol();
  evtAsync.promise(evt, "msg").then(() => t.pass());
  evt.emit("msg", sym);
});
