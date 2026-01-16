import bcrypt from "bcrypt";
import { json, requireAdmin, pool } from "./isAdmin.js";

export default async function adminSetPassword(req) {
    const headers = { "Content-Type": "application/json" };

    if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405, headers: headers  });
    
    const body = await req.json().catch(() => ({}));
    const { adminUserId, targetUserId, newPassword } = body;
    console.log(body)

    const auth = await requireAdmin(adminUserId);
    if (!auth.ok) return new Response(JSON.stringify({ error: auth.error }), { status: auth.status, headers: headers  });

    const uid = +targetUserId;
    const pw = String(newPassword || "").trim();
    if (!uid || pw.length < 8) return new Response(JSON.stringify({ error: "Invalid data" }), { status: 400, headers: headers  });

    const hashed = await bcrypt.hash(pw, 12);

    try {
    
        const result = await pool.query(
            `
            UPDATE users
            SET password_hash = $1
            WHERE user_id = $2
            RETURNING user_id
            `,
            [hashed, uid]
        );

        if (result.rowCount === 0) return new Response(JSON.stringify({ error: "User Not Found" }), { status: 404, headers: headers  });

        return new Response(JSON.stringify({ success: true }), { status: 200, headers: headers  });
    } catch (err) {
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: headers }
        );
  }
}