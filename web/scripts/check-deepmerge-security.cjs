const assert = require("node:assert/strict");
const { test } = require("node:test");

for (const entry of ["deepmerge"]) {
  const { deepmerge: merge } = require(entry);

  test(`${entry}: prevents prototype poisoning from both merge inputs`, () => {
    const payload = JSON.parse(
      '{"__proto__":{"polluted":true},"constructor":{"prototype":{"polluted":true}},"prototype":{"polluted":true}}'
    );
    for (const result of [
      merge(payload, {}),
      merge(Object.create(null), payload),
      merge({}, { nested: payload }).nested
    ]) {
      assert.equal(Object.getPrototypeOf(result), Object.prototype);
      assert.equal(result.polluted, undefined);
    }
    assert.equal({}.polluted, undefined);
  });

  test(`${entry}: preserves normal nested configuration and array merging`, () => {
    const target = { nested: { first: 1 }, extensions: [".js"] };
    const source = { nested: { second: 2 }, extensions: [".vue"] };
    assert.deepEqual(merge(target, source), {
      nested: { first: 1, second: 2 },
      extensions: [".js", ".vue"]
    });
    assert.deepEqual(target, { nested: { first: 1 }, extensions: [".js"] });
  });
}
