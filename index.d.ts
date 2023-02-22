export default function remarkGfm(this: import("unified").Processor<void, import("mdast").Root, void, void>, ...settings: [(Options | undefined)?] | void[]): void | import("unified").Transformer<import("mdast").Root, import("mdast").Root>;
export type Root = import('mdast').Root;
export type Options = import('micromark-extension-gfm').Options & import('mdast-util-gfm').Options;
