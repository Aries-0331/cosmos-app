import { Divider } from "@interchain-ui/react";
import { Layout, Wallet, Asset } from "@/components";

export default function Home() {
  return (
    <Layout>
      <Wallet />
      <Divider mb="$16" />
      <Asset />
      <Divider mb="$16" />
    </Layout>
  );
}
