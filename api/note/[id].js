import * as db from '../db.js';

export async function onRequest(context) {
  const { request, params, env } = context;
  const id = params.id;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (!env.NOTES_KV) {
    return new Response(JSON.stringify({ error: 'NOTES_KV binding is not configured' }), { status: 500, headers });
  }

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    switch (request.method) {
      case 'GET': {
        const noteJson = await env.NOTES_KV.get(`note:${id}`);
        if (!noteJson) {
          return new Response(JSON.stringify({ error: 'Note not found' }), { status: 404, headers });
        }
        const note = JSON.parse(noteJson);
        // Don't expose editKey in GET response
        return new Response(JSON.stringify({ id: note.id, text: note.text }), { status: 200, headers });
      }

      case 'POST': {
        const { editKey, text } = await request.json();
        const noteJson = await env.NOTES_KV.get(`note:${id}`);
        
        if (!noteJson) {
          return new Response(JSON.stringify({ error: 'Note not found' }), { status: 404, headers });
        }
        
        const note = JSON.parse(noteJson);
        if (note.editKey !== editKey) {
          return new Response(JSON.stringify({ error: 'Invalid edit key' }), { status: 403, headers });
        }

        // Update the note
        const updatedNote = { ...note, text };
        await env.NOTES_KV.put(`note:${id}`, JSON.stringify(updatedNote));
        
        return new Response(JSON.stringify({ success: true }), { status: 200, headers });
      }

      default: {
        return new Response(JSON.stringify({ error: `Method ${request.method} Not Allowed` }), {
          status: 405,
          headers: { ...headers, Allow: 'GET, POST, OPTIONS' }
        });
      }
    }
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers });
  }
}
