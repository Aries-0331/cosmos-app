import { DataSource } from "./DataSource";
import { assets } from "chain-registry";
import { AssetList } from "@chain-registry/types";

export class ChainRegistryDataSource implements DataSource {
  async getAssetList(name: string): Promise<AssetList> {
    const assetList = assets.find(({ chain_name }) => chain_name === name);
    return assetList || { assets: [], chain_name: "" };
  }
}
