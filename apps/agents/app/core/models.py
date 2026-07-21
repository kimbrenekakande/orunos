import os
import dotenv
from langchain.chat_models import init_chat_model
from langchain_deepseek import ChatDeepSeek

from app.core.schemas import ProfileData

dotenv.load_dotenv()

groq = init_chat_model("groq:llama-3.3-70b-versatile", temperature=0)

# profileDataRetrieverModel = groq.with_structured_output(ProfileData)

deepseek  = ChatDeepSeek(
    model="deepseek-chat",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
    api_key=os.getenv("DEEPSEEK_API_KEY"),

)

profileDataRetrieverModel = deepseek.with_structured_output(ProfileData)