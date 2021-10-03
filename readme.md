# remark-gfm

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**remark**][remark] plugin to support [GitHub Flavored Markdown][gfm].

## Important!

This plugin is made for the new parser in remark
([`micromark`](https://github.com/micromark/micromark),
see [`remarkjs/remark#536`](https://github.com/remarkjs/remark/pull/536)).
While you’re still on remark 12, use the `gfm` option for remark.
Use this plugin for remark 13+.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c):
Node 12+ is needed to use it and it must be `import`ed instead of `require`d.

[npm][]:

```sh
npm install remark-gfm
```

## Use

Say we have the following file, `example.md`:

```markdown
# GFM

## Autolink literals

www.example.com, https://example.com, and contact@example.com.

## Footnote

A note[^1]

[^1]: Big note.

## Strikethrough

~one~ or ~~two~~ tildes.

## Table

| a | b  |  c |  d  |
| - | :- | -: | :-: |

## Tasklist

* [ ] to do
* [x] done
```

And our module, `example.js`, looks as follows:

```js
import {readSync} from 'to-vfile'
import {reporter} from 'vfile-reporter'
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import remarkStringify from 'rehype-stringify'

unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(remarkStringify)
  .process(readSync('example.md'))
  .then((file) => {
    console.error(reporter(file))
    console.log(String(file))
  })
```

Now, running `node example` yields:

```txt
example.md: no issues found
```

```html
<h1>GFM</h1>
<h2>Autolink literals</h2>
<p><a href="http://www.example.com">www.example.com</a>, <a href="https://example.com">https://example.com</a>, and <a href="mailto:contact@example.com">contact@example.com</a>.</p>
<h2>Footnote</h2>
<p>A note<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref aria-describedby="footnote-label">1</a></sup></p>
<h2>Strikethrough</h2>
<p><del>one</del> or <del>two</del> tildes.</p>
<h2>Table</h2>
<table>
<thead>
<tr>
<th>a</th>
<th align="left">b</th>
<th align="right">c</th>
<th align="center">d</th>
</tr>
</thead>
</table>
<h2>Tasklist</h2>
<ul class="contains-task-list">
<li class="task-list-item"><input type="checkbox" disabled> to do</li>
<li class="task-list-item"><input type="checkbox" checked disabled> done</li>
</ul>
<section data-footnotes class="footnotes"><h2 id="footnote-label" class="sr-only">Footnotes</h2>
<ol>
<li id="user-content-fn-1">
<p>Big note. <a href="#user-content-fnref-1" data-footnote-backref class="data-footnote-backref" aria-label="Back to content">↩</a></p>
</li>
</ol>
</section>
```

## API

This package exports no identifiers.
The default export is `remarkGfm`.

### `unified().use(remarkGfm[, options])`

Configures remark so that it can parse and serialize GFM (autolink literals,
strikethrough, tables, tasklists).

##### `options`

###### `options.singleTilde`

Whether to support strikethrough with a single tilde (`boolean`, default:
`true`).
Single tildes work on github.com, but are technically prohibited by the GFM
spec.
Passed as `singleTilde` to
[`micromark-extension-gfm-strikethrough`][strikethrough].

###### `options.tableCellPadding`

Create tables with a space between cell delimiters (`|`) and content (`boolean`,
default: `true`).
Passed to [`mdast-util-gfm-table`][table].

###### `options.tablePipeAlign`

Align the delimiters (`|`) between table cells so that they all align nicely and
form a grid (`boolean`, default: `true`).
Passed to [`mdast-util-gfm-table`][table].

###### `options.stringLength`

Function passed to [`markdown-table`][markdown-table] to detect the length of a
table cell (`Function`, default: [`s => s.length`][string-length]).
Used to align table cells.
Passed to [`mdast-util-gfm-table`][table].

## Security

Use of `remark-gfm` does not involve [**rehype**][rehype] ([**hast**][hast]) or
user content so there are no openings for [cross-site scripting (XSS)][xss]
attacks.

## Related

*   [`remark-github`](https://github.com/remarkjs/remark-github)
    — Autolink references like in GitHub issues, PRs, and comments
*   [`remark-frontmatter`](https://github.com/remarkjs/remark-frontmatter)
    — Frontmatter (YAML, TOML, and more)
*   [`remark-math`](https://github.com/remarkjs/remark-math)
    — Math

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-gfm/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-gfm/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-gfm.svg

[coverage]: https://codecov.io/github/remarkjs/remark-gfm

[downloads-badge]: https://img.shields.io/npm/dm/remark-gfm.svg

[downloads]: https://www.npmjs.com/package/remark-gfm

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-gfm.svg

[size]: https://bundlephobia.com/result?p=remark-gfm

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[remark]: https://github.com/remarkjs/remark

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[rehype]: https://github.com/rehypejs/rehype

[hast]: https://github.com/syntax-tree/hast

[gfm]: https://github.github.com/gfm/

[table]: https://github.com/syntax-tree/mdast-util-gfm-table#api

[markdown-table]: https://github.com/wooorm/markdown-table

[string-length]: https://github.com/wooorm/markdown-table#optionsstringlength

[strikethrough]: https://github.com/micromark/micromark-extension-gfm-strikethrough#api
