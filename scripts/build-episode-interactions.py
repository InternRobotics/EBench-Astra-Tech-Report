"""Export complete public tool sequences and map encoded frames to execution chunks."""
import hashlib,json,re,subprocess,zipfile
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SPECS=[
 ('apple_to_fruit_bowl_006','Recovering a slipped apple','A changed transport strategy follows a failed grasp. The episode ends in success.',[(1,'First grasp'),(9,'Transport'),(10,'Slip detected'),(17,'Revised strategy'),(20,'Final result')]),
 ('collect_coffee_beans_013','Exploring contact','The agent changes tools and contact poses, but does not complete the task.',[(1,'Position the jar'),(21,'Spoon contact'),(30,'Switch to fingers'),(46,'Adjust contact'),(54,'Final result')]),
 ('fruit_015','Adapting through a long task','Fruit placement, recovery and vessel manipulation unfold across 66 calls; the final score is 0.6.',[(1,'Initial grasp'),(8,'Select the cup'),(12,'Recover fruit'),(56,'Change vessel grasp'),(66,'Final result')])]
def main():
 out=ROOT/'dist/data/episodes';out.mkdir(exist_ok=True);index=[]
 with zipfile.ZipFile(ROOT/'astra_web_evidence_20260918_core.zip') as z:
  for ep,title,description,bookmarks in SPECS:
   prefix=f'astra_web_evidence_20260918/evidence/main/episodes/{ep}/'
   names=['episode_summary.json','public-action-records.json','waypoints.jsonl','policy-initial_prompt.txt']
   raw={n:z.read(prefix+n) for n in names};summary=json.loads(raw[names[0]]);actions=json.loads(raw[names[1]])
   waypoints=[json.loads(x) for x in raw[names[2]].splitlines()]
   chunks=[c for w in waypoints for c in w['chunks']];step=0;frames=[]
   for c in chunks:
    start=step;step+=c['executed_steps']
    if 'after' in c:
     assert c['after']['timestep']==step
     frames.append({'start_step':start,'end_step':step})
    else: assert c.get('episode_result') is not None
   assert step==summary['policy_physics_steps'] and summary['terminal_hold_steps']==0
   video=f'media/cases/{ep}-web.mp4'
   result=subprocess.run([str(ROOT/'analysis/ffmpeg.exe'),'-hide_banner','-i',str(ROOT/'dist'/video),'-map','0:v','-c','copy','-f','null','-'],capture_output=True,text=True,check=True)
   count=int(re.findall(r'frame=\s*(\d+)',result.stderr)[-1]);assert count==len(frames)
   assert re.search(r'\b4 fps',result.stderr)
   previous=0;calls=[]
   for i,a in enumerate(actions):
    response=a['response_summary'];end=response['physics_steps'];assert end>=previous
    indices=[j for j,f in enumerate(frames) if f['end_step']>previous and f['end_step']<=end]
    assert indices
    clean_response={k:response[k] for k in ['success','waypoints','physics_steps'] if k in response}
    clean_response['episode_results']=[{k:r[k] for k in ['sr','score']} for r in response.get('episode_results',[])]
    calls.append({'number':i+1,'id':a['call'],'tool':a['tool'],'arguments':a['arguments'],'response':clean_response,'start_step':previous,'end_step':end,'video_start':indices[0]/4,'video_end':(indices[-1]+1)/4,'request_sha256':a['source_request_sha256']})
    previous=end
   assert previous==step and calls[-1]['video_end']==len(frames)/4
   item={'id':ep,'task':summary['task'],'seed':summary['seed'],'title':title,'description':description,'instruction':summary['server_instruction'],'result':{k:summary['server_result'][k] for k in ['sr','score']},'video':video,'duration':len(frames)/4,'fps':4,'frame_count':len(frames),'video_sha256':hashlib.sha256((ROOT/'dist'/video).read_bytes()).hexdigest(),'physics_steps':step,'physics_hz':30,'bookmarks':[{'call':n,'label':l} for n,l in bookmarks],'initial_prompt':raw[names[3]].decode(),'calls':calls,'source':{'archive':'astra_web_evidence_20260918_core.zip','path':f'evidence/main/episodes/{ep}/','sha256':{n:hashlib.sha256(b).hexdigest() for n,b in raw.items()}},'alignment':{'method':'Recorded nonterminal execution chunks in order, one video frame per returned state; frame counts checked against each encoded video. The terminal result has no additional video frame.','frames':frames},'scope':'Complete archived public tool-call sequence and initial task prompt. Response summaries are preserved; the execution video is not a reconstruction of all model input images.'}
   text=json.dumps(item,ensure_ascii=False,indent=2)+'\n'
   assert not re.search(r'outputs/|/home/|api_key|Bearer ',text)
   (out/f'{ep}.json').write_text(text,encoding='utf-8')
   index.append({k:item[k] for k in ['id','title','description']})
   print(ep,len(calls),'calls,',len(frames),'aligned frames')
 (out/'index.json').write_text(json.dumps(index,indent=2)+'\n',encoding='utf-8')
if __name__=='__main__':main()
