const fs=require('fs');let s=fs.readFileSync('outputs/catnip-commons.html','utf8');
const start=s.indexOf('box(c.x-.16,y+.64');const end=s.indexOf('box(c.x+.35,y+.22',start);
if(start<0||end<0)throw Error('Face not found');
s=s.slice(0,start)+`// Keep facial details in front of the whole head, including the far eye.
+function detail(x,h,w,height,color){let first=faces.length;box(x,h,c.z+.535,w,height,.035,[color,color,color]);for(let i=first;i<faces.length;i++)faces[i].depth=c.x+c.z+y+1.42;}
+for(const offset of [-.17,.17]){detail(c.x+offset,y+.63,.12,.14,'#fff8df');detail(c.x+offset,y+.65,.065,.09,'#283e36');detail(c.x+offset-.012,y+.71,.023,.025,'#ffffff');}
+detail(c.x,y+.52,.085,.065,'#b97378');`.replaceAll('\n+','\n')+s.slice(end);
const marker='function tree(x,z)';
s=s.replace(marker,`// Extruded silhouettes keep the supplies three-dimensional and recognizable.
function silhouette(x,y,z,outline,thickness,colors){const back=outline.map(p=>[x+p[0],y+p[1],z-thickness/2]),front=outline.map(p=>[x+p[0],y+p[1],z+thickness/2]);face(back,colors[1]);for(let j=0;j<outline.length;j++){let k=(j+1)%outline.length;face([back[j],back[k],front[k],front[j]],colors[1]);}face(front,colors[0]);}
function supply(i,y){if(i.name==='Fish'){
+silhouette(i.x,y,i.z,[[-.38,.19],[-.16,.04],[.17,.04],[.34,.18],[.17,.32],[-.16,.32]],.17,['#8cc5cb','#649fa9']);
+silhouette(i.x,y,i.z,[[-.3,.18],[-.57,.02],[-.57,.35]],.12,['#74b2bf','#548c9b']);
+silhouette(i.x,y,i.z,[[-.06,.3],[.05,.46],[.17,.3]],.10,['#6a9cae','#527e92']);
+let first=faces.length;box(i.x+.2,y+.2,i.z+.105,.065,.065,.022,['#253c43','#253c43','#253c43']);for(let j=first;j<faces.length;j++)faces[j].depth=i.x+i.z+y+1;
+}else if(i.name==='Catnip'){
+box(i.x,y,i.z,.045,.62,.045,['#62884d','#4f753d','#62884d']);
+for(let j=0;j<3;j++){let h=.13+j*.17;for(const side of [-1,1])silhouette(i.x,y+h,i.z+.035,[[0,0],[side*.17,-.025],[side*.32,.12],[side*.13,.16]],.045,['#80ad60','#567e43']);}
+silhouette(i.x,y+.52,i.z,[[0,0],[-.1,.13],[0,.25],[.1,.13]],.06,['#93bb70','#628b4d']);
+}else box(i.x,y,i.z,.4,.3,.4,[i.color,i.color,i.color]);}
+` .replaceAll('\n+','\n')+marker);
s=s.replace('box(i.x,y,i.z,.4,.3,.4,[i.color,i.color,i.color]);labels.push','supply(i,y);labels.push');
fs.writeFileSync('outputs/catnip-commons.html',s);fs.writeFileSync('work/game-check.js',s.match(/<script>([\s\S]*?)<\/script>/)[1]);
