import { useEffect, useState } from "react";
import Web3 from "web3";

const web3 = new Web3(new Web3.providers.WebsocketProvider("wss://mainnet.infura.io/ws/v3/6f44f377eea84bd083a439f89c643178"));

export const ether = 1_000_000_000_000_000_000;

export function eth(num: number): number{
	return parseFloat((num / ether).toFixed(5));
}

export function useEthBalance(address: string): number{
	const [balance, setBalance] = useState(null);

	async function fetchBalance(){
		const value = await web3.eth.getBalance(address);
		setBalance(eth(parseInt(value)));
	}

	useEffect( () => {
		fetchBalance();
	}, []);

	return balance;
}