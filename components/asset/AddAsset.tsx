import React from "react";
import {
  Box,
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
              <Combobox.Item key={asset.symbol}>{asset.symbol}</Combobox.Item>
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
