export interface NewsPost{
	kind: string;
	domain: string;
	votes: {
		negative: number;
		positive: number;
		important: number;
		liked: number;
		disliked: number;
		lol: number;
		toxic: number;
		saved: number;
		comments: number;
	}
	source: {
		title: string;
		region: string;
		domain: string;
		path: null | string;
	}
	title: string;
	published_at: string;
	slug: string;
	currencies: {
		code: string;
		title: string;
		slug: string;
		url: string;
	}[]
	id: number;
	url: string;
	created_at: string;
}

export interface NewsResponse{
	count: number;
	next: null | string;
	previous: null | string;
	results: NewsPost[]
}