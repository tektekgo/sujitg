# How to Use the OneNote MCP Server
### A Practical Guide: Setup, Walkthrough, and Prompt Library

---

> **Who this is for:** Anyone who uses Microsoft OneNote with a personal Microsoft account (Outlook.com, Hotmail, or Live.com) and wants to use Claude AI to organize, navigate, or work with their notebooks — without any prior developer experience required.

---

## Part 1: The Before Picture — Why This Exists

Before we set anything up, let's talk about the problem this solves.

OneNote is a great tool for capturing information. The problem is that over time, most people's notebooks end up looking something like this:

```
My Notebook
├── Work
├── Personal
├── Misc
├── Misc 2
├── 2023 stuff
├── Ideas
├── temp
├── Projects
├── OLD Projects
└── (47 more sections...)
```

Everything is *in there* — but finding anything requires either a lucky search or remembering exactly where you put it. Reorganizing it manually means opening hundreds of pages, reading each one, and moving them one by one. Nobody does that.

**What this tool enables:** You describe what you want to Claude in plain English — *"move all my Kubernetes notes into a section called HomeLab-K8s"* — and Claude does the work. It reads each page, understands what it's about, and moves it to the right place.

**The before and after:**

*Before:* Flat, inconsistent sections accumulated over years, no naming convention, no grouping logic.

*After:* Structured section groups (e.g., HomeLab, Projects, Dev-Tools, Personal, Reference), each with consistently named sections, pages where they logically belong.

---

## Part 2: What You Need Before You Start

You need four things. None of them cost money.

| What | Why you need it |
|------|----------------|
| A Microsoft account | To access your OneNote notebooks |
| Python 3.8 or newer | To run the MCP server on your computer |
| An Azure App Registration | Gives the server permission to access your OneNote |
| Claude Desktop | The AI interface that connects to the server |

---

## Part 3: One-Time Setup (Do This Once)

### How to Open a Terminal

Almost every step below requires typing commands into a terminal. Here's how to open one:

**On Windows — use PowerShell:**
1. Press the **Windows key**
2. Type `PowerShell`
3. Click **Windows PowerShell** to open it

> ✅ You do **not** need to run it as Administrator for any of these steps.

You'll see a window with a prompt that looks like this:
```
PS C:\Users\YourName>
```
Everything after the `>` is where you type your commands.

**On Mac — use Terminal:**
1. Open **Finder**
2. Go to **Applications → Utilities**
3. Open **Terminal**

You'll see a prompt that looks like this:
```
yourname@MacBook ~ $
```
Everything after the `$` is where you type your commands.

---

### Step 1 — Install Python

**On Windows:**
1. Go to **python.org/downloads** in your browser
2. Click the big yellow **"Download Python 3.x.x"** button
3. Run the downloaded installer
4. **Important:** On the first screen of the installer, check the box at the bottom that says **"Add Python to PATH"** before clicking Install
5. Click **Install Now**

**On Mac:**
1. Go to **python.org/downloads** in your browser
2. Click the **"Download Python 3.x.x"** button for macOS
3. Run the downloaded `.pkg` installer and follow the prompts

**Verify Python installed correctly** — open a terminal and type:

*Windows (PowerShell):*
```
PS C:\Users\YourName> python --version
```

*Mac (Terminal):*
```
$ python3 --version
```

You should see something like `Python 3.11.4`. If you do, Python is ready.

> ⚠️ If Windows says `python` is not recognized, close and reopen PowerShell and try again. If it still doesn't work, you may have missed the "Add Python to PATH" checkbox — re-run the installer and check that box.

---

### Step 2 — Download the MCP Server

1. Go to **github.com/jisujit/onenote-mcp-server** in your browser
2. Click the green **Code** button
3. Click **Download ZIP**
4. Once downloaded, right-click the ZIP file and click **Extract All** (Windows) or double-click it (Mac)
5. Move the extracted folder somewhere easy to find — for example:
   - Windows: `C:\Users\YourName\onenote-mcp-server`
   - Mac: `/Users/YourName/onenote-mcp-server`

---

### Step 3 — Create a Virtual Environment

