import * as db from '../db.js';

export async function onRequest(context) {
  const { request, params } = context;
  const id = params.id;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    switch (request.method) {
      case 'GET': {
        const note = await db.getNote(id);
        if (!note) {
          return new Response(JSON.stringify({ error: 'Note not found' }), { status: 404, headers });
        }
        return new Response(JSON.stringify({ id, text: note.text }), { status: 200, headers });
      }

      case 'POST': {
        const { editKey, text } = await request.json();
        const note = await db.getNote(id);

        if (!note || note.editKey !== editKey) {
          return new Response(JSON.stringify({ error: 'Note not found or invalid edit key' }), { status: 400, headers });
        }

        const updated = await db.updateNote(id, text);
        return new Response(JSON.stringify(updated), { status: 200, headers });
      }

      default: {
        return new Response(JSON.stringify({ error: `Method ${request.method} Not Allowed` }), {
          status: 405,
          headers: { ...headers, Allow: 'GET, POST, OPTIONS' }
        });
      }
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
}
