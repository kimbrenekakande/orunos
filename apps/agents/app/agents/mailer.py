from langgraph.graph import END, START, StateGraph

from app.core.nodes import draft_node
from app.core.schemas import emailReq

flow = StateGraph(emailReq)

flow.add_node("draft", draft_node)

flow.add_edge(START, "draft")
flow.add_edge("draft", END)

graph = flow.compile()
