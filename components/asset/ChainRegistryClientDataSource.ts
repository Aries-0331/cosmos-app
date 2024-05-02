// import { ChainRegistryClient } from "@chain-registry/client";
// import { Chain, AssetList } from "@chain-registry/types";
// import { DataSource } from "./DataSource";

// const client = new ChainRegistryClient({
//   chainNames: ["osmosis", "juno", "stargaze"],
// });

// export class ChainRegistryClientDataSource implements DataSource {
//   async getAssetList(name: string): Promise<AssetList[]> {
//     await client.fetchUrls();
//     const assetList = client.getChainAssetList(name);
//     console.log(assetList);
//     return assetList ? [assetList] : [];
//   }

//   async getChain(name: string): Promise<Chain> {
//     await client.fetchUrls();
//     const chain = client.getChain(name);
//     console.log(chain);
//     return chain;
//   }
// }
