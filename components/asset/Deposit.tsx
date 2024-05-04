import React from "react";
import { Stack, AssetWithdrawTokens } from "@interchain-ui/react";
import { Asset } from "@chain-registry/types";
import { useStore } from "./store";

const Deposit = ({ symbol }: { symbol: string }) => {
  const { assetData } = useStore();
  const asset = assetData.assets.find((asset) => asset.symbol === symbol);
  console.log(asset);
  return (
    <div>
      <Stack direction="vertical">
        <AssetWithdrawTokens
          amount=""
          available={10}
          fromAddress={asset?.address || "umee1lqsq...pv4axdaxk"}
          fromImgSrc={asset?.logo_URIs?.png || asset?.logo_URIs?.svg || ""}
          fromName={asset?.name || ""}
          fromSymbol={asset?.symbol || ""}
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
    </div>
  );
};

export default Deposit;
{
  /* 
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
*/
}
