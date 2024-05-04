import React from "react";
import {
  Box,
  Stack,
  Button,
  Combobox,
  AssetListItemProps,
} from "@interchain-ui/react";

import { useState } from "react";
import { useStore } from "./store";

function AddAsset({
  list,
  onSetList,
  onClose,
}: {
  list: AssetListItemProps[];
  onSetList: (item: AssetListItemProps) => void;
  onClose: () => void;
}) {
  const [selectedAsset, setSelectedAsset] = useState<AssetListItemProps>();
  const { assetList } = useStore();

  const handleSubmit = () => {
    if (selectedAsset) {
      onSetList(selectedAsset);
    }
    onClose();
  };
  return (
    <Box display="flex" flexDirection="column" gap="$6">
      <Box>
        <Combobox
          label="Select Assets"
          aria-label="Select Assets"
          openOnFocus
          styleProps={{
            width: "350px",
          }}
          onInputChange={(value: string) => {
            setSelectedAsset(assetList.find((asset) => asset.symbol === value));
          }}
        >
          {assetList
            .filter(
              (asset) => !list.some((item) => item.symbol === asset.symbol)
            )
            .map((asset) => (
              <Combobox.Item key={asset.symbol} textValue={asset.symbol}>
                {asset.symbol}
              </Combobox.Item>
            ))}
        </Combobox>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="end">
        <Button onClick={handleSubmit} aria-label="Submit Selected Asset">
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default AddAsset;

{
  /* <BasicModal
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
              {convertAssetList(assetList)
                .filter(
                  (asset) =>
                    !selectedAssetList.assets.some(
                      (selectedAsset) => selectedAsset.symbol === asset.symbol
                    )
                )
                .map((asset) => (
                  <Combobox.Item key={asset.symbol} textValue={asset.symbol}>
                    {asset.symbol}
                  </Combobox.Item>
                ))}
            </Combobox>
          </Box>
          <Box display="flex" justifyContent="end">
            <Button onClick={handleSubmit}>Submit</Button>
          </Box>
        </BasicModal> */
}
