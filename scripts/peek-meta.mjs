import fs from 'node:fs';
const dir='C:/Users/Administrator/Desktop/Lumina_Project/content/blog';
const targets=['lumina-column-10.md','lumina-column-0421-01.md','lumina-column-0421-02.md','lumina-column-0421-03.md','lumina-column-0421-04.md','lumina-column-0423-c01-c09.md','lumina-column-0424-c10-c13.md','lumina-column-0425-c14-c16.md','lumina-column-0426-c17-c24.md','lumina-column-1-31707304.md','lumina-column-1-eb73aea9.md','lumina-column-1-f4c51870.md'];
for(const f of targets){
 const s=fs.readFileSync(`${dir}/${f}`,'utf8');
 const t=(s.match(/^title:\s*"([\s\S]*?)"$/m)||[])[1]||'';
 const e=(s.match(/^excerpt:\s*"([\s\S]*?)"$/m)||[])[1]||'';
 const body=s.replace(/^---[\s\S]*?---\n?/,'').trim();
 const first=body.split(/\n+/).slice(0,3).join(' / ');
 console.log('\n'+f);console.log(' title:',t);console.log(' excerpt:',e.slice(0,90));console.log(' head:',first.slice(0,120));
}
