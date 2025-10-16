export const createInterruptible = () => {
	type ResolveArgs = { interrupted: boolean };
	type Resolve = (args: ResolveArgs) => void;

	let resolveList: Resolve[] = [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const add = (targetToWait: () => Promise<any>) =>
		// eslint-disable-next-line no-async-promise-executor
		new Promise<ResolveArgs>(async (resolve) => {
			resolveList.push(resolve);
			await targetToWait();
			resolve({ interrupted: false });
		});

	const clear = () => (resolveList = []);
	const getLength = () => resolveList.length;
	const interrupt = () => resolveList.forEach((resolve) => resolve({ interrupted: true }));

	return {
		add,
		clear,
		getLength,
		interrupt,
	};
};
