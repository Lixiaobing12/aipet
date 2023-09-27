import { PublicKey } from "@solana/web3.js";
import { Metaplex, sol, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

//获取铸造池信息
export const getCandyMachine = async (
  metaplex: Metaplex,
  candyMachineAddress: PublicKey
) => {
  const candyMachine = await metaplex.candyMachines().findByAddress({
    address: new PublicKey(candyMachineAddress),
  });
  const candyGuard = candyMachine.candyGuard;
  return {
    candyMachine: candyMachine,
    candyGuard: candyGuard,
  };
};

export const Mint = async (metaplex: Metaplex, source: any) => {
  try {
    const candyMachine = await metaplex.candyMachines().findByAddress({
      address: new PublicKey(source.candyMachinePublicKey),
    });
    // candyMachine.
    const tx = await metaplex.candyMachines().mint({
      candyMachine,
      mintAuthority: metaplex.identity(),
      collectionUpdateAuthority: new PublicKey(
        source.collectionUpdateAuthorityPublicKey
      ),
      guards: {
        solPayment: {
          destination: new PublicKey(candyMachine.authorityAddress),
        },
      },
    });
    return true;
  } catch (err) {
    console.log("err: ", err);
  }
};