A virtual environment is an isolated space for this project's software. It keeps the server's dependencies separate from anything else on your computer and prevents conflicts.

**On Windows (PowerShell):**
```
PS C:\Users\YourName> cd C:\Users\YourName\onenote-mcp-server
PS C:\Users\YourName\onenote-mcp-server> python -m venv venv
```

**On Mac (Terminal):**
```
$ cd /Users/YourName/onenote-mcp-server
$ python3 -m venv venv
```

This creates a folder called `venv` inside your server folder. You only do this once.

---

### Step 4 — Activate the Virtual Environment

You need to activate the virtual environment before installing anything. The command is different on Windows and Mac:

**On Windows (PowerShell):**
```
PS C:\Users\YourName\onenote-mcp-server> venv\Scripts\activate
```

After activation, your prompt changes to show `(venv)` at the start — this tells you the virtual environment is active:
```
(venv) PS C:\Users\YourName\onenote-mcp-server>
```

**On Mac (Terminal):**
```
$ source venv/bin/activate
```

After activation, your prompt changes to show `(venv)`:
```
(venv) yourname@MacBook onenote-mcp-server $
```

> ✅ Always make sure you see `(venv)` in your prompt before running any pip commands.

---

### Step 5 — Install the Server's Dependencies

With the virtual environment active, install the required packages:

**Windows and Mac (same command):**
```
(venv) > pip install -r requirements.txt
```

You'll see a list of packages being downloaded and installed — that's normal. Wait for it to finish and return to the prompt.

---

### Step 6 — Create Your Azure App Registration

This step creates a "permission slip" that tells Microsoft it's okay for this server to access your OneNote. It takes about 5 minutes.

