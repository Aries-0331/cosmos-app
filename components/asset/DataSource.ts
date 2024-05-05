import { AssetList } from "@chain-registry/types";

export interface DataSource {
  getAssetList: (name: string) => Promise<AssetList>;
}
