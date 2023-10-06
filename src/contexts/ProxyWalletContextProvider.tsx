import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import setting from "../setting.json";
import axios from "axios";

type UserProviders = {
  collections: any[];
};
export const UserContext = createContext<UserProviders>({
  collections: [],
});

export default function ProxyWalletContext({
  children,
}: {
  children: ReactNode;
}) {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { connected, publicKey } = wallet;
  const [collections, setCollections] = useReducer(
    (state: any[], values: any[]) => {
      return [...values];
    },
    []
  );

  const init = async () => {
    const metaplex = Metaplex.make(connection).use(
      walletAdapterIdentity(wallet)
    );
    const ownedNfts =
      (await metaplex.nfts().findAllByOwner({
        owner: metaplex.identity().publicKey,
      })) || [];
    let promiseall: Promise<any>[] = [];
    let collectionMintPublicKeys = setting.nfts.map(
      (item) => item.collectionMintPublicKey
    );
    ownedNfts
      .filter((item) => {
        return collectionMintPublicKeys.includes(
          item.collection?.address.toBase58() || ""
        );
      })
      .forEach((item) => {
        promiseall.push(
          new Promise(async (resolve, reject) => {
            const { data } = await axios.get(item.uri);
            resolve({
              aid: item.address.toBase58(),
              collection: item.collection?.address.toBase58(),
              nickname: data.name,
              skill: [],
              attr: data.attributes,
              img: data.image,
            });
          })
        );
      });
    await Promise.all(promiseall).then((lists) => {
      setCollections(lists);
    });
  };
  useEffect(() => {
    if (connection && connected && publicKey) {
      init();
      setInterval(init, 10 * 1000);
    }
  }, [connected, connection]);
  return (
    <UserContext.Provider value={{ collections }}>
      {children}
    </UserContext.Provider>
  );
}
