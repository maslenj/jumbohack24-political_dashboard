from selenium import webdriver
from selenium.webdriver.common.by import By
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Initialize the WebDriver
driver = webdriver.Chrome()

# Open the webpage
driver.get('https://www.reddit.com/r/politics/top/')

for i in range(20):
    driver.execute_script("window.scrollBy(0, arguments[0]);", 10000)
    time.sleep(2)
name = driver \
    .find_element(By.TAG_NAME, 'h1') \
    .text
print(name)

post_html_elements = driver.find_elements(By.TAG_NAME, 'article')
all_titles = []
for post_html_element in post_html_elements:
    # Find the comments section within each post
    comments_elements = post_html_element.find_elements(By.CSS_SELECTOR, 'faceplate-screen-reader-content')

    # Loop through each comments element and print its text
    for comments_element in comments_elements:
        comments = comments_element.get_attribute('innerText')
        all_titles.append(comments)
        print(comments)

# scraping logic...
for i in all_titles:
    print(i)

# Remember to close the WebDriver when you're done
driver.quit()

