import { NextResponse } from 'next/server';

async function digest(value:string){
 const data=new TextEncoder().encode(value);
 const hash=await crypto.subtle.digest('SHA-256',data);
 return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

export async function POST(req:Request){
 const admin=process.env.ADMIN_PASSWORD;
 if(!admin)return NextResponse.json({error:'Falta configurar ADMIN_PASSWORD en Vercel.'},{status:503});
 const {password}=await req.json();
 if(typeof password!=='string'||password!==admin)return NextResponse.json({error:'Contraseña incorrecta.'},{status:401});
 const res=NextResponse.json({ok:true});
 res.cookies.set('vc_session',await digest(admin),{httpOnly:true,secure:true,sameSite:'lax',path:'/',maxAge:60*60*24*30});
 return res;
}