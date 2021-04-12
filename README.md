# Transl8r ✍️

**역자** - **译者** - **μεταφράστης** - **ਅਨੁਵਾਦਕ** - **tercüman** - **thông dịch viên** - **مترجم**

A simple utility for managing JSON language files in projects.

- [x] Add/remove keys to multiple languages at once.
- [x] Automatically provide fallback translations (provided by Google Translate).
- [x] Perform basic sanity checking.
- [x] Sort translation files.
- [x] Validate translation files.
- [x] Export TODO language translations as CSV.
- [ ] Import language CSV files.

## Install

- Install the package.
- Create a `.transl8r.yml` configuration in your project root.
- (Optional) Set up your [Google Translate Credentials](https://cloud.google.com/docs/authentication/getting-started) (required for `--add`, `--alt` and `--backfill` commands)

### Example

#### `.transl8r.yml`

```yml
group: example
languages:
  base: en
  other: ['fr', 'de']
namespaces:
  target: base.generated
  other: ['legal', 'base']
path: '/resources/lang/{{lang}}/{{namespace}}.json'
validation:
  mismatchedPlaceholders:
    - error.validation.required
```

## Basic Usage

Get a full list of commands like this:

```bash
yarn transl8r --help
```

## Usage

### `--add` (or `-a`) Add single key

Adds a new generated key to all language files, including the base language.

```bash
yarn transl8r -a button.dismiss.label
  >> value:  Dismiss

  el:     Απολύω
          → Fire
  it:     Respingere
          → Reject
  ...
✨  Done in 3.87s.
```

### `--alt` Lost in translation?

Use alternative copy for the translations, without affecting the base (English) translation.

> For example: "Dismiss" has many meanings in English, such as "to treat as unworthy of serious consideration".
> A phrase like "Close prompt" may translate better.

```
yarn transl8r --alt button.dismissPrompt.label  -l ar it zh-tw
>> translateAs:  Close prompt

ar:     موجه إغلاق
        → Close prompt

it:     Chiudi prompt
        → Close prompt

zh-tw:  關閉提示
        → Turn off the prompt

✨  Done in 1.46s.
```

### `--remove` Remove a single key

When you've added a key you no longer want:

```
yarn transl8r --remove button.legacy.close
```

### `--lint` Lint translation files

Lets you know if there's any issues that may affect the translation files.

```bash
Failed to validate, there were 2 errors:
fr: "error.validation.required" has mismatched markup tags:
 - <0>,</0> vs <none>
fr: "error.validation.required" has mismatched placeholders:
 - {{label}} vs <none>
```

> You may use the YAML file to silence warnings for mismatched placeholders.

### `--clean` Clean unreachable translations

Remove dead keys from generated files where they exist in the professional translation file.

```bash
yarn transl8r --clean
  fr:     Up to date ✓
  de:     Purged 14 unreachable key(s).
  ✨  Done in 0.53s.
```

### `--backfill` Backfill missing translations

**Note:** This command currently does not reverse translations for sanity checking.

```bash
yarn transl8r --backfill

# ...or specific languages only
yarn transl8r --backfill -l fr de
```

### Options

- `-l` - Supply list of language codes to fetch (space seperated: `-l fr de es`)
- `-p` - Path to match the language files on (use `{{lang}}` and `{{namespace}}` placeholders)
- `-b` - Base language to translate from (default: `en`)
- `-n` - The destination namespace (default: `base.generated`)

Say for example, you add a new translation for Catalyst into French, and you want to backfill it to English and Chinese (Traditional).

```bash
yarn transl8r --backfill  -b fr  -l en zh-TW
```
