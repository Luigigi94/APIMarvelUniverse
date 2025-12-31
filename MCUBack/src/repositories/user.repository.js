import {supabase} from "../config/supaBaseClient.js";

export class UserRepository {
    static async findByUsername(username) {
        const { data, error } = await supabase
            .from("users")
            .select("id, username, password, salt, created_at")
            .eq('username', username.trim())
            .maybeSingle();

        if (error) throw new Error(error.message);

        if (!data) return null;

        return {
            _id: data.id,
            username: data.username,
            password: data.password,
            salt: data.salt,
            createdAt: data.created_at
        }
    }

    static async create({ username, password, salt}) {
        const payload = {
            username: username,
            password: password,
            salt: salt,
        }



        const { data, error } = await supabase
            .from("users")
            .insert(payload)
            .select("id, username, password, salt, created_at")
            .single();

        if (error) throw new Error(error.message);

        return {
            _id: data.id,
            username: data.username,
            password: data.password,
            salt: data.salt,
            createdAt: data.created_at
        }
    }
}
