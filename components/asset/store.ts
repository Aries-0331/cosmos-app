import { create } from "zustand";
import { AssetList } from "@chain-registry/types";
import { assets } from "chain-registry";
import { ChainRegistryClient } from "@chain-registry/client";

interface DataSource {
  getAssetList: (name: string) => Promise<AssetList>;
}

class ChainRegistryDataSource implements DataSource {
  async getAssetList(name: string): Promise<AssetList> {
    const assetList = assets.find(({ chain_name }) => chain_name === name);
    console.log(assetList);
    return assetList || { assets: [], chain_name: "" };
  }
}

class ChainRegistryClientDataSource implements DataSource {
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

type Store = {
  dataSource: DataSource;
  assetList: AssetList;
  setAssetList: (assets: AssetList) => void;
  selectedAssetList: AssetList;
  addAssetList: (assets: AssetList) => void;
  selectedChain: string;
};

export const useStore = create<Store>((set) => ({
  dataSource:
    process.env.DATA_SOURCE !== "chain-registry"
      ? new ChainRegistryClientDataSource()
      : new ChainRegistryDataSource(),
  assetList: { assets: [], chain_name: "" },
  setAssetList: (assets) => set({ assetList: assets }),
  selectedAssetList: { assets: [], chain_name: "" },
  addAssetList: (assets) => set({ selectedAssetList: assets }),
  selectedChain: "osmosis",
}));
