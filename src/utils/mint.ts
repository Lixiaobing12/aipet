import { Keypair, PublicKey } from "@solana/web3.js";
import {
  AuctionHouse,
  Metaplex,
  sol,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
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

// 创建拍卖行
export const FindListing = async (
  metaplex: Metaplex
): Promise<AuctionHouse | undefined> => {
  let hourse;
  try {
    // 获取拍卖行信息
    hourse = await metaplex.auctionHouse().findByCreatorAndMint({
      creator: metaplex.identity().publicKey,
      treasuryMint: new PublicKey(
        "So11111111111111111111111111111111111111112"
      ),
    });
    return hourse;
  } catch (err) {}
  try {
    await metaplex.auctionHouse().create({
      sellerFeeBasisPoints: 500, //手续费
      requiresSignOff: true,
      canChangeSalePrice: true,
    });
    // 获取拍卖行信息
    hourse = await metaplex.auctionHouse().findByCreatorAndMint({
      creator: metaplex.identity().publicKey,
      treasuryMint: new PublicKey(
        "So11111111111111111111111111111111111111112"
      ),
    });
    return hourse;
  } catch (err) {}
};
// 增加listing
export const IntoListing = async (
  metaplex: Metaplex,
  price: number,
  aid: string
) => {
  const res = await FindListing(metaplex);
  if (res) {
    const { listing, sellerTradeState } = await metaplex.auctionHouse().list({
      mintAccount: Keypair.generate().publicKey, // The mint account to create a listing for, used to find the metadata
      tokenAccount: new PublicKey(aid), // The token account address that's associated to the asset a listing created is for
      price: sol(price), // The listing price
      auctionHouse: res,
    });
    return {
      listing,
      sellerTradeState,
    };
  }
};
