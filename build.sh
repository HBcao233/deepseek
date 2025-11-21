npx rollup -c
npx terser deepseek.js -o deepseek.min.js -c -m
cat << EOF > index.html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Deepseek - 探索未至之境</title>
    <meta property="og:title" content="DeepSeek">
    <meta property="og:description" content="Chat with DeepSeek AI.">
    <meta property="og:image" content="https://cdn.deepseek.com/images/deepseek-chat-open-graph-image.jpeg">
    <link rel="icon" type="image/x-icon" href="/favicon.svg">
    
    <link rel="stylesheet" href="/src/main.css">
    <script defer type="module" src="/deepseek.min.js?v=4"></script>
</head>
<body>
  <ds-app></ds-app>
</body>
</html>
EOF
