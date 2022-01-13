const Review = artifacts.require("Review");

contract("Review", (accounts) => {
  let review;
  let name = "不要抬头";
  let attrs = ["导演", "类型", "上映日期"];
  let vals = ["亚当·麦凯", "喜剧 / 科幻", "2021-12-10(美国)"];
  it("createItem", () => Review.deployed()
    .then(instance =>
      instance.createItem.call(name, attrs, vals, { from: accounts[0] })
    ).then(itemID => assert.equal(itemID, 0, "itemID is not 0"))
  );
});