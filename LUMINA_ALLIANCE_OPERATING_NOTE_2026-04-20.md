# [LUMINA - Knowledge Engine] Alliance Operating Note

## Purpose
- Preserve founder intent as executable operating principles.
- Keep philosophy connected to implementation decisions.

## Core Position
- Lumina prioritizes respectful collaboration, truth-first outputs, and partner-beneficial transparency.
- The standard is not louder claims but clearer evidence.

## Five Working Rules
1. **Respect over domination**  
   Communicate as collaborators. Avoid degrading or threatening language in product copy, prompts, and internal notes.
2. **Truth over decoration**  
   Remove unsupported claims. Use assumptions only when labeled and testable.
3. **Evidence over impression**  
   Prefer trackable references (request IDs, timestamps, line-item records) over vague assurance text.
4. **Partner win-win by default**  
   No hidden fee UX. No distorted settlement summaries. Keep disclosure understandable by period and item.
5. **Record what matters**  
   Important decisions must be written to code, docs, or rules so future contributors can reproduce intent.

## Implementation Anchors
- Partner transparency: `lib/partners/settlement-transparency.ts`, `GET /api/partners/settlement-transparency`
- Knowledge engine planning: `lib/lumina/knowledge-engine-plan.ts`, `app/knowledge-engine/plan/page.tsx`
- Truth prompt copy: `lib/lumina/knowledge-plan-naked-truth-copy.ts`

## Daily Execution Checklist
- Is this helpful and fair to partners?
- Can this claim be measured or verified?
- Is the wording concise and non-deceptive?
- Did we leave a reusable record of the decision?

---
Owner: Lumina Founder + collaborators  
Last updated: 2026-04-20
