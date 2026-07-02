import urllib.request
import os

BASE_URL = "https://raw.githubusercontent.com/davila7/claude-code-templates/main/cli-tool/components/skills/creative-design/ui-ux-pro-max/"
TARGET_DIR = ".claude/skills/ui-ux-pro-max"

files = [
    # Data CSV files
    "data/styles.csv",
    "data/prompts.csv",
    "data/colors.csv",
    "data/charts.csv",
    "data/landing.csv",
    "data/products.csv",
    "data/ux-guidelines.csv",
    "data/typography.csv",
    "data/icons.csv",
    "data/react-performance.csv",
    "data/web-interface.csv",
    "data/ui-reasoning.csv",
    
    # Stacks CSV files
    "data/stacks/html-tailwind.csv",
    "data/stacks/react.csv",
    "data/stacks/nextjs.csv",
    "data/stacks/vue.csv",
    "data/stacks/nuxtjs.csv",
    "data/stacks/nuxt-ui.csv",
    "data/stacks/svelte.csv",
    "data/stacks/swiftui.csv",
    "data/stacks/react-native.csv",
    "data/stacks/flutter.csv",
    "data/stacks/shadcn.csv"
]

print("Starting download of UI/UX Pro Max data files...")

for file_path in files:
    url = BASE_URL + file_path
    local_path = os.path.join(TARGET_DIR, file_path)
    local_dir = os.path.dirname(local_path)
    
    if not os.path.exists(local_dir):
        os.makedirs(local_dir)
        
    print(f"Downloading {file_path}...")
    try:
        urllib.request.urlretrieve(url, local_path)
    except Exception as e:
        print(f"Error downloading {file_path}: {e}")

print("Done downloading all files!")
