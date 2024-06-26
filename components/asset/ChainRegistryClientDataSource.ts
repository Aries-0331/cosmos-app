import { DataSource } from "./DataSource";
import { AssetList } from "@chain-registry/types";
import { ChainRegistryClient } from "@chain-registry/client";

export class ChainRegistryClientDataSource implements DataSource {
  async getAssetList(name: string): Promise<AssetList> {
    const client = new ChainRegistryClient({
      chainNames: ["osmosis", "juno", "stargaze"],
    });
    try {
      await client.fetchUrls();
      const assetList = client.getChainAssetList(name);
      const convertedAssetList = assetList.assets.map((asset) => {
        return {
          description: asset.description,
          type_asset: asset.type_asset,
          address: asset.address,
          denom_units: asset.denom_units,
          base: asset.base,
          name: asset.name,
          display: asset.display,
          symbol: asset.symbol,
          logo_URIs: asset.logo_URIs,
          images: asset.images,
        };
      });
      return {
        chain_name: name,
        assets: convertedAssetList,
      };
    } catch (error) {
      console.error(error);
    }
    return { assets: [], chain_name: "" };
  }
}
