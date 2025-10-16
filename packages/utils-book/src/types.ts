export type BaseBookEvent = { index: number; type: string };
type BookEventUnionTypeToBookEventHandlerUnionType<
	TBookEvent,
	THandlerContext extends object,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
> = TBookEvent extends any
	? (bookEvent: TBookEvent, context: THandlerContext) => Promise<void>
	: never;
export type BookEventHandler<
	TBookEvent extends BaseBookEvent,
	THandlerContext extends object,
> = BookEventUnionTypeToBookEventHandlerUnionType<TBookEvent, THandlerContext>;
export type BookEventHandlerMap<
	TBookEvent extends BaseBookEvent,
	THandlerContext extends object,
> = Record<string, BookEventHandler<TBookEvent, THandlerContext>>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetBookEventFromMap<T extends BookEventHandlerMap<any, any>> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends BookEventHandlerMap<infer U, any> ? U : never;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type GetBookEventContextFromMap<T extends BookEventHandlerMap<any, any>> =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends BookEventHandlerMap<any, infer U> ? U : never;
