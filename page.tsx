'use client';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type Product={sku:string;name:string;cat:string;brand:string;qty:number;cost:number|null;price:number|null;volume:number|null;status:string};
type Settings={capital:number;freightRate:number;other:number};

const seed:Product[]=[
{sku:'VC-ALF-001',name:'Alfombra corazón rosa/blanca',cat:'Alfombras',brand:'Temu',qty:2,cost:5.12,price:36,volume:1.023,status:'Comprar ×2'},
{sku:'VC-DEC-001',name:'Coasters acrílicos jelly',cat:'Decoración',brand:'Temu',qty:2,cost:5.03,price:18,volume:.058,status:'Comprar ×2'},
{sku:'VC-FLR-001',name:'Florero corazón cerámica',cat:'Florero',brand:'Temu',qty:2,cost:10.73,price:30,volume:.491,status:'Comprar ×2'},
{sku:'VC-FLR-002',name:'Florero jugo de naranja',cat:'Florero',brand:'Temu',qty:2,cost:11.95,price:36,volume:.541,status:'Comprar ×2'},
{sku:'VC-FLR-003',name:'Florero dados cerámica',cat:'Florero',brand:'Temu',qty:2,cost:9.37,price:36,volume:.526,status:'Comprar ×2'},
{sku:'VC-JUE-001',name:'Jonathan Adler Shelfie Puzzle',cat:'Juegos',brand:'Galison',qty:2,cost:10,price:30,volume:.3,status:'Comprar ×2'},
{sku:'VC-JUE-002',name:'Florero bloques construcción',cat:'Juegos',brand:'Temu',qty:2,cost:7.65,price:24,volume:.195,status:'Comprar ×2'},
{sku:'VC-JUE-003',name:'Maceta bloques flores A',cat:'Juegos',brand:'Temu',qty:2,cost:1.82,price:12,volume:.08,status:'Comprar ×2'},
{sku:'VC-JUE-004',name:'Maceta bloques flores B',cat:'Juegos',brand:'Temu',qty:2,cost:1.82,price:12,volume:.08,status:'Comprar ×2'},
{sku:'VC-JUE-005',name:'Maceta bloques flores C',cat:'Juegos',brand:'Temu',qty:2,cost:1.82,price:12,volume:.08,status:'Comprar ×2'},
{sku:'VC-LAM-001',name:'Sunset projection lamp',cat:'Lámpara',brand:'Temu',qty:2,cost:6.02,price:24,volume:.211,status:'Comprar ×2'},
{sku:'VC-LAM-002',name:'Lámpara donut 2pcs',cat:'Lámpara',brand:'Temu',qty:2,cost:14.09,price:30,volume:.546,status:'Comprar ×2'},
{sku:'VC-LAM-003',name:'Lámpara pato RGB 2pcs',cat:'Lámpara',brand:'Temu',qty:2,cost:4.67,price:18,volume:.273,status:'Comprar ×2'},
{sku:'VC-MAG-001',name:'Álbum scrapbook viaje',cat:'Magia',brand:'Temu',qty:2,cost:8.39,price:30,volume:.28,status:'Comprar ×2'},
{sku:'VC-MAG-002',name:'Your Feelings Are Valid Oracle',cat:'Magia',brand:'Temu',qty:2,cost:2.89,price:18,volume:.038,status:'Comprar ×2'},
{sku:'VC-MAG-003',name:'Real Talk Tarot',cat:'Magia',brand:'Temu',qty:2,cost:4.04,price:18,volume:.034,status:'Comprar ×2'},
{sku:'VC-MAG-004',name:'Pastel Prism Tarot',cat:'Magia',brand:'Temu',qty:2,cost:5.25,price:18,volume:.031,status:'Comprar ×2'},
{sku:'VC-OFI-001',name:'Gratitude Journal 2pcs',cat:'Oficina',brand:'Temu',qty:2,cost:3.87,price:18,volume:.14,status:'Comprar ×2'},
{sku:'VC-OFI-002',name:'Speaker Bluetooth wood grain',cat:'Oficina',brand:'Temu',qty:2,cost:14.99,price:36,volume:.457,status:'Comprar ×2'},
{sku:'VC-OFI-003',name:'Laptop stand wavy cherry',cat:'Oficina',brand:'Temu',qty:2,cost:5.69,price:24,volume:.4,status:'Comprar ×2'},
{sku:'VC-RET-001',name:'Set marcos magnéticos',cat:'Retrato',brand:'Temu',qty:2,cost:4.4,price:18,volume:.102,status:'Comprar ×2'},
{sku:'VC-VEL-001',name:'Encendedores electrónicos 3pcs',cat:'Vela',brand:'Temu',qty:2,cost:3.02,price:26,volume:.058,status:'Comprar ×2'},
{sku:'VC-VEL-002',name:'Velas aromáticas 4pcs gift box',cat:'Vela',brand:'Temu',qty:2,cost:5.23,price:24,volume:.243,status:'Comprar ×2'},
{sku:'VC-VEL-003',name:'Velas aromáticas 4pcs',cat:'Vela',brand:'Temu',qty:2,cost:4.89,price:24,volume:.243,status:'Comprar ×2'},
{sku:'VC-VEL-004',name:'Set velas 12/24 frascos',cat:'Vela',brand:'Temu',qty:2,cost:8.97,price:36,volume:.702,status:'Comprar ×2'},
{sku:'VC-MAS-001',name:'Comederos mascotas 6pcs',cat:'Mascotas',brand:'Temu',qty:2,cost:3.43,price:18,volume:.351,status:'Comprar ×2'},
{sku:'VC-DEC-002',name:'Cojín girasol',cat:'Decoración',brand:'Temu',qty:2,cost:7.92,price:36,volume:.853,status:'Comprar ×2'},
{sku:'VC-TEM-001',name:'Temu producto 607149006655561',cat:'Pendiente Temu',brand:'Temu',qty:2,cost:null,price:null,volume:null,status:'Pendiente precio'},
{sku:'VC-JUE-006',name:'Jonathan Adler Petals 750 Piece Shaped Puzzle',cat:'Juegos',brand:'Galison',qty:2,cost:14,price:36,volume:.218346,status:'Comprar ×2'},
{sku:'VC-TEM-002',name:'Temu producto 601099580462430',cat:'Pendiente Temu',brand:'Temu',qty:2,cost:null,price:null,volume:null,status:'Pendiente precio'}];

