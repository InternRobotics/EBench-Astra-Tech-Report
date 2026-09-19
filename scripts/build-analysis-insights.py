"""Recompute report insights from unrounded per-task rates and episode outcomes."""
import csv,json,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];D=ROOT/'dist/data'
def build():
 tasks=json.loads((D/'tasks.json').read_text());episodes=json.loads((D/'astra-main-episodes.json').read_text());general=list(csv.DictReader((D/'report-generalization.csv').open(encoding='utf-8-sig')))
 names={'OpenWAM-Alpha':'OpenWAM-α','Astra (ICL)':'GPT-6-Astra','Qwen-RobotManip':'Qwen-RobotManip','Pi05':'π₀.₅','InternVLA-A1.5':'InternVLA-A1.5','Pi0':'π₀','GigaBrain-0.7':'GigaBrain-0.7','FastWAM':'Fast-WAM'}
 models=[{'id':k,'label':v} for k,v in names.items()];a='Astra (ICL)'
 groups=[]
 for id,label,pred in [('mobile-short','Mobile · Short',lambda t:t['mobility']=='Mobile' and t['horizon']=='Short Horizon'),('mobile-long','Mobile · Long',lambda t:t['mobility']=='Mobile' and t['horizon']=='Long Horizon'),('fixed-low-medium','Tabletop · Low / Medium',lambda t:t['mobility']=='Fixed' and t['precision']!='High'),('fixed-high','Tabletop · High',lambda t:t['mobility']=='Fixed' and t['precision']=='High')]:
  rows=[t for t in tasks if pred(t)];groups.append({'id':id,'label':label,'n':len(rows),'tasks':[t['task'] for t in rows],'rates':{k:sum(float(t[k+'_sr']) for t in rows)/len(rows)*100 for k in names}})
 rows=[]
 for t in tasks:
  rates={k:float(t[k+'_sr'])*100 for k in names};others=[v for k,v in rates.items() if k!=a];ep=[e for e in episodes if e['task']==t['task']]
  rows.append({'task':t['task'],'mobility':t['mobility'],'horizon':t['horizon'],'precision':t['precision'],'rates':rates,'rank':1+sum(v>rates[a]+1e-8 for v in others),'ties':sum(abs(v-rates[a])<1e-8 for v in others),'gap':rates[a]-max(others),'n':len(ep),'success':sum(e['sr']==1 for e in ep),'partial':sum(e['sr']==0 and e['score']>0 for e in ep),'zero':sum(e['score']==0 for e in ep)})
 shifts=[]
 for k,label in names.items():
  source={'Pi05':'π₀.₅','Pi0':'π₀','FastWAM':'FastWAM'}.get(k,k)
  selected=[g for g in general if g['System']==source];assert len(selected)==4,(source,len(selected))
  conditions=[{'label':g['Condition'],'sr':float(g['SR (%)']),'tasks':int(g['Tasks']),'episodes':int(g['Episodes'])} for g in selected]
  shifts.append({'id':k,'label':label,'conditions':conditions,'range':max(g['sr'] for g in conditions)-min(g['sr'] for g in conditions)})
 result={'models':models,'groups':groups,'tasks':rows,'perturbations':shifts,'source_sha256':{f:hashlib.sha256((D/f).read_bytes().replace(b'\r\n',b'\n')).hexdigest() for f in ['tasks.json','astra-main-episodes.json','report-generalization.csv']}}
 (D/'analysis-insights.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print('Recomputed 4 cross-groups, 26 task gaps/outcome distributions and 8 perturbation ranges.')
if __name__=='__main__':build()
