<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        body {
            padding: 40px;
        }
        
        a {
            display: block;
            font-size: 20px;
            color: rgb(105, 99, 99);
            margin: 10px 0;
        }
    </style>
</head>

<body>
    {{#each files}}
    <a href="{{../dir}}/{{file}}">[{{icon}}]{{file}}</a> {{/each}}
</body>

</html>