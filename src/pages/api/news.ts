import { NextApiRequest, NextApiResponse } from "next"
import fetch from "node-fetch";

const token = process.env.NEWS_TOKEN;

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void>{
	const coin = req.query.coin;
	const response = await fetch(
		`https://cryptopanic.com/api/v1/posts/?auth_token=${token}&currencies=${coin}&public=true`
	);
	const result = await response.json();

	res.json(result);
}