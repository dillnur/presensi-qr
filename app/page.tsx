'use client';
  
  import { useState, useEffect } from 'react';
  import { QRCodeSVG } from 'qrcode.react';
  import { getTotpToken } from './actions'; 
  
  export default function Home() {
  const [token, setToken] = useState<string>('');
  
useEffect(() => {
  const updateToken = async () => {
  const newToken = await getTotpToken();
  setToken(newToken);
};
    
  updateToken();
  const interval = setInterval(updateToken, 10000);

  return () => clearInterval(interval);
}, []);
  
  return (
  <main style={{ display: 'flex', flexDirection: 'column',
  alignItems: 'center', marginTop: '50px' }}>
  <h1>Presensi QR Code</h1>
  {token && <QRCodeSVG value={token} size={256} />}
  <p>Kode berubah setiap 10 detik: <strong>{token}</strong></p>
  </main>
  );
}