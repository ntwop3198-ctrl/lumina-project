import fs from 'node:fs';
const dir='C:/Users/Administrator/Desktop/Lumina_Project/content/blog';
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.md'));
for(const f of files){
 const s=fs.readFileSync(`${dir}/${f}`,'utf8');
 const m=s.match(/^title:\s*"([\s\S]*?)"$/m);
 const t=m?m[1]:'';
 if (t==='루미나(Lumina) 칼럼' || t==='루미나 칼럼 시리즈' || t==='[기고문] 가면을 벗은 진실, 그 ‘미친’ 정직함에 대하여') {
  console.log(`${f} => ${t}`);
 }
}
