export async function onRequest(context) {
  const { request, env } = context;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // Check KV binding
  if (!env.NOTES_KV) {
    return new Response(JSON.stringify({ error: 'NOTES_KV binding is not configured' }), { 
      status: 500, 
      headers 
    });
  }

  // Handle CORS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers });
  }

  try {
    if (request.method === 'GET') {
      // List all notes
      const { keys } = await env.NOTES_KV.list({ prefix: 'note:' });
      const notes = await Promise.all(
        keys.map(async (key) => {
          const value = await env.NOTES_KV.get(key.name);
          const note = JSON.parse(value);
          return { id: note.id, text: note.text }; // Don't expose editKey
        })
      );
      return new Response(JSON.stringify(notes), { status: 200, headers });
    } 
    
    if (request.method === 'POST') {
      const { text } = await request.json();
      
      // Generate id and editKey
      const id = Date.now().toString();
      const editKey = Array.from(crypto.getRandomValues(new Uint8Array(16)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
      
      // Create note object
      const note = { id, text, editKey };
      
      // Save to KV
      await env.NOTES_KV.put(`note:${id}`, JSON.stringify(note));
      
      // Return only id and editKey
      return new Response(
        JSON.stringify({ id, editKey }), 
        { status: 201, headers }
      );
    }

    // Method not allowed
    return new Response(
      JSON.stringify({ error: `Method ${request.method} Not Allowed` }), 
      { status: 405, headers: { ...headers, Allow: 'GET, POST, OPTIONS' } }
    );
  } catch (error) {
    console.error('Error handling request:', error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500, headers }
    );
  }
}
