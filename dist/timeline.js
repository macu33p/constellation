/* Dependency stages use strongly connected components, so cyclic references stay finite. */
(function(root){
  function stages(ids, edges) {
    const adjacency=new Map(ids.map(id=>[id,[]]));
    edges.forEach(([dependent, prerequisite])=>{if(adjacency.has(dependent)&&adjacency.has(prerequisite))adjacency.get(dependent).push(prerequisite)});
    let next=0;const index=new Map(),low=new Map(),stack=[],onStack=new Set(),components=[];
    function visit(id){index.set(id,next);low.set(id,next++);stack.push(id);onStack.add(id);
      for(const dependency of adjacency.get(id)){if(!index.has(dependency)){visit(dependency);low.set(id,Math.min(low.get(id),low.get(dependency)))}else if(onStack.has(dependency))low.set(id,Math.min(low.get(id),index.get(dependency)))}
      if(low.get(id)===index.get(id)){const component=[];let member;do{member=stack.pop();onStack.delete(member);component.push(member)}while(member!==id);components.push(component)}
    }
    ids.forEach(id=>{if(!index.has(id))visit(id)});
    const componentOf=new Map();components.forEach((members,i)=>members.forEach(id=>componentOf.set(id,i)));
    const levels=new Map();function level(i){if(levels.has(i))return levels.get(i);let result=0;for(const id of components[i])for(const dep of adjacency.get(id)){const j=componentOf.get(dep);if(i!==j)result=Math.max(result,level(j)+1)}levels.set(i,result);return result}
    return new Map(ids.map(id=>[id,{level:level(componentOf.get(id)),cycle:components[componentOf.get(id)].length>1||adjacency.get(id).includes(id)}]));
  }
  function model(data, visible, grouped){
    const ids=new Set(visible.map(n=>n.id)),groups=data.groups.filter(g=>visible.some(n=>n.group===g.id)||(!visible.length&&!data.nodes.length));
    let edges,items;
    if(grouped){items=groups.map(g=>({...g,title:g.name,group:g.id}));const pairs=new Map();for(const [a,b] of data.edges){if(!ids.has(a)||!ids.has(b))continue;const from=data.nodes.find(n=>n.id===a).group,to=data.nodes.find(n=>n.id===b).group;if(from===to)continue;const key=JSON.stringify([from,to]);const e=pairs.get(key)||{from,to,count:0};e.count++;pairs.set(key,e)}edges=[...pairs.values()];}
    else{items=visible;edges=data.edges.filter(([a,b])=>ids.has(a)&&ids.has(b)).map(([from,to])=>({from,to,count:1}));}
    // Rank against the full graph so filtering does not silently change issue stages.
    const ranks=grouped?stages(items.map(n=>n.id),edges.map(e=>[e.from,e.to])):stages(data.nodes.map(n=>n.id),data.edges);
    let y=100;const bands=[],rows=[];for(const group of groups){const members=items.filter(n=>n.group===group.id).sort((a,b)=>ranks.get(a.id).level-ranks.get(b.id).level||a.id.localeCompare(b.id));if(!members.length)continue;const start=y;y+=46;for(const n of members){rows.push({...n,...ranks.get(n.id),x:250+ranks.get(n.id).level*205,y,color:group.color});y+=66}bands.push({...group,y:start,height:y-start-8});y+=26}
    const maxLevel=Math.max(0,...rows.map(n=>n.level));return {rows,bands,edges,maxLevel,width:Math.max(850,250+maxLevel*205+330),height:Math.max(350,y+25)};
  }
  root.TimelineGraph={stages,model};if(typeof module!=='undefined')module.exports=root.TimelineGraph;
})(globalThis);