1. Go to **portal.azure.com** and sign in with your Microsoft account
2. In the search bar at the top, type **App registrations** and click it
3. Click **New registration**
4. Fill in the form:
   - **Name:** `OneNote MCP Server` (or any name you'll recognize)
   - **Supported account types:** Select **"Accounts in any organizational directory and personal Microsoft accounts"**
   - **Redirect URI:** Leave this blank
5. Click **Register**

You'll land on the app's overview page. **Copy the "Application (client) ID"** — it looks like:
```
a1b2c3d4-1234-abcd-5678-efgh12345678
```
Save this somewhere — you'll need it in the next step.

Now add the permissions:

6. In the left sidebar, click **API permissions**
7. Click **Add a permission → Microsoft Graph → Delegated permissions**
8. In the search box, search for and select each of these one at a time:
   - `Notes.Read`
   - `Notes.ReadWrite`
   - `Notes.ReadWrite.All`
9. Click **Add permissions**
10. Click **Grant admin consent for [your name]** → click **Yes**

---

### Step 7 — Configure the Server

1. Open your server folder in File Explorer (Windows) or Finder (Mac)
2. Find the file called `.env.example`
3. Make a copy of it and rename the copy to exactly `.env` (just `.env` — remove the word "example" including the dot before it)
4. Open `.env` in Notepad (Windows) or TextEdit (Mac)
5. Replace the placeholder text so it looks like this:
   ```
   CLIENT_ID=paste-your-client-id-here
   TENANT_ID=common
   ```
   Replace `paste-your-client-id-here` with the Application (client) ID you copied from Azure.

6. Save the file.

> ✅ Use `TENANT_ID=common` exactly as shown. This is required for personal Microsoft accounts — do not replace it with anything else.

---

### Step 8 — Find Your Claude Desktop Config File

Claude Desktop has a settings file where you tell it which MCP servers to use. This file is in a hidden folder on your computer.

**What is this file?**
It's a text file called `claude_desktop_config.json`. It tells Claude Desktop: "when you start, also connect to this MCP server." You'll add a few lines to it.

**Where is it?**

*On Windows:*
```
C:\Users\YourName\AppData\Roaming\Claude\claude_desktop_config.json
```

*On Mac:*
```
/Users/YourName/Library/Application Support/Claude/claude_desktop_config.json
```

> ⚠️ The `AppData` folder (Windows) and `Library` folder (Mac) are hidden by default. Here's how to reach them:

---

**On Windows — two options:**

*Option A (easiest — no settings change needed):*
1. Open **File Explorer**
2. Click in the address bar at the top (where it shows the folder path)
3. Delete what's there and type exactly:
   ```
   C:\Users\YourName\AppData\Roaming\Claude
   ```
   Replace `YourName` with your actual Windows username
4. Press Enter — the Claude folder opens directly

*Option B — show hidden files permanently:*
1. Open **File Explorer**
2. Click the **View** tab at the top
3. Click **Show** → check **Hidden items**
4. Now navigate to `C:\Users\YourName\AppData\Roaming\Claude`

---

**On Mac:**
1. Open **Finder**
2. Click **Go** in the menu bar at the top
3. Hold the **Option** key — you'll see **Library** appear in the dropdown
4. Click **Library**
5. Navigate to `Application Support → Claude`

---

### Step 9 — Edit the Claude Desktop Config File

Open `claude_desktop_config.json` in a text editor.

If the file is empty or brand new, paste this entire block:

**On Windows** (replace `YourName` with your actual Windows username):
```json
{
  "mcpServers": {
    "onenote": {
      "command": "C:\\Users\\YourName\\onenote-mcp-server\\venv\\Scripts\\python.exe",
      "args": ["C:\\Users\\YourName\\onenote-mcp-server\\src\\server.py"],
      "env": {
        "CLIENT_ID": "your-client-id-here",
        "TENANT_ID": "common"
      }
    }
  }
}
```

**On Mac** (replace `YourName` with your actual Mac username):
```json
{
  "mcpServers": {
    "onenote": {
      "command": "/Users/YourName/onenote-mcp-server/venv/bin/python",
      "args": ["/Users/YourName/onenote-mcp-server/src/server.py"],
      "env": {
        "CLIENT_ID": "your-client-id-here",
        "TENANT_ID": "common"
      }
    }
  }
}
```

> ⚠️ **Important:** The `command` field points to the Python inside your `venv` folder — not the system Python. This is critical. If you point to the wrong Python, Claude Desktop will fail to connect because it won't find the installed packages.

> ⚠️ **Windows note:** In the file paths above, use double backslashes `\\` everywhere in the JSON. A single backslash `\` will cause an error.

Save the file, then **fully quit and restart Claude Desktop**.

---

### Step 10 — First Run and Authentication

1. Open Claude Desktop
2. Look for the 🔌 tools icon — if you see **"onenote"** listed, the server connected successfully
3. Start a new conversation and type:
   ```
   List my OneNote notebooks
   ```
4. A browser window will open asking you to sign in to Microsoft — **this happens only once**
5. Sign in with your Microsoft account
6. Close the browser — Claude will now show your notebook names

**If you see your notebook names, you are fully set up.** Everything from here is just conversation.

---

## Part 4: How to Actually Use It

### The Core Idea

Think of Claude as a capable assistant with your OneNote open in front of them. You tell it what you want in plain English. It can:

- **Read** — browse notebooks, sections, pages, and understand their content
- **Create** — build new sections and section groups
- **Move** — clone pages from one section to another
- **Report** — summarize what's in a section, identify patterns, suggest structure

What it **cannot** do yet: delete pages, edit existing page content, or search full text across all notebooks.

---

### Starting a Reorganization Project

#### Phase 1: Understand What You Have

```
Show me all the sections in my [Notebook Name] notebook.
```

```
List all the pages in my "Misc" section. For each page,
tell me the title and a one-sentence summary of what it's about.
```

#### Phase 2: Design Your Target Structure

Before moving anything, describe where you want to end up:

```
I want to reorganize my notebook into the following structure:

Section Group: HomeLab
  - HomeLab-Network
  - HomeLab-Docker
  - HomeLab-Kubernetes

Section Group: Projects
  - Project-RentApp
  - Project-Finance

Section Group: Personal
  - Personal-Health
  - Personal-Notes

Can you create these section groups and sections for me?
```

Claude will create them one by one and confirm each one.

#### Phase 3: Move Pages

Once your structure exists, start routing pages:

```
Look at all the pages in my "Misc" section.
For each one, tell me which of my new sections it should go into
based on its content.
```

Claude will read each page and give you a routing plan. Review it, correct anything that's wrong, then:

```
That looks right. Go ahead and move them.
```

Claude will clone each page to its destination and confirm as it goes.

---

## Part 5: Prompt Library

### Discovery Prompts

```
List all the notebooks I have in OneNote.
```
```
Show me all the sections in [Notebook Name].
```
```
List all the pages in [Section Name] and give me a
one-sentence summary of each one.
```
```
I have a section called [Section Name]. Read through the pages
and tell me what topics are covered in there.
```

### Planning Prompts

```
Based on what you see in my [Section Name] section,
what categories would you suggest I organize these pages into?
```
```
I want to reorganize my notebook around these areas of my life:
[list your areas]. What section structure would you recommend?
```
```
Look at all my current sections. Which ones seem to have
overlapping content that could be merged?
```

### Execution Prompts

```
Create a new section called [Section Name] in my [Notebook Name] notebook.
```
```
Create the following section groups and sections in my notebook:
[paste your structure]
```
```
Move all the pages from [Source Section] to [Target Section].
```
```
Read each page in [Section Name] and move each one to the most
appropriate section from this list: [list your sections].
Ask me before moving anything you're not sure about.
```

### Verification Prompts

```
List all the pages now in [Section Name] to confirm the move worked.
```
```
How many pages are currently in each section of my [Section Group]?
```

---

## Part 6: Tips for a Smooth Reorganization

**Work in batches, not all at once.** Don't try to reorganize 200 pages in one session. Pick one messy section, clean it up, confirm it looks right, then move to the next.

**Create the structure before moving pages.** Always build your target section groups and sections first. It's much easier to route pages when the destinations already exist.

**Be the decision-maker on ambiguous pages.** Claude is good at understanding what a page is about, but you know your own context better. When Claude isn't sure where a page belongs, it will ask — that's the most valuable part of the process.

**Don't delete the originals immediately.** When a page is cloned to a new section, the original stays where it was. Once you've confirmed everything moved correctly, clean up the old sections manually. This is your safety net.

**Use "ask me before moving" in your prompts.** Adding this phrase gives you a review step before anything happens — good practice when working with important notes.

---

## Part 7: Troubleshooting

**"The onenote server isn't showing up in Claude Desktop"**
- Make sure Claude Desktop was fully quit and restarted after editing the config file
- Double-check the file paths in the config — they must point to the `venv` Python, not the system Python
- On Windows, confirm you used double backslashes `\\` in all file paths in the JSON

**"Authentication failed / browser didn't open"**
- Make sure your `CLIENT_ID` in the `.env` file matches the Azure Portal value exactly
- Confirm `TENANT_ID=common` — do not change this for personal accounts
- Try deleting the `token_cache.json` file in the server folder and re-authenticating

**"Claude says it can't find my notebook"**
- Ask Claude to `list my OneNote notebooks` first to see exactly what names it finds
- Make sure you signed in with the correct Microsoft account during authentication

**"A page didn't clone correctly"**
- Pages with complex embedded content (Excel tables, Visio diagrams) may not clone perfectly
- For those, check the result in OneNote and fix any formatting issues manually

---

## Quick Reference Card

| What you want to do | What to say to Claude |
|--------------------|-----------------------|
| See all notebooks | `List my OneNote notebooks` |
| See all sections | `List sections in [Notebook]` |
| See all pages | `List pages in [Section]` |
| Understand a section | `Read all pages in [Section] and summarize` |
| Create a section | `Create a section called [Name] in [Notebook]` |
| Move a page | `Move [Page Name] from [Section A] to [Section B]` |
| Move many pages | `Move all pages from [Section] to [Section], ask me if unsure` |
| Check what moved | `List all pages now in [Section]` |

---

*Built by [Sujit G](https://sujitg.com) — technologist and engineering leader. GitHub: [github.com/jisujit/onenote-mcp-server](https://github.com/jisujit/onenote-mcp-server)*
