import { create } from "zustand";
import { assets } from "chain-registry";
import { AssetList } from "@chain-registry/types";
import { AssetListItemProps } from "@interchain-ui/react";
import { ChainRegistryClient } from "@chain-registry/client";
import { CHAIN_NAME, DATA_SOURCE } from "@/config";

interface DataSource {
  getAssetList: (name: string) => Promise<AssetList>;
}

class ChainRegistryDataSource implements DataSource {
  async getAssetList(name: string): Promise<AssetList> {
    const assetList = assets.find(({ chain_name }) => chain_name === name);
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

  assetData: AssetList;
  setAssetData: (assets: AssetList) => void;
  selectedChain: string;

  assetList: AssetListItemProps[];
  setAssetList: (assets: AssetListItemProps[]) => void;
};

export const useStore = create<Store>((set) => ({
  dataSource:
    DATA_SOURCE !== "chain-registry"
      ? new ChainRegistryClientDataSource()
      : new ChainRegistryDataSource(),

  assetData: { assets: [], chain_name: "" },
  setAssetData: (assets) => set({ assetData: assets }),
  selectedChain: CHAIN_NAME,

  assetList: [],
  setAssetList: (assets) => set({ assetList: assets }),
}));
