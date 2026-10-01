'use client';
import { FormEvent, useState } from 'react';

export default function Login(){
 const [password,setPassword]=useState('');
 const [error,setError]=useState('');
 const [loading,setLoading]=useState(false);
 async function submit(e:FormEvent){
  e.preventDefault(); setError(''); setLoading(true);
  const r=await fetch('/api/login',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password})});
  if(r.ok){location.href='/';return}
  const data=await r.json().catch(()=>({error:'No se pudo iniciar sesión'}));
  setError(data.error||'Contraseña incorrecta'); setLoading(false);
 }
 return <main className="loginPage"><form className="loginCard" onSubmit={submit}>
  <div className="loginMark">VC</div>
  <span className="eyebrow">VAINITAS COOL</span>
  <h1>Acceso privado</h1>
  <p>Ingresa la contraseña del panel para continuar.</p>
  <label>Contraseña<input autoFocus type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••"/></label>
  {error&&<div className="loginError">{error}</div>}
  <button className="primary" disabled={loading}>{loading?'Entrando…':'Entrar al dashboard'}</button>
 </form></main>
}