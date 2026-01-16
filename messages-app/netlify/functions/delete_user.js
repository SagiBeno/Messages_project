import { json, requireAdmin, pool } from "./isAdmin.js";

export default async function deleteUser(req) {
    const headers = { "Content-Type": "application/json" };

    if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: headers  });

    const body = await req.json().catch(() => ({}));
    const { adminUserId, targetUserId } = body;
    const auth = await requireAdmin(adminUserId);

    if (!auth.ok) return new Response (JSON.stringify( {error: auth.error}, { status: auth.status, headers: headers } ));
    const uid = +targetUserId;
    
    if (!uid || adminUserId === uid) return new Response (JSON.stringify( {error: 'Invalid user ID'}, { status: 400, headers: headers } ));
    
    try {
        await pool.query(`DELETE FROM messages WHERE sender_id = $1 OR receiver_id = $1`, [uid]);
        await pool.query(`DELETE FROM relationships WHERE requester_id = $1 OR addressee_id = $1`, [uid]);
        const result = await pool.query(`DELETE FROM users WHERE user_id = $1 RETURNING user_id`, [uid]);
        if (result.rowCount === 0) return new Response(JSON.stringify({ error: "User Not Found" }), { status: 404, headers: headers  });
        return new Response(JSON.stringify({ success: true }), { status: 200, headers: headers  });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: headers }
        );
    }
}