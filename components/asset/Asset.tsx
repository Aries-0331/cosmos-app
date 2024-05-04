import { useState, useEffect } from "react";
import {
  AssetList,
  AssetListItemProps,
  Box,
  Button,
  BasicModal,
} from "@interchain-ui/react";
import { Asset as AssetType } from "@chain-registry/types";
import { useStore } from "./store";
import AddAsset from "./AddAsset";
import Deposit from "./Deposit";

export function Asset() {
  const { dataSource, assetData, setAssetData, selectedChain, setAssetList } =
    useStore();
  const [selectedAssetList, setSelectedAssetList] = useState<
    AssetListItemProps[]
  >([]);
  const [selectedAssetForDeposit, setSelectedAssetForDeposit] = useState("");
  const [isAddAssetModalOpen, setIsAddAssetModalOpen] = useState(false);
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);

  useEffect(() => {
    const fetchAssetList = async () => {
      const rawAssetData = await dataSource.getAssetList(selectedChain);
      console.log(rawAssetData);

      setAssetData(rawAssetData);
      const convertedAssetList = rawAssetData.assets.map((asset) => ({
        imgSrc: asset.logo_URIs?.png || asset.logo_URIs?.svg || "",
        symbol: asset.symbol,
        name: asset.name,
        tokenAmount: "10",
        tokenAmountPrice: "9.9",
        chainName: rawAssetData.chain_name,
        onDeposit: () => {
          setSelectedAssetForDeposit(asset.symbol);
          setIsDepositModalOpen(true);
        },
      }));
      setAssetList(convertedAssetList);
      setSelectedAssetList(convertedAssetList.slice(0, 5));
    };

    fetchAssetList();
  }, [dataSource, selectedChain, setAssetData, setAssetList]);

  return (
    <Box display="flex" flexDirection="column" gap="$12" paddingBottom="$16">
      <Box>
        <AssetList
          list={selectedAssetList}
          needChainSpace={true}
          isOtherChains={true}
          titles={["Asset", "Balance"]}
        />
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="end">
        <Button onClick={() => setIsAddAssetModalOpen(true)}>Add Asset</Button>
      </Box>
      <BasicModal
        title="Select Asset"
        isOpen={isAddAssetModalOpen}
        onClose={() => setIsAddAssetModalOpen(false)}
        aria-label="Select Asset Modal"
      >
        <AddAsset
          list={selectedAssetList}
          onSetList={(item: AssetListItemProps) =>
            setSelectedAssetList([...selectedAssetList, item])
          }
          onClose={() => setIsAddAssetModalOpen(false)}
        />
      </BasicModal>
      <BasicModal
        title={`Deposit ${selectedAssetForDeposit}`}
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        aria-label="Deposit Modal"
      >
        <Deposit symbol={selectedAssetForDeposit} />
      </BasicModal>
    </Box>
  );
}
