"use client";
import React, { useEffect, useState } from "react";
import { useContractRead, useNetwork } from "wagmi";
import { nftABI } from "@/assets/nftABI";
const NFT_CONTRACT = process.env.NEXT_PUBLIC_NFT_CONTRACT as `0x${string}`;

type Props = {};

export default function CollectionInfo({}: Props) {
  const [totalSupply, setTotalSupply] = useState<number | undefined>(undefined);

  // get chain
  const { chain } = useNetwork();

  // define token contract config
  const nftContract = {
    address: NFT_CONTRACT,
    abi: nftABI,
    chainId: chain?.id,
  };

  // read current limits
  const { data, isSuccess, isError, isLoading } = useContractRead({
    ...nftContract,
    functionName: "totalSupply",
    watch: true,
    cacheTime: 1000,
  });

  useEffect(() => {
    if (data != undefined) {
      setTotalSupply(Number(data));
    }
  }, [data]);

  function getTotalSupplyString() {
    let text: string = "---";
    if (isLoading) {
      text = "Loading...";
    } else if (isSuccess && totalSupply != undefined) {
      text = `${totalSupply.toLocaleString()}`;
    } else {
      text = "---";
    }
    return text;
  }

  function getNftsRemainingString() {
    let text: string = "---";
    if (isLoading) {
      text = "Loading...";
    } else if (isSuccess && totalSupply != undefined) {
      text = `${(1000 - totalSupply).toLocaleString()}`;
    } else {
      text = "---";
    }
    return text;
  }

  return (
    <div className="mx-auto w-full pb-8">
      <div className="mx-auto max-w-sm rounded-md bg-black p-8  shadow-inner-sym md:max-w-none">
        <h2 className="mb-4 border-b-2 border-accent pb-2 text-xl">
          VENUS COLLECTION
        </h2>
        <div className="pb-4 text-sm text-highlight">
          <p>Contract:</p>

          <a
            href={`${process.env.NEXT_PUBLIC_NETWORK_SCAN}/address/${NFT_CONTRACT}#code`}
          >
            <div className="mt-1 overflow-hidden text-ellipsis text-xs text-opacity-60 hover:text-hover">
              {NFT_CONTRACT}
            </div>
          </a>
        </div>
        <div className="pb-4 text-xs text-primary">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="text-sm">
                <th>TRAITS</th>
                <th>RARITY</th>
                <th>PRIZE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BLACK</td>
                <td>75 %</td>
              </tr>
              <tr>
                <td>BLUE</td>
                <td>15 %</td>
              </tr>
              <tr>
                <td>PURPLE</td>
                <td>7.5 %</td>
                <td>{`20${String.fromCharCode(8239)}B TASTE`}</td>
              </tr>
              <tr>
                <td>PINK</td>
                <td>2 %</td>
                <td>{`100${String.fromCharCode(8239)}B TASTE`}</td>
              </tr>
              <tr>
                <td>RED</td>
                <td>0.5 %</td>
                <td>{`300${String.fromCharCode(8239)}B TASTE`}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex justify-between">
          <h3>NFTs minted: </h3>
          <p>{getTotalSupplyString()}</p>
        </div>
        <div className="flex justify-between">
          <h3>NFTs remaining: </h3>
          <p>{getNftsRemainingString()}</p>
        </div>
      </div>
    </div>
  );
}
