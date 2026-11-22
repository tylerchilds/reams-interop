# Reams Interop

An early exploration at rendering notes using a shared lexicon.

For now, this doesn't load a real note. It loads the schema as JSON to show the basics of fetching and rendering json as hyper text.

## Architecture

index.html

- importmaps for naming and shaming dependencies

src/

- elf.js
  - the silly kernel
- reams-interop.js
  - a declaration of a "reams-interop" elf with the responsibility of fetching and rendering a note

[deps]

diffhtml - a virtual dom for patching without re-rendering everything

## Testing

```
python -m http.server 8081
```

```
http://localhost:8081
```
