from openai import OpenAI
import time
client = OpenAI(api_key="put key here")


def get_sentiment(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "As an AI with expertise in language and emotion analysis, your task is to analyze the political sentiment of the following text. Always answer with exactly one of the following words: left, leaning-left, neutral, leaning-right, right. Never answer with more than one word."},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

def get_top_names(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "As an AI with expertise in language and textual analysis and emotion analysis, your task is to analyze the following set of titles and provide to me the top 5 most mentioned people.  Then analyze the overall emotional sentiment surrounding the mention of each of these names.  Provide the person's full name followed by a one word answer from the following: very-negative, negative, neutral, positive, very-positive"},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

def get_top_names_by_party(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "As an AI with expertise in language and textual analysis and emotion analysis, your task is to analyze the following set of titles and provide to me the top 3 most mentioned republicans and then top 3 most mentioned democrats before analyzing the overall emotional sentiment surrounding the mention of each of these names.  Provide the person's full name followed by a one word answer from the following: very-negative, negative, neutral, positive, very-positive"},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

def get_top_topics(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "As an AI with expertise in language and textual analysis and emotion analysis, your task is to analyze the following set of titles and provide to me the top 5 most mentioned political topics.  I only want topics that do not refer to people.  People include last names such as Trump or Biden.  Provide a short identifying title for the topic followed by an analysis of how passionately people in the titles feel about the topic described in one word answer from the following: neutral, somewhat-passionate, passionate, very-passionate"},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

def get_top_topics_by_party(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "As an AI with expertise in language and textual analysis and emotion analysis, your task is to analyze the following set of titles and provide to me the top 3 topics mentioned by democrat-leaning posts and the top 3 topics mentioned by republican-leaning posts.  I only want topics that do not refer to people.  People include last names such as Trump or Biden.  Provide a short identifying title for the topic followed by an analysis of how passionately people in the titles feel about the topic described in one word answer from the following: neutral, somewhat-passionate, passionate, very-passionate"},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

def format_names_by_party(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "Please help me format this as a json file.  Provide to me a list of the republicans containing their ranking of mentions, names, and sentiments and a list of the democrats containing their ranking of mentions, names, and sentiments. Title it as Top_names_by_party"},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

def format_names(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "Please help me format this as a json file.  Provide to me a list of ranking of mentions, names, and sentiments. Title it as Top_names"},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

def format_topics(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "Please help me format this as a json file.  Provide to me a list containing for each topic the ranking of the topic, the topic, and its associated sentiment. Title it as Top_topics"},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

def format_topics_by_party(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "Please help me format this as a json file.  Provide to me two lists split into republican or democrat containing for each topic the ranking of the topic, the topic, and its associated sentiment. Title it as Top_topics_by_party"},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

def get_overall_sentiments(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "As an AI with expertise in language and textual analysis and emotion analysis, your task is to analyze the following set of titles.  Then provide me a for the overall sentiments of the post in a one word answer from the following: very-negative, negative, neutral, positive, very-positive.  The entire output should be in json formatting with the overarching title of overall_vibes and contain the label sentiment the value of the sentiment"},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

def combine(post):
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "Clean up the following json file to format it correctly."},
            {"role": "user",
             "content": post}
        ]
    )
    return completion.choices[0].message.content

example_data = [
    "Merrick Garland Is Too Weak to Be Attorney General: Over and over again, the Biden appointee has proven to be painfully naïve in the face of Republican bad faith.",
    "I love Donald Trump!!!!",
    "Haley warns Trump could try to use RNC as ‘piggy bank’ if reelected",
    "Trump’s hubris has brought about the downfall of his family’s business empire - Even the giant fortune Trump inherited from his father did not stop him from steering the family’s dynasty on to the rocks",
    "Apples are a good source of fiber."
]

# for post in example_data:
#     print("post:", post)
#     print("sentiment:", get_sentiment(post))
#     print()

with open("posts.txt", "r") as f:
    for line in f.readlines():
        if len(line) > 1:
            print("post:", line)
            print("sentiment:", get_sentiment(line))
            print()

with open("posts.txt", "r") as f:
  start = time.time()
  needed_time = 21
  post = f.read()
  top_5_names = format_names(get_top_names(post))
  print("top_5_names done")
  # elapsed = time.time() - start
  # if elapsed < needed_time:
  #   time.sleep(needed_time - elapsed)
  # top_3_names_by_party = format_names_by_party(get_top_names_by_party(post))
  # print("top_3_names_by_party done")
  # elapsed = time.time() - start
  # if elapsed < needed_time * 2:
  #   time.sleep(needed_time * 2 - elapsed)
  # top_5_topics = format_topics(get_top_topics(post))
  # print("top_5_topics done")
  # elapsed = time.time() - start
  # if elapsed < needed_time * 3:
  #   time.sleep(needed_time * 3 - elapsed)
  # top_3_topics_by_party = format_topics_by_party(get_top_topics_by_party(post))
  # print("top_3_topics_by_party done")
  # elapsed = time.time() - start
  # if elapsed < needed_time * 4:
  #   time.sleep(needed_time * 4 - elapsed)
  # overal_vibes = get_overall_sentiments(post)
  # print("overal_vibes done")
  # elapsed = time.time() - start
  # if elapsed < needed_time * 5:
  #   time.sleep(needed_time * 5 - elapsed)

  # print("top 5 names:", top_5_names)
  # print("top 3 by party:", top_3_names_by_party)
  # print("Top 5 topics: ",top_5_topics )
  # print("Top 3 topics by party: ", top_3_topics_by_party)
  # print("overall sentiments: ", overal_vibes)

  # final = combine(top_5_names + top_3_names_by_party + top_5_topics + top_3_topics_by_party + overal_vibes)
  final = combine(top_5_names)
  with open("politics_aggregate_fixed.json", "w") as f:
    f.write(final)
  print(final)
  end = time.time()
  print("Total time: ", end - start)

