#!/bin/bash

# Initialize git repository if not already initialized
if [ ! -d .git ]; then
  git init
  git add .
  git commit -m "Initial commit"
fi

# Function to make a commit with a random change
make_commit() {
  local commit_date="$1"
  local commit_message="$2"
  
  # Create a temporary file with random content
  echo "// Updated on $commit_date" >> src/commit_history.js
  
  # Stage and commit with the specified date
  git add src/commit_history.js
  GIT_AUTHOR_DATE="$commit_date" GIT_COMMITTER_DATE="$commit_date" git commit -m "$commit_message"
  
  echo "Created commit: $commit_message at $commit_date"
}

# Create src/commit_history.js if it doesn't exist
mkdir -p src
touch src/commit_history.js
echo "// Commit history file" > src/commit_history.js

# Get current date and time
current_date=$(date +%s)

# Calculate timestamps for yesterday and day before yesterday
day_seconds=86400
yesterday=$((current_date - day_seconds))
day_before_yesterday=$((yesterday - day_seconds))

# Day 1 commits (12 commits) - day before yesterday
day1_start=$day_before_yesterday
day1_end=$yesterday

# Day 2 commits (12 commits) - yesterday
day2_start=$yesterday
day2_end=$current_date

# Generate 12 random timestamps for day 1
declare -a day1_timestamps
for i in {1..12}; do
  random_seconds=$((RANDOM % day_seconds))
  timestamp=$((day1_start + random_seconds))
  day1_timestamps+=($timestamp)
done

# Sort the timestamps
IFS=$'\n' day1_timestamps=($(sort -n <<<"${day1_timestamps[*]}"))
unset IFS

# Generate 12 random timestamps for day 2
declare -a day2_timestamps
for i in {1..12}; do
  random_seconds=$((RANDOM % day_seconds))
  timestamp=$((day2_start + random_seconds))
  day2_timestamps+=($timestamp)
done

# Sort the timestamps
IFS=$'\n' day2_timestamps=($(sort -n <<<"${day2_timestamps[*]}"))
unset IFS

# Commit messages for day 1
day1_messages=(
  "Add basic project structure"
  "Create initial component files"
  "Set up API service"
  "Implement goal model"
  "Add goal form component"
  "Create goal card UI"
  "Implement progress bar component"
  "Add dashboard layout"
  "Implement goal creation functionality"
  "Add goal deletion feature"
  "Implement goal editing"
  "Add deposit functionality"
)

# Commit messages for day 2
day2_messages=(
  "Fix progress bar calculation"
  "Add deadline warning feature"
  "Implement overdue status"
  "Improve form validation"
  "Add responsive design"
  "Fix deposit amount validation"
  "Add goal completion animation"
  "Implement overview statistics"
  "Fix date formatting"
  "Add category filtering"
  "Improve error handling"
  "Final UI polish"
)

# Make commits for day 1
for i in {0..11}; do
  commit_date=$(date -d @${day1_timestamps[$i]} +"%Y-%m-%d %H:%M:%S")
  make_commit "$commit_date" "${day1_messages[$i]}"
done

# Make commits for day 2
for i in {0..11}; do
  commit_date=$(date -d @${day2_timestamps[$i]} +"%Y-%m-%d %H:%M:%S")
  make_commit "$commit_date" "${day2_messages[$i]}"
done

echo "Generated 24 commits over 2 days with unequal intervals"