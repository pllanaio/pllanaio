import assert from "node:assert/strict";
import test from "node:test";
import { getOfferSummary, isOfferMessageValid, offerIds, parseOfferSelection } from "../lib/offer-selection";

test("website creation and care keep one-time and recurring charges separate", () => {
  const quote = getOfferSummary(["website-setup", "web-care"]);
  assert.equal(quote.oneTimeTotal, 1500);
  assert.equal(quote.monthlyTotal, 199);
  assert.equal(quote.hasIndividual, false);
  assert.deepEqual(quote.items.map(({ id }) => id), ["web-care", "website-setup"]);
});

test("Microsoft 365 setup and care use the agreed catalogue prices", () => {
  const quote = getOfferSummary(["workplace-care", "workplace-setup"]);
  assert.equal(quote.oneTimeTotal, 1000);
  assert.equal(quote.monthlyTotal, 399);
});

test("combined selections total each priced item only once", () => {
  const quote = getOfferSummary([...offerIds, "web-care", "website-setup"]);
  assert.equal(quote.oneTimeTotal, 2500);
  assert.equal(quote.monthlyTotal, 1097);
  assert.equal(quote.items.length, 6);
  assert.equal(quote.hasIndividual, true);
});

test("Individual Care is unpriced rather than a free service", () => {
  const quote = getOfferSummary(["individual-care"]);
  assert.deepEqual(quote.items, [{ id: "individual-care", name: "Individual Care", once: null, monthly: null, onRequest: true }]);
  assert.equal(quote.hasIndividual, true);
});

test("a missing selection still supports a normal contact request", () => {
  assert.deepEqual(parseOfferSelection(undefined), []);
  assert.deepEqual(parseOfferSelection([]), []);
});

test("selection parsing rejects unknown IDs, malformed types and excessive arrays", () => {
  for (const invalid of [null, "web-care", {}, ["unknown"], ["web-care", 123], [{ id: "web-care" }], ["__proto__"], new Array(33).fill("web-care")]) {
    assert.equal(parseOfferSelection(invalid), null);
  }
});

test("selection parsing deduplicates into catalogue order", () => {
  assert.deepEqual(parseOfferSelection(["website-setup", "web-care", "website-setup"]), ["web-care", "website-setup"]);
});

test("priced selections can be sent alone while normal and individual requests require details", () => {
  assert.equal(isOfferMessageValid("", ["web-care", "website-setup"]), true);
  assert.equal(isOfferMessageValid("   ", ["workplace-setup"]), true);
  assert.equal(isOfferMessageValid("", []), false);
  assert.equal(isOfferMessageValid("", ["individual-care"]), false);
  assert.equal(isOfferMessageValid("", ["web-care", "individual-care"]), false);
  assert.equal(isOfferMessageValid("kurz", ["web-care"]), false);
  assert.equal(isOfferMessageValid("Ein neuer Shopify-Shop.", ["individual-care"]), true);
  assert.equal(isOfferMessageValid("x".repeat(2001), ["web-care"]), false);
});
