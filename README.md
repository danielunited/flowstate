# Flowstate

Flowstate is a modern, intuitive note-taking app

-   🎨 Markdown-based (same syntax as [Notion](https://www.notion.so/))
-   🔒 Fully self-hosted. Take full ownership over your notes!
-   💾 Notes are automatically saved to your browser's local storage without the use of cookies
-   🌐 You can also integrate Flowstate with MongoDB to save notes & generate a public URL for them
-   🧠 "Focus mode" helps you enter a state of flow and write without distractions

## How to publish & share your notes

You can connect Flowstate with your [MongoDB](https://www.mongodb.com/atlas/database) database to publish your notes and share them with a URL. All you need is an environment variable called `MONGO_CONNECTION_URL` with the following connection string: `mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/<your-database>?retryWrites=true&w=majority`

When you publish a note, it receives a unique SHA-256 encrypted key. This key is stored in your browser's local storage and MongoDB, it authenticates your access and ensures only you can edit it. Clearing your browser's cache means you'll lose access to edit your notes.
