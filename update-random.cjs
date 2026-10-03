const fs=require('fs');const path='outputs/catnip-commons.html';let s=fs.readFileSync(path,'utf8');
s=s.replace('const log=[],bubbles=[];let social=null;',`function shuffled(values){const result=[...values];for(let j=result.length-1;j>0;j--){const k=Math.floor(Math.random()*(j+1));[result[j],result[k]]=[result[k],result[j]];}return result;}
// Safe, separated supply spots avoid trees, the blanket, and starting characters.
const supplySpots=[{x:-4,z:1,hint:'on the left side of the garden'},{x:-2.5,z:3.8,hint:'near the front-left fence'},{x:0,z:4.3,hint:'near the middle of the front fence'},{x:4.8,z:.3,hint:'on the right side of the garden'},{x:2,z:-4.3,hint:'near the back-right fence'},{x:-2,z:-4.3,hint:'near the back-left fence'}];
function randomizeGame(){const spots=shuffled(supplySpots),requests=shuffled(items.map(i=>i.name));items.forEach((item,j)=>Object.assign(item,spots[j]));cats.forEach((cat,j)=>cat.item=requests[j]);}
randomizeGame();
const log=[],bubbles=[];let social=null;`);
let a=s.indexOf("say(n.name,{Mochi:'My yarn!");let b=s.indexOf('[n.name]);',a);if(a<0||b<0)throw Error('Delivery missing');s=s.slice(0,a)+`say(n.name,{Yarn:'My yarn! Now we can all play together. Let’s meet at the picnic blanket.',Fish:'A fish to share! I’ll save a bite for everyone. Meet us at the blanket.',Catnip:'Fresh catnip! Everyone will love this. Time for our picnic.'}[n.item]);`+s.slice(b+10);
a=s.indexOf("say(n.name,{Mochi:'Hi Pip!");b=s.indexOf('[n.name]);',a);if(a<0||b<0)throw Error('Request missing');s=s.slice(0,a)+`say(n.name,({Mochi:'Hi Pip!',Cleo:'Hello, friend!',Biscuit:'Hey friend!'}[n.name])+' Could you bring '+({Yarn:'my pink yarn',Fish:'a little fish',Catnip:'some fresh green catnip'}[n.item])+' to our picnic? Look '+item.hint+'. Walk close and press E to pick it up, then bring it back to me.');`+s.slice(b+10);
fs.writeFileSync(path,s);fs.writeFileSync('work/game-check.js',s.match(/<script>([\s\S]*?)<\/script>/)[1]);
