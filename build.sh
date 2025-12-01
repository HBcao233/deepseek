output_dir=public
mkdir -p $output_dir

npx rollup -c
hash=$(md5sum deepseek.js)
hash=${hash:0:10}
name=deepseek.${hash}.js
npx terser deepseek.js -o $output_dir/$name -c -m
echo "output $output_dir/$name"
cp -r assets $output_dir/
cp src/main.css $output_dir/
cp favicon.svg $output_dir/

cat << EOF > $output_dir/index.html
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
    
    <link rel="stylesheet" href="/main.css">
    <script defer type="module" src="/$name"></script>
</head>
<body>
  <ds-app></ds-app>
</body>
</html>
EOF
