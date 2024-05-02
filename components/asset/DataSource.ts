// import { assets, chains } from "chain-registry";
// import { Chain, AssetList } from "@chain-registry/types";

// export interface DataSource {
//   getAssetList: (name: string) => Promise<AssetList[]>;
//   getChain: (name: string) => Promise<Chain | undefined>;
// }

// export class ChainRegistryDataSource implements DataSource {
//   async getAssetList(name: string): Promise<AssetList[]> {
//     const assetList = assets.find(({ chain_name }) => chain_name === name);
//     console.log(assetList);
//     return assetList ? [assetList] : [];
//   }

//   async getChain(name: string): Promise<Chain | undefined> {
//     const chain = chains.find((chain) => chain.chain_name === name);
//     console.log(chain);
//     return chain;
//   }
// }
