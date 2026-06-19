'use client';

import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { supabase } from '../../Lib/supabaseClient';

export default function ScannerPage() {
    const [scanResult, setScanResult] = useState<string | null>(null);
   
    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader",
   { fps: 10, qrbox: { width: 250, height: 250 } },false
);

 scanner.render(
    async (decodedText) => {
        setScanResult(decodedText);
         alert('Mencoba menyimpan: ' + decodedText);
            const { error } = await supabase.from('presensi').insert([{ kode: decodedText }]);
        if (error) {
        alert('Gagal: ' + error.message);
         console.error('Gagal menyimpan data:', error);
        } else {
            alert('Berhasil menyimpan data');
            console.log('Data berhasil disimpan');
        }
     }, 
     (error) => {  
        
        }
        );
        return () => {
            scanner.clear().catch(err => console.error("Gagal membersihkan scanner", err));
        };
    }, []);

    return (
        <main style={{
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h1>Scan QR Presensi</h1>

            <div id="reader" style={{ width: '100%', maxWidth: '500px' }}></div>

            {scanResult && (
                <div style={{ marginTop: '20px', padding: '10px', border: '1px solid green' }}>
                    <p>Hasil Scan:</p>
                    <p>Kode yang terdeteksi: <strong>{scanResult}</strong></p>
                </div>
            )}
        </main>
    );
}