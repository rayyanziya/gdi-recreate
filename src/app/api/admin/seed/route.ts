import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

const CONTENT = `Many growing companies believe that implementing an ERP system will solve their operational problems.
In reality, they often end up with multiple systems that still do not communicate effectively. Sales uses one tool, finance uses another, operations rely on spreadsheets, and approvals happen through chat messages. The systems exist, but the flow between them remains fragmented.
The issue is not the absence of software.
It is the absence of orchestration.

---

## Systems Are Not the Same as Process

Most organizations think in terms of systems. They implement ERP, CRM, accounting tools, and sometimes additional custom software. Each system performs its function well in isolation.
The issue is that businesses don't operate as isolated systems. They operate through processes that cross approval, inventory, finance, and delivery. Even in relatively small companies, that flow rarely sits neatly inside one system. It is spread out, partially structured, partially informal.
Over time, this creates a gap. Systems are in place, but the actual flow of work is:
- Unclear
- Inconsistent
- Difficult to observe end-to-end

And when something goes wrong, it is hard to know where or why.

---

## The Invisible Layer: Orchestration

What most companies are lacking is not another tool, but a layer that defines how work actually moves.
This is where orchestration comes in.
Instead of focusing on what each system does individually, orchestration looks at the flow as a whole. It defines what happens first, what comes next, where decisions are made, and how different systems and people are involved along the way.
Without this layer, processes tend to rely on habit and memory. With it, they become something that can be:
- Explicitly defined
- Monitored in real time
- Improved over time

That shift alone changes how a company operates.

---

## A Practical Way to Implement It

There are tools built specifically for this purpose, such as Camunda. But it is important to understand their role correctly.
Camunda does not replace your ERP, your CRM, or any other system you already use. It sits above them and coordinates how they interact.
In practice, it allows a company to:
- Define workflows clearly
- Connect systems through APIs
- Include human steps where judgment is required

More importantly, it makes every process visible. You can see where something is, what step it is in, and where delays are happening.
The value is not in adding another system.
It is in making the existing ones work together.

---

## Why ERP Alone Is Not Enough

ERP systems are powerful in what they are designed to do. They handle data, transactions, and core business functions with a high level of structure.
But as a company grows, its processes rarely stay within the boundaries of a single system. There are external services to connect, custom logic to apply, and multiple layers of approval that do not always fit neatly into predefined modules.
What often happens is subtle at first, then accumulates:
- Manual workarounds begin to appear
- Certain steps move outside the system
- Decisions happen informally

Over time, the structure weakens — not because the system fails, but because the process outgrows it.

---

## The Cost of Leaving It Unstructured

When processes are not clearly defined and coordinated, the impact shows up in ways that feel operational, but are actually structural.
You start to see:
- Delays caused by unclear handovers
- Repeated errors in routine tasks
- Bottlenecks that no one can fully explain
- Dependency on specific individuals

These are not isolated issues. They are symptoms of a missing layer.

---

## Moving Toward Coordinated Systems

At some point, improving operations is no longer about adding more tools. It is about making sense of what is already there.
Orchestration provides a way to do that. It brings clarity to how processes run, where automation makes sense, and where human involvement is still essential. It turns a collection of systems into something closer to a coherent operating model.
At GDI, this is how modern system design is approached — not as a set of isolated applications, but as a connected environment where processes are defined, visible, and intentionally managed.

---

## Conclusion

The future of business systems is not about accumulating more software.
It is about making existing systems work together in a way that reflects how the business actually operates.
Orchestration is what makes that possible.`;

export async function GET() {
  const { data: existing } = await supabase
    .from("articles")
    .select("id")
    .eq("slug", "erp-is-not-enough-the-case-for-process-orchestration")
    .maybeSingle();

  if (existing)
    return NextResponse.json({ message: "Already seeded" });

  const { error } = await supabase.from("articles").insert({
    slug: "erp-is-not-enough-the-case-for-process-orchestration",
    title: "ERP Is Not Enough: The Case for Process Orchestration",
    excerpt:
      "Many companies implement multiple systems, yet their operations remain fragmented. This article explores why orchestration is the missing layer that connects systems, processes, and people.",
    content: CONTENT,
    category: "Orchestration",
    tags: JSON.stringify([
      "Orchestration",
      "Workflow",
      "Business Process",
      "System Architecture",
      "Digital Transformation",
    ]),
    author: "Anargya Raakan M",
    author_role: "CEO",
    published: true,
    published_at: new Date().toISOString(),
  });

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true, message: "First article seeded" });
}
