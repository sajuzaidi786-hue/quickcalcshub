
const F={slab:[['len','Length (ft)',10],['wid','Width (ft)',10],['thk','Thickness (in)',4]],
footing:[['len','Length (ft)',40],['wid','Width (in)',16],['thk','Depth (in)',8]],
column:[['dia','Diameter (in)',12],['hgt','Height (ft)',8],['qty','Number of columns',4]],
post:[['dia','Hole diameter (in)',10],['dep','Hole depth (in)',30],['pst','Post width (in)',4],['qty','Number of posts',10]]};
const V={slab:v=>v.len*v.wid*v.thk/12,footing:v=>v.len*v.wid*v.thk/144,column:v=>Math.PI*(v.dia/24)**2*v.hgt*v.qty,
post:v=>Math.max(0,Math.PI*(v.dia/24)**2-(v.pst/12)**2)*v.dep/12*v.qty};
const N={slab:'Slab, patio, driveway, floor',footing:'Footing / strip',column:'Round column / tube',post:'Fence or deck post holes'};
const root=document.getElementById('calc');
if(root){let t=root.dataset.type;const all=t==='all';if(all)t='slab';
function draw(){root.innerHTML=(all?'<label>Shape<select id="sh">'+Object.keys(N).map(k=>`<option value="${k}"${k===t?' selected':''}>${N[k]}</option>`).join('')+'</select></label><br>':'')+
'<div class="g">'+F[t].map(f=>`<label>${f[1]}<input type="number" min="0" step="any" id="${f[0]}" value="${f[2]}"></label>`).join('')+
'<label>Extra for waste<select id="ws"><option value="0">0%</option><option value="5">5%</option><option value="10" selected>10%</option><option value="15">15%</option></select></label>'+
'<label>Ready-mix price ($/yd³)<input type="number" min="0" id="py" value="150"></label><label>80 lb bag price ($)<input type="number" min="0" step="0.01" id="pb" value="6.50"></label></div>'+
'<div class="res" aria-live="polite"><div><small>Cubic yards</small><strong id="r1">0</strong></div><div><small>Cubic feet</small><strong id="r2">0</strong></div><div><small>80 lb bags</small><strong id="r3">0</strong></div><div><small>60 lb bags</small><strong id="r4">0</strong></div><div><small>40 lb bags</small><strong id="r5">0</strong></div><div><small>Ready-mix cost</small><strong id="r6">0</strong></div><div><small>Bag cost (80 lb)</small><strong id="r7">0</strong></div></div>';
if(all)document.getElementById('sh').onchange=e=>{t=e.target.value;draw()};root.oninput=calc;calc()}
function calc(){const v={};F[t].forEach(f=>v[f[0]]=+document.getElementById(f[0]).value||0);
const cf=V[t](v)*(1+ +document.getElementById('ws').value/100),yd=cf/27,b=y=>Math.ceil(cf/y);
const $=(i,x)=>document.getElementById(i).textContent=x,m=n=>'$'+n.toLocaleString(undefined,{maximumFractionDigits:0});
$('r1',yd.toFixed(2));$('r2',cf.toFixed(1));$('r3',b(.6));$('r4',b(.45));$('r5',b(.3));
$('r6',m(yd*+document.getElementById('py').value));$('r7',m(b(.6)*+document.getElementById('pb').value))}
draw()}
