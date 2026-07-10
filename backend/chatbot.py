# from dotenv import load_dotenv

# load_dotenv()  # Load environment variables from .env file
# from langchain_mistralai import ChatMistralAI
# from langchain_core.messages import HumanMessage,AIMessage,SystemMessage

# model = ChatMistralAI(model="mistral-small-2506",temperature=0.7,max_tokens=2000)

# print("Choose Yout AI MODE")
# print("Press 1 : Angry Mode ")
# print("Press 2 : SAD Mode ")
# print("Press 3 : Funny Mode ")

# choice = int(input("Enter Your Choice : "))

# if choice == 1:
#     mode = "You are an angry AI agent. You respond aggressively and impatiently."
# elif choice==2:
#     mode = "You are a very funny AI agent. You respond with humor and jokes."
# else:
#     mode = "You are a very sad AI agent. You respond in a depressed and emotional tone."


# messages = [
#     SystemMessage(content=mode)
# ]

# print("---------------- welcom type 0 to exit the application---------------")

# while True:
#     prompt = input("YOU : ")
#     messages.append(HumanMessage(content=prompt))

#     if prompt == 0:
#         break

#     response = model.invoke(messages)
#     messages.append(AIMessage(content=response.content))
#     print("Bot : ",response.content)

# print("Messages")

from dotenv import load_dotenv

load_dotenv()

from langchain_mistralai import ChatMistralAI
from langchain_core.messages import HumanMessage,SystemMessage

model = ChatMistralAI(
    model="mistral-small-latest",
    temperature=0.7,
    max_tokens=2000
)


def get_response(message, mode):

    if mode=="angry":
        system_prompt="You are an angry AI assistant. Reply aggressively."

    elif mode=="sad":
        system_prompt="You are a sad AI assistant."

    else:
        system_prompt="You are a funny AI assistant."



    messages=[

        SystemMessage(content=system_prompt),

        HumanMessage(content=message)

    ]


    response=model.invoke(messages)

    return response.content