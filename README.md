# Flowstate

Flowstate is a modern, intuitive note-taking app

-   🎨 Markdown-based (same syntax as [Notion](https://www.notion.so/))
-   🔒 Fully self-hosted. Take full ownership over your notes!
-   💾 Notes are automatically saved to your browser's local storage without the use of cookies
-   🌐 You can also integrate Flowstate with Cloudflare KV to save notes & generate a public URL for them
-   🧠 "Focus mode" helps you enter a state of flow and write without distractions

## How to publish & share your notes

You can connect Flowstate with your Cloudflare KV to publish your notes and share them with a URL.

## Using Cloudflare KV for Note Storage

This project now uses Cloudflare KV for storing notes. To set this up:

1. In your Cloudflare Workers environment, create a KV namespace and name it (for example) `NOTES_KV`.
2. Bind the KV namespace to your Worker by adding the binding with the same name `NOTES_KV` in your Worker configuration.

The API functions (in `api/db.js`) use the global `NOTES_KV` binding to perform operations:

-   `getNotes()`: Retrieves all notes stored in KV with keys prefixed by `note:`.
-   `getNote(id)`: Retrieves a specific note by id.
-   `saveNote(note)`: Saves a note. If the note doesn’t have an `id`, one is generated using the current timestamp.
-   `deleteNote(id)`: Deletes a note by id.

Ensure that you have set up your Cloudflare environment accordingly. For more details on how to bind a Cloudflare KV namespace, please refer to the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/learning/how-kv-works/).
