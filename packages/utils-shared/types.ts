// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FirstArgOf<T> = T extends (first: infer FirstArg, ...args: any[]) => any
	? FirstArg
	: never;
