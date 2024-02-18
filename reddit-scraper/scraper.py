from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By

# enable the headless mode
options = Options()
options.add_argument('--headless=new')

# initialize a web driver to control Chrome
driver = webdriver.Chrome(
    service = ChromeService(ChromeDriverManager().install()),
    options = options
)

name = driver \
    .find_element(By.TAG_NAME, 'h1') \
    .text

# maxime the controlled browser window
driver.fullscreen_window()

# the URL of the target page to scrape
url = ('https://www.reddit.com/r/politics/comments/1at307p/trumps_hubris_has_brought_about_the_downfall_of/')

# connect to the target URL in Selenium resources
driver.get(url)
subreddit = {}
name = driver \
    .find_element(By.TAG_NAME, 'h1') \
    .text
print(name)

description = driver \
    .find_element(By.CSS_SELECTOR, 'h3._eYtD2XCVieq6emjKBH3m') \
    .get_attribute('innerText')
print(description)

name = driver \
    .find_element(By.TAG_NAME, 'h1') \
    .text
print(name)

    # scraping logic...
# close the browser and free up the Selenium resource
driver.quit()

print(subreddit)