const blank:Product={sku:'',name:'',cat:'Decoración',brand:'Temu',qty:2,cost:null,price:null,volume:null,status:'Comprar ×2'};
const money=(n:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(n);

export default function Page(){
 const [products,setProducts]=useState<Product[]>(seed);
 const [settings,setSettings]=useState<Settings>({capital:700,freightRate:35,other:125});
 const [view,setView]=useState('Dashboard');
 const [q,setQ]=useState('');
 const [cat,setCat]=useState('Todas');
 const [sell,setSell]=useState(80);
 const [editing,setEditing]=useState<Product|null>(null);
 const [draft,setDraft]=useState<Product>(blank);
 const [loaded,setLoaded]=useState(false);

 useEffect(()=>{
   const p=localStorage.getItem('vc_products');
   const s=localStorage.getItem('vc_settings');
   if(p) try{setProducts(JSON.parse(p))}catch{}
   if(s) try{setSettings(JSON.parse(s))}catch{}
   setLoaded(true);
 },[]);
 useEffect(()=>{if(loaded)localStorage.setItem('vc_products',JSON.stringify(products))},[products,loaded]);
 useEffect(()=>{if(loaded)localStorage.setItem('vc_settings',JSON.stringify(settings))},[settings,loaded]);

 const known=products.filter(p=>p.cost!==null&&p.price!==null&&p.volume!==null);
 const units=products.reduce((s,p)=>s+p.qty,0);
 const merchandise=known.reduce((s,p)=>s+(p.cost||0)*p.qty,0);
 const volume=known.reduce((s,p)=>s+(p.volume||0),0);
 const freight=Math.ceil(volume/3)*settings.freightRate;
 const investment=merchandise+freight+settings.other;
 const revenue=known.reduce((s,p)=>s+(p.price||0)*p.qty,0);
 const profit=revenue-investment;
 const reserve=settings.capital-investment;
 const scenarioRevenue=revenue*sell/100;
 const categories=['Todas',...Array.from(new Set(products.map(p=>p.cat))).sort()];
 const filtered=products.filter(p=>(cat==='Todas'||p.cat===cat)&&(`${p.name} ${p.sku} ${p.brand}`.toLowerCase().includes(q.toLowerCase())));
 const byCat=useMemo(()=>Array.from(new Set(known.map(p=>p.cat))).map(c=>({c,v:known.filter(p=>p.cat===c).reduce((s,p)=>s+(p.price||0)*p.qty,0)})).sort((a,b)=>b.v-a.v),[products]);

 function openNew(){setEditing(null);setDraft({...blank,sku:`VC-${String(products.length+1).padStart(3,'0')}`})}
 function openEdit(p:Product){setEditing(p);setDraft({...p})}
 function closeModal(){setEditing(null);setDraft(blank)}
 function saveProduct(e:FormEvent){
   e.preventDefault();
   if(!draft.name.trim()||!draft.sku.trim())return;
   if(editing)setProducts(ps=>ps.map(p=>p.sku===editing.sku?draft:p));
   else setProducts(ps=>[...ps,draft]);
   closeModal();
 }
 function removeProduct(sku:string){
   if(confirm('¿Eliminar este producto?'))setProducts(ps=>ps.filter(p=>p.sku!==sku));
 }
 async function logout(){await fetch('/api/logout',{method:'POST'});location.href='/login'}

 return <div className="shell">
  <aside>
   <div className="brand"><div className="mark">VC</div><div><b>Vainitas Cool</b><span>Business OS</span></div></div>
   <nav>{['Dashboard','Productos','Flete y costos','Escenarios','Configuración'].map(x=><button key={x} onClick={()=>setView(x)} className={view===x?'active':''}>{x}</button>)}</nav>
   <div className="capital"><span>Capital disponible</span><b className={reserve<0?'dangerText':''}>{money(reserve)}</b><small>de {money(settings.capital)}</small></div>
   <button className="logout" onClick={logout}>Cerrar sesión</button>
  </aside>

  <main>
   <header><div><span className="eyebrow">VAINITAS COOL</span><h1>{view}</h1><p>Control visual del inventario, inversión y rentabilidad.</p></div>{view==='Productos'&&<button className="primary" onClick={openNew}>+ Nuevo producto</button>}</header>

   {view==='Dashboard'&&<>
    <section className="kpis">
     <Card t="Inversión conocida" v={money(investment)} s="Mercancía + flete + otros"/>
     <Card t="Venta potencial" v={money(revenue)} s="Productos con datos completos"/>
     <Card t="Flete estimado" v={money(freight)} s={`${Math.ceil(volume/3)*3} ft³ facturados · ${volume.toFixed(2)} ft³ conocidos`}/>
     <Card t="Ganancia potencial" v={money(profit)} s={`${products.length} SKUs · ${units} unidades`}/>
    </section>
    <section className="grid">
     <div className="panel"><div className="panelHead"><div><span className="eyebrow">VENTAS</span><h2>Potencial por categoría</h2></div><b>{money(revenue)}</b></div><div className="bars">{byCat.map(x=><div className="barRow" key={x.c}><span>{x.c}</span><div><i style={{width:`${Math.max(7,x.v/(byCat[0]?.v||1)*100)}%`}}/></div><b>{money(x.v)}</b></div>)}</div></div>
     <div className="panel"><span className="eyebrow">ESCENARIO</span><h2>Simulador rápido</h2><div className="scenario"><span>Sell-through</span><b>{sell}%</b><input type="range" min="40" max="100" step="10" value={sell} onChange={e=>setSell(+e.target.value)}/><div className="scenarioGrid"><div><small>Ventas cobradas</small><strong>{money(scenarioRevenue)}</strong></div><div><small>Ventas - inversión</small><strong>{money(scenarioRevenue-investment)}</strong></div></div></div><div className="note">Los productos sin costo, precio o volumen no entran en los cálculos.</div></div>
    </section>
   </>}

   {view==='Productos'&&<section className="panel catalog">
    <div className="panelHead"><div><span className="eyebrow">CATÁLOGO</span><h2>Productos</h2></div><span className="badge">{filtered.length} productos</span></div>
    <div className="filters"><input placeholder="Buscar producto, SKU o marca…" value={q} onChange={e=>setQ(e.target.value)}/><select value={cat} onChange={e=>setCat(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div>
    <div className="table"><div className="tr th"><span>SKU</span><span>Producto</span><span>Categoría</span><span>Marca</span><span>Unid.</span><span>Costo/u</span><span>VENDER EN</span><span>Acciones</span></div>{filtered.map(p=><div className="tr" key={p.sku}><span className="sku">{p.sku}</span><span className="product">{p.name}</span><span>{p.cat}</span><span>{p.brand}</span><span>{p.qty}</span><span>{p.cost===null?'—':money(p.cost)}</span><span className="sell">{p.price===null?'—':money(p.price)}</span><span className="actions"><button onClick={()=>openEdit(p)}>Editar</button><button className="dangerBtn" onClick={()=>removeProduct(p.sku)}>Eliminar</button></span></div>)}</div>
   </section>}

   {view==='Flete y costos'&&<section className="grid">
    <div className="panel"><span className="eyebrow">COSTOS</span><h2>Resumen logístico</h2><div className="metricList"><Metric l="Mercancía conocida" v={money(merchandise)}/><Metric l="Volumen conocido" v={volume.toFixed(2)+' ft³'}/><Metric l="Bloques facturados" v={String(Math.ceil(volume/3))}/><Metric l="Flete" v={money(freight)}/><Metric l="Otros / reserva" v={money(settings.other)}/><Metric l="Inversión total" v={money(investment)}/></div></div>
    <div className="panel"><span className="eyebrow">ALERTA</span><h2>Próximo salto de flete</h2><p className="big">{(Math.ceil(volume/3)*3-volume).toFixed(2)} ft³</p><p className="muted">Espacio estimado antes de pasar al siguiente bloque de 3 ft³.</p></div>
   </section>}

   {view==='Escenarios'&&<section className="panel"><span className="eyebrow">ESCENARIOS</span><h2>Recuperación de inversión</h2><div className="scenarioCards">{[60,80,100].map(x=>{const sales=revenue*x/100;return <div key={x}><b>{x}% vendido</b><strong>{money(sales)}</strong><span>{money(sales-investment)} vs inversión</span></div>})}</div></section>}

   {view==='Configuración'&&<section className="panel settings">
    <span className="eyebrow">CONFIGURACIÓN</span><h2>Supuestos del negocio</h2>
    <label>Capital máximo<input type="number" value={settings.capital} onChange={e=>setSettings(s=>({...s,capital:+e.target.value}))}/></label>
    <label>Flete por cada 3 ft³<input type="number" value={settings.freightRate} onChange={e=>setSettings(s=>({...s,freightRate:+e.target.value}))}/></label>
    <label>Otros gastos / reserva<input type="number" value={settings.other} onChange={e=>setSettings(s=>({...s,other:+e.target.value}))}/></label>
    <button className="secondary" onClick={()=>{localStorage.removeItem('vc_products');localStorage.removeItem('vc_settings');setProducts(seed);setSettings({capital:700,freightRate:35,other:125})}}>Restablecer datos</button>
   </section>}

   <footer>Los cambios de productos y configuración se guardan automáticamente en este navegador.</footer>
  </main>

  {(editing||draft.sku)&&draft!==blank&&<div className="modalBackdrop" onMouseDown={e=>{if(e.currentTarget===e.target)closeModal()}}><form className="modal" onSubmit={saveProduct}>
   <div className="panelHead"><div><span className="eyebrow">{editing?'EDITAR':'NUEVO'}</span><h2>{editing?'Editar producto':'Agregar producto'}</h2></div><button type="button" className="iconBtn" onClick={closeModal}>×</button></div>
   <div className="formGrid">
    <label>SKU<input value={draft.sku} onChange={e=>setDraft({...draft,sku:e.target.value})}/></label>
    <label>Nombre<input value={draft.name} onChange={e=>setDraft({...draft,name:e.target.value})}/></label>
    <label>Categoría<input value={draft.cat} onChange={e=>setDraft({...draft,cat:e.target.value})}/></label>
    <label>Marca<input value={draft.brand} onChange={e=>setDraft({...draft,brand:e.target.value})}/></label>
    <label>Unidades<input type="number" min="1" value={draft.qty} onChange={e=>setDraft({...draft,qty:+e.target.value})}/></label>
    <label>Costo/u<input type="number" step="0.01" value={draft.cost??''} onChange={e=>setDraft({...draft,cost:e.target.value===''?null:+e.target.value})}/></label>
    <label>VENDER EN<input type="number" step="0.01" value={draft.price??''} onChange={e=>setDraft({...draft,price:e.target.value===''?null:+e.target.value})}/></label>
    <label>Volumen total ft³<input type="number" step="0.001" value={draft.volume??''} onChange={e=>setDraft({...draft,volume:e.target.value===''?null:+e.target.value})}/></label>
   </div>
   <div className="modalActions"><button type="button" className="secondary" onClick={closeModal}>Cancelar</button><button className="primary" type="submit">Guardar producto</button></div>
  </form></div>}
 </div>
}
function Card({t,v,s}:{t:string;v:string;s:string}){return <article className="card"><span>{t}</span><b>{v}</b><small>{s}</small></article>}
function Metric({l,v}:{l:string;v:string}){return <div className="metric"><span>{l}</span><b>{v}</b></div>}
