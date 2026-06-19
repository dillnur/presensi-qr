'use client';

import { useState } from 'react';
import { supabase } from '@/Lib/supabase';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSignUp() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) alert(error.message);
        else alert('Cek email Anda untuk verifikasi!');
        setLoading(false);
    }

    async function handleLogin() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert(error.message);
        else {
            alert('Login Berhasil!');
            router.push('/scan');
        }
        setLoading(false);
    }

    return (
    <main style={{ padding: '50px', display: 'flex', flexDirection:
    'column', gap: '10px', maxWidth: '300px', margin: 'auto' }}>
        <h1>Login / Daftar</h1>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        
        <button onClick={handleLogin} disabled={loading}>Login</button>
        <button onClick={handleSignUp} disabled={loading}>Daftar</button>
        </main>
        );
    }