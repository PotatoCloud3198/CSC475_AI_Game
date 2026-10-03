const fs=require('fs');const path='outputs/catnip-commons.html';let s=fs.readFileSync(path,'utf8');
function replace(a,b){if(!s.includes(a))throw Error('Missing '+a.slice(0,60));s=s.replace(a,b)}
replace('eventIndex=0,finished=false','eventIndex=0,finished=false,won=false');
s=s.replaceAll('layer=1','layer=4');
replace("['#dcd2b6','#c3b899','#d4c9aa'],0)","['#dcd2b6','#c3b899','#d4c9aa'],1)");
replace("box(0,0,-2,2.5,.045,2,['#d7967c','#bf826c','#cb8d73'],0)","box(0,.06,-2,2.5,.06,2,['#d7967c','#bf826c','#cb8d73'],2)");
replace("box(x,.047,z,.45,.008,.45,['#f4d5b4','#f4d5b4','#f4d5b4'],0)","box(x,.121,z,.45,.008,.45,['#f4d5b4','#f4d5b4','#f4d5b4'],3)");
replace('box(0,.07,-2,.55,.2,.45','box(0,.13,-2,.55,.2,.45');
replace('const y=.16+bob;', 'const y=c.seated?.12:.16+bob;');
replace('function close(){',"function close(){if(finished)return;");
replace('function interact(){',`function atBlanket(){return Math.abs(player.x)<=1.25&&Math.abs(player.z+2)<=1;}
function endGame(){won=cats.every(c=>c.done);finished=true;player.seated=true;player.x=.7;player.z=-1.6;keys={};const missing=cats.filter(c=>!c.done).map(c=>c.item.toLowerCase()).join(', ');say(won?'You win! Picnic purr-fection.':'You lose — the picnic started too soon.',won?'You sit down with all three supplies delivered. Everyone is ready to share the picnic. Great teamwork, Pip!':'You sat down before finishing every task. Still needed: '+missing+'. Try again and help all three neighbors before taking your seat.');$('#close').textContent='Play again';$('#dialog').style.borderColor=won?'#59845c':'#b97378';log.push(won?'Pip sits down. Picnic complete!':'Pip sits down before everyone is ready.');updateUI();}
function interact(){if(finished)return;`);
replace("close();return}let targets=", "close();return}if(atBlanket()){endGame();return}let targets=");
const start=s.indexOf('else if(cats.every(c=>c.done)&&distance(player,{x:0,z:-2})<2)');const end=s.indexOf("else $('#hint')",start);if(start<0||end<0)throw Error('Old ending missing');s=s.slice(0,start)+s.slice(end);
replace("$('#close').onclick=close;", "$('#close').onclick=()=>finished?location.reload():close();");
replace("if($('#dialog').style.display!=='block'){let sx", "if(!finished&&$('#dialog').style.display!=='block'){let sx");
s=s.replaceAll("finished?'Best picnic ever!'", "won?'Best picnic ever!'").replaceAll("finished?'Purr-fect company.'", "won?'Purr-fect company.'");
replace("finished?'Picnic complete. Stay and enjoy the garden.':near?", "finished?(won?'You win! Everyone is ready for the picnic.':'You lose. Play again to finish every task.'):atBlanket()?'Press E · Sit down and finish the game':near?");
replace('then meet at the picnic blanket.', 'then press E on the picnic blanket to sit down. Finish every task before sitting to win.');
replace('Talk / collect</footer>', 'Talk / collect / sit</footer>');
fs.writeFileSync(path,s);fs.writeFileSync('work/game-check.js',s.match(/<script>([\s\S]*?)<\/script>/)[1]);
