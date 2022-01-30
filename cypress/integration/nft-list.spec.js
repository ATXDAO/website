import { getOwnerList } from "../../src/util/nft-list";

describe('nft-list.js', () => {
  it('should get the list', async () => {
    console.log(await getOwnerList());
  });
});
