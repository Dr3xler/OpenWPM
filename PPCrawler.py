
from automation import CommandSequence, TaskManager
import csv

# The list of sites that we wish to crawl
NUM_BROWSERS = 5

#loading the .csv file into an array
sites = []

with open('/home/pp/OpenWPM/csv/TOP100.csv') as csvDataFile:
	csvReader = csv.reader(csvDataFile)
	for row in csvReader:
		sites.append(row[0])

#if array[0] != "http://www.google.de":

sites.pop(0)
sites.insert(0,'http://www.google.de')




# OLD:
#sites = ['https://www.java.com/',
#	'https://www.google.de/']



# Loads the default manager params
# and NUM_BROWSERS copies of the default browser params
manager_params, browser_params = TaskManager.load_default_params(NUM_BROWSERS)

# Update browser configuration (use this for per-browser settings)
# HTTP Requests and Responses are set to False due to cookie only search
for i in range(NUM_BROWSERS):
    # Record HTTP Requests and Responses
    browser_params[i]['http_instrument'] = True
    # Record cookie changes
    browser_params[i]['cookie_instrument'] = False
    # Record Navigations
    browser_params[i]['navigation_instrument'] = True
    # Record JS Web API calls
    browser_params[i]['js_instrument'] = True
    # Enable flash for all three browsers
    browser_params[i]['disable_flash'] = True
browser_params[0]['headless'] = True  # Launch only browser 0 headless

# Update TaskManager configuration (use this for crawl-wide settings)
manager_params['data_directory'] = '~/Desktop/'
manager_params['log_directory'] = '~/Desktop/'

# Instantiates the measurement platform
# Commands time out by default after 60 seconds
manager = TaskManager.TaskManager(manager_params, browser_params)

# Visits the sites
for site in sites:

    # Parallelize sites over all number of browsers set above.
    # (To have all browsers go to the same sites, add `index='**'`)
    command_sequence = CommandSequence.CommandSequence(site, reset=True)
    
    # Start by visiting the page

    command_sequence.get(sleep=3, timeout=60)
    command_sequence.recursive_dump_page_source()
    #command_sequence.recursive_dump_page_source() #for recursive Top Level Frame incl. all nested iframes


    # Run commands across the three browsers (simple parallelization)
    manager.execute_command_sequence(command_sequence)

# Shuts down the browsers and waits for the data to finish logging
manager.close()
