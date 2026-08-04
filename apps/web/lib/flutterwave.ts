import Flutterwave from "flutterwave-node-v3";

let _flw: Flutterwave | null = null;

function getFlw(): Flutterwave {
	if (!_flw) {
		_flw = new Flutterwave(
			process.env.FLW_PUBLIC_KEY,
			process.env.FLW_SECRET_KEY,
		);
	}
	return _flw;
}

export const flw = new Proxy({} as Flutterwave, {
	get(_, prop) {
		return (getFlw() as unknown as Record<string, unknown>)[prop as string];
	},
});
