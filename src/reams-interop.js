import Self from 'Self'

const $ = Self('reams-interop')

function loadNote() {
  return {
    "lexicon": 1,
    "id": "wiki.lichen.getNote",
    "defs": {
      "main": {
        "type": "query",
        "description": "Get a note's current content and the head revision to write against. Public wikis only. A deleted note answers NoteDeleted.",
        "parameters": {
          "type": "params",
          "properties": {
            "slug": {
              "type": "string",
              "description": "The note's slug, unique within its wiki. Use with wiki.",
              "maxLength": 2560,
              "maxGraphemes": 256
            },
            "uri": {
              "type": "string",
              "description": "AT-URI of the note record. Supply this, or wiki and slug.",
              "format": "at-uri"
            },
            "wiki": {
              "type": "string",
              "description": "AT-URI of the wiki the note belongs to. Use with slug.",
              "format": "at-uri"
            }
          }
        },
        "output": {
          "encoding": "application/json",
          "schema": {
            "type": "object",
            "required": [
              "content",
              "createdAt",
              "did",
              "latestRevisionUri",
              "slug",
              "title",
              "updatedAt",
              "uri",
              "wiki"
            ],
            "properties": {
              "content": {
                "type": "string",
                "description": "The note's body as its last revision left it, byte for byte. Frontmatter and wikilinks stay exactly as the author wrote them. Writing this text back unchanged produces an empty revision."
              },
              "createdAt": {
                "type": "string",
                "description": "The note record's own timestamp, in UTC. An unreadable or future-dated stamp falls back to our ingest time.",
                "format": "datetime"
              },
              "did": {
                "type": "string",
                "description": "The DID that created the note record. Later revisions can come from anyone allowed to edit the wiki.",
                "format": "did"
              },
              "latestRevisionUri": {
                "type": "string",
                "description": "The head revision. Set it as parentRevision on your noteRevision to write against this content. Only a revision parented here moves the note.",
                "format": "at-uri"
              },
              "slug": {
                "type": "string"
              },
              "title": {
                "type": "string"
              },
              "updatedAt": {
                "type": "string",
                "description": "The head revision's own timestamp, so appviews holding the same history agree. Same fallback as createdAt.",
                "format": "datetime"
              },
              "uri": {
                "type": "string",
                "description": "AT-URI of the note record. The rkey is a TID, so read it from here or address the note by wiki and slug.",
                "format": "at-uri"
              },
              "wiki": {
                "type": "string",
                "format": "at-uri"
              }
            }
          }
        },
        "errors": [
          {
            "name": "NotFound"
          },
          {
            "name": "NoteDeleted"
          }
        ]
      }
    }
  }
}

$.view(() => {
  const data = $.model()

  if(!data.id) {
    return 'Loading...'
  }

  return `
    <div class="title">
      ${data.id}
    </div>

    <div class="description">
      ${data.defs.main.description}
    </div>
  `
})

$.style(`
  & {
    display: block;
    height: 100%;
    overflow: auto;
    padding: 1rem;
  }

  & .title {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1rem;
  }

  & .description {
    font-style: italic;
  }
`)

// immediately invoked function to simulate loading the data into the view

setTimeout(() => {
  $.controller(loadNote())
}, 1000)
