import { useState, useEffect } from "react";
import {
  AssetList,
  AssetListItemProps,
  Box,
  Stack,
  Text,
  Button,
  BasicModal,
  Combobox,
  AssetWithdrawTokens,
} from "@interchain-ui/react";
import {
  Asset as AssetType,
  AssetList as AssetListType,
} from "@chain-registry/types";
import { useStore } from "./store";

export function Asset() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDepositModalOpen, setDepositModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetListItemProps>();
  const [selectedAssetForDeposit, setSelectedAssetForDeposit] =
    useState<AssetType>();

  const {
    dataSource,
    assetList,
    setAssetList,
    selectedAssetList,
    addAssetList,
    selectedChain,
  } = useStore();

  useEffect(() => {
    const fetchAssetList = async () => {
      try {
        const assetList = await dataSource.getAssetList(selectedChain);
        if (assetList) {
          setAssetList(assetList);
          addAssetList({
            assets: assetList.assets.slice(0, 5),
            chain_name: selectedChain,
          });
        }
      } catch (error) {
        console.error("Failed to fetch asset list", error);
      }
    };

    fetchAssetList();
  }, [addAssetList, selectedChain, setAssetList, dataSource]);

  const handleSubmit = () => {
    if (selectedAsset) {
      const asset = assetList.assets.find(
        (asset) => asset.symbol === selectedAsset.symbol
      );
      if (asset) {
        addAssetList({
          assets: [...selectedAssetList.assets, asset],
          chain_name: selectedChain,
        });
      }
    }
    setModalOpen(false);
  };

  function convertAssetList(assetList: AssetListType): AssetListItemProps[] {
    return assetList.assets.map((asset) => ({
      imgSrc: asset.logo_URIs?.png || asset.logo_URIs?.svg || "",
      symbol: asset.symbol,
      name: asset.name,
      tokenAmount: "10",
      tokenAmountPrice: "9.9",
      chainName: assetList.chain_name,
      onDeposit: () => {
        setSelectedAssetForDeposit(
          assetList.assets.find((a) => a.symbol === asset.symbol)
        );

        setDepositModalOpen(true);
      },
    }));
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      gap="$10"
    >
      <Box>
        <AssetList
          list={convertAssetList(selectedAssetList)}
          needChainSpace={true}
          isOtherChains={true}
          titles={["Asset", "Balance"]}
        />
      </Box>
      <Box display="flex" justifyContent="end" paddingBottom="$10">
        <Button
          size="md"
          onClick={() => setModalOpen(true)}
          onHoverEnd={function Va() {}}
          onHoverStart={function Va() {}}
        >
          Add Asset
        </Button>
      </Box>
      <Box>
        <BasicModal
          isOpen={isModalOpen}
          title="Select Asset"
          onClose={() => setModalOpen(false)}
        >
          <Box paddingBottom="$10">
            <Combobox
              label="Select Assets"
              openOnFocus
              styleProps={{
                width: "350px",
              }}
              onInputChange={(value: string) => {
                const asset = convertAssetList(assetList).find(
                  (asset) => asset.symbol === value
                );
                if (asset) {
                  setSelectedAsset(asset);
                  console.log(selectedAsset);
                } else {
                  console.log("Asset not found");
                }
              }}
            >
              {convertAssetList(assetList).map((asset, index) => (
                <Combobox.Item key={index}>{asset.symbol}</Combobox.Item>
              ))}
            </Combobox>
          </Box>
          <Box display="flex" justifyContent="end">
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        </BasicModal>
      </Box>
      <Box display="flex" flexDirection="row">
        <BasicModal
          isOpen={isDepositModalOpen}
          title={`Deposit ${selectedAssetForDeposit?.name}`}
          onClose={() => setDepositModalOpen(false)}
        >
          <Stack direction="vertical">
            <AssetWithdrawTokens
              amount=""
              available={10}
              fromAddress={
                selectedAssetForDeposit?.address || "umee1lqsq...pv4axdaxk"
              }
              fromImgSrc={
                selectedAssetForDeposit?.logo_URIs?.png ||
                selectedAssetForDeposit?.logo_URIs?.svg ||
                ""
              }
              fromName={selectedAssetForDeposit?.name || ""}
              fromSymbol={selectedAssetForDeposit?.symbol || ""}
              onAddressChange={function Va() {}}
              onAddressConfirm={function Va() {}}
              onCancel={function Va() {}}
              onChange={function Va() {}}
              onTransfer={function Va() {}}
              priceDisplayAmount={0.5}
              timeEstimateLabel="20 seconds"
              toAddress="osmo1lqsq...pv48trj5k"
              toImgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
              toName="Osmosis"
            />
          </Stack>
        </BasicModal>
      </Box>
    </Box>
  );
}
