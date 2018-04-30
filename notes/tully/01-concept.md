# Tully Concept

Intended to be a small utility to aid with note taking, directly from a terminal. Before this repository was made, it was a potential solution to how I would take notes (but I didn't have time to build it). The issue I personally have with most note apps (etc.) is that I spend more time trying to make notes than necessary; it becomes a pain to manage them. Tully is meant to be something small you modify purely from your terminal in order to avoid context switching. The intent is very much to have this tool interact in such a way that the `notes/` section of this repository could act as a Tully controlled notes store.

### Interface

```shell
$ tully add [type]
$ tully config get [key]
$ tully config set [key=value...]
$ tully del [type]
$ tully del [type] [id]
$ tully edit [type] [id]
$ tully info
$ tully info [type]
$ tully info [type] [id]
$ tully list
$ tully list [type]
$ tully move [type] [id] [type]
$ tully search [text]
$ tully search [type] [text]
$ tully tag [type] [id] [tags...]
$ tully tags
$ tully tags [type]
$ tully tags [type] [id]
$ tully view [type] [id]
```

### Structure

```
# file store
$TULLY_HOME/
  <type>/
    <id>.md

# for extra metadata
_index where _index = {
  "work": {
    "something":{
      "tags": [],
      "created": 0,
      "modified": 0
    }
  }
}
```

### Potential extras

1. Perhaps the best would be Git integration. It would provide the ability to set up your Tully directory as a Git repository and then have it automatically push the changes on every commit with an automated message. This is even better because it can allow Tully to live in a subdirectory of a repository (i.e. the `notes/` section of this repository).
