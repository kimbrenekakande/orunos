from langgraph.graph import END, START, StateGraph

from app.core.nodes import plan_node, ref_node, rag_node, without_ref_draft_node, with_ref_draft_node
from app.core.schemas import DocState


flow = StateGraph(DocState)

flow.add_node("plan", plan_node)
flow.add_node("reffs", ref_node)
flow.add_node("withoutRef", without_ref_draft_node)
flow.add_node("withRef", with_ref_draft_node)
flow.add_node("rag", rag_node)

flow.add_edge(START, "plan")
flow.add_edge("plan", "reffs")
flow.add_edge("rag", "withRef")

flow.add_edge("withoutRef", END)
flow.add_edge("withRef", END)

graph = flow.compile()
