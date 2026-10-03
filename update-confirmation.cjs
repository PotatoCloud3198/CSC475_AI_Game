const fs=require('fs');const path='outputs/catnip-commons.html';let s=fs.readFileSync(path,'utf8');function replace(a,b){if(!s.includes(a))throw Error('Missing '+a);s=s.replace(a,b)}
replace('<button id="close">Keep exploring</button></div>','<button id="close">Keep exploring</button> <button id="confirm-sit" style="display:none">Yes, sit down</button></div>');
replace('finished=false,won=false','finished=false,won=false,confirmingSit=false');
replace('function say(who,words){',"function say(who,words){confirmingSit=false;$('#confirm-sit').style.display='none';");
replace("function close(){if(finished)return;", "function close(){if(finished)return;confirmingSit=false;$('#confirm-sit').style.display='none';keys={};");
replace('function endGame(){',`function confirmPicnic(){const missing=cats.filter(c=>!c.done);say('Ready to sit down?',missing.length?'Sitting down ends the game. You still need to finish tasks for '+missing.map(c=>c.name).join(', ')+'. If you sit now, you will lose. Are you sure you’re ready?':'All three tasks are complete! Sit down to finish the game and celebrate your win?');confirmingSit=true;$('#confirm-sit').style.display='inline-block';}
function endGame(){`);
replace('if(atBlanket()){endGame();return}', 'if(atBlanket()){confirmPicnic();return}');
replace("$('#interact').onclick=interact;", "$('#confirm-sit').onclick=()=>{if(confirmingSit&&!finished)endGame();};$('#interact').onclick=interact;");
fs.writeFileSync(path,s);fs.writeFileSync('work/game-check.js',s.match(/<script>([\s\S]*?)<\/script>/)[1]);
let t=fs.readFileSync('work/test-ending.cjs','utf8');t=t.replaceAll("interact();assert(finished", "interact();assert(!finished&&confirmingSit&&!player.seated,'confirmation before ending');$('#confirm-sit').onclick();assert(finished");
t=t.replace("console.log('PASS:",`run(\`player.x=0;player.z=-2;interact();assert(confirmingSit&&!finished,'asks before losing');assert($('#words').textContent.includes('you will lose'),'unfinished task warning');close();assert(!confirmingSit&&!finished&&!player.seated,'cancel preserves game');$('#confirm-sit').onclick();assert(!finished,'stale confirmation ignored');interact();interact();assert(!finished&&!confirmingSit,'E cancels rather than confirms');cats.forEach(c=>c.done=true);interact();assert($('#words').textContent.includes('celebrate your win'),'ready message');\`);
console.log('PASS: picnic confirmation and cancellation,`);
fs.writeFileSync('work/test-ending.cjs',t);
