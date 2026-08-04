declare module "flutterwave-node-v3" {
	interface FlutterwaveConfig {
		publicKey: string;
		secretKey: string;
	}

	interface MobileMoneyPayload {
		tx_ref: string;
		amount: number;
		email: string;
		phone_number: string;
		currency: string;
		fullname: string;
		redirect_url: string;
		network: string;
	}

	interface MobileMoneyResponse {
		status: string;
		message: string;
		meta: {
			authorization: {
				redirect: string;
			};
		};
	}

	interface TransactionVerifyPayload {
		id: string | number;
	}

	interface TransactionVerifyResponse {
		data: {
			status: string;
		};
	}

	class Flutterwave {
		constructor(publicKey?: string, secretKey?: string);
		MobileMoney: {
			uganda: (payload: MobileMoneyPayload) => Promise<MobileMoneyResponse>;
		};
		Transaction: {
			verify: (
				payload: TransactionVerifyPayload,
			) => Promise<TransactionVerifyResponse>;
		};
	}

	export default Flutterwave;
}
