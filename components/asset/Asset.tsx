import { useState, useEffect } from "react";
import {
  AssetList,
  AssetListItemProps,
  Box,
  Button,
  BasicModal,
  Combobox,
} from "@interchain-ui/react";
import { assets } from "chain-registry";
import { AssetList as AssetListType } from "@chain-registry/types";
import { useStore } from "./store";

function convertAssetList(assetList: AssetListType): AssetListItemProps[] {
  return assetList.assets.map((asset) => ({
    imgSrc: asset.logo_URIs?.png || asset.logo_URIs?.svg || "",
    symbol: asset.symbol,
    name: asset.name,
    tokenAmount: "",
    tokenAmountPrice: "",
    chainName: assetList.chain_name,
  }));
}

export function Asset() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<AssetListItemProps>();
  const {
    assetList,
    setAssetList,
    selectedAssetList,
    addAssetList,
    selectedChain,
  } = useStore();

  useEffect(() => {
    const assetList = assets.find(
      ({ chain_name }) => chain_name === selectedChain
    );
    console.log(assetList);
    if (assetList) {
      setAssetList(assetList);
      addAssetList({
        assets: assetList.assets.slice(0, 5),
        chain_name: selectedChain,
      });
    }
  }, [addAssetList, selectedChain, setAssetList]);

  const handleSubmit = () => {
    // convert asset's data type from AssetListItemProps to Asset, then add selected asset to the list
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-around"
      gap="$10"
    >
      <Box>
        <AssetList
          // list={[
          //   {
          //     chainName: "Juno",
          //     imgSrc:
          //       "https://raw.githubusercontent.com/cosmos/chain-registry/master/terra/images/ust.png",
          //     isOtherChains: false,
          //     name: "Terra Classic",
          //     symbol: "USTC",
          //     tokenAmount: "89.66",
          //     tokenAmountPrice: "10",
          //   },
          //   {
          //     chainName: "Juno",
          //     imgSrc:
          //       "https://raw.githubusercontent.com/cosmos/chain-registry/master/teritori/images/utori.png",
          //     isOtherChains: false,
          //     name: "Teritori",
          //     symbol: "TORI",
          //     tokenAmount: "102.61",
          //     tokenAmountPrice: "101.02",
          //   },
          // ]}
          list={convertAssetList(selectedAssetList)}
          needChainSpace={false}
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
              setSelectedAsset(asset);
              console.log(selectedAsset);
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
  );
}
