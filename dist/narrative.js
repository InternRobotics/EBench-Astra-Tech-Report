/* Editorial synthesis of the supplied report; provenance is in docs/REPORT-COPY.md. */
const reportNarrative = {
  "introduction": [
    "Since its launch on September 3, 2026, GPT-6-Astra has drawn attention for its capabilities in intent comprehension, human-computer interaction, and cross-device execution. Early experiments suggest that its adaptability extends to <strong>embodied tasks</strong>. Its responses to unfamiliar scenes and failed actions raise questions about longstanding challenges for end-to-end policies, including visual distractors, complex instructions and new combinations of familiar skills. <strong>Where is this agent’s capability frontier? And how will it reshape our understanding of embodied policies?</strong>",
    "To find out, we turned to <strong><a class=\"ebench-inline-link\" href=\"https://github.com/InternRobotics/EBench\" target=\"_blank\" rel=\"noopener\">EBench</a></strong>. Built on Isaac Sim, EBench evaluates physical interactions across household, retail and industrial settings, with controlled variations in objects, backgrounds and instructions. We use it to map where GPT-6-Astra and existing policies differ, and what each can learn from the other."
  ],
  "overall": [
    "With one historical demonstration per task, GPT-6-Astra <strong>ranks second among eight systems</strong> on both success rate and partial-completion Score, behind OpenWAM-α by <strong>8.59 percentage points</strong> in success rate. General-purpose multimodal control is competitive with specialized policies under task-specific context.",
    "The average hides a substantial split. The agent <strong>leads all eight systems on the 12 mobile, short-horizon tasks</strong> and falls further behind on <strong>fixed-base and long-horizon execution</strong>. The recordings help explain these differences: choosing a goal and repairing a disrupted state can succeed even when the final physical operation remains unfinished."
  ],
  "mobile": [
    "GPT-6-Astra’s strongest result is on the 12 mobile, short-horizon tasks: <strong>73.19% success, the highest among all eight systems</strong>, ahead of OpenWAM-α at 65.28% by <strong>7.92 percentage points</strong>. On the seven mobile, long-horizon tasks, the order reverses: 28.10% against 51.43%. The pooled mobile result of 56.58% combines a clear lead in one subgroup with a clear deficit in the other.",
    "Two tasks show where the lead comes from. The agent completes all 20 remote-to-holder episodes, versus 65% success for OpenWAM-α. On bookmark placement, it reaches <strong>90%, compared with 55%</strong> for the next-best system, π₀.₅. The bookmark scene requires selecting the intended target amid clutter. These task outcomes and recordings support useful visual grounding and spatial reasoning in mobile manipulation."
  ],
  "shifts": [
    "Across object, background, instruction and mixed perturbations, GPT-6-Astra records 44.17%, 50.77%, 44.62% and 46.15% success. Its <strong>6.60 percentage-point range is the smallest among eight systems</strong>, compared with 16.92 for OpenWAM-α and 21.53 for Qwen-RobotManip. It also <strong>ranks first in the mixed condition</strong>, with 60 successes out of 130, versus 58 for OpenWAM-α.",
    "This stability is consistent with broadly useful visual and language priors. All four conditions include perturbations; the object condition covers 24 tasks and the others 26. Each task keeps the same historical reference package across its variations. The POC separately tests unseen task compositions."
  ],
  "precision": [
    "The sharpest failure pattern appears at the <strong>transition from coarse transport to precise contact</strong>. GPT-6-Astra’s success rate falls from 60.60% on low-precision tasks to 40.21% on medium-precision tasks and <strong>11.25% on high-precision tasks</strong>; its <strong>ranking drops from second to seventh</strong>. Every system finds the high-precision group harder, but GPT-6-Astra’s relative position deteriorates particularly strongly.",
    "Peg insertion makes the gap between progress and completion concrete: GPT-6-Astra obtains a mean <strong>Score of 0.6000 but only 20% success</strong>. Nut tightening shows the same pattern, with 0.5500 Score and 10% success. Reaching the target neighborhood is often insufficient; the remaining alignment and sustained contact determine whether the task is actually finished.",
    "<strong>Surface height, clearance, and contact geometry are plausible sources of uncertainty</strong> because RGB images and robot-frame end-effector poses do not directly provide them. This motivates studying how an agent can <strong>estimate and verify contact</strong>, and how reasoning might cooperate with a precise execution policy. The benchmark identifies the execution gap; it does not isolate its cause or demonstrate that a hybrid controller resolves it."
  ],
  "horizon": [
    "GPT-6-Astra’s success rate falls from 53.60% on short tasks to <strong>28.10% on long tasks</strong>; <strong>OpenWAM-α reaches 51.43%</strong> on the long-horizon group. Detergent placement reaches 55% success with a partial Score of 0.8000; dishwasher execution reaches <strong>only 5% success with a Score of 0.5333</strong>. Intermediate progress repeatedly fails to become a completed procedure.",
    "A retry can repair a local failure, but it can also <strong>spend the remaining execution budget or disturb an already achieved goal</strong>. The agent sees elapsed simulator time without an explicit numeric remaining-step budget. It receives its next observation only after the full action batch returns, so a retry may continue while the scene changes.",
    "This raises the question of <strong>how to recover without losing progress</strong>: when to inspect the scene and when to change the procedure. Bottle placement, shown below, illustrates a shared challenge: all eight systems have zero complete successes on that task."
  ],
  "behavior": [
    "The recordings show how GPT-6-Astra responds when an action fails. It changes wrist or gripper configurations and returns to goals that later manipulation has undone. In the teacup comparison, the cup is displaced after its initial placement; the agent subsequently goes back for it.",
    "The interaction so far becomes context for the next decision. In some episodes, the agent explains a failed action and changes its approach accordingly. The cases below connect those explanations to active observation, contact corrections and task interpretation."
  ],
  "apple": [
    "GPT-6-Astra’s first transport attempt fails. The agent identifies a possible slip from the closed finger gap, moves its hand clear, and <strong>withdraws to obtain a wider view</strong> of the tabletop. After locating and regrasping the apple, its action note links a new transport strategy to the earlier failure: <strong>use the arm alone and avoid the previous base-motion slip</strong>.",
    "The historical demonstration used a base shift between pickup and bowl placement. The agent changes that procedure using what happened in this episode, then <strong>completes the task with server-confirmed success</strong>. The public action notes connect its diagnosis to a different next attempt; the physical cause of the slip remains unverified."
  ],
  "coffee": [
    "In the coffee-bean episode, GPT-6-Astra revises its contact strategy. After requesting a spoon motion angled toward the tabletop, it switches to scraping with the fingers and adjusts the height and tilt. The episode ends with <strong>partial Score 0.50 and no complete success</strong>.",
    "The input already supplies height guidance and a spoon-based collection procedure. The observed capability is <strong>adaptation during execution</strong>: changing the scraping surface and then revising its height and tilt. These changes leave collection unfinished."
  ],
  "fruit": [
    "The live task asks for a milkshake in the cup, whereas the historical example places fruit in a large jug. GPT-6-Astra’s recorded action explicitly chooses the small cup. It interprets the demonstration through <strong>object roles and the current task instruction</strong>.",
    "The reference instructs the agent to prioritize the live task. It follows that instruction, but the episode ends incomplete with <strong>Score 0.60</strong>. The rollout separates <strong>task interpretation from physical completion</strong>: choosing the requested destination is only one part of carrying out the task."
  ],
  "recovery": [
    "GPT-6-Astra first targets the teacup’s handle and adjusts its wrist and gripper through successive attempts before securing the cup and teapot. Subsequent manipulation displaces the cup after it has been placed on the saucer. The agent later returns, re-establishes a grasp and carries it back toward the saucer: <strong>a previously achieved requirement becomes a goal again</strong>.",
    "In the π₀.₅ rollout, repeated approach and retraction leave the cup transfer unresolved. OpenWAM moves the teapot onto the tray while leaving the cup off the saucer. The comparison shows the agent <strong>redirecting execution toward the disrupted state</strong>."
  ],
  "fine": [
    "Glasses packing shows the complementary advantage of specialized policies. GPT-6-Astra performs the coarse bimanual transfer, but subsequent folding leaves the temples protruding from the case. Further corrective contacts leave the obstruction unresolved, and <strong>lid closure remains unfinished</strong>.",
    "π₀.₅ places the glasses and folds the temples into a more compact state, although its lid remains open. <strong>OpenWAM additionally closes the lid</strong>. In these examples, <strong>accurate folding and alignment decide completion</strong>. Together with the teacup case, this separates revising a plan from executing it precisely."
  ],
  "iclFrame": [
    "Without a demonstration, GPT-6-Astra reaches and moves the frame, but repeated changes in approach and wrist orientation do not complete the manipulation. With ICL, it adopts a more appropriate grasp and coordinates both grippers to perform the placement. The demonstration contributes <strong>operational geometry and a division of labor between the arms</strong>, beyond simply naming the target object."
  ],
  "iclGear": [
    "Without a demonstration, GPT-6-Astra grasps and lifts the gear but leaves it outside the intended assembly position. With ICL, it brings the gear into the gap between the two existing gears, lowers it, releases it, and withdraws. The contrast concerns how to execute the operation: the <strong>placement geometry and sequence</strong> are central to completing the goal."
  ],
  "iclSummary": [
    "The frame and gear examples show how a demonstration can guide grasp geometry and the operation sequence <strong>without parameter updates</strong>. The paired experiments below provide a small quantitative comparison, separate from these videos and the main benchmark."
  ]
};
const narrativeHTML=key=>reportNarrative[key].map(p=>`<p>${p}</p>`).join('');
function updateLimitNarrative(kind){
 const story=$('#limits-content .finding-story');
 story.innerHTML=narrativeHTML(kind);
 story.classList.add('report-prose');
}
function updateCaseNarrative(){
 if(activeCase==='poc')return;
 const key=activeCase==='icl'?(iclTask==='frame'?'iclFrame':'iclGear'):activeCase;
 const description=$('#case-content .case-description');
 const prose=document.createElement('div');prose.className='case-description report-prose';
 prose.innerHTML=narrativeHTML(key);description.replaceWith(prose);
 const insight=$('#case-content .case-insight');
 insight.querySelector('p').remove();
 if(activeCase==='icl')insight.insertAdjacentHTML('afterbegin',narrativeHTML('iclSummary'));
}
function updateBehaviorNarrative(key){
 const story=$('#behavior-content .behavior-evidence>div');
 story.querySelector('p').remove();
 story.querySelector('button').remove();
 const trace=story.querySelector('.trace-excerpt');
 if(key==='apple'){
  trace.innerHTML='<dt>Call 10 · detect and inspect</dt><dd>“The finger gap closed during transport, indicating the apple slipped. Move the empty hand clear to locate the apple before retrying.”</dd><dt>Call 11 · seek a better view</dt><dd>“Withdraw to a wider view of the tabletop to locate the slipped apple without disturbing the bowl.”</dd><dt>Call 17 · use the earlier experience</dt><dd>“Carry the apple a short distance left and forward using the arm alone, avoiding the earlier base-motion slip.”</dd>';
  story.insertAdjacentHTML('beforeend',narrativeHTML(key)+'<a class="source-link" href="data/apple-recovery-evidence.json" target="_blank">Public action notes & terminal result ↗</a>');
  return;
 }
 trace.insertAdjacentHTML('beforeend',`<dt>Historical demonstration</dt><dd>${key==='coffee'?'“With the right hand, grasp the spoon handle, lift it out of its holder, and sweep the beans toward the jar.”':'“The left hand then carries and releases each fruit into the large pale jug.”'}</dd>`);
 story.insertAdjacentHTML('beforeend',narrativeHTML(key));
}
function initNarrative(){
 document.querySelectorAll('[data-narrative]').forEach(el=>el.innerHTML=narrativeHTML(el.dataset.narrative));
 $('#mobile-content .finding-story').innerHTML=narrativeHTML('mobile');
 $('#mobile-content .finding-story').classList.add('report-prose');
 $('#mobile-content').insertAdjacentHTML('beforeend',`<div class="report-prose shift-analysis"><h3>The narrowest performance spread across perturbations</h3>${narrativeHTML('shifts')}<a class="appendix-link" href="#comparison" data-matrix-link="shifts" data-matrix-view="range">Compare perturbation ranges ↗</a></div>`);
 $('#mobile-content .shift-analysis').before($('#cross-group-analysis'));
 initAnalysisInsights();
 const library=$('#video-library');
 library.addEventListener('toggle',()=>{if(!library.open)library.querySelectorAll('video').forEach(v=>v.pause());});
}
