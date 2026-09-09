import assert from "node:assert/strict";
import test from "node:test";
import { serviceLinks } from "../lib/services/catalog";
import { getServicePage, isServiceSlug, servicePages } from "../lib/services/pages";
import {
  getServiceMetadata,
  getServiceSitemapEntries,
  getServiceStructuredData,
  getServicesOverviewStructuredData,
  serializeJsonLd,
  servicesOverviewMetadata,
} from "../lib/services/seo";

test("each care package has exactly one distinct, routable detail page", () => {
  assert.deepEqual(servicePages.map(({ packageId }) => packageId).sort(), ["cloud", "individual", "web", "workplace"]);
  assert.equal(new Set(servicePages.map(({ slug }) => slug)).size, 4);
  assert.deepEqual(servicePages.map(({ slug, href, packageId, name }) => ({ slug, href, packageId, name })), serviceLinks);

  for (const service of servicePages) {
    assert.equal(service.href, `/leistungen/${service.slug}`);
    assert.equal(getServicePage(service.slug), service);
    assert.equal(isServiceSlug(service.slug), true);
  }

  for (const slug of ["", "unknown", "Web-Care", "web-care/extra", "../", "__proto__"]) {
    assert.equal(getServicePage(slug), undefined);
    assert.equal(isServiceSlug(slug), false);
  }
});

test("detail and overview metadata identify their own URL and German content", () => {
  const allMetadata = [servicesOverviewMetadata, ...servicePages.map(getServiceMetadata)];
  const urls = ["https://pllana.io/leistungen", ...serviceLinks.map(({ href }) => `https://pllana.io${href}`)];
  assert.equal(new Set(allMetadata.map(({ title }) => JSON.stringify(title))).size, 5);
  assert.equal(new Set(allMetadata.map(({ description }) => description)).size, 5);

  allMetadata.forEach((metadata, index) => {
    assert.equal(metadata.alternates?.canonical, urls[index]);
    assert.deepEqual(metadata.alternates?.languages, {});
    assert.equal(metadata.openGraph?.url, urls[index]);
    assert.equal(metadata.openGraph?.description, metadata.description);
    assert.equal(metadata.twitter?.description, metadata.description);
    assert.notEqual(metadata.openGraph?.url, "https://pllana.io");
    assert.equal(metadata.openGraph?.title, metadata.twitter?.title);
  });
});

test("all languages have usable landing-page content and distinct service headings", () => {
  for (const locale of ["de", "en", "sq"] as const) {
    assert.equal(new Set(servicePages.map(({ copy }) => copy[locale].heading)).size, 4);
    for (const service of servicePages) {
      const copy = service.copy[locale];
      assert.ok(copy.heading.trim());
      assert.ok(copy.intro.trim());
      assert.ok(copy.seoTitle.trim());
      assert.ok(copy.seoDescription.trim());
      assert.ok(copy.deliverables.length);
      assert.ok(copy.process.length);
      assert.ok(copy.faqs.length);
      assert.ok(copy.faqs.every(({ question, answer }) => question.trim() && answer.trim()));
    }
  }
});

test("service schema connects the visible content, provider, page and breadcrumb", () => {
  for (const service of servicePages) {
    const url = `https://pllana.io${service.href}`;
    const [serviceNode, pageNode, breadcrumbNode] = getServiceStructuredData(service)["@graph"];
    assert.equal(serviceNode["@type"], "Service");
    assert.equal(serviceNode.description, service.copy.de.intro);
    assert.equal(serviceNode.provider["@id"], "https://pllana.io/#organization");
    assert.equal(serviceNode.url, url);
    assert.equal(serviceNode.mainEntityOfPage["@id"], pageNode["@id"]);
    assert.equal(pageNode.mainEntity["@id"], serviceNode["@id"]);
    assert.equal(pageNode.inLanguage, "de");
    assert.equal(pageNode.breadcrumb["@id"], breadcrumbNode["@id"]);
    assert.deepEqual(breadcrumbNode.itemListElement.map(({ item }) => item), ["https://pllana.io", "https://pllana.io/leistungen", url]);
    assert.equal("offers" in serviceNode, false);
    assert.equal("aggregateRating" in serviceNode, false);
  }
});

test("overview schema and sitemap expose every canonical service page once", () => {
  const [pageNode, listNode] = getServicesOverviewStructuredData()["@graph"];
  assert.equal(pageNode.mainEntity["@id"], listNode["@id"]);
  assert.equal(listNode.numberOfItems, 4);
  const detailUrls = serviceLinks.map(({ href }) => `https://pllana.io${href}`);
  assert.deepEqual(listNode.itemListElement.map(({ item }) => item.url), detailUrls);
  assert.deepEqual(listNode.itemListElement.map(({ item }) => item["@id"]), servicePages.map((service) => getServiceStructuredData(service)["@graph"][0]["@id"]));

  const sitemapEntries = getServiceSitemapEntries();
  assert.deepEqual(sitemapEntries.map(({ url }) => url), ["https://pllana.io/leistungen", ...detailUrls]);
  assert.equal(new Set(sitemapEntries.map(({ url }) => url)).size, 5);
  assert.ok(sitemapEntries.every(({ lastModified, alternates }) => lastModified === undefined && alternates === undefined));
});

test("structured data cannot terminate its embedding script element", () => {
  const content = { description: "</script><script>alert('example')</script>" };
  const serialized = serializeJsonLd(content);
  assert.equal(serialized.includes("<"), false);
  assert.deepEqual(JSON.parse(serialized), content);
});
