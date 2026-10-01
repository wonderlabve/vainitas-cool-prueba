import { NextRequest, NextResponse } from 'next/server';

async function digest(value:string){
 const data=new TextEncoder().encode(value);
 const hash=await crypto.subtle.digest('SHA-256',data);
 return Array.from(new Uint8Array(hash)).map(b=>b.toString(16).padStart(2,'0')).join('');
}

export async function middleware(req:NextRequest){
 const {pathname}=req.nextUrl;
 if(pathname==='/login'||pathname.startsWith('/api/login')||pathname.startsWith('/_next')||pathname==='/favicon.ico')return NextResponse.next();
 const admin=process.env.ADMIN_PASSWORD;
 if(!admin){
   if(pathname.startsWith('/api/'))return NextResponse.json({error:'ADMIN_PASSWORD no configurada'},{status:503});
   const url=req.nextUrl.clone(); url.pathname='/login'; return NextResponse.redirect(url);
 }
 const session=req.cookies.get('vc_session')?.value;
 if(session!==await digest(admin)){
   if(pathname.startsWith('/api/'))return NextResponse.json({error:'No autorizado'},{status:401});
   const url=req.nextUrl.clone(); url.pathname='/login'; return NextResponse.redirect(url);
 }
 return NextResponse.next();
}

export const config={matcher:['/((?!.*\\..*).*)']};