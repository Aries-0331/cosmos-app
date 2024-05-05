import { create } from "zustand";
import { AssetList } from "@chain-registry/types";
import { AssetListItemProps } from "@interchain-ui/react";
import { CHAIN_NAME, DATA_SOURCE } from "@/config";
import { DataSource } from "./DataSource";
import { ChainRegistryDataSource } from "./ChainRegistryDataSource";
import { ChainRegistryClientDataSource } from "./ChainRegistryClientDataSource";

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
