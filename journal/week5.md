# Week 5 — DynamoDB and Serverless Caching

**pretty print the cli output from ddb scan**

Haven't exactly been taking great notes but this was nice when i wanted to format the cli output from the dynamodb scan which was a bunch of individual blobs of json

add comma to each end of line except the last
sed '$!s/$/,/' ./bin/ddb/seeddata.json > ./bin/ddb/seeddataformatted.json
thx stack overflow https://stackoverflow.com/questions/35021524/how-can-i-add-a-comma-at-the-end-of-every-line-except-the-last-line

then i manually wrapped the start and end of the blobs in [] and now it was pretty printed in vscode.

**local dynamodb gui**

here's something to investigate
