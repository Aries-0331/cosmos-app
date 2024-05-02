import { create } from "zustand";
import { AssetList } from "@chain-registry/types";

type Store = {
  assetList: AssetList;
  setAssetList: (assets: AssetList) => void;
  selectedAssetList: AssetList;
  addAssetList: (assets: AssetList) => void;
  selectedChain: string;
};

export const useStore = create<Store>((set) => ({
  assetList: { assets: [], chain_name: "" },
  setAssetList: (assets) => set({ assetList: assets }),
  selectedAssetList: { assets: [], chain_name: "" },
  addAssetList: (assets) => set({ selectedAssetList: assets }),
  selectedChain: "osmosis",
}));
