# command-id-enums
Auto-generated enums for After Effects Command IDs

Extendscript version of [Justin Taylor's snippet](http://justintaylor.tv/after-effects-command-ids/)

### Usage
```js
app.executeCommand(Cmd.SCRIPTS_EXPRESSIONS)
```

### Disclaimer
- Not tested on Windows
- Excludes duplicates despite them having a unique ID
- Many command IDs are missing

### Output
Short example of the output below; check [example.json](https://github.com/Klustre/command-id-enums/blob/main/example.json) for a full list (generated in AE 17.6).

```js
var Cmd = {
    ABOUT_AFTER_EFFECTS: 256,
    ADD_FONTS_FROM_ADOBE: 4017,
    ADD_FOOTAGETO_COMP: 2005,
    ADOBE_DYNAMIC_LINK: 2552,
    BROWSE: 3689,
    CLOSE_PROJECT: 3154,
    CLOSE: 4,
    CONSOLIDATE_ALL_FOOTAGE: 2107,
    CREATE_PROXY: 2777,
    EXPORT: 2494,
    FIND: 2607,
    IMPORT_RECENT_FOOTAGE: 2283,
    IMPORT: 2105,
    INCREMENTAND_SAVE: 3088,
    INTERPRET_FOOTAGE: 2102,
    LICENSE_FOOTAGE: 10420,
    NEW: 2264,
    PROJECT_SETTINGS: 2611,
    // etc…
}
```
