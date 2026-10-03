const fs=require('fs'),vm=require('vm');const elements={};const context=new Proxy({}, {get:(target,key)=>target[key]||(()=>{})});context.measureText=()=>({width:50});const el=s=>elements[s]??=(s==='canvas'?{getContext:()=>context}:{style:{},focus(){},textContent:'',innerHTML:''});const sandbox={document:{querySelector:el,querySelectorAll:()=>[]},innerWidth:1200,innerHeight:800,devicePixelRatio:1,addEventListener(){},requestAnimationFrame(){},location:{reload(){}},console};vm.createContext(sandbox);vm.runInContext(fs.readFileSync('work/game-check.js','utf8'),sandbox);vm.runInContext(`
function assert(x,m){if(!x)throw Error(m)}
draw(); assert(faces.some(f=>f.layer===0),'ground layer exists'); let firstObject=faces.findIndex(f=>f.layer===1); assert(firstObject>0 && faces.slice(firstObject).every(f=>f.layer===1),'all ground renders before characters and items');
for(const c of cats){player.x=c.x;player.z=c.z;interact();assert(c.asked,'NPC request');close();const i=items.find(i=>i.name===c.item);player.x=i.x;player.z=i.z;interact();assert(i.held,'collection');close();player.x=c.x;player.z=c.z;interact();assert(c.done,'delivery');close()}
player.x=0;player.z=-2;interact();assert(finished,'picnic ending');close();
for(let i=0;i<450;i++)tick(i*50);
assert(log.some(l=>l.includes('replies')),'NPC to NPC reply');
let oldX=player.x;keys.d=true;tick(23000);assert(player.x>oldX,'movement');
console.log('PASS: render, 3 NPC requests, 3 collections, 3 deliveries, ending, NPC conversations, movement');
`,sandbox);


