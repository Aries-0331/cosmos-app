// pages/asset.tsx
import { Assets, Layout } from "@/components";
import { Divider } from "@interchain-ui/react";

export default function AssetPage() {
  return (
    <Layout>
      <Assets />
      <Divider mb="$16" />
    </Layout>
  );
}
