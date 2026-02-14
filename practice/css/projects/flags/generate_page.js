const flagsJSON = JSON.parse(Deno.readTextFileSync("./flags.json"));

const top = `<!DOCTYPE html>
<html lang="en">
<head>
  <title>Flags</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div id="container">`;

const flags =  flagsJSON.map((flag) =>
  `<div class="flag">
      <div class="img-container">
        <img src="${flag.src}" alt="${flag.name.at(0)}">
      </div>
      <p class="name">${flag.name.at(0)}</p>
    </div>`
);

const bottom = ` </div>
</body>
</html>`;


const page = top + flags.join("\n") + bottom;

Deno.writeTextFileSync('pradipta.html', page)
