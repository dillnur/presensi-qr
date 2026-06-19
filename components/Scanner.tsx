'use client';

import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from '@/Lib/supabase';

export default function Scanner() {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);

    useEffect(() => {

        scannerRef.current = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 250 },
            false
        );

        scannerRef.current.render(
            async (decodedText) => {

                scannerRef.current?.clear();

                await handleAbsensi(decodedText);
            },
            (error) => {
                console.warn(error);
            }
        );

        return () => {

            scannerRef.current?.clear().catch(console.error);
        };
    }, []);
    
    const handleAbsensi = async (token: string) => {

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert("Anda harus login!");
            return;
        }

        const { error } = await supabase
        .from('presensi')
        .insert({
            user_id: user.id,
            kode_token: token,
        });

        if (error) {
            alert("Gagal absensi: " + error.message);
        } else {
            alert("Absensi berhasil!");
        }
    };

    return <div id="reader" style={{ width: '500px' }} />;
} 